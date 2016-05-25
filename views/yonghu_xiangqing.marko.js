function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      loadTemplate = __helpers.l,
      __header = loadTemplate(require.resolve("./header.marko")),
      attr = __helpers.a;

  return function render(data, out) {
    out.w("<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><link rel=\"stylesheet\" href=\"/styles/reset.css\"><link rel=\"stylesheet\" href=\"/styles/guwang.css\"><script src=\"/js/dependencies/sails.io.js\"></script><script src=\"/js/dependencies/jquery-1.11.0.js\"></script><title>蒙面股王后台管理系统</title></head><body><div class=\"mengmianguwang\">");

    __header.render({
        title: data.title
      }, out);

    out.w("<section class=\"section\"><div class=\"mengliaoguanli\">");

    data.sideBar.render({
        selected: data.selected
      }, out);

    out.w("<div class=\"content\"><div class=\"mengliao\">");

    var u = data.user;

    out.w("<div class=\"handle\"><span class=\"public\"> <a href=\"javascript:history.back(-1)\">返回</a></span><span class=\"banned pinglun\"><a href=\"javascript:;\">禁言</a></span><span class=\"repeal pinglun\"><a href=\"javascript:;\">撤销关联</a></span></div><div class=\"fabuzhe_info\"><h3>基本信息</h3><div class=\"xian\"></div><div class=\"yonghuxiangqing_info\"><div class=\"head\"><img" +
      attr("src", u.avatar) +
      " alt></div><div class=\"head_info\"><p class=\"names\">昵称：<span>" +
      escapeXml(u.name) +
      "</span></p><p>性别：<span>" +
      escapeXml(u.gender) +
      "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地区：<span>北京</span></p><p>来源：<span>微信</span>&nbsp;&nbsp;状态：<span>正常</span></p><p>opendid：<span>5455454555</span>&nbsp;&nbsp;unionid：<span>125454574</span></p><p>关联扑克牌：<span>无</span></p></div><div class=\"tas clear\"><h3>其他信息</h3><div class=\"xian\"></div><div class=\"rests\"><div class=\"ta\"><span class=\"gz\">TA关注的人</span><span class=\"rs\"><a href=\"putongyonghu_xiangqing_guanzhu.html\">" +
      escapeXml(u.nFollowing) +
      " 〉</a> </span></div><div class=\"ta\"><span class=\"gz\">TA赞过的猛料</span><span class=\"rs\"><a href=\"putongyonghu_xiangqing_mengliao.html\">" +
      escapeXml(u.nLike) +
      " 〉</a> </span></div></div></div></div></div></div></div></div></section><footer class=\"footer\">Copyright © 2016 蒙面股王</footer></div></body></html><script>\n    $(\".banned\").click(function(){\n    \talert(\"禁言\");\n    \t$(this).addClass(\"jinzhe\").text(\"禁言中\");\n    })\n\t$(\".repeal\").click(function(){\n\t\talert(\"撤销禁言\");\n\t\t$(\".banned\").removeClass(\"jinzhe\").text(\"禁言\");\n\t});\n</script>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
