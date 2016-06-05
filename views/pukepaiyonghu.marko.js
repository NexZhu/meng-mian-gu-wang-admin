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
    out.w("<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><link rel=\"shortcut icon\" href=\"/images/new.ico\"><link rel=\"stylesheet\" href=\"/styles/reset.css\"><link rel=\"stylesheet\" href=\"/styles/guwang.css\"><script src=\"/js/dependencies/jquery-1.11.0.js\"></script><script src=\"/js/guwang_houtai.js\"></script><title>蒙面股王后台管理系统</title></head><body><div class=\"mengmianguwang\">");

    data.sideBar.render({
        selected: data.selected
      }, out);

    __header.render({
        module: data.module
      }, out);

    out.w("<section class=\"section\"><div class=\"mengliaoguanli\"><div class=\"content\"><div class=\"mengliao\"><div class=\"search pt\"><div class=\"sousuo\"><input type=\"search\" class=\"text\" placeholder=\"输入昵称、关键词等\"><input type=\"submit\" class=\"buttom\" value=\"搜索\" style=\"margin-left: 3px\"></div></div><div class=\"mengliao_info clear\"><div class=\"mengliao_ul\"><ul class=\"mengliao_nav\"><li class=\"guanlian\">昵称</li><li class=\"guanlian\">关联账号昵称</li><li>猛料数量</li><li>粉丝数量</li><li>状态</li><li>操作</li></ul>");

    forEach(data.roles, function(r) {
      out.w("<ul class=\"mengliao_list odd\"><a" +
        attr("href", r.user ? "/user/detail?type=card&id=" + r.user.id : "#") +
        "><li class=\"guanlian\">" +
        escapeXml(r.name) +
        "</li><li class=\"guanlian\">" +
        escapeXml(r.user ? r.user.name : "无") +
        "</li><li>" +
        escapeXml(r.user ? r.user.nMengliao : "无") +
        "</li><li>" +
        escapeXml(r.user ? r.user.nFollowing : "无") +
        "</li><li>" +
        escapeXml(r.user ? "正常" : "未赋予") +
        "</li><li><span><a class=\"xiangqing\"" +
        attr("href", r.user ? "/user/detail?type=card&id=" + r.user.id : "#") +
        ">详情</a></span><span style=\"margin-left: 4px\"><a class=\"publics\" href=\"/user/assign?id=" +
        escapeXmlAttr(r.id) +
        "\">修改</a></span></li></a></ul>");
    });

    out.w("</div><div class=\"tiaozhuan\">");

    var page = parseInt(data.page),
        nPage = data.nPage;

    out.w("<div class=\"page-yeshu\"><a href=\"/user/list?type=card\"><span>首页</span></a><a" +
      attr("href", page === 1 ? "#" : "/user/list?type=card&page=" + (page - 1)) +
      "><span>前一页</span></a><strong class=\"at_yeshu\">" +
      escapeXml(page) +
      "</strong><strong>" +
      escapeXml(nPage) +
      "</strong><a" +
      attr("href", page === nPage ? "#" : "/user/list?type=card&page=" + (parseInt(page) + 1)) +
      "><span>后一页</span></a><a" +
      attr("href", "/user/list?type=card&page=" + nPage) +
      "><span>尾页</span></a></div><div class=\"ystz\"><form action=\"#\"><input id=\"dangqianye\" type=\"number\" class=\"tiaozhuanyeshu\"" +
      attr("value", page) +
      " min=\"1\"" +
      attr("max", nPage) +
      "><span id=\"zongyeshu\"></span></form><span class=\"tiaozhuan-btn\" onclick=\"var page = document.getElementById(&#39;dangqianye&#39;).value; if (page) window.location = &#39;/user/list?type=card&amp;page=&#39; + page\">跳转</span></div></div></div></div></div></div></section><footer class=\"footer\">Copyright © 2016 蒙面股王</footer></div></body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
