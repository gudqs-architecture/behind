+function () {
    commonDefine(['layer', 'grid', 'form', 'ztree'], 'sysDictionary', {
        init: function ($this, $options) {
            _$this = $this;
            _$options = $options;
            init();
        }
    });
    var _$this, _$options, grid, sonGrid;
    var $ = layui.jquery, common = layui.common;
    var _selectDictionaryId, _selectDictionaryMemo;

    var init = function () {

        var loadSonDictionary = function (dictionaryId) {
            sonGrid = _$this.find('.dictionary-son-list').grid({
                url: 'admin/sys/dictionary/find?parentId=' + (dictionaryId || 0),
                idField: 'dictionaryId',
                doubleClick: function (tr, record) {
                    openModal(true, record, function ($modal) {
                        $modal.find('input[name=dictionaryCode]').attr('readonly', 'readonly');
                    });
                },
                columns: [
                    {
                        text: '字典子键',
                        dataIndex: 'dictionaryCode'
                    }, {
                        text: '字典值',
                        dataIndex: 'dictionaryValue'
                    }, {
                        text: '字典描述',
                        dataIndex: 'dictionaryMemo'
                    }, {
                        text: '排序',
                        dataIndex: 'displayOrder'
                    }
                ]
            });
        };

        grid = _$this.find('.dictionary-list').grid({
            url: 'admin/sys/dictionary/findParent',
            idField: 'dictionaryId',
            afterLoad: function (that) {
                that.$body.find('table tbody tr:eq(0)').click();
            },
            doubleClick: function (tr, record) {
                openModal(false, record, function ($modal) {
                    $modal.find('input[name=dictionaryCode]').attr('readonly', 'readonly');
                });
            },
            callback: function (tr, record, that) {
                if (tr) {
                    _$this.find('.dictionary-list').addClass('layui-col-md6').removeClass('layui-col-md12');
                    _$this.find('.dictionary-son-list').show();

                    _selectDictionaryId = record.dictionaryId;
                    _selectDictionaryMemo = record.dictionaryMemo;
                    loadSonDictionary(record.dictionaryId);
                }
            },
            columns: [
                {
                    text: '字典描述',
                    dataIndex: 'dictionaryMemo'
                }, {
                    text: '字典键',
                    dataIndex: 'dictionaryCode'
                }, {
                    text: '排序',
                    dataIndex: 'displayOrder'
                }, {
                    text: '操作',
                    dataIndex: '',
                    renderer: function () {
                        return $('<span class="my-link">点击管理字典</span>');
                    }
                }
            ]
        });

        layui.form.render();
        initEvent();
    };

    var openModal = function (son, _data, callback) {
        var update = false;
        if (_data) {
            update = true;
        }
        if (son && !_selectDictionaryId) {
            $.tip.error('先建个字典吧!');
            return false;
        }
        var title = '添加字典';
        if (_data) {
            title = '修改字典';
        }
        if (son && _selectDictionaryMemo) {
            title += ' (' + _selectDictionaryMemo + ')';
            if (!update) {
                _data = _data || {};
                _data.dictionaryMemo = _selectDictionaryMemo;
            }
        }
        var content = $.loadTemplate({
            url: 'sysDictionary/edit',
            data: _data
        });


        $.modal({
            title: title,
            width: 420,
            height: 370,
            content: content,
            open: function ($modal) {
                if (callback) {
                    callback($modal);
                }
                if (!son) {
                    $modal.find('.dictionary-value').remove();
                }
                layui.form.render();
            },
            ok: function ($modal, close) {
                var opt = 'add';
                var data = $modal.find('.dictionary-form').serializeArray().toModel();

                if (update) {
                    data.dictionaryId = _data.dictionaryId;
                    opt = 'update';
                }
                if (son && _selectDictionaryId) {
                    data.parentId = _selectDictionaryId;
                }
                request.post({
                    url: 'admin/sys/dictionary/' + opt,
                    data: data,
                    callback: function (data) {
                        $.tip.success('保存成功!');
                        grid.refresh();
                        close();
                    }
                });
            }
        });
    };

    var initEvent = function () {

        _$this.find('.btn-add').click(function () {
            openModal(false);
        });
        _$this.find('.btn-add-son').click(function () {
            openModal(true);
        });

        _$this.find('.btn-delete').click(function () {
            common.delete({
                url: 'admin/sys/dictionary/delete',
                grid: grid
            })
        });

        _$this.find('.btn-delete-son').click(function () {
            common.delete({
                url: 'admin/sys/dictionary/delete',
                grid: sonGrid
            })
        });

    };
}();