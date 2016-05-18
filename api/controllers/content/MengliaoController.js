/**
 * MengliaoController
 *
 * @description :: Server-side logic for managing mengliaos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  list: function list(req, res) {
    Mengliao.find({}).populate('author').then(mengliaos => {
      async.map(mengliaos, (m, cb) => {
        async.parallel([
          cb => MengliaoContent.find({mengliao: m.id}).then(_.partial(cb, null)),
          cb => Like.count({mengliao: m.id}).then(_.partial(cb, null)),
          cb => Comment.count({mengliao: m.id}).then(_.partial(cb, null)),
        ], (err, results) => {
          cb(null, Object.assign({}, m, {
            contents: results[0],
            nLike: results[1],
            nComment: results[2],
          }))
        })
      }, (err, mengliaos) => {
        res.ok({mengliaos}, {view: 'mengliaoguanli'})
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
