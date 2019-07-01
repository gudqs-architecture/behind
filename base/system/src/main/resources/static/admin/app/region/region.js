+function () {
    commonDefine(['layer', 'grid', 'form', 'ztree'], 'region', {
        init: function ($this, $options) {
            _$this = $this;
            _$options = $options;
            init();
        }
    });

    var _$this, _$options, grid;
    var $ = layui.jquery, common = layui.common;

    var init = function () {

        _$this.find('.region-tree').tree({
            async: {
                url: 'api/region/findByPId',
                contentType: 'application/x-www-form-urlencoded',
                params: ["regionId=pid"],
                dataFilter: function (data) {
                    var newer = [];
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        item.isParent = item.regionType !== 4;
                        newer.push(item);
                    }
                    return data;
                }
            },
            idField: 'regionId',
            pIdField: 'parentId',
            textField: 'regionName',
            rename: true,
            extend: {
                add: function (node) {
                    console.log('click add: ', node);
                },
                modify: function (node) {
                    console.log('click modify: ', node);
                },
                remove: function (node) {
                    console.log('click remove: ', node);
                }
            },
            callback: function (node) {
                console.log(node);

            },
            onCheck: function (node) {
                console.log('on check: ', node)
            }
        });
        initEvent();
    };

    var openModal = function (_data, callback) {
        var content = $.loadTemplate({
            url: 'userAuth/edit',
            data: _data
        });

        var title = '添加 系统角色';
        if (_data) {
            title = '修改 系统角色';
        }

        $.modal({
            title: title,
            width: 350,
            height: 210,
            content: content,
            open: function ($modal) {
                if (callback) {
                    callback($modal);
                }
                layui.form.render();
            },
            ok: function ($modal, close) {
                var data = $modal.find('.role-form').serializeArray().toModel();
                if (_data) {
                    data.sysRoleId = _data.sysRoleId;
                }
                request.post({
                    url: 'admin/role/add',
                    data: data,
                    callback: function (data) {
                        $.tip.success('保存成功!');
                        grid.refresh();
                        close();
                    }
                });
            }
        })
    };

    var initEvent = function () {
        _$this.find('.btn-add').click(function () {
            openModal();
        });

        _$this.find('.btn-delete').click(function () {
            common.delete({
                url: 'admin/role/delete',
                grid: grid
            })
        });

    };
}();