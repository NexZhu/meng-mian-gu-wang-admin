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
  mod     = 1,
  sideBar = view.template('user-side-bar')

module.exports = {
  signin: function signin(req, res) {
    res.ok({}, {view: 'signin'})
  },
  verifySignin: function verifySignin(req, res) {
    const {username, password} = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../config/admin.json'), 'utf8'))
    if (req.param('username') === username && req.param('password') === password) {
      req.session.authenticated = true
      res.redirect('/content/mengliao/list')
    } else {
      res.redirect(req.get('referer'))
    }
  },
  signout: function signout(req, res) {
    req.session.authenticated = false
    res.redirect('auth/signin')
  },
}
