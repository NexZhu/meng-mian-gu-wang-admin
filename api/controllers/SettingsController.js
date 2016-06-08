/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const
  fs    = require('fs'),
  path  = require('path'),
  view  = require('lib/view-manager'),
  nPage = require('utils/npage')

const
  mod     = 2,
  sideBar = view.template('settings-side-bar')

module.exports = {
  push: function push(req, res) {
    res.ok({
      module: mod,
      sideBar,
      selected: 'push',
    }, {view: 'tuisong'})
  },
  modifyRestrictMessage: function modifyRestrictMessage(req, res) {
    const {message} = req.body
    AdminConfig.update({name: 'restrict_message'}, {value: message}).then(()=> {
      res.end('1')
    })
  },
  customPush: function customPush(req, res) {
    const
      search = req.param('search'),
      page   = req.param('page') || 1

    if (!search) {
      res.ok({
        mengliaos: [],
        page,
        nPage: 1,
        search,
        module: mod,
        sideBar,
        selected: 'push',
      }, {view: 'zidingyituisong'})
      return
    }

    Mengliao.find({
      sort: 'id DESC',
    }).populate('author').populate('authorRole')
      .then(_.partialRight(async.map, populateMengliaoList, (err, ms) => {
        ms = ms.filter(m => m.authorRole.name.includes(search)
        || m.contents.reduce((prev, curr) => {
          return prev || curr.content.includes(search)
        }, false))
        res.ok({
          mengliaos: ms.slice(15 * (page - 1), 15 * page),
          page,
          nPage: nPage(ms.length),
          search,
          module: mod,
          sideBar,
          selected: 'push',
        }, {view: 'zidingyituisong'})
      }))
  },
  confirmCustomPush: function confirmCustomPush(req, res) {
    const id = req.param('id')
    Mengliao.findOne({id}).then(m => {
      res.end('1')
      User.find({}).then(_.partialRight(async.map, (u, cb) => {
        SystemMessage.create({
          time: new Date(),
          mengliao: m.id,
          type: 'xitong',
          content: '',
          read: '0',
          pushId: u.pushId,
          status: '1',
          user: u.id,
        }).then(_.partial(cb, null))
      }, () => {
      }))
    })
  },
  customPushHistory: function customPushHistory(req, res) {
    const page = req.param('page') || 1
    SystemMessage.count({mengliao: {'!': null}}).then(nSystemMessage => {
      SystemMessage.find({
        mengliao: {'!': null},
        skip: 15 * (page - 1),
        limit: 15,
      }).then(sms => {
        const mIds = []
        sms        = sms.filter(sm => {
          const flag = mIds.includes(sm.mengliao)
          if (!flag) mIds.push(sm.mengliao)
          return !flag
        })
        async.map(sms, populateSystemMessage, (err, systemMessages) => {
          res.ok({
            systemMessages,
            page,
            nPage: nPage(nSystemMessage),
            module: mod,
            sideBar,
            selected: 'push',
          }, {view: 'zidingyilishi'})
        })
      })
    })
  },
  password: function password(req, res) {
    res.ok({
      module: mod,
      sideBar,
      selected: 'password',
    }, {view: 'mimaxiugai'})
  },
  modifyPassword: function modifyPassword(req, res) {
    const
      {old: oldPass, 'new': newPass} = req.body,
      config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../config/admin.json'), 'utf8'))

    if (oldPass !== config.password) return res.end('0')
    config.password = newPass
    fs.writeFileSync(path.resolve(__dirname, '../../config/admin.json'), JSON.stringify(config), 'utf8')
    req.session.authenticated = false
    res.end('1')
  },
}

function populateSystemMessage(s, cb) {
  Mengliao.findOne({id: s.mengliao}).then(m => {
    s.mengliao = m
    if (!m) {
      cb(null, s)
      return
    }
    Role.findOne({id: m.authorRole}).then(r => {
      MengliaoContent.find({mengliao: m.id}).then(mcs => {
        m.authorRole = r
        m.contents   = mcs
        cb(null, s)
      })
    })
  })
}

function populateMengliao(m, detail, cb) {
  async.parallel([
    parallelTask(() => MengliaoContent.find({mengliao: m.id})),
    parallelTask(() => Like.count({mengliao: m.id})),
    parallelTask(() => Comment.count({mengliao: m.id})),
    ...(detail ? [
      parallelTask(() => Mengliao.count({author: m.author.id})),
      parallelTask(() => Follow.count({user: m.author.id})),
      parallelTask(() => RelatedLink.find({mengliao: m.id})),
    ] : []),
  ], (err, results) => {
    cb(null, Object.assign({}, m, {
      contents: results[0],
      nLike: results[1],
      nComment: results[2],
    }, detail ? {
      nMengliao: results[3],
      nFollower: results[4],
      relatedLinks: results[5],
    } : {}))
  })
}

const populateMengliaoList = _.curry(populateMengliao)(_, false)

function parallelTask(task) {
  return cb => task().then(_.partial(cb, null))
}

