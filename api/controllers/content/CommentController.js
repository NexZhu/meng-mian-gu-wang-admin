/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
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
      id   = req.param('id'),
      page = req.param('page') || 1

    Comment.count({mengliao: id}).then(nComment => {
      Comment.find({
        mengliao: id,
        sort: 'id DESC',
        skip: 15 * (page - 1),
        limit: 15,
      }).populate('author').then((comments) => {
        res.ok({
          id,
          comments,
          nComment,
          page,
          nPage: nPage(nComment, 10),
          module: mod,
          sideBar,
          selected,
        }, {view: 'pinglun_xiangqing'})
      })
    })
  },
  delete: function delte(req, res) {
    const id = req.param('id')
    Jubao.destroy({comment: id})
      .then(() => {
        return Comment.destroy({id})
      })
      .then(() => {
        res.redirect(req.get('referer'))
      })
  },
}
