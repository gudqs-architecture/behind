+function () {
    commonDefine(['layer', 'grid', 'form', 'select2', 'upload'], 'userManage', {
        init: function ($this, $options) {
            init($this, $options);
        }
    });
    var $ = layui.jquery, common = layui.common;

    var loadRole = function (sysUserId) {
        var roleData = [];
        request.get({
            url: 'admin/role/findBySysUserId',
            data: {
                sysUserId: sysUserId
            },
            async: false,
            success: function (res) {
                if (res.success) {
                    roleData = roleData.concat(res.data);
                }
            }
        });
        return roleData;
    };

    var init = function (_$this, _$options) {
        var statusMap = {
            '0': '未启用',
            '1': '已启用'
        };

        function editUser(record) {
            openModal(grid, record, function ($modal) {
                $modal.find('input[name=loginName]').attr('readonly', 'readonly');
                var roleData = loadRole(record.sysUserId);
                console.log(record);
                var roleIds = [];
                for (var i = 0; i < roleData.length; i++) {
                    var role = roleData[i];
                    roleIds.push(role.sysRoleId);
                }
                $modal.find('.pwd-data').remove();
                $modal.find('select[name=sysRoleIds]').val(roleIds);
            });
        }

        var grid = _$this.find('.banner-list').grid({
            url: 'admin/user/find',
            idField: 'sysUserId',
            afterLoad: function () {
                layui.form.on('switch', function (data) {
                    var checked = data.elem.checked;
                    var id = data.elem.dataset.id;

                    $.confirm({
                        title: '确认变更状态吗?'
                    }, function () {
                        request.post({
                            url: 'admin/user/update',
                            data: {
                                sysUserId: id,
                                status: checked ? 1 : 0
                            },
                            success: function (res) {
                                if (res.success) {
                                    $.tip.success('修改成功');
                                }
                            }
                        });
                    }, function () {
                        data.elem.checked = !data.elem.checked;
                        layui.form.render();
                    });
                });
            },
            doubleClick: function (tr, record) {
                editUser(record);
            },
            columns: [
                {
                    text: '登录名',
                    dataIndex: 'loginName'
                }, {
                    text: '昵称',
                    dataIndex: 'nickName'
                }, {
                    text: '头像',
                    dataIndex: 'avatarUrl',
                    renderer: function (data, record) {
                        return $('<a href="' + data + '"><img src="' + data + '" width="80px" /></a>');
                    }
                }, {
                    text: '角色',
                    dataIndex: '',
                    renderer: function (data, record) {
                        var roleData = loadRole(record.sysUserId);
                        var roleNames = common.join(roleData, 'roleName') || '无任何角色';
                        var $span = $('<span> ' + roleNames + ' </span>');
                        $span.click(function () {
                            editUser(record);
                        });
                        return $span;
                    }
                }, {
                    text: '状态',
                    dataIndex: 'status',
                    filter: {
                        type: 'radio',
                        store: common.convertMap2Store(statusMap)
                    },
                    renderer: function (data, record) {
                        var checked = data === 1 ? 'checked' : '';
                        return $('<input data-id="' + record.sysUserId + '" type="checkbox" name="status" ' + checked + ' lay-skin="switch">');
                    }
                }
            ]
        });

        initEvent(_$this, _$options, grid);
    };

    var openModal = function (grid, _data, callback) {
        var content = $.loadTemplate({
            url: 'userManage/edit',
            data: _data
        });

        var title = '添加 系统用户';
        if (_data) {
            title = '修改 系统用户';
        }
        var oldRoleIds = [];
        var avatarUrl = '';
        $.modal({
            title: title,
            width: 500,
            height: 510,
            content: content,
            open: function ($modal) {
                var roleData = loadRole();
                $modal.find('select[name=sysRoleIds]').empty().append(common.getOption(roleData, 'sysRoleId', 'roleName'));
                if (callback) {
                    callback($modal);
                }
                oldRoleIds = $modal.find('select[name=sysRoleIds]').val() || [];

                var avatarUpload = $modal.find('.avatar-upload');
                avatarUpload.find('.btn-upload-avatar').upload({
                    preview: avatarUpload.find('.upload-img'),
                    tip: avatarUpload.find('.upload-tip'),
                    success: function (res, urlPrefix) {
                        avatarUrl = urlPrefix + res.data;
                    }
                });
                layui.form.render();
            },
            ok: function ($modal, close) {
                var data = $modal.find('.user-form').serializeArray().toModel();
                data.sysRoleIds = $modal.find('select[name=sysRoleIds]').val() || [];

                data.delSysRoleIds = oldRoleIds.filter(function (v) {
                    return data.sysRoleIds.indexOf(v) === -1
                });

                if (_data) {
                    data.sysUserId = _data.sysUserId;
                }
                data.avatarUrl = avatarUrl;

                request.post({
                    contentType: 'application/json',
                    url: 'admin/user/add',
                    data: JSON.stringify(data),
                    callback: function (data) {
                        $.tip.success('保存成功!');
                        grid.refresh();
                        close();
                    }
                })
            }
        })
    };
    var initEvent = function (_$this, _$options, grid) {
        _$this.find('.btn-add').click(function () {
            openModal(grid);
        });

        _$this.find('.btn-delete').click(function () {
            common.delete({
                url: 'admin/user/delete',
                grid: grid
            })
        });

    };

}();