function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      loadTemplate = __helpers.l,
      __header = loadTemplate(require.resolve("./header.marko"));

  return function render(data, out) {
    out.w("<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><link rel=\"stylesheet\" href=\"/styles/reset.css\"> <link rel=\"stylesheet\" href=\"/styles/guwang.css\"> <script src=\"/js/dependencies/sails.io.js\"></script> <script src=\"/js/dependencies/jquery-1.11.0.js\"></script> <title>蒙面股王后台管理系统</title></head><body><div class=\"mengmianguwang\">");

    __header.render({
        module: data.module
      }, out);

    out.w("<section class=\"section\"><div class=\"mengliaoguanli\">");

    data.sideBar.render({
        selected: data.selected
      }, out);

    out.w("<div class=\"content\"><div class=\"mengliao\"><div class=\"handle\"><span class=\"public\"> <a href=\"javascript:history.back(-1)\">返回</a></span><span class=\"repeal pinglun\"><a href=\"pukepaiyonghu.html\">确认关联</a></span></div><div class=\"fabuzhe_info\">");

    var r = data.role;

    out.w("<div class=\"xiugai\"><div class=\"xiugai_nicheng\">昵称:<span>" +
      escapeXml(r.name) +
      "</span></div><div class=\"xiugai_guanlian\">当前关联：<span>" +
      escapeXml(r.user ? r.user.name : "无") +
      "</span></div><div class=\"xinzeng clear\">新增关联：<span>无</span></div></div><div class=\"soso\"><form action><input type=\"search\" class=\"sear\"><input type=\"submit\" class=\"soso_ok\" value=\"确定\"></form></div><div class=\"soso_nr\"><div class=\"soso_info\"><ul class=\"soso_nav\"><li class=\"nikname\">昵称</li><li>来源</li><li>openid</li><li>unionid</li><li>性别</li><li>地区</li><li>选中</li></ul><ul class=\"soso_list\"><li class=\"nikname\">昵称太长据说也可以显示</li><li>微信</li><li>1574845445</li><li>00258784</li><li>女</li><li>北京</li><li><input type=\"radio\" name=\"radio\"></li></ul><ul class=\"soso_list\"><li class=\"nikname\">昵称太长</li><li>微信</li><li>1854845445</li><li>4258784</li><li>男</li><li>江苏</li><li><input type=\"radio\" name=\"radio\"></li></ul><ul class=\"soso_list\"><li class=\"nikname\">昵称太长据说也可以显示</li><li>微信</li><li>1574845445</li><li>00258784</li><li>女</li><li>北京</li><li><input type=\"radio\" name=\"radio\"></li></ul><ul class=\"soso_list\"><li class=\"nikname\">昵称太长据说也</li><li>微信</li><li>1574845445</li><li>00258784</li><li>男</li><li>南京</li><li><input type=\"radio\" name=\"radio\"></li></ul><ul class=\"soso_list\"><li class=\"nikname\">昵称太长据说也可以显示</li><li>微信</li><li>1574845445</li><li>00258784</li><li>女</li><li>北京</li><li><input type=\"radio\" name=\"radio\"></li></ul><ul class=\"soso_list\"><li class=\"nikname\">昵称太长据说也</li><li>微信</li><li>1574845445</li><li>00258784</li><li>男</li><li>南京</li><li><input type=\"radio\" name=\"radio\"></li></ul></div><div class=\"page\"><span class=\"publics\">上一页</span><span class=\"publics\">下一页</span></div></div></div></div></div></div></section><footer class=\"footer\">Copyright © 2016 蒙面股王</footer></div></body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
