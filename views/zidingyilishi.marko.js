function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      loadTemplate = __helpers.l,
      __header = loadTemplate(require.resolve("./header.marko")),
      forEach = __helpers.f,
      attr = __helpers.a;

  return function render(data, out) {
    out.w("<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><link rel=\"shortcut icon\" href=\"/images/new.ico\"><link rel=\"stylesheet\" href=\"/styles/reset.css\"> <link rel=\"stylesheet\" href=\"/styles/guwang.css\"> <script src=\"/js/dependencies/jquery-1.11.0.js\"></script> <script src=\"/js/guwang_houtai.js\"></script> <title>蒙面股王后台管理系统</title></head><body><div class=\"mengmianguwang\">");

    data.sideBar.render({
        selected: data.selected
      }, out);

    __header.render({
        module: data.module
      }, out);

    out.w("<section class=\"section\"><div class=\"mengliaoguanli\"><div class=\"content\"><div class=\"mengliao\"><div class=\"handle dz_fanhui\"><ul><li></li><li><a href=\"javascript:history.back(-1)\">返回</a></li></ul></div><div class=\"lishi_info\"><ul class=\"lishi_nav\"><li>昵称</li><li>推送时间</li><li>内容概要</li></ul>");

    forEach(data.systemMessages, function(s) {
      out.w("<ul class=\"lishi_list clear odd\">");

      var m = s.mengliao;

      out.w("<a" +
        attr("href", m ? "/content/mengliao/detail?id=" + m.id : "#") +
        "><li>" +
        escapeXml(m ? m.authorRole.name : "已被删除") +
        "</li><li>" +
        escapeXml(s.time.toLocaleString()) +
        "</li>");

      if (m && m.contents.length) {
        out.w("<li class=\"neirong\">" +
          escapeXml(m.contents[0].content) +
          "</li>");
      }

      out.w("</a></ul>");
    });

    out.w("</div><div class=\"tiaozhuan\">");

    var page = parseInt(data.page),
        nPage = data.nPage;

    out.w("<div class=\"page-yeshu\"><a href=\"/settings/customPushHistory\"><span>首页</span></a><a" +
      attr("href", page === 1 ? "#" : "/settings/customPushHistory?page=" + (page - 1)) +
      "><span>前一页</span></a><strong class=\"at_yeshu\">" +
      escapeXml(page) +
      "</strong><strong>" +
      escapeXml(nPage) +
      "</strong><a" +
      attr("href", page === nPage ? "#" : "/settings/customPushHistory?page=" + (parseInt(page) + 1)) +
      "><span>后一页</span></a><a" +
      attr("href", "/settings/customPushHistory?page=" + nPage) +
      "><span>尾页</span></a></div><div class=\"ystz\"><form action=\"#\"><input id=\"dangqianye\" type=\"number\" class=\"tiaozhuanyeshu\"" +
      attr("value", page) +
      " min=\"1\"" +
      attr("max", nPage) +
      "><span id=\"zongyeshu\"></span></form><span class=\"tiaozhuan-btn\" onclick=\"var page = document.getElementById(&#39;dangqianye&#39;).value; if (page) window.location = &#39;/settings/customPushHistory?page=&#39; + page\">跳转</span></div></div></div></div></div></section><footer class=\"footer\">Copyright © 2016 蒙面股王</footer></div></body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
