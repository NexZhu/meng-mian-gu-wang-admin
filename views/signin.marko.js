function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w("<!DOCTYPE html><html><head><meta charset=\"utf-8\"><link rel=\"stylesheet\" href=\"/styles/reset.css\"> <link rel=\"stylesheet\" href=\"/styles/guwang.css\"> <script src=\"/js/dependencies/jquery-1.11.0.js\"></script> <title>登录</title></head><body style=\"background:#6E82B6;\"><div class=\"denglu\"><div class=\"denglu-info\"><div class=\"denglu-logo\"><img src=\"/images/logo.png\" alt></div><div class=\"denglu-bt\">蒙面股王后台管理系统</div><section class=\"denglu_cen\"><div class=\"denglu-page\"><form action=\"/auth/verifySignin\"><div class=\"user\"><span class=\"denglu-name\">用户名</span><input type=\"text\" name=\"username\" class=\"user-name\" placeholder=\"请输入用户名\"></div><div class=\"user\"><span class=\"denglu-name\" style=\"margin-left:14px;\">密码</span><input type=\"password\" name=\"password\" class=\"user-name\" placeholder=\"请输入密码\"></div><div><input type=\"submit\" class=\"submit\" value=\"登录\"></div></form></div></section></div></div></body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
