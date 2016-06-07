function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      loadTemplate = __helpers.l,
      __header = loadTemplate(require.resolve("./header.marko"));

  return function render(data, out) {
    out.w("<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><link rel=\"shortcut icon\" href=\"/images/new.ico\"><link rel=\"stylesheet\" href=\"/styles/reset.css\"> <link rel=\"stylesheet\" href=\"/styles/guwang.css\"> <script src=\"/js/dependencies/jquery-1.11.0.js\"></script> <script src=\"/js/guwang_houtai.js\"></script> <title>蒙面股王后台管理系统</title></head><body><div class=\"mengmianguwang\">");

    data.sideBar.render({
        selected: data.selected
      }, out);

    __header.render({
        module: data.module
      }, out);

    out.w("<section class=\"section\"><div class=\"mengliaoguanli\"><div class=\"content\"><div class=\"mengliao\"><div class=\"pass pinglun_info\"><div class=\"form\"><form action><div><span>&nbsp;&nbsp;&nbsp;旧密码：</span><input id=\"old\" type=\"text\" class=\"mm\"></div><div><span>&nbsp;&nbsp;&nbsp;新密码：</span><input id=\"new\" type=\"password\" class=\"mm\"></div><div><span>再次输入：</span><input id=\"confirm\" type=\"password\" class=\"mm\"></div><input type=\"button\" value=\"确定修改\" class=\"btn\"></form></div></div></div></div></div></section><footer class=\"footer\">Copyright © 2016 蒙面股王</footer></div></body></html><script>\n  $(\".btn\").click(function () {\n    if ($('#new').val() === '' || $('#new').val() !== $('#confirm').val()) alert(\"请输入两次相同的新密码\")\n    else $.post('/settings/modifyPassword', {\n      old: $('#old').val(),\n      new: $('#new').val()\n    }).done(function(data) {\n      if (data === '0') alert('密码错误')\n      else window.location.href = '/auth/signin'\n    })\n  });\n</script>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
