function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      loadTemplate = __helpers.l,
      __header = loadTemplate(require.resolve("./header.marko")),
      forEach = __helpers.f,
      escapeXmlAttr = __helpers.xa,
      attr = __helpers.a;

  return function render(data, out) {
    out.w("<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><link rel=\"shortcut icon\" href=\"/images/new.ico\"><link rel=\"stylesheet\" href=\"/styles/reset.css\"> <link rel=\"stylesheet\" href=\"/styles/guwang.css\"> <script src=\"/js/dependencies/jquery-1.11.0.js\"></script> <script src=\"/js/guwang_houtai.js\"></script> <title>蒙面股王后台管理系统</title></head><body><div class=\"mengmianguwang\">");

    data.sideBar.render({
        selected: data.selected
      }, out);

    __header.render({
        module: data.module
      }, out);

    out.w("<section class=\"section\"><div class=\"mengliaoguanli\"><div class=\"content\"><div class=\"mengliao\"><div class=\"handle dz_fanhui\"><ul><li></li><li><a href=\"javascript:history.back(-1)\">返回</a></li></ul></div><div class=\"menglaioxiangqing_info\"><ul class=\"mengliaoxiangqing_nav\"><li>发布者</li><li>发布时间</li><li>点赞数</li><li>评论数</li><li class=\"ml_neirong\">内容概要</li></ul>");

    forEach(data.mengliaos, function(m) {
      out.w("<ul class=\"mengliaoxiangqing_list odd\"><a href=\"/content/mengliao/detail?id=" +
        escapeXmlAttr(m.id) +
        "\"><li>" +
        escapeXml(m.authorRole.name) +
        "</li><li>" +
        escapeXml(m.time.toLocaleString()) +
        "</li><li>" +
        escapeXml(m.nLike) +
        "</li><li>" +
        escapeXml(m.nComment) +
        "</li>");

      if (m.contents.length) {
        out.w("<li class=\"neirong\">" +
          escapeXml(m.contents[0].content) +
          "</li>");
      }

      out.w("</a></ul>");
    });

    out.w("</div><div class=\"tiaozhuan\">");

    var id = data.id,
        page = parseInt(data.page),
        nPage = data.nPage;

    out.w("<div class=\"page-yeshu\"><a href=\"/user/like?id=" +
      escapeXmlAttr(id) +
      "\"><span>首页</span></a><a" +
      attr("href", page === 1 ? "#" : (("/user/like?id=" + id) + "&page=") + (page - 1)) +
      "><span>前一页</span></a><strong class=\"at_yeshu\">" +
      escapeXml(page) +
      "</strong><strong>" +
      escapeXml(nPage) +
      "</strong><a" +
      attr("href", page === nPage ? "#" : (("/user/like?id=" + id) + "&page=") + (parseInt(page) + 1)) +
      "><span>后一页</span></a><a" +
      attr("href", (("/user/like?id=" + id) + "&page=") + nPage) +
      "><span>尾页</span></a></div><div class=\"ystz\"><form action=\"#\"><input id=\"dangqianye\" type=\"number\" class=\"tiaozhuanyeshu\"" +
      attr("value", page) +
      " min=\"1\"" +
      attr("max", nPage) +
      "><span id=\"zongyeshu\"></span></form><span class=\"tiaozhuan-btn\" onclick=\"var page = document.getElementById(&#39;dangqianye&#39;).value; if (page) window.location = &#39;/user/like?id=" +
      escapeXmlAttr(id) +
      "&amp;page=&#39; + page\">跳转</span></div></div></div></div></div></section><footer class=\"footer\">Copyright © 2016 蒙面股王</footer></div></body></html><script>\n\n  /*跳转页面*/\n  function shouye() {\n    alert(\"首页\");\n  }\n  ;\n  function prev_ye() {\n    alert(\"上一页\");\n  }\n  ;\n\n  function next_ye() {\n    alert(\"下一页\");\n  }\n  ;\n  function last_ye() {\n    alert(\"最后一页\");\n  }\n  ;\n\n  function go_to() {\n    alert(\"跳转\");\n  }\n  ;\n</script>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
