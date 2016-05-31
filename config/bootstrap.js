/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

require('app-module-path').addPath(require('path').resolve(__dirname, '..'))

module.exports.bootstrap = function bootstrap(cb) {

  require('lib/view-manager')

  if (sails.config.environment === 'development') {
    const path         = require('path')
    const templatesDir = path.resolve(__dirname, '../views')
    require('marko/hot-reload').enable()
    require('fs').watch(templatesDir, function (event, filename) {
      if (/\.marko$/.test(filename)) {
        // Resolve the filename to a full template path:
        var templatePath = path.join(templatesDir, filename)

        console.log('Marko template modified: ', templatePath)

        // Pass along the *full* template path to marko
        require('marko/hot-reload').handleFileModified(templatePath)
    }
    })
  }

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb()
}
