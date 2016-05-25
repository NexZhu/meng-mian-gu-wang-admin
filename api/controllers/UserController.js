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
    User.find({}).then(users => {
      res.ok({
        users,
        module: mod,
        sideBar,
        selected: type === 'card' ? 'pukepaiyonghu' : 'putongyonghu',
      }, {view: 'putongyonghu'})
    })
  },
  detail: function detail(req, res) {
    const
      id   = req.param('id'),
      type = req.param('type')

    User.findOne({id}).then(u => {
      populateUser(u, (err, user) => {
        res.ok({
          user,
          module: mod,
          sideBar,
          selected: type === 'card' ? 'pukepaiyonghu' : 'putongyonghu',
        }, {view: 'yonghu_xiangqing'})
      })
    })
  }
}

function populateUser(u, cb) {
  // TODO: detail
  const detail = false
  async.parallel([
    parallelTask(cb, () => Follow.count({user: u.id})),
    parallelTask(cb, () => Like.count({user: u.id})),
    ...(detail ? [] : []),
  ], (err, results) => {
    cb(null, Object.assign({}, u, {
      nFollowing: results[0],
      nLike: results[1],
    }, detail ? {} : {}))
  })
}

function parallelTask(cb, task) {
  return cb => task().then(_.partial(cb, null))
}
