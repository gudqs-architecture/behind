+function () {

    layui.extend({
        global: 'modules/global',
        common: 'modules/common',
        grid: 'modules/grid',
        select2: 'modules/select2',
        tab: 'modules/tab',
        ztree: 'modules/ztree',
        echarts: 'modules/echarts',
        zyupload: 'modules/zyupload'
    }).config({
        base: '/admin/app/'
    }).use(['webConfig', 'jquery', 'element', 'layer', 'global', 'common', 'index'], function (config, $, element, layer, global, common, index) {

        global.init();

        index.init(common);

        element.render();

        layui.link(config.rootDir + 'res/font-awesome/css/font-awesome.min.css')
    });
}();