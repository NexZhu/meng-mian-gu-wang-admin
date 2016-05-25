require('marko/node-require').install()

const template = function template(templatePath) {
  templatePath = '../../views/' + templatePath + '.marko'
  return require(templatePath)
}

module.exports.template = template

module.exports.render = function render(templatePath, data, res) {
  template(templatePath).render(data, res)
}
