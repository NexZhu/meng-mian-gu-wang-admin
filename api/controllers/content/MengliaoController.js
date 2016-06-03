/**
 * MengliaoController
 *
 * @description :: Server-side logic for managing mengliaos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const view = require('lib/view-manager')

const
  mod      = 0,
  sideBar  = view.template('content-side-bar'),
  selected = 'mengliaoguanli'

module.exports = {
  list: function list(req, res) {
    const page = req.param('page') || 1
    Mengliao.count({}).then(nMengliao => {
      Mengliao.find({
        sort: 'id DESC',
        skip: 15 * (page - 1),
        limit: 15,
      }).populate('author').populate('authorRole')
        .then(_.partialRight(async.map, populateMengliaoList, (err, mengliaos) => {
          res.ok({
            mengliaos,
            page,
            nPage: Math.ceil(nMengliao / 15),
            module: mod,
            sideBar,
            selected,
          }, {view: 'mengliaoguanli'})
        }))
    })
  },
  detail: function detail(req, res) {
    const id = req.param('id')
    Mengliao.findOne({id}).populate('author').populate('authorRole').then(m => {
      populateMengliao(m, true, (err, mengliao) => {
        res.ok({
          mengliao,
          module: mod,
          sideBar,
          selected,
        }, {view: 'mengliao_xiangqing'})
      })
    })
  },
  delete: function list(req, res) {
    const id = req.param('id')
    async.parallel([
      cb => MengliaoContent.destroy({mengliao: id}).then(cb),
      cb => Like.destroy({mengliao: id}).then(cb),
      cb => Comment.destroy({mengliao: id}).then(cb),
    ], (err, results) => {
      Mengliao.destroy({id}).then(err => {
        res.redirect(req.get('referer'))
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
      parallelTask(cb, () => RelatedLink.find({mengliao: m.id})),
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

function parallelTask(cb, task) {
  return cb => task().then(_.partial(cb, null))
}
