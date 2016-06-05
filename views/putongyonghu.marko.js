function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      loadTemplate = __helpers.l,
      __header = loadTemplate(require.resolve("./header.marko")),
      attr = __helpers.a,
      forEach = __helpers.f,
      escapeXmlAttr = __helpers.xa;

  return function render(data, out) {
    out.w("<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><link rel=\"shortcut icon\" href=\"/images/new.ico\"><link rel=\"stylesheet\" href=\"/styles/reset.css\"> <link rel=\"stylesheet\" href=\"/styles/guwang.css\"> <script src=\"/js/dependencies/jquery-1.11.0.js\"></script> <script src=\"/js/guwang_houtai.js\"></script> <title>蒙面股王后台管理系统</title></head><body><div class=\"mengmianguwang\">");

    data.sideBar.render({
        selected: data.selected
      }, out);

    __header.render({
        module: data.module
      }, out);

    out.w("<section class=\"section\"><div class=\"mengliaoguanli\"><div class=\"content\"><div class=\"mengliao\"><div class=\"select\"><div><span>状态</span><select name><option value>全部</option><option value>正常</option><option value>禁言</option></select></div><div><span>性别</span><select name><option value>全部</option><option value>正常</option><option value>禁言</option></select></div><div><span>来源</span><select name><option value>全部</option><option value>正常</option><option value>禁言</option></select></div></div><div class=\"search\"><div class=\"sousuo\"><form action=\"/user/list\"><input name=\"type\" type=\"text\" value=\"normal\" style=\"display: none\"><input name=\"search\" type=\"search\"" +
      attr("value", data.search) +
      " class=\"text\" placeholder=\"输入昵称、关键词等\"><input type=\"submit\" class=\"buttom\" value=\"搜索\" style=\"margin-left: 3px\"></form></div></div><div class=\"mengliao_info clear\"><div class=\"mengliao_ul\"><ul class=\"putongyonghu_nav\"><li class=\"nickname\">昵称</li><li>来源</li><li>opendid</li><li>unionid</li><li>性别</li><li>地区</li><li>状态</li><li>操作</li></ul>");

    forEach(data.users, function(u) {
      out.w("<ul class=\"putongyonghu_list odd\"><a href=\"/user/detail?id=" +
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
        "</li><li><span><a class=\"xiangqing\" href=\"/user/detail?id=" +
        escapeXmlAttr(u.id) +
        "\">详情</a></span><a href=\"/user/restrict?id=" +
        escapeXmlAttr(u.id) +
        "&amp;restricted=" +
        escapeXmlAttr(u.restricted === "0" ? "1" : "0") +
        "\"><span class=\"banned publics\" style=\"margin-left: 4px\">" +
        escapeXml(u.restricted === "0" ? "解除" : "禁言") +
        "</span></a></li></a></ul>");
    });

    out.w("</div><div class=\"tiaozhuan\">");

    var search = data.search,
        page = parseInt(data.page),
        nPage = data.nPage;

    out.w("<div class=\"page-yeshu\"><a href=\"/user/list?type=normal&amp;search=" +
      escapeXmlAttr(search) +
      "\"><span>首页</span></a><a" +
      attr("href", page === 1 ? "#" : (("/user/list?type=normal&search=" + search) + "&page=") + (page - 1)) +
      "><span>前一页</span></a><strong class=\"at_yeshu\">" +
      escapeXml(page) +
      "</strong><strong>" +
      escapeXml(nPage) +
      "</strong><a" +
      attr("href", page === nPage ? "#" : (("/user/list?type=normal&search=" + search) + "&page=") + (parseInt(page) + 1)) +
      "><span>后一页</span></a><a" +
      attr("href", (("/user/list?type=normal&search=" + search) + "&page=") + nPage) +
      "><span>尾页</span></a></div><div class=\"ystz\"><form action=\"#\"><input id=\"dangqianye\" type=\"number\" class=\"tiaozhuanyeshu\"" +
      attr("value", page) +
      " min=\"1\"" +
      attr("max", nPage) +
      "><span id=\"zongyeshu\"></span></form><span class=\"tiaozhuan-btn\" onclick=\"var page = document.getElementById(&#39;dangqianye&#39;).value; if (page) window.location = &#39;/user/list?type=normal&amp;search=" +
      escapeXmlAttr(search) +
      "&amp;page=&#39; + page\">跳转</span></div></div></div></div></div></div></section><footer class=\"footer\">Copyright © 2016 蒙面股王</footer></div></body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
