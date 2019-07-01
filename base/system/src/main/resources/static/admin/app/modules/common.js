/**
 * 重复调用, 但不一定经常调用的东西放这里
 */
layui.define(function (exports) {
    var $ = layui.$;

    var getParam = function (jspath, key) {
        var urlParse = jspath.split("\?");
        if (urlParse.length > 1) {
            var params = urlParse[1].split("&");

            var paramObj = {};
            for (var i = 0; i < params.length; i++) {
                var keyValue = params[i].split("=");
                if (key && keyValue[0] === key) {
                    return keyValue[1];
                }
                paramObj[keyValue[0]] = keyValue[1];
            }
            return paramObj;
        }
        return "";
    };

    var deleteFn = function (options) {
        $.loading();
        $.confirm({
            title: options.title || '确认删除吗?'
        }, function () {
            request.post({
                url: options.url,
                contentType: "application/json",
                data: JSON.stringify(options.grid.getCheckedIds()),
                success: function (res) {
                    $.loaded();
                    if (res.success) {
                        $.tip.success(options.success || '删除成功!');
                        options.grid.refresh();
                    } else {
                        $.tip.error(res.errDesc);
                    }
                }
            });
        });
    };

    var updateStatus = function (options) {
        $.confirm({
            title: options.title || '确认更新状态吗?'
        }, function () {
            request.post({
                url: options.url,
                contentType: "application/json",
                data: JSON.stringify({
                    ids: options.grid.getCheckedIds(),
                    status: options.status
                }),
                success: function (res) {
                    if (res.success) {
                        $.tip.success('操作成功!');
                        options.grid.refresh();
                    } else {
                        $.tip.error(res.result);
                    }
                }
            });
        });
    };

    var getDataSync = function (url, method) {
        var data = {};
        request.ajax({
            url: url,
            async: false,
            method: method || 'post',
            success: function (res) {
                if (res.success) {
                    data = res.data;
                } else {
                    console.log("getDataSync error :: ", res);
                }
            }
        });
        return data;
    };

    var convertData2Map = function (data, keyField, valField) {
        var map = {};
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            if (valField) {
                map[d[keyField]] = d[valField];
            } else {
                map[d[keyField]] = d;
            }
        }
        return map;
    };

    function appendOption(d, valField, selectedVal, textField, i) {
        var selected = '';
        if (selectedVal) {
            if (d[valField] == selectedVal) {
                selected = ' selected ';
            }
        } else if (i === 0) {
            selected = ' selected ';
        }

        return '<option ' + selected + ' value="' + d[valField] + '">' + d[textField] + '</option>';
    }

    var getOption = function (data, valField, textField, selectedVal, hasField, need) {
        var option = '';
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            if (hasField) {
                if (d.hasOwnProperty(hasField) && d[hasField] && need) {
                    option += appendOption(d, valField, selectedVal, textField, i);
                }else if (!d.hasOwnProperty(hasField) && !need) {
                    option += appendOption(d, valField, selectedVal, textField, i);
                }
            } else {
                option += appendOption(d, valField, selectedVal, textField, i);
            }
        }
        return option;
    };

    var convertData2Store=function (data, idField, textField) {
        var store = [];
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            store.push({id: d[idField], text: d[textField]});
        }
        return store;
    };

    var convertMap2Store = function (map) {
        var store = [];
        $.each(map, function (k, v) {
            store.push({
                id: k,
                text: v
            });
        });
        return store;
    };

    var convertData2Tree = function (data, id, pid, top) {
        var tree = [];
        top = top || 0;
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            if (d[pid] === top) {
                d.children = convertData2Tree(data, id, pid, d[id]);
                tree.push(d);
            }
        }
        return tree;
    };

    var dataGroup = function (data, group1, group2) {
        var map = {};
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            if (!map.hasOwnProperty(d[group1])) {
                map[d[group1]] = {};
            }
            map[d[group1]][d[group2]] = d;
        }
        return map;
    };

    var gridFilter = function (data, field, opt, value, type) {
        data.filter = data.filter || [];
        for (var i = 0; i < data.filter.length; i++) {
            var item = data.filter[i];
            if (item.field === field) {
                return false;
            }
        }
        data.filter.push({
            field: field,
            operator: opt,
            value: value,
            type: type
        });
    };
    var addDefaultFilter = function (data, field, opt, value, type) {
        data.filter = data.filter || [];
        if ((!data.filter || data.filter.length === 0) && (!data.other.clearField || !data.other.clearField === field)) {
            data.filter.push({
                field: field,
                operator: opt,
                value: value,
                type: type
            });
        }
    };
    var getSkuId = function (url) {
        if (url === null) {
            return null;
        }
        var skuId = null;
        if (url.indexOf("item.jd.com") !== -1) {
            skuId = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.html'));
        } else if (url.indexOf("item.m.jd.com") !== -1) {
            skuId = url.substring(url.lastIndexOf('product/') + 8, url.lastIndexOf('.html'));
        } else {
            skuId = url.replace(/[\r\n]/, '');
        }
        return skuId;
    };
    var getValueTip = function (value) {
        var tip = null;
        if (!isNaN(value)) {
            if (parseFloat(value / 10000000000) > 1) {
                tip = parseFloat(value / 10000000000).toFixed(2) + '亿元';
            } else if (parseFloat(value / 1000000) > 1) {
                tip = parseFloat(value / 1000000).toFixed(2) + '万元';
            } else if (value > 99) {
                tip = parseFloat(value / 100).toFixed(2) + '元';
            }
        }
        return tip;
    };

    var detailTDRender = function (data, detail) {
        data = data || '';
        detail = detail || data;
        var $span = $('<span class="my-link"> ' + data + ' </span>');
        $span.click(function (e) {
            $.modal({
                title: '查看具体',
                width: 300,
                height: 450,
                content: '<div class="my-box"><textarea readonly rows="13" class="layui-textarea">' + detail + '</textarea></div>'
            })
        });
        return $span;
    };

    var join = function (data, keyField, sp) {
        var str = '';
        if (!data || data.length === 0) {
            return null;
        }
        keyField = keyField || 'name';
        sp = sp || ', ';
        for (var i = 0; i < data.length; i++) {
            var datum = data[i];
            str += datum[keyField] + sp;
        }
        str = str.substring(0, str.length - sp.length);
        return str;
    };
    exports('common', {
        /**
         * 解析路径, 取出所有参数或指定某个 key
         */
        getParam: getParam,
        /**
         * 获取当前年月日
         */
        getNowDate: function () {
            return new Date().format('yyyy年M月d日')
        },
        /**
         * 通用表格删除(多选)
         */
        delete: deleteFn,
        /**
         * 通用变更状态(多选)
         */
        updateStatus: updateStatus,
        /**
         * 同步获取数据
         */
        getDataSync: getDataSync,
        /**
         * 将对象数组 data 转换成 json 对象(map)
         */
        convertData2Map: convertData2Map,
        /**
         * 将对象数组 data 转换成 表格过滤 checkbox|radio 的过滤数据(store)
         */
        convertData2Store: convertData2Store,
        /**
         * 将 json对象(map) 转换成 表格过滤 checkbox|radio 的过滤数据(store)
         */
        convertMap2Store: convertMap2Store,
        /**
         * 将对象数组转换成 children 格式的树结构
         */
        convertData2Tree: convertData2Tree,
        /**
         * 将对象数组内的对象数据进行分组, 参考 global.js 中 loadAuth
         */
        dataGroup: dataGroup,
        /**
         * 将对象数组转换成 select 所需的 option 项
         */
        getOption: getOption,
        /**
         * 添加表格过滤
         */
        gridFilter: gridFilter,
        /**
         * 仅当表格无过滤条件时, 添加表格过滤
         */
        addDefaultFilter: addDefaultFilter,
        /**
         * 将分为单位的数字转换成更直观的单位
         */
        getValueTip: getValueTip,
        /**
         * 封装一个 td render, 用于数据过长时使用模态框延伸
         */
        detailTDRender: detailTDRender,
        /**
         * 类似 java array 的 join 方法
         */
        join: join
    })

});