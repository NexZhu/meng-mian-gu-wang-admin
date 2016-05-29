function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      loadTemplate = __helpers.l,
      __header = loadTemplate(require.resolve("./header.marko")),
      forEach = __helpers.f,
      escapeXmlAttr = __helpers.xa;

  return function render(data, out) {
    out.w("<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><link rel=\"stylesheet\" href=\"/styles/reset.css\"> <link rel=\"stylesheet\" href=\"/styles/guwang.css\"> <script src=\"/js/dependencies/sails.io.js\"></script> <script src=\"/js/dependencies/jquery-1.11.0.js\"></script> <title>蒙面股王后台管理系统</title></head><body><div class=\"mengmianguwang\">");

    __header.render({
        module: data.module
      }, out);

    out.w("<section class=\"section\"><div class=\"mengliaoguanli\">");

    data.sideBar.render({
        selected: data.selected
      }, out);

    out.w("<div class=\"content\"><div class=\"mengliao\"><div class=\"select\"><div><span>状态</span><select name><option value>全部</option><option value>正常</option><option value>禁言</option></select></div><div><span>性别</span><select name><option value>全部</option><option value>正常</option><option value>禁言</option></select></div><div><span>来源</span><select name><option value>全部</option><option value>正常</option><option value>禁言</option></select></div></div><div class=\"search\"><div class=\"sousuo\"><input type=\"search\" class=\"text\" placeholder=\"输入昵称、关键词等\"><input type=\"submit\" class=\"buttom\" value=\"搜索\"></div></div><div class=\"mengliao_info clear\"><div class=\"mengliao_ul\"><ul class=\"putongyonghu_nav\"><li class=\"nickname\">昵称</li><li>来源</li><li>openid/手机</li><li>unionid</li><li>性别</li><li>地区</li><li>状态</li><li>操作</li></ul>");

    forEach(data.users, function(u) {
      out.w("<ul class=\"putongyonghu_list\"><a href=\"/user/detail?id=" +
        escapeXmlAttr(u.id) +
        "\"><li class=\"nickname\">" +
        escapeXml(u.name ? u.name : "无") +
        "</li><li>" +
        escapeXml(u.qq ? "QQ" : u.wechat ? "微信" : "手机") +
        "</li><li>" +
        escapeXml((u.qq || u.wechat) || u.mobile) +
        "</li><li>无</li><li>" +
        escapeXml(u.gender) +
        "</li><li>无</li><li>" +
        escapeXml(u.restricted === "0" ? "禁言" : "正常") +
        "</li><li><span><a href=\"/user/detail?id=" +
        escapeXmlAttr(u.id) +
        "\">详情</a></span>&nbsp; <a href=\"/user/restrict?id=" +
        escapeXmlAttr(u.id) +
        "&amp;restricted=" +
        escapeXmlAttr(u.restricted === "0" ? "1" : "0") +
        "\"><span class=\"banned publics\">" +
        escapeXml(u.restricted === "0" ? "解除" : "禁言") +
        "</span></a></li></a></ul>");
    });

    out.w("</div><div class=\"tiaozhuan\"><div class=\"page-yeshu\"><span onclick=\"shouye()\">首页</span><span onclick=\"prev_ye()\">上一页</span><span onclick=\"next_ye()\">下一页</span><span onclick=\"last_ye()\">尾页</span></div><div class=\"ystz\"><form action=\"#\"><input id=\"dangqianye\" type=\"text\" class=\"tiaozhuanyeshu\"><span id=\"zongyeshu\"></span></form><span class=\"tiaozhuan-btn\" onclick=\"go_to()\">跳转</span></div></div></div></div></div></div></section><footer class=\"footer\">Copyright © 2016 蒙面股王</footer></div></body></html><script>\n  /*跳转页面*/\n\t\tfunction shouye() {\n\t\t\talert(\"首页\");\n\t\t};\n\t\tfunction prev_ye() {\n\t\t\talert(\"上一页\");\n\t\t};\n\n\t\tfunction next_ye() {\n\t\t\talert(\"下一页\");\n\t\t};\n\t\tfunction last_ye() {\n\t\t\talert(\"最后一页\");\n\t\t};\n\n\t\tfunction go_to() {\n\t\t\talert(\"跳转\");\n\t\t};\n\t</script>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);