function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      styleAttr = __helpers.sa;

  return function render(data, out) {
    out.w("<div class=\"side-bar\"><div><a href=\"/content/mengliao/list\"" +
      styleAttr(data.selected === "mengliaoguanli" ? "color:#333;" : "") +
      ">猛料管理</a></div></div>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
