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

    out.w("<section class=\"section\"><div class=\"mengliaoguanli\"><div class=\"content\"><div class=\"mengliao\"><div class=\"handle\"><ul><li></li><li><a href=\"/settings/customPush\">自定义推送</a></li><li><a href=\"/settings/customPushHistory\">查看自定义推送历史</a></li><li><a href=\"javascript:history.back(-1)\">返回</a></li></ul></div><div class=\"jy\"><form action><span>禁言消息提醒</span><input id=\"restrict-message\" type=\"text\" class=\"texts\"><input id=\"modify-btn\" type=\"button\" value=\"提交\" class=\"tijiao\"></form></div></div></div></div></section><footer class=\"footer\">Copyright © 2016 蒙面股王</footer></div><script>\n  $('#modify-btn').click(function() {\n    if ($('#restrict-message').val() === '') alert(\"禁言消息不能为空\")\n    else $.post('/settings/modifyRestrictMessage', {\n      message: $('#restrict-message').val()\n    }).done(function(data) {\n      if (data === '0') alert('修改失败')\n      else alert('修改成功')\n    })\n  })\n</script></body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
