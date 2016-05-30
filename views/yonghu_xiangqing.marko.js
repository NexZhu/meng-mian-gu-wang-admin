function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      loadTemplate = __helpers.l,
      __header = loadTemplate(require.resolve("./header.marko")),
      escapeXmlAttr = __helpers.xa,
      attr = __helpers.a;

  return function render(data, out) {
    out.w("<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><link rel=\"stylesheet\" href=\"/styles/reset.css\"> <link rel=\"stylesheet\" href=\"/styles/guwang.css\"> <script src=\"/js/dependencies/jquery-1.11.0.js\"></script> <title>蒙面股王后台管理系统</title></head><body><div class=\"mengmianguwang\">");

    __header.render({
        module: data.module
      }, out);

    out.w("<section class=\"section\"><div class=\"mengliaoguanli\">");

    data.sideBar.render({
        selected: data.selected
      }, out);

    out.w("<div class=\"content\"><div class=\"mengliao\">");

    var u = data.user;

    out.w("<div class=\"handle\"><span class=\"public\"> <a href=\"javascript:history.back(-1)\">返回</a></span><span class=\"banned pinglun\"><a href=\"/user/restrict?id=" +
      escapeXmlAttr(u.id) +
      "&amp;restricted=" +
      escapeXmlAttr(u.restricted === "0" ? "1" : "0") +
      "\">" +
      escapeXml(u.restricted === "0" ? "解除" : "禁言") +
      "</a></span><span class=\"repeal pinglun\"><a href=\"/user/unassign?id=" +
      escapeXmlAttr(u.id) +
      "\">撤销关联</a></span></div><div class=\"fabuzhe_info\"><h3>基本信息</h3><div class=\"xian\"></div><div class=\"yonghuxiangqing_info\"><div class=\"head\"><img" +
      attr("src", u.avatar) +
      " alt></div><div class=\"head_info\"><p class=\"names\">昵称：<span>" +
      escapeXml(u.name) +
      "</span></p><p>性别：<span>" +
      escapeXml(u.gender) +
      "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地区：<span>无</span></p><p>来源：<span>" +
      escapeXml(u.qq ? "QQ" : u.wechat ? "微信" : "手机") +
      "</span>&nbsp;&nbsp;状态：<span>" +
      escapeXml(u.restricted === "0" ? "禁言" : "正常") +
      "</span></p><p>openid/手机：<span>" +
      escapeXml((u.qq || u.wechat) || u.mobile) +
      "</span>&nbsp;&nbsp;unionid：<span>无</span></p><p>关联扑克牌：<span>" +
      escapeXml(u.role ? u.role.name : "无") +
      "</span></p></div><div class=\"tas clear\"><h3>其他信息</h3><div class=\"xian\"></div><div class=\"rests\"><div class=\"ta\"><span class=\"gz\">TA关注的人</span><span class=\"rs\"><a href=\"putongyonghu_xiangqing_guanzhu.html\">" +
      escapeXml(u.nFollowing) +
      " 〉</a> </span></div><div class=\"ta\"><span class=\"gz\">TA赞过的猛料</span><span class=\"rs\"><a href=\"putongyonghu_xiangqing_mengliao.html\">" +
      escapeXml(u.nLike) +
      " 〉</a> </span></div></div></div></div></div></div></div></div></section><footer class=\"footer\">Copyright © 2016 蒙面股王</footer></div></body></html><script>\n</script>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
