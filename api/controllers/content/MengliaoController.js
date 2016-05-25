/**
 * MengliaoController
 *
 * @description :: Server-side logic for managing mengliaos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const view = require('lib/view-manager')

const
  sideBar  = view.template('content-side-bar'),
  selected = 'mengliaoguanli'

module.exports = {
  list: function list(req, res) {
    Mengliao.find({}).populate('author').then(mengliaos => {
      async.map(mengliaos, populateMengliaoList, (err, mengliaos) => {
        res.ok({mengliaos, sideBar, selected}, {view: 'mengliaoguanli'})
      })
    })
  },
  detail: function detail(req, res) {
    let id = req.param('id')
    Mengliao.findOne({id}).populate('author').then(m => {
      populateMengliao(m, true, (err, m) => {
        console.log(m)
        res.ok({mengliao: m, sideBar, selected}, {view: 'mengliao_xiangqing'})
      })
    })
  },
  delete: function list(req, res) {
    let id = req.param('id')
    async.parallel([
      cb => MengliaoContent.destroy({mengliao: id}).then(cb),
      cb => Like.destroy({mengliao: id}).then(cb),
      cb => Comment.destroy({mengliao: id}).then(cb),
    ], (err, results) => {
      Mengliao.destroy({id}).then(err => {
        res.redirect('/content/mengliao/list')
      })
    })
  },
}

function populateMengliao(m, detail, cb) {
  async.parallel([
    parallelTask(cb, () => MengliaoContent.find({mengliao: m.id})),
    parallelTask(cb, () => Like.count({mengliao: m.id})),
    parallelTask(cb, () => Comment.count({mengliao: m.id})),
    ...(detail ? [
      parallelTask(cb, () => Mengliao.count({author: m.author.id})),
      parallelTask(cb, () => Follow.count({user: m.author.id})),
    ] : []),
  ], (err, results) => {
    cb(null, Object.assign({}, m, {
      contents: results[0],
      nLike: results[1],
      nComment: results[2],
    }, detail ? {
      nMengliao: results[3],
      nFollower: results[4],
    } : {}))
  })
}

const populateMengliaoList = _.curry(populateMengliao)(_, false)

function parallelTask(cb, task) {
  return cb => task().then(_.partial(cb, null))
}
