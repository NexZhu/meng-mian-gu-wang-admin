function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w("<!DOCTYPE html><html><head><meta charset=\"utf-8\"><link rel=\"shortcut icon\" href=\"/images/new.ico\"><link rel=\"stylesheet\" href=\"/styles/reset.css\"> <link rel=\"stylesheet\" href=\"/styles/guwang.css\"> <script src=\"/js/dependencies/jquery-1.11.0.js\"></script> <script src=\"/js/guwang_houtai.js\"></script> <title>登录</title></head><body><div class=\"denglu\"><div class=\"denglu-info\"><section class=\"denglu_cen\"><div class=\"denglu-page\"><div class=\"denglu-logo\"><img src=\"/images/logo.png\" alt></div><div class=\"xian_s\"></div><div class=\"denglu_text\"><div class=\"denglu-bt\">蒙面股王后台管理系统</div><form action=\"/auth/verifySignin\"><div class=\"user\"><input name=\"username\" type=\"text\" class=\"user-name\" placeholder=\"用户名\"></div><div class=\"user\"><input name=\"password\" type=\"password\" class=\"user-name\" placeholder=\"密码\"></div><div><input type=\"submit\" class=\"submit\" value=\"登录\"></div></form></div></div></section></div></div></body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
