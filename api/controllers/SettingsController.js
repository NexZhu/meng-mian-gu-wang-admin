/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const
  fs   = require('fs'),
  path = require('path'),
  view = require('lib/view-manager')

const
  mod     = 2,
  sideBar = view.template('settings-side-bar')

module.exports = {
  push: function push(req, res) {
    res.ok({
      module: mod,
      sideBar,
      selected: 'push',
    }, {view: 'tuisong'})
  },
  password: function password(req, res) {
    res.ok({
      module: mod,
      sideBar,
      selected: 'password',
    }, {view: 'mimaxiugai'})
  },
  modifyPassword: function modifyPassword(req, res) {
    const
      {old: oldPass, 'new': newPass} = req.body,
      config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../config/admin.json'), 'utf8'))

    if (oldPass !== config.password) return res.end('0')
    config.password = newPass
    fs.writeFileSync(path.resolve(__dirname, '../../config/admin.json'), JSON.stringify(config), 'utf8')
    req.session.authenticated = false
    res.end('1')
  },
}
