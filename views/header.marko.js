function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w("<div class=\"fixed\"><iframe id=\"iframe\" src=\"/html/top/header.html\" scrolling=\"no\" width=\"100%\" height=\"60\" style=\"border:0\" ;></iframe><script>\n    $('#iframe').load(function () {\n      var ul = $('#iframe').contents().find(\"#ul li\");\n      ul.eq(" +
      escapeXml(data.module) +
      ").attr(\"class\", \"add\");\n    });\n  </script></div>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
