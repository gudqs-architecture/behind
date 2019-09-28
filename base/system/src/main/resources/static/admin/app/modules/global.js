/**
 * 仅计算一次的 及常用的 东西放这里
 */
layui.define(['webConfig', 'common', 'tab'], function (exports) {

    var $ = layui.$, layer = layui.layer, config = layui.webConfig, common = layui.common, myTab = layui.tab;

    var requestUrlPrefix = config.requestUrlPrefix;
    var qiNiuUrlPrefix = config.qiNiuUrlPrefix;

    /**
     * 处理请求出错时
     */
    var error = function (err) {
        console.log('request error :: ' + err);
        if (err && err.responseJSON) {
            $.tip.error(err.responseJSON.result);
        } else {
            $.tip.error('request error')
        }
    };

    /**
     * 为请求添加token和时间戳, 处理请求 url
     */
    var getOption = function (options) {
        if (options) {
            var oldUrl = options.url;
            if (oldUrl) {
                var timestamps = new Date().getTime();
                var addition = ((oldUrl.indexOf('?') === -1) ? '?t=' + timestamps : '&t=' + timestamps);
                var url = requestUrlPrefix + oldUrl + addition;
                options = $.extend(options, {url: url});
            }
            var $csrfMetas = $('.__msmds__csrf');
            if ($csrfMetas && $csrfMetas.length > 0) {
                var csrfToken = $csrfMetas [$csrfMetas.length - 1].dataset['token'];
                if (csrfToken) {
                    options.headers = $.extend({}, options.headers, {csrfToken: csrfToken});
                }
            }
            var token = localStorage.getItem("token");
            var tokenTime = localStorage.getItem("__token_time");
            if (!options.ignoreToken) {
                if (token && token !== '' && tokenTime && (parseInt(tokenTime) + (1000 * 60 * 60 * 24 * 30)) >= new Date().getTime()) {
                    options.headers = {
                        "Authorization": localStorage.getItem("token")
                    };
                } else {
                    $.tip.error('登录超时, 请重新登录');
                    openLoginPage();
                    return false;
                }
            }
            if (options.callback) {
                options.success = function (res) {
                    $.loaded();
                    if (res.success) {
                        var status = options.callback(res.data);
                        if (status && status !== '') {
                            $.tip.success(res.result);
                        }
                    } else {
                        $.tip.error(res.errDesc);
                    }
                };
            } else {
                var success = options.success;
                options.success = function (res) {
                    $.loaded();
                    success(res);
                };
            }
        }
        return options;
    };

    var request = {};

    function initRequest() {
        /**
         * 封装ajax请求
         */
        request.ajax = function (options) {
            var commonOption = getOption(options);
            if (commonOption) {
                var opt = $.extend({}, {
                    dataType: 'json',
                    error: error
                }, commonOption);
                $.loading();
                $.ajax(opt);
            }
        };
        request.get = function (options) {
            request.ajax(
                $.extend({}, options, {
                    type: 'get'
                })
            );
        };
        request.post = function (options) {
            request.ajax(
                $.extend({
                    contentType: 'application/x-www-form-urlencoded'
                }, options, {
                    type: 'post'
                })
            );
        };
    }

    /**
     * 加载用户权限数据
     */
    var loadAuth = function () {
        var authMap = {};
        request.post({
            url: 'admin/auth/findAll',
            async: false,
            success: function (res) {
                if (res.success) {
                    authMap = common.dataGroup(res.data, 'sysMenuId', 'code');
                }
            }
        });
        return authMap;
    };

    /**
     * 处理所有添加了 data-auth 属性的元素
     */
    var authRefresh = function () {
        var $body = $('.layui-body .body-item.active');
        var menuId = $body.data('id');
        if (!menuId) {
            $body.find('[data-auth]').remove();
        }
        var authData = window.authData;
        $body.find('[data-auth]').each(function () {
            var $item = $(this);
            var code = $item.data('auth');
            if (!authData.hasOwnProperty(menuId) || !authData[menuId].hasOwnProperty(code)) {
                $item.remove();
            }
        });
    };

    function initModal() {
        /**
         * 封装提示模态框, success 和 error
         */
        $.tip = {
            success: function (msg, time) {
                layer.msg(msg, {icon: 1, time: time || 1300});
            },
            error: function (msg, time) {
                layer.msg(msg, {icon: 2, time: time || 2000});
            },
            msg: function (msg, options) {
                layer.msg(msg, $.extend({}, {icon: 1, time: 1300}, options));
            }
        };

        /**
         * 封装 询问框
         * @param options
         * @param ok
         * @param cancel
         */
        $.confirm = function (options, ok, cancel) {
            options = options || {};
            options.confirmBtn = options.confirmBtn || '确定';
            options.cancelBtn = options.cancelBtn || '取消';

            layer.open({
                content: options.title,
                btn: [options.confirmBtn, options.cancelBtn],
                yes: function (index) {
                    if (ok) {
                        ok();
                    }
                    layer.close(index);
                },
                btn2: function () {
                    if (cancel) {
                        cancel();
                    }
                },
                cancel: function () {
                    if (cancel) {
                        cancel();
                    }
                }
            });
        };

        /**
         * 封装 通用模态框
         */
        $.modal = function (options) {
            options = options || {};
            options.confirmBtn = options.confirmBtn || '确定';
            options.cancelBtn = options.cancelBtn || '取消';
            options.height = options.height || 500;
            options.width = options.width || 500;
            options.open = options.open || function () {
            };

            if (options.shade !== 0) {
                if (!options.shade) {
                    options.shade = 0.3;
                }
            }

            options.btns = options.btns || {fn: {}};
            var btnArray = [options.confirmBtn, options.cancelBtn];
            if (options.btns.text) {
                btnArray = btnArray.concat(options.btns.text);
            }
            var ok = options.ok || function () {
            };

            var cancel = options.cancel || function () {
            };

            layer.open($.extend({
                title: options.title,
                btn: btnArray,
                type: 1,
                zIndex: 19999,
                area: [options.width + 'px', options.height + 'px'],
                shadeClose: true,
                shade: options.shade,
                content: options.content,
                success: function (layerEle, index) {
                    options.open(layerEle, function () {
                        layer.close(index);
                    });
                    if ($.fn.select2) {
                        layerEle.find('select[data-use-select2]').css('width', '100%').css('padding-top', '5px').select2();
                    }
                    layerEle.find('[data-ok]').on('keydown', function (e) {
                        if (e.keyCode === 13) {
                            ok(layerEle, function () {
                                layer.close(index);
                            })
                        }
                    });

                    function dealMoneyTip() {
                        var value = $(this).val();
                        var tip = common.getValueTip(value);
                        if (tip) {
                            var prev = $(this).parents('.layui-form-item').prev('.money-tip');
                            if (prev.length === 0) {
                                $(this).parents('.layui-form-item').before('<span class="money-tip">' + tip + '</span>');
                            } else {
                                prev.text(tip);
                            }
                        }
                    }

                    layerEle.find('input[data-money]').each(function (item) {
                        dealMoneyTip.call(this);
                    });

                    layerEle.find('input[data-money]').on('input', function () {
                        dealMoneyTip.call(this);
                    });
                    layerEle.find('input[data-money]').on('change', function () {
                        dealMoneyTip.call(this);
                    });
                },
                yes: function (index, ele) {
                    if (ok) {
                        ok(ele, function () {
                            layer.close(index);
                        });
                    }
                },
                btn2: function () {
                    if (cancel) {
                        cancel();
                    }
                },
                cancel: function () {
                    if (cancel) {
                        cancel();
                    }
                }
            }, options.btns.fn));
        };

        /**
         * 加载框
         */
        var loadIndex = -1;
        $.loading = function (msg) {
            loadIndex = layer.msg(msg || '加载中', {
                icon: 16,
                shade: 0.1,
                time: 0
            });
        };
        $.loaded = function () {
            layer.close(loadIndex);
        };
    }

    function initUtil() {
        /**
         * 将对象数组转成 json 对象格式
         */
        Array.prototype.toModel = function () {
            var obj = {};
            for (var i = 0; i < this.length; i++) {
                var item = this[i];
                if (item && item.name && item.value) {
                    obj[item.name] = item.value;
                }
            }
            return obj;
        };

        /**
         * 添加日期格式化支持
         */
        Date.prototype.format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1,                 //月份
                "d+": this.getDate(),                    //日
                "h+": this.getHours(),                   //小时
                "m+": this.getMinutes(),                 //分
                "s+": this.getSeconds(),                 //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds()             //毫秒
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        };
    }

    function initStorage() {
        return {
            get: function (key) {
                var v = localStorage.getItem(key);
                try {
                    v = JSON.parse(v)
                } catch (e) {
                }
                return v;
            },
            set: function (key, value) {
                var v = value;
                if (typeof value === 'object') {
                    v = JSON.stringify(value);
                }
                localStorage.setItem(key, v);
            },
            remove: function (key) {
                localStorage.removeItem(key);
            }
        };
    }

    var initJQueryPlugin = function () {
        /**
         * 封装加载文本资源
         */
        $.loadTemplate = function (options) {
            var html = '';
            var url = options.url;
            if (options.url && options.url.length > 0 && options.url.substr(0, 1) !== '/') {
                url = config.appDir + options.url;
            }
            if (url.indexOf('.') === -1) {
                url = url + '.html';
            }
            $.ajax({
                url: url,
                method: 'get',
                async: false,
                success: function (res) {
                    html = res;
                    if (options.data) {
                        $.each(options.data, function (k, v) {
                            if (v || v === 0) {
                                html = html.replace(eval('/{{' + k + '}}/gm'), v);
                            }
                        });
                    }
                    html = html.replace(/{{.*}}/gm, '');
                }
            });
            return html;
        };
        $.loadModuleHTML = function (url) {
            if (!url) {
                return null;
            }
            if (url.indexOf('/') === -1) {
                url = url + '/' + url;
            }
            if (url.indexOf('.html') === -1) {
                url = url + '.html';
            }
            return $.loadTemplate({
                url: url
            });
        };
        $.loadEditHTML = function (url, data) {
            if (!url) {
                return null;
            }
            if (url.indexOf('/') === -1) {
                url = url + '/' + 'edit';
            }
            if (url.indexOf('.html') === -1) {
                url = url + '.html';
            }
            return $.loadTemplate({
                url: url,
                data: data
            });
        };

        $.fn.upload = function (options) {
            if (!layui.upload) {
                $.tip.error('未加载模块 upload');
            }
            var self = this;
            var upload = layui.upload;
            var url = requestUrlPrefix + (options.url || 'admin/upload/upload');
            options.preview = options.preview || '';
            var uploadOption = {
                elem: self.selector || '',
                url: url,
                field: "file",
                headers: {
                    "Authorization": localStorage.getItem("token")
                },
                accept: 'images',
                exts: 'jpg|png|gif|bmp|jpeg',
                /**
                 * 限制最大 7M (1024 * 7 Kb)
                 */
                size: 7168,
                before: function (obj) {
                    obj.preview(function (index, file, result) {
                        if (options.preview) {
                            $(options.preview).attr('src', result);
                        }
                    });
                },
                done: function (res) {
                    if (options.done) {
                        var continueRun = options.done(res, qiNiuUrlPrefix);
                        if (!continueRun) {
                            return false;
                        }
                    }
                    if (!res.success) {
                        return $.tip.error('上传失败');
                    }
                    if (options.tip) {
                        $(options.tip).html('上传成功');
                        $(options.preview).attr('src', qiNiuUrlPrefix + res.data);
                    }
                    if (options.success) {
                        options.success(res, qiNiuUrlPrefix);
                    }
                },
                error: function () {
                    if (options.tip) {
                        $(options.tip).html('上传失败, 请重试');
                    }
                    if (options.error) {
                        options.error();
                    }
                }
            };
            uploadOption = $.extend({}, uploadOption, options.options);
            return upload.render(uploadOption);
        }
    };

    var init = function () {

        initUtil();


        /**
         * 打开一个模块
         */
        var opened = false;
        var openPage = function (opt) {
            var id = window.menuMap[opt.url].sysMenuId;
            opt.sysMenuId = opt.sysMenuId || id;
            if (opened) {
                return false;
            }
            opened = true;
            if (!opt.noLogin) {
                if (!localStorage.getItem('token') || localStorage.getItem('token') === '') {
                    $.tip.error('请先登录');
                    setTimeout(function () {
                        openLoginPage();
                    }, 200);
                    return false;
                }
            }

            var url = opt.url || '', options = $.extend({}, opt, opt.options);
            var type = opt.type || 0;

            $('.layui-this .menu-url-item').parent().removeClass('layui-this');
            $('.menu-url-item[data-url="' + url + '"]').parent().addClass('layui-this');

            if (type === 0 || type === 1) {
                var urlId = url.replace(/\//gm, '!');
                urlId += opt.id || '';
                var menuId = opt.sysMenuId || 0;
                var $body = $('.layui-body');
                if ($body.find('div[data-url="' + urlId + '"]').length > 0) {
                    if (opt.close) {
                        $body.find('.body-item.active').remove();
                    }
                    myTab.showTab(urlId, url);
                    opened = false;
                } else {
                    $.loading();
                    window.addEventListener('error', function (e) {
                        console.log("load error: ", e);
                        var fail = "<div class='page-load-fail'> 加载失败, 稍后再试</div>";
                        var _$view = $('<div data-id="' + menuId + '" data-url="' + urlId + '" class="body-item active">' + fail + '</div>');
                        $body.find('.body-item').removeClass('active');
                        $body.append(_$view);
                        $.loaded();
                        opened = false;
                    });
                    setTimeout(function () {
                        myTab.addTab(urlId, url);
                        if (type === 0) {
                            var resourceUrl = url + ".js?v=" + window.__version;
                            layui.use(resourceUrl, function (page) {
                                var $view = $('<div data-id="' + menuId + '" data-url="' + urlId + '" class="body-item active">' + page.view() + '</div>');
                                $body.find('.body-item').removeClass('active');
                                $body.append($view);
                                page.init($view, options);
                                authRefresh();
                                $.loaded();
                                opened = false;
                            });
                        } else {
                            var iframe = "<iframe frameborder='0' width='100%' height='" + (window.moduleHeight - 3) + "' src='" + url + "' />";
                            var $view = $('<div data-id="' + menuId + '" data-url="' + urlId + '" class="body-item active">' + iframe + '</div>');
                            $body.find('.body-item').removeClass('active');
                            $body.append($view);
                            $.loaded();
                            opened = false;
                        }
                    }, 200);
                }
            } else if (type === 3 || type === 2) {
                window.open(url, url);
            }

        };

        initRequest();
        initModal();

        initJQueryPlugin();


        window.openPage = openPage;
        window.openLoginPage = function () {
            openPage({url: 'login/login', noLogin: true});
        };
        window.request = request;
        /**
         * 封装 localStorage
         */
        window.storage = initStorage();
        /**
         * 模块区域总高度 = 窗口总高度 - (导航栏 + tab 栏高度)
         */
        window.moduleHeight = window.top.innerHeight - 110;
        window.requestUrlPrefix = requestUrlPrefix;
        window.webConfig = config;
        window.$ = $;
        window.authData = loadAuth();
        window.authRefresh = authRefresh;
        /**
         * 为加载 js 文件时添加 本地version, 作用类似时间戳
         */
        var version = storage.get('__version__');
        if (!version) {
            version = 1000;
        }
        window.__version = version;
        if (typeof window.__version === 'object' || !window.__version) {
            window.__version = 1000;
        }

        /**
         * 通用架构
         * @param requireArray 依赖模块
         * @param moduleName 模块名称, 如菜单 url 为 user/user 可缩写为 user, 如还有前缀, 可通过 options 配置如 activity/one/one 则 moduleName 为 one, options 为: {modulePrefix: 'activity'}
         * @param exportObj 返回模块对象
         * @param options 其他配置 如 modulePrefix 指定 模块路径前缀, callback 用于最后加载一些资源
         */
        window.commonDefine = function (requireArray, moduleName, exportObj, options) {
            options = options || {};
            var modulePrefix = options.modulePrefix || '';
            var moduleParent = options.moduleParent || moduleName;
            var moduleUrl = modulePrefix + moduleParent + '/' + moduleName;
            var moduleHtmlUrl = moduleUrl + '.html';
            var moduleCssUrl = moduleUrl + '.css';
            layui.define(requireArray || [], function (exports) {
                var moduleObject = {
                    view: function () {
                        return $.loadTemplate({url: moduleHtmlUrl});
                    }
                };
                moduleObject = $.extend({}, moduleObject, exportObj);
                exports(moduleUrl + '.js?v=' + window.__version, moduleObject);
            }).link(moduleCssUrl);
            options.callback && options.callback();
        };
        window.commonRequireArray = ['grid', 'form'];
    };

    exports('global', {
        init: function () {
            init()
        }
    })

});