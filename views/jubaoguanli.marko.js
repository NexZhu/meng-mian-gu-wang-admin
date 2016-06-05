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
    out.w("<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><link rel=\"shortcut icon\" href=\"/images/new.ico\"><link rel=\"stylesheet\" href=\"/styles/reset.css\"><link rel=\"stylesheet\" href=\"/styles/guwang.css\"><script src=\"/js/dependencies/jquery-1.11.0.js\"></script><script src=\"/js/guwang_houtai.js\"></script><title>蒙面股王后台管理系统</title></head><body><div class=\"mengmianguwang\">");

    data.sideBar.render({
        selected: data.selected
      }, out);

    __header.render({
        module: data.module
      }, out);

    out.w("<section class=\"section\"><div class=\"mengliaoguanli\"><div class=\"content\"><div class=\"mengliao jb\"><div class=\"mengliao_info clear\"><div class=\"mengliao_ul\"><ul class=\"mengliao_nav\"><li>举报者</li><li class=\"jubao\">举报原因</li><li>被举报者</li><li class=\"jubao\">举报内容</li><li>举报时间</li><li>操作</li></ul>");

    forEach(data.jubaos, function(j) {
      out.w("<ul class=\"mengliao_list odd\"><li>" +
        escapeXml(j.reporter.name) +
        "</li><li class=\"jubao\">" +
        escapeXml(j.content) +
        "</li><li>" +
        escapeXml(j.reported.name) +
        "</li><li class=\"jubao\">TODO</li><li><span>" +
        escapeXml(j.time.toLocaleString()) +
        "</span></li><li><span class=\"lose publics\">忽略举报</span><a href=\"/content/jubao/delete?id=" +
        escapeXmlAttr(j.id) +
        "\" style=\"margin-left: 4px\"><span class=\"remove publics\">删除内容</span></a></li></ul>");
    });

    out.w("</div><div class=\"tiaozhuan\">");

    var page = parseInt(data.page),
        nPage = data.nPage;

    out.w("<div class=\"page-yeshu\"><a href=\"/content/jubao/list\"><span>首页</span></a><a" +
      attr("href", page === 1 ? "#" : "/content/jubao/list?page=" + (page - 1)) +
      "><span>前一页</span></a><strong class=\"at_yeshu\">" +
      escapeXml(page) +
      "</strong><strong>" +
      escapeXml(nPage) +
      "</strong><a" +
      attr("href", page === nPage ? "#" : "/content/jubao/list?page=" + (parseInt(page) + 1)) +
      "><span>后一页</span></a><a" +
      attr("href", "/content/jubao/list?page=" + nPage) +
      "><span>尾页</span></a></div><div class=\"ystz\"><form action=\"#\"><input id=\"dangqianye\" type=\"number\" class=\"tiaozhuanyeshu\"" +
      attr("value", page) +
      " min=\"1\"" +
      attr("max", nPage) +
      "><span id=\"zongyeshu\"></span></form><span class=\"tiaozhuan-btn\" onclick=\"var page = document.getElementById(&#39;dangqianye&#39;).value; if (page) window.location = &#39;/content/jubao/list?&amp;page=&#39; + page\">跳转</span></div></div></div></div></div></div></section><footer class=\"footer\">Copyright © 2016 蒙面股王</footer></div></body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
