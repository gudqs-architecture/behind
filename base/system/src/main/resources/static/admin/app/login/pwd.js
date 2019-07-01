+function () {
    commonDefine(['layer', 'grid', 'form'], 'pwd', {
        init: function ($this, $options) {
            _$this = $this;
            _$options = $options;
            init();
        }
    }, {moduleParent: 'login'});
    var _$this, _$options;

    var init = function () {
        var $ = layui.jquery;

        _$this.find('.pwd-form').on('submit', function () {
            var data = _$this.find('.pwd-form').serializeArray().toModel();
            if (data.rePwd !== data.newPwd) {
                $.tip.error('2次密码不一致');
            }
            request.post({
                url: 'admin/user/updatePwd',
                data: $.extend({
                    loginName: localStorage.getItem("loginName")
                }, data),
                success: function (res) {
                    if (res.success) {
                        $.tip.success('修改成功!');
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        openLoginPage();
                    } else {
                        $.tip.error('密码错误');
                    }
                }
            });
            return false;
        });

    };

}();