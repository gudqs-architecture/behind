+function () {
    var _$this, _$options;
    commonDefine(['layer', 'grid', 'form'], 'login', {
        init: function ($this, $options) {
            _$this = $this;
            _$options = $options;
            init();
        }
    });

    var init = function () {
        var $ = layui.jquery;

        _$this.find('.login-form').on('submit', function () {
            request.post({
                ignoreToken: true,
                url: 'admin/user/login',
                data: _$this.find('.login-form').serializeArray().toModel(),
                success: function (res) {
                    if (res.success) {
                        storage.set('token', res.other);
                        storage.set('user', res.data);
                        storage.set('loginName', res.data.loginName);
                        storage.set('__token_time', new Date().getTime());
                        $('.admin-nick-name').text(res.data.nickName);
                        $('.admin-avatar').attr('src', res.data.avatarUrl);
                        $.tip.success('登录成功!');
                        window.location.reload();
                    } else {
                        $.tip.error('登录失败, 用户名或密码错误');
                    }
                }
            });
            return false;
        });

    };
}();