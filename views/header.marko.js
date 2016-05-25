function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w("<div class=\"fixed\"><iframe id=\"iframe\" src=\"/html/top/header.html\" scrolling=\"no\" width=\"100%\" style=\"border:0\" ;></iframe><script>\n    $('#iframe').load(function() {\n      var ul = $('#iframe').contents().find(\"#ul li\");\n      ul.eq(" +
      escapeXml(data.module) +
      ").attr(\"class\", \"add\");\n    });\n  </script><div class=\"xitong\"><h2>蒙面股王后台管理系统--<span id=\"add-text\">" +
      escapeXml([
        "内容管理",
        "用户管理",
        "系统设置"
      ][data.module]) +
      "</span></h2></div></div>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
