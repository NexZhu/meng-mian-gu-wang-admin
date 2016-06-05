function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      loadTemplate = __helpers.l,
      __header = loadTemplate(require.resolve("./header.marko")),
      escapeXmlAttr = __helpers.xa,
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

    out.w("<section class=\"section\"><div class=\"mengliaoguanli\"><div class=\"content\"><div class=\"mengliao\">");

    var m = data.mengliao;

    out.w("<div class=\"handle\"><ul><li><a href=\"/content/comment/list?id=" +
      escapeXmlAttr(m.id) +
      "\">评论<strong>(" +
      escapeXml(m.nComment) +
      ")</strong></a></li><li><a href=\"/content/like/list?id=" +
      escapeXmlAttr(m.id) +
      "\">点赞<strong>(" +
      escapeXml(m.nLike) +
      ")</strong></a></li><li class=\"shanchu\"><a href=\"/content/mengliao/delete?id=" +
      escapeXmlAttr(m.id) +
      "\">删除</a></li><li><a href=\"javascript:history.back(-1)\">返回</a></li></ul></div><div class=\"fabuzhe_info\"><div class=\"fabu_left\"><h3>发布者信息</h3><div class=\"xian\"></div><div class=\"fabuzhe_info  clear\"><div class=\"fabuzhe_name\"><p>昵称：<span>" +
      escapeXml(m.authorRole.name) +
      "</span></p><p>关联账户：<span>" +
      escapeXml(m.author.name) +
      "</span></p></div><div class=\"fabuzhe_fans\"><p>猛料：<span>" +
      escapeXml(m.nMengliao) +
      "</span></p><p>粉丝：<span>" +
      escapeXml(m.nFollower) +
      "</span></p></div><div class=\"xian\"></div><h3>猛料详情</h3><div class=\"xian\"></div><div class=\"time\">发布时间：<span>" +
      escapeXml(m.time.toLocaleString()) +
      "</span></div><div class=\"mengliaoxiangqing_info\">");

    forEach(m.contents, function(c) {
      if (c.type === "1") {
        out.w("<span><img" +
          attr("src", c.content) +
          " alt></span>");
      } else {
        out.w("<p>" +
          escapeXml(c.content) +
          "</p>");
      }
    });

    out.w("</div></div></div><div class=\"friendlink\"><h4>相关链接</h4>");

    forEach(m.relatedLinks, function(r) {
      out.w("<a" +
        attr("href", r.url) +
        ">" +
        escapeXml(r.title) +
        "</a>");
    });

    out.w("</div></div></div></div></div></section><footer class=\"footer\">Copyright © 2016 蒙面股王</footer></div></body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
