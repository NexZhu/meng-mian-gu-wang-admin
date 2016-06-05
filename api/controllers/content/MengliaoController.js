/**
 * MengliaoController
 *
 * @description :: Server-side logic for managing mengliaos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const
  view  = require('lib/view-manager'),
  nPage = require('utils/npage')

const
  mod      = 0,
  sideBar  = view.template('content-side-bar'),
  selected = 'mengliaoguanli'

module.exports = {
  list: function list(req, res) {
    const
      page   = req.param('page') || 1,
      search = req.param('search') || ''

    Mengliao.find({
      sort: 'id DESC',
      /*skip: 15 * (page - 1),
       limit: 15,*/
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
          selected,
        }, {view: 'mengliaoguanli'})
      }))
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
      parallelTask(() => MengliaoContent.destroy({mengliao: id})),
      parallelTask(() => Like.destroy({mengliao: id})),
      cb => Comment.find({mengliao: id})
        .then(_.partialRight(async.map, (c, cb) => {
          Jubao.destroy({comment: c.id})
            .then(() => {
              return c.destroy()
            })
            .then(_.partial(cb, null))
        }, cb)),
    ], () => {
      Mengliao.destroy({id}).then(() => {
        const referer = req.get('referer')
        res.redirect(referer.includes('/content/mengliao/list') ?
          referer : '/content/mengliao/list')
      })
    })
  },
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
