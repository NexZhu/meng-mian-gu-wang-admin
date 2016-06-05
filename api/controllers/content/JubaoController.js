/**
 * JubaoController
 *
 * @description :: Server-side logic for managing jubaos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const
  view  = require('lib/view-manager'),
  nPage = require('utils/npage')

const
  mod      = 0,
  sideBar  = view.template('content-side-bar'),
  selected = 'jubaoguanli'

module.exports = {
  list: function list(req, res) {
    const page = req.param('page') || 1
    Jubao.count({}).then(nJubao => {
      Jubao.find({
        sort: 'id DESC',
        skip: 15 * (page - 1),
        limit: 15,
      }).populate('reporter').populate('reported').then(jubaos => {
        res.ok({
          jubaos,
          nJubao,
          page,
          nPage: nPage(nJubao, 10),
          module: mod,
          sideBar,
          selected,
        }, {view: 'jubaoguanli'})
      })
    })
  },
  delete: function delte(req, res) {
    const id = req.param('id')
    Jubao.destroy({id}).then(() => {
      res.redirect(req.get('referer'))
    })
  },
}
