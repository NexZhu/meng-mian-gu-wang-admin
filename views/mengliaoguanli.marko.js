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

    out.w("<section class=\"section\"><div class=\"mengliaoguanli\"><div class=\"mengliao\"><div class=\"search\"><div class=\"sousuo\"><form action=\"/content/mengliao/list\"><input name=\"search\" type=\"search\"" +
      attr("value", data.search) +
      " class=\"text\" placeholder=\"输入昵称、关键词等\"><input type=\"submit\" class=\"buttom\" value=\"搜索\" style=\"margin-left: 3px\"></form></div></div><div class=\"mengliao_info clear\"><div class=\"mengliao_ul\"><ul class=\"mengliao_nav\"><li>发布者</li><li>发布时间</li><li>点赞数</li><li>评论数</li><li class=\"neirong\">内容概要</li><li>操作</li></ul>");

    forEach(data.mengliaos, function(m) {
      out.w("<ul class=\"mengliao_list odd\"><a href=\"/content/mengliao/detail?id=" +
        escapeXmlAttr(m.id) +
        "\"><li>" +
        escapeXml(m.authorRole.name) +
        "</li><li><span>" +
        escapeXml(m.time.toLocaleString()) +
        "</span></li><li>" +
        escapeXml(m.nLike) +
        "</li><li>" +
        escapeXml(m.nComment) +
        "</li>");

      if (m.contents.length) {
        out.w("<li class=\"neirong\">" +
          escapeXml(m.contents[0].content) +
          "</li>");
      }

      out.w("<li><span><a class=\"xiangqing\" href=\"/content/mengliao/detail?id=" +
        escapeXmlAttr(m.id) +
        "\">详情</a></span><a href=\"/content/mengliao/delete?id=" +
        escapeXmlAttr(m.id) +
        "\"><span class=\"remove publics\" style=\"margin-left: 4px\">删除</span></a></li></a></ul>");
    });

    out.w("</div><div class=\"tiaozhuan\">");

    var search = data.search,
        page = parseInt(data.page),
        nPage = data.nPage;

    out.w("<div class=\"page-yeshu\"><a href=\"/content/mengliao/list?search=" +
      escapeXmlAttr(search) +
      "\"><span>首页</span></a><a" +
      attr("href", page === 1 ? "#" : (("/content/mengliao/list?search=" + search) + "&page=") + (page - 1)) +
      "><span>前一页</span></a><strong class=\"at_yeshu\">" +
      escapeXml(page) +
      "</strong><strong>" +
      escapeXml(nPage) +
      "</strong><a" +
      attr("href", page === nPage ? "#" : (("/content/mengliao/list?search=" + search) + "&page=") + (parseInt(page) + 1)) +
      "><span>后一页</span></a><a" +
      attr("href", (("/content/mengliao/list?search=" + search) + "&page=") + nPage) +
      "><span>尾页</span></a></div><div class=\"ystz\"><form action=\"#\"><input id=\"dangqianye\" type=\"number\" class=\"tiaozhuanyeshu\"" +
      attr("value", page) +
      " min=\"1\"" +
      attr("max", nPage) +
      "><span id=\"zongyeshu\"></span></form><span class=\"tiaozhuan-btn\" onclick=\"var page = document.getElementById(&#39;dangqianye&#39;).value; if (page) window.location = &#39;/content/mengliao/list?search=" +
      escapeXmlAttr(search) +
      "&amp;page=&#39; + page\">跳转</span></div></div></div></div></div></section><footer class=\"footer\">Copyright © 2016 蒙面股王</footer></div></body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
