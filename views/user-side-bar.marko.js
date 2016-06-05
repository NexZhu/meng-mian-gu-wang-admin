function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      classAttr = __helpers.ca;

  return function render(data, out) {
    out.w("<div class=\"side-bar\"><h3>蒙面股王后台管理系统</h3><div" +
      classAttr(data.selected === "putongyonghu" ? "adda" : "") +
      "><a href=\"/user/list?type=normal\">普通用户</a></div><div" +
      classAttr(data.selected === "pukepaiyonghu" ? "adda" : "") +
      "><a href=\"/user/list?type=card\">扑克牌用户</a></div></div>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
