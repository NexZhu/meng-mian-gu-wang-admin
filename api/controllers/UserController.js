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
          selected: type === 'putongyonghu',
        }, {view: 'yonghu_xiangqing'})
      })
    })
  },
  following: function following(req, res) {
    const
      id   = req.param('id'),
      page = req.param('page') || 1

    Follow.count({follower: id}).then(nFollow => {
      Follow.find({
        follower: id,
        skip: 15 * (page - 1),
        limit: 15,
      }).populate('user').then(_.partialRight(async.map, (f, cb) => {
        populateUser(f.user, true, cb)
      }, (err, users) => {
        res.ok({
          id,
          users,
          page,
          nPage: nPage(nFollow),
          module: mod,
          sideBar,
          selected: 'putongyonghu',
        }, {view: 'yonghu_guanzhu'})
      }))
    })
  },
  like: function like(req, res) {
    const
      id   = req.param('id'),
      page = req.param('page') || 1

    Like.count({user: id}).then(nLike => {
      Like.find({
        user: id,
        skip: 15 * (page - 1),
        limit: 15,
      }).populate('mengliao')
        .then(ls => ls.filter(l => l.mengliao))
        .then(_.partialRight(async.map, populateLikeMengliao, (err, mengliaos) => {
          res.ok({
            id,
            mengliaos,
            page,
            nPage: nPage(nLike),
            module: mod,
            sideBar,
            selected: 'putongyonghu',
          }, {view: 'yonghu_mengliao'})
        }))
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
    parallelTask(() => Follow.count({follower: u.id})),
    parallelTask(() => Like.count({user: u.id})),
    parallelTask(() => Mengliao.count({author: u.id})),
    ...(detail ? [
      parallelTask(() => Role.findOne({user: u.id})),
      parallelTask(() => Follow.count({user: u.id})),
    ] : []),
  ], (err, results) => {
    cb(null, Object.assign({}, u, {
      nFollowing: results[0],
      nLike: results[1],
      nMengliao: results[2],
    }, detail ? {
      role: results[3],
      nFollower: results[4],
    } : {}))
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

function populateLikeMengliao(like, cb) {
  const m = like.mengliao
  async.parallel([
    parallelTask(() => Role.findOne({id: m.authorRole})),
    parallelTask(() => MengliaoContent.find({mengliao: m.id})),
    parallelTask(() => Like.count({mengliao: m.id})),
    parallelTask(() => Comment.count({mengliao: m.id})),
  ], (err, results) => {
    cb(null, Object.assign({}, m, {
      authorRole: results[0],
      contents: results[1],
      nLike: results[2],
      nComment: results[3],
    }))
  })
}

function parallelTask(task) {
  return cb => task().then(_.partial(cb, null))
}
