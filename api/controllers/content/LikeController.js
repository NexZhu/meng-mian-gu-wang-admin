/**
 * LikeController
 *
 * @description :: Server-side logic for managing likes
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

    Like.count({mengliao: id}).then(nLike => {
      Like.find({
        mengliao: id,
        skip: 15 * (page - 1),
        limit: 15,
      }).populate('user').then(likes => {
        res.ok({
          id,
          likes,
          nLike,
          page,
          nPage: nPage(nLike, 40),
          module: mod,
          sideBar,
          selected,
        }, {view: 'dianzan'})
      })
    })
  },
}

