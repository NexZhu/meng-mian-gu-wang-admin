function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      styleAttr = __helpers.sa;

  return function render(data, out) {
    out.w("<div class=\"side-bar\"><div><a href=\"/user/list?type=normal\"" +
      styleAttr(data.selected === "putongyonghu" ? "color:#333;" : "") +
      ">普通用户</a></div><div><a href=\"/user/list?type=card\"" +
      styleAttr(data.selected === "pukepaiyonghu" ? "color:#333;" : "") +
      ">扑克牌用户</a></div></div>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
