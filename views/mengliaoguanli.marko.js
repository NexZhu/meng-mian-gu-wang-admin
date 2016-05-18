function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      forEach = __helpers.f,
      escapeXmlAttr = __helpers.xa;

  return function render(data, out) {
    out.w("<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><link rel=\"stylesheet\" href=\"/styles/reset.css\"> <link rel=\"stylesheet\" href=\"/styles/guwang.css\"> <script src=\"/js/dependencies/sails.io.js\"></script> <script src=\"/js/dependencies/jquery-1.11.0.js\"></script> <title>蒙面股王后台管理系统</title></head><body><div class=\"mengmianguwang\"><div class=\"fixed\"><iframe id=\"iframe\" src=\"/html/top/header.html\" scrolling=\"no\" width=\"100%\" style=\"border:0\" ;></iframe><script>\n\t\t\t\t\t$('#iframe').load(function() {\n\t\t\t\t\t\tvar ul = $('#iframe').contents().find(\"#ul li\");\n\t\t\t\t\t\tul.eq(0).attr(\"class\", \"add\");\n\t\t\t\t\t});\n\t\t\t\t</script><div class=\"xitong\"><h2>蒙面股王后台管理系统--<span id=\"add-text\">内容设置</span></h2></div></div><section class=\"section\"><div class=\"mengliaoguanli\"><div class=\"side-bar\"><div><a href=\"mengliaoguanli.html\" style=\"color:#333;\">猛料管理</a></div><div><a href=\"jubaoguanli.html\">举报管理</a></div></div><div class=\"content\"><div class=\"mengliao\"><div class=\"search\"><div class=\"sousuo\"><input type=\"search\" class=\"text\" placeholder=\"输入昵称、关键词等\"><input type=\"submit\" class=\"buttom\" value=\"搜索\" style=\"margin-left: 5px\"></div></div><div class=\"mengliao_info clear\"><div class=\"mengliao_ul\"><ul class=\"mengliao_nav\"><li>发布者</li><li>发布时间</li><li>点赞数</li><li>评论数</li><li class=\"neirong\">内容概要</li><li>操作</li></ul>");

    forEach(data.mengliaos, function(m) {
      out.w("<ul class=\"mengliao_list\"><a href=\"mengliao_xiangqing.html\"><li>" +
        escapeXml(m.author.name) +
        "</li><li><span>" +
        escapeXml(m.time.toDateString()) +
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

      out.w("<li><span><a href=\"mengliao_xiangqing.html\">详情</a></span>&nbsp; <a href=\"/content/mengliao/delete?id=" +
        escapeXmlAttr(m.id) +
        "\"><span class=\"remove publics\">删除</span></a></li></a></ul>");
    });

    out.w("</div><div class=\"tiaozhuan\"><div class=\"page-yeshu\"><span onclick=\"shouye()\">首页</span><span onclick=\"prev_ye()\">上一页</span><span onclick=\"next_ye()\">下一页</span><span onclick=\"last_ye()\">尾页</span></div><div class=\"ystz\"><form action=\"#\"><input id=\"dangqianye\" type=\"text\" class=\"tiaozhuanyeshu\"><span id=\"zongyeshu\"></span></form><span class=\"tiaozhuan-btn\" onclick=\"go_to()\">跳转</span></div></div></div></div></div></div></section><footer class=\"footer\">Copyright © 2016 蒙面股王</footer></div></body></html><script>\n\n  /*跳转页面*/\n\t\tfunction shouye() {\n\t\t\talert(\"首页\");\n\t\t};\n\t\tfunction prev_ye() {\n\t\t\talert(\"上一页\");\n\t\t};\n\n\t\tfunction next_ye() {\n\t\t\talert(\"下一页\");\n\t\t};\n\t\tfunction last_ye() {\n\t\t\talert(\"最后一页\");\n\t\t};\n\n\t\tfunction go_to() {\n\t\t\talert(\"跳转\");\n\t\t};\n\t</script>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
