function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      loadTemplate = __helpers.l,
      __header = loadTemplate(require.resolve("./header.marko")),
      escapeXmlAttr = __helpers.xa,
      attr = __helpers.a,
      forEach = __helpers.f;

  return function render(data, out) {
    out.w("<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><link rel=\"shortcut icon\" href=\"/images/new.ico\"><link rel=\"stylesheet\" href=\"/styles/reset.css\"><link rel=\"stylesheet\" href=\"/styles/guwang.css\"><script src=\"/js/dependencies/jquery-1.11.0.js\"></script><script src=\"/js/guwang_houtai.js\"></script><title>蒙面股王后台管理系统</title></head><body><div class=\"mengmianguwang\">");

    data.sideBar.render({
        selected: data.selected
      }, out);

    __header.render({
        module: data.module
      }, out);

    out.w("<section class=\"section\"><div class=\"mengliaoguanli\"><div class=\"content\"><div class=\"mengliao\">");

    var r = data.role;

    out.w("<div class=\"handle dz_fanhui\"><ul><li class=\"pinglun\"><a href=\"#\" onclick=\"if (window.assignTo) window.location = &#39;/user/confirmAssign?role=" +
      escapeXmlAttr(r.id) +
      "&amp;user=&#39; + window.assignTo\">确认关联</a></li><li><a href=\"javascript:history.back(-1)\">返回</a></li></ul></div><div class=\"fabuzhe_info xg\"><div class=\"xiugai\"><div class=\"xiugai_nicheng\">昵称:<span>" +
      escapeXml(r.name) +
      "</span></div><div class=\"xiugai_guanlian\">当前关联：<span>" +
      escapeXml(r.user ? r.user.name : "无") +
      "</span></div><div class=\"xinzeng clear\">新增关联：<span id=\"new-assign\">无</span></div></div><div class=\"soso\"><form action=\"/user/assign\"><input name=\"id\" type=\"text\"" +
      attr("value", r.id) +
      " style=\"display: none\"><input name=\"search\" type=\"search\" class=\"sear\"" +
      attr("value", data.search) +
      "><input type=\"submit\" class=\"soso_ok\" value=\"确定\"></form></div><div class=\"soso_nr\"><div class=\"soso_info\"><ul class=\"soso_nav\"><li class=\"nikname\">昵称</li><li>来源</li><li>openid/手机</li><li>unionid</li><li>性别</li><li>地区</li><li>选中</li></ul>");

    forEach(data.users, function(u) {
      out.w("<ul class=\"soso_list odd\"><li class=\"nikname\">" +
        escapeXml(u.name) +
        "</li><li>" +
        escapeXml(u.qq ? "QQ" : u.wechat ? "微信" : "手机") +
        "</li><li>" +
        escapeXml((u.qq || u.wechat) || u.mobile) +
        "</li><li>无</li><li>" +
        escapeXml(u.gender) +
        "</li><li>无</li><li><input type=\"radio\" name=\"radio\" onclick=\"window.assignTo=" +
        escapeXmlAttr(u.id) +
        "; $(&#39;#new-assign&#39;).text(&#39;" +
        escapeXmlAttr(u.name) +
        "&#39;)\"></li></ul>");
    });

    out.w("</div><div class=\"page\">");

    var search = data.search,
        page = parseInt(data.page),
        nPage = data.nPage;

    out.w("<a" +
      attr("href", page === 1 ? "#" : (((("/user/assign?id=" + r.id) + "&search=") + search) + "&page=") + (page - 1)) +
      "><span class=\"publics\">前一页</span></a><a" +
      attr("href", page === nPage ? "#" : (((("/user/assign?id=" + r.id) + "&search=") + search) + "&page=") + (parseInt(page) + 1)) +
      "><span class=\"publics\" style=\"margin-left: 4px\">后一页</span></a></div></div></div></div></div></div></section><footer class=\"footer\">Copyright © 2016 蒙面股王</footer></div></body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
