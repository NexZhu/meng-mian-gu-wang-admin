/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const
  view  = require('lib/view-manager'),
  nPage = require('utils/npage')

const
  mod     = 1,
  sideBar = view.template('user-side-bar')

module.exports = {
  list: function list(req, res) {
    const
      type   = req.param('type'),
      search = req.param('search') || '',
      page   = req.param('page') || 1

    if (type === 'card') {
      Role.find({
        // skip: 15 * (page - 1),
        // limit: 15,
      }).populate('user')
        .then(_.partialRight(async.map, populateRoleUser, (err, rs) => {
          rs = search ? rs.filter(r => r.name.includes(search) || r.user && r.user.name.includes(search)) : rs
          res.ok({
            roles: rs.slice(15 * (page - 1), 15 * page),
            search,
            page,
            nPage: nPage(rs.length),
            module: mod,
            sideBar,
            selected: 'pukepaiyonghu',
          }, {view: 'pukepaiyonghu'})
        }))
    } else {
      User.count({
        or: [
          {name: {'contains': search}},
          {mobile: {'contains': search}},
        ],
      }).then(nUser => {
        User.find({
          or: [
            {name: {'contains': search}},
            {mobile: {'contains': search}},
          ],
          skip: 15 * (page - 1),
          limit: 15,
        }).then(users => {
          res.ok({
            users,
            search,
            page,
            nPage: nPage(nUser),
            module: mod,
            sideBar,
            selected: 'putongyonghu',
          }, {view: 'putongyonghu'})
        })
      })
    }
  },
  detail: function detail(req, res) {
    const
      id   = req.param('id'),
      type = req.param('type')

    User.findOne({id}).then(u => {
      populateUser(u, true, (err, user) => {
        res.ok({
          user,
          module: mod,
          sideBar,
          selected: type === 'card' ? 'pukepaiyonghu' : 'putongyonghu',
        }, {view: 'yonghu_xiangqing'})
      })
    })
  },
  restrict: function restricted(req, res) {
    const
      id         = req.param('id'),
      restricted = req.param('restricted')

    User.update({id}, {restricted: restricted}).then(u => {
      res.redirect(req.get('referer'))
    })
  },
  assign: function assign(req, res) {
    const
      id     = req.param('id'),
      search = req.param('search'),
      page   = req.param('page') || 1

    Role.findOne({id}).populate('user').then(role => {
      ;
      (search ? User.count({
        or: [
          {name: {'contains': search}},
          {mobile: {'contains': search}},
        ],
      }) : Promise.resolve(0)).then(nUser => {
        ;
        (search ? User.find({
          or: [
            {name: {'contains': search}},
            {mobile: {'contains': search}},
          ],
          skip: 15 * (page - 1),
          limit: 15,
        }) : Promise.resolve([])).then(users => {
          res.ok({
            role,
            users,
            search,
            page,
            nPage: nPage(nUser),
            module: mod,
            sideBar,
            selected: 'pukepaiyonghu',
          }, {view: 'pukepaiyonghu_xiugai'})
        })
      })
    })
  },
  confirmAssign: function confirmAssign(req, res) {
    const
      role = req.param('role'),
      user = req.param('user')
    Role.count({user}).then(c => {
      ;
      (c === 1 ? Promise.resolve({}) : Role.update({id: role}, {user})).then(u => {
        res.redirect('/user/list?type=card')
      })
    })
  },
  unassign: function unassign(req, res) {
    const id = req.param('id')
    Role.update({user: id}, {user: null}).then(u => {
      res.redirect(req.get('referer'))
    })
  },
}

function populateUser(u, detail, cb) {
  async.parallel([
    parallelTask(cb, () => Follow.count({user: u.id})),
    parallelTask(cb, () => Like.count({user: u.id})),
    ...(detail ? [
      parallelTask(cb, () => Role.findOne({user: u.id})),
    ] : [
      parallelTask(cb, () => Mengliao.count({author: u.id})),
    ]),
  ], (err, results) => {
    cb(null, Object.assign({}, u, {
      nFollowing: results[0],
      nLike: results[1],
    }, detail ? {
      role: results[2],
    } : {
      nMengliao: results[2],
    }))
  })
}

function populateRoleUser(r, cb) {
  if (r.user) {
    populateUser(r.user, false, (err, u) => {
      r.user = u
      cb(err, r)
    })
  } else cb(null, r)
}

function parallelTask(cb, task) {
  return cb => task().then(_.partial(cb, null))
}
