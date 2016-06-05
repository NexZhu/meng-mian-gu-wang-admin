function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      classAttr = __helpers.ca;

  return function render(data, out) {
    out.w("<div class=\"side-bar\"><h3>蒙面股王后台管理系统</h3><div" +
      classAttr(data.selected === "mengliaoguanli" ? "adda" : "") +
      "><a href=\"/content/mengliao/list\">猛料管理</a></div><div" +
      classAttr(data.selected === "jubaoguanli" ? "adda" : "") +
      "><a href=\"/content/jubao/list\">举报管理</a></div></div>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
