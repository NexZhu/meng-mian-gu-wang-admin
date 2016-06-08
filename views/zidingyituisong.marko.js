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

    out.w("<section class=\"section\"><div class=\"mengliaoguanli\"><div class=\"content\"><div class=\"mengliao\"><div class=\"handle dz_fanhui\"><ul><li class=\"pinglun\"><a href=\"#\" onclick=\"if (window.toPush) push(window.toPush)\">确认推送</a></li><li><a href=\"javascript:history.back(-1)\">返回</a></li></ul></div><div class=\"jy\"><form action=\"/settings/customPush\"><input name=\"search\" type=\"text\" placeholder=\"  输入昵称、关键词搜索猛料\" class=\"texts\"><input type=\"submit\" value=\"搜索\" class=\"tijiao\"></form><div class=\"mengliao_info clear tuisong_sousuo\"><div class=\"mengliao_ul bor\"><ul class=\"mengliao_nav\"><li>发布者</li><li>发布时间</li><li>点赞数</li><li>评论数</li><li class=\"neirong\">内容概要</li><li>选中</li></ul>");

    forEach(data.mengliaos, function(m) {
      out.w("<ul class=\"mengliao_list odd\"><li>" +
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

      out.w("<li><input type=\"radio\" name=\"xz\" onclick=\"window.toPush=" +
        escapeXmlAttr(m.id) +
        "\"></li></ul>");
    });

    out.w("</div><div class=\"tiaozhuan\"><div class=\"page-yeshu\">");

    var search = data.search,
        page = parseInt(data.page),
        nPage = data.nPage;

    out.w("<a" +
      attr("href", page === 1 ? "#" : (("/settings/customPush?search=" + search) + "&page=") + (page - 1)) +
      "><span>前一页</span></a><a" +
      attr("href", page === nPage ? "#" : (("/settings/customPush?search=" + search) + "&page=") + (parseInt(page) + 1)) +
      "><span>后一页</span></a></div></div></div></div></div></div></div></section><footer class=\"footer\">Copyright © 2016 蒙面股王</footer></div><script>\n  function push(id) {\n    $.get('/settings/confirmCustomPush?id=' + id)\n      .done(function (data) {\n        if (data === '1') alert('推送成功')\n      })\n  }\n</script></body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
