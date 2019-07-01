layui.define(['webConfig', 'common'], function (exports) {

    var $ = layui.$, layer = layui.layer, config = layui.webConfig, common = layui.common;

    var requestUrlPrefix = config.requestUrlPrefix;

    var $tab = null;
    var $body = $('.layui-body');
    var $bodyWrapper = $('.layui-body-wrapper');

    var getTabLi = function (urlId, title) {
        return '<li class="tab-item un-select active" data-url="' + urlId + '">' + title + '</li>';
    };

    var getTabSeparator = function (urlId, title) {
        return "<li class='tab-separator'></li>";
    };

    var showTab = function (urlId) {
        $body.find('.body-item').removeClass('active');
        $body.find('.body-item[data-url="' + urlId + '"]').addClass('active');
        $tab.find('.tab-item').removeClass('active');
        $tab.find('.tab-item[data-url="' + urlId + '"]').addClass('active');
        $('.layui-this .menu-url-item').parent().removeClass('layui-this');
        var url = urlId.replace(/!/gm, '/');
        $('.menu-url-item[data-url="' + url + '"]').parent().addClass('layui-this');
    };

    var bindEvent = function () {
        $tab.find('.tab-item').unbind('click');
        $tab.find('.tab-item').unbind('dblclick');
        $tab.find('.tab-item').on('click', function () {
            var urlId = $(this).data('url');
            showTab(urlId);
        });
        $tab.find('.tab-item').on('dblclick', function () {
            var urlId = $(this).data('url');
            removeTab(urlId);
        });
    };

    var addTab = function (urlId, url) {
        if (!$tab) {
            $bodyWrapper.prepend('<div class="my-tab"><ul></ul></div>');
            $tab = $bodyWrapper.find('.my-tab > ul');
        }
        var title = '工作台';
        var menuItem = $('.menu-url-item[data-url="' + url + '"]');
        if (menuItem && menuItem.length > 0) {
            title = menuItem[0].innerText;
        }

        $tab.find('.tab-item').removeClass('active');
        $tab.append(getTabLi(urlId, title));
        bindEvent();
    };

    var removeTab = function (urlId) {
        var nextShow = null;
        var prev = $tab.find('.tab-item[data-url="' + urlId + '"]').prev();
        if (prev && prev.length > 0) {
            nextShow = prev;
        } else {
            nextShow = $tab.find('.tab-item[data-url="' + urlId + '"]').next();
        }
        if (nextShow && nextShow.length > 0) {
            $tab.find('.tab-item[data-url="' + urlId + '"]').remove();
            $body.find('.body-item[data-url="' + urlId + '"]').remove();
            var urlId0 = nextShow.data('url');
            showTab(urlId0);
        } else {
            $.tip.error('最后一个 Tab 了, 留着吧');
        }
    };

    exports('tab', {
        addTab: addTab,
        showTab: showTab,
        removeTab: removeTab
    })

}).link('/admin/res/css/tab.css');