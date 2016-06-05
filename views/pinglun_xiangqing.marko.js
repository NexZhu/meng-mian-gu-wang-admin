function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      loadTemplate = __helpers.l,
      __header = loadTemplate(require.resolve("./header.marko")),
      forEach = __helpers.f,
      attr = __helpers.a,
      escapeXmlAttr = __helpers.xa;

  return function render(data, out) {
    out.w("<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><link rel=\"shortcut icon\" href=\"/images/new.ico\"><link rel=\"stylesheet\" href=\"/styles/reset.css\"> <link rel=\"stylesheet\" href=\"/styles/guwang.css\"> <script src=\"/js/dependencies/jquery-1.11.0.js\"></script> <script src=\"/js/guwang_houtai.js\"></script> <title>蒙面股王后台管理系统</title></head><body><div class=\"mengmianguwang\">");

    data.sideBar.render({
        selected: data.selected
      }, out);

    __header.render({
        module: data.module
      }, out);

    out.w("<section class=\"section\"><div class=\"mengliaoguanli\"><div class=\"content\"><div class=\"mengliao\"><div class=\"handle dz_fanhui\"><ul><li class=\"pinglun\"><a href=\"#\">发表评论</a></li><li><a href=\"javascript:history.back(-1)\">返回</a></li></ul></div><div class=\"pinglun_info\"><h4>评论列表<span>(" +
      escapeXml(data.nComment) +
      ")</span></h4><div class=\"pl_xian\"></div><div class=\"pinglun_neirong\">");

    forEach(data.comments, function(c) {
      out.w("<div class=\"pinglun_list\"><div class=\"pinglun_right\">" +
        escapeXml(c.time.toLocaleString()) +
        "</div><div class=\"pinglun_left\"><img" +
        attr("src", c.author.avatar) +
        " alt><span class=\"name\">" +
        escapeXml(c.author.name) +
        "</span></div><a href=\"/content/comment/delete?id=" +
        escapeXmlAttr(c.id) +
        "\"><p class=\"remove clear sc\">删除</p></a><p class=\"pinglun_nr clear\">" +
        escapeXml(c.content) +
        "</p></div>");
    });

    out.w("</div><div class=\"tiaozhuan\">");

    var id = data.id,
        page = parseInt(data.page),
        nPage = data.nPage;

    out.w("<div class=\"page-yeshu\"><a href=\"/content/comment/list?id=" +
      escapeXmlAttr(id) +
      "\"><span>首页</span></a><a" +
      attr("href", page === 1 ? "#" : (("/content/comment/list?id=" + id) + "&page=") + (page - 1)) +
      "><span>前一页</span></a><strong class=\"at_yeshu\">" +
      escapeXml(page) +
      "</strong><strong>" +
      escapeXml(nPage) +
      "</strong><a" +
      attr("href", page === nPage ? "#" : (("/content/comment/list?id=" + id) + "&page=") + (parseInt(page) + 1)) +
      "><span>后一页</span></a><a" +
      attr("href", (("/content/comment/list?id=" + id) + "&page=") + nPage) +
      "><span>尾页</span></a></div><div class=\"ystz\"><form action=\"#\"><input id=\"dangqianye\" type=\"number\" class=\"tiaozhuanyeshu\"" +
      attr("value", page) +
      " min=\"1\"" +
      attr("max", nPage) +
      "><span id=\"zongyeshu\"></span></form><span class=\"tiaozhuan-btn\" onclick=\"var page = document.getElementById(&#39;dangqianye&#39;).value; if (page) window.location = &#39;/content/comment/list?id=" +
      escapeXmlAttr(id) +
      "&amp;page=&#39; + page\">跳转</span></div></div></div></div></div></div></section><footer class=\"footer\">Copyright © 2016 蒙面股王</footer></div></body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
