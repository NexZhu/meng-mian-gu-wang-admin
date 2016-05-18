require('marko/node-require').install()

module.exports.render = function render(templatePath, data, res) {
  templatePath = '../../views/' + templatePath + '.marko'
  let template = require(templatePath)
  template.render(data, res)
}
