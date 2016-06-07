function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      classAttr = __helpers.ca;

  return function render(data, out) {
    out.w("<div class=\"side-bar\"><h3>蒙面股王后台管理系统</h3><div" +
      classAttr(data.selected === "push" ? "adda" : "") +
      "><a href=\"/settings/push\">推送消息设置</a></div><div" +
      classAttr(data.selected === "password" ? "adda" : "") +
      "><a href=\"/settings/password\">修改密码</a></div></div>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
