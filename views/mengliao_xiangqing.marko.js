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
    out.w("<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><link rel=\"stylesheet\" href=\"/styles/reset.css\"> <link rel=\"stylesheet\" href=\"/styles/guwang.css\"> <script src=\"/js/dependencies/sails.io.js\"></script> <script src=\"/js/dependencies/jquery-1.11.0.js\"></script> <title>蒙面股王后台管理系统</title></head><body><div class=\"mengmianguwang\">");

    __header.render({
        module: data.module
      }, out);

    out.w("<section class=\"section\"><div class=\"mengliaoguanli\">");

    data.sideBar.render({
        selected: data.selected
      }, out);

    out.w("<div class=\"content\"><div class=\"mengliao\">");

    var m = data.mengliao;

    out.w("<div class=\"handle\"><span class=\"public\"> <a href=\"javascript:history.back(-1)\">返回</a></span><span class=\"pinglun\"><a href=\"pinglun_xiangqing.html\">评论<strong>(" +
      escapeXml(m.nComment) +
      ")</strong></a></span><span class=\"pinglun\"><a href=\"dianzan.html\">点赞<strong>(" +
      escapeXml(m.nLike) +
      ")</strong></a></span><a href=\"/content/mengliao/delete?id=" +
      escapeXmlAttr(m.id) +
      "\"><span class=\"shanchu\">删除</span></a></div><div class=\"fabuzhe_info\"><h3>发布者信息</h3><div class=\"xian\"></div><div class=\"fabuzhe_info  clear\"><div class=\"fabuzhe_name\"><p>昵称：<span>" +
      escapeXml(m.authorRole.name) +
      "</span></p><p>关联账户：<span>" +
      escapeXml(m.author.name) +
      "</span></p></div><div class=\"fabuzhe_fans\"><p>猛料：<span>" +
      escapeXml(m.nMengliao) +
      "</span></p><p>粉丝：<span>" +
      escapeXml(m.nFollower) +
      "</span></p></div><h3>猛料详情</h3><div class=\"xian\"></div><div class=\"time\">发布时间：<span>" +
      escapeXml(m.time.toDateString()) +
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

    out.w("</div><div class=\"friendlink\"><h4>相关链接</h4><a href=\"#\">为什么光头跑步速度更快？</a><a href=\"#\">谁愿意来拯救废墟中的湖人？</a></div></div></div></div></div></div></section><footer class=\"footer\">Copyright © 2016 蒙面股王</footer></div></body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
