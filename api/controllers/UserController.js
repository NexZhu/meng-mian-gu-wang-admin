/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const view = require('lib/view-manager')

const
  mod     = 1,
  sideBar = view.template('user-side-bar')

module.exports = {
  list: function list(req, res) {
    const type = req.param('type')
    if (type === 'card') {
      Role.find({}).populate('user')
        .then(_.partialRight(async.map, populateRoleUser, (err, roles) => {
          res.ok({
            roles,
            module: mod,
            sideBar,
            selected: 'pukepaiyonghu',
          }, {view: 'pukepaiyonghu'})
        }))
    } else {
      User.find({}).then(users => {
        res.ok({
          users,
          module: mod,
          sideBar,
          selected: 'putongyonghu',
        }, {view: 'putongyonghu'})
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
