require('marko/node-require').install()

module.exports.render = function render(templatePath, data, res) {
  if (!templatePath.endsWith('.marko')) templatePath += '.marko'
  let template = require(templatePath)
  template.render(data, res)
}
