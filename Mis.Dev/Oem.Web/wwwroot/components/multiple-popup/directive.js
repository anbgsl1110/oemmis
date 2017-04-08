define([
    'angular',
    'underscore',
    'components/common/directive',
    'components/multiple-popup/service',
    'services/tagService',
    'filters/commonFilter'
], function (angular, _) {
    angular.module('Components.multiplePopup', ['Components.multiplePopup.services', 'Components.common', 'Tag.services', 'CommonFilter'])
        .directive('multiplePopup', [
            'tagTreeService', 'tagNetService', '$filter',
            function (tagTreeService, tagNetService, $filter) {

                function filterData(scope, list) {
                    var filterFields = scope.options.filterFields;
                    if (filterFields && filterFields.length > 0) {
                        _.each(list, function (item) {
                            _.each(filterFields, function (filterField) {
                                var params = angular.copy(filterField.params);
                                params.splice(0, 0, item[filterField.field]);
                                item[filterField.field] = $filter(filterField.filter).apply(null, params);
                            });
                        });
                    }
                    return list;
                }

                function checkSourceList(sourceList, selectedList) {
                    _.each(sourceList, function (item) {
                        //兼容主键为Id的数据
                        if (_.findIndex(selectedList, {
                            id: item.id
                        }) !== -1 || _.findIndex(selectedList, {
                            Id: item.Id
                        }) !== -1) {
                            item.isActive = true;
                        }
                    });
                    return sourceList;
                }

                function loadData(scope, method) {
                    method = method || 'reset';

                    scope.isLoading = true;

                    if (method === 'reset') {
                        scope.queryResult.list = [];
                    }

                    if (!scope.currentState.netService) {
                        throw {
                            name: 'TypeError',
                            message: 'multiplePopup:netService is not a function!'
                        };
                    }
                    //适配老数据
                    var tempParams = {
                        tagId: scope.currentState.tagId,
                        page: scope.currentState.page,
                        search: scope.currentState.search
                    };
                    if (scope.taskTypes.length > 0) {
                        if (scope.taskTypeSelectId == 0) {
                            tempParams.tsakTypeIdList = [];
                        } else {
                            tempParams.tsakTypeIdList = [scope.taskTypeSelectId];
                        }
                    }
                    return scope.currentState.netService(tempParams).success(function (result) {
                        scope.queryResult.totalPage = Math.ceil(result.data.totalCount / 20);
                        var resList = checkSourceList(result.data.list, scope.selectedResult.list);
                        resList = filterData(scope, resList);
                        if (method === 'reset') {
                            scope.queryResult.list = resList;
                        } else {
                            scope.queryResult.list = scope.queryResult.list.concat(resList);
                        }

                        scope.isLoading = false;
                    });
                }

                function getTransformedTags(tags) {
                    var res = [];
                    if (!tags) return res;

                    _.each(tags, function (tag) {
                        res = res.concat(getTransformedTags(tag.list));
                        res.push({
                            id: tag.id,
                            pid: tag.pid,
                            name: tag.name,
                            isLeaf: tag.isLeaf
                        });
                    });

                    return res;
                }

                function getUiTag(transformedTags, pid, defaultTitle) {
                    var uiTag = {
                        isShow: true,
                        isActive: false,
                        selected: {
                            id: 0,
                            name: defaultTitle
                        },
                        items: [{
                            id: 0,
                            name: defaultTitle,
                            isLeaf: false
                        }]
                    };

                    _.each(transformedTags, function (tag) {
                        if (tag.pid === pid) {
                            uiTag.items.push({
                                id: tag.id,
                                name: tag.name,
                                isLeaf: tag.isLeaf
                            });
                        }
                    });
                    return uiTag;
                }

                function init(scope) {
                    var defaultTitle = '所有';

                    angular.element('#multiple-popup-data').scrollTop(0);

                    scope.queryCondition.search = '';
                    //判断是否有tab
                    if (scope.options.tabs instanceof Array) {
                        _.each(scope.options.tabs, function (tab, index) {
                            tab.isActive = (index === 0);
                        });
                        scope.currentState.netService = scope.options.tabs[0].netService;
                    } else {
                        scope.currentState.netService = scope.options.tabs;
                    }

                    scope.currentState.page = 1;
                    scope.currentState.search = '';
                    scope.currentState.tagId = 0;

                    var promiss =  loadData(scope);
                    scope.uiTags = [getUiTag(scope.transformedTags, 0, defaultTitle), {}, {}];
                    return promiss;
                }

                function initWithoutLoad(scope) {
                    var defaultTitle = '所有';

                    angular.element('#multiple-popup-data').scrollTop(0);

                    scope.queryCondition.search = '';
                    //判断是否有tab
                    if (scope.options.tabs instanceof Array) {
                        _.each(scope.options.tabs, function (tab, index) {
                            tab.isActive = (index === 0);
                        });
                        scope.currentState.netService = scope.options.tabs[0].netService;
                    } else {
                        scope.currentState.netService = scope.options.tabs;
                    }

                    scope.currentState.page = 1;
                    scope.currentState.search = '';
                    scope.currentState.tagId = 0;

                    scope.uiTags = [getUiTag(scope.transformedTags, 0, defaultTitle), {}, {}];
                }

                function resetUiTags(scope, transformedTags) {
                    var defaultTitle = '所有';
                    scope.uiTags = [getUiTag(transformedTags, 0, defaultTitle), {}, {}];
                }

                function loadTagTreeAndInit(scope) {
                    //adjust for no tags
                    if (scope.options.type == null) {
                        if (scope.isManualLoad) {
                            initWithoutLoad(scope);
                        } else {
                            init(scope);
                        }
                        return;
                    }

                    tagNetService.get(scope.options.type).then(function (result) {
                        scope.options.tagTree = tagTreeService.getTagTree(result);
                        scope.transformedTags = getTransformedTags(scope.options.tagTree);
                        if (scope.isManualLoad) {
                            initWithoutLoad(scope);
                        } else {
                            init(scope);
                        }
                    });
                }

                function bindAccessor(scope) {
                    scope.options.accessor = {
                        reload: function () {
                           return  init(scope);
                        },
                        getState: function () {
                            return scope.currentState;
                        }
                    };
                }

                return {
                    restrict: 'EA',
                    scope: {
                        isManualLoad: '=',
                        data: '=',
                        options: '=',
                        isShow: '=',
                        cancleAction: '&',
                        confirmAction: '&',
                        isShowTip: "=",
                        fixationObj:"="
                    },
                    replace: false,
                    templateUrl: 'components/multiple-popup/template.html',
                    link: function (scope, element, attrs) {
                        scope.showtip = false;
                        scope.showfixation = false;
                        if (scope.isShowTip) {
                            scope.showtip = true;
                        }
                        if (scope.fixationObj) {
                            scope.showfixation = true;
                        }
                        scope.taskTypes = []; //资料相关
                        scope.isShowTaskTypeItem = false;
                        scope.taskTypeSelectId = 0;
                        scope.taskTypeCName = "资料题型";
                        scope.isLoading = false;
                        scope.uiTags = [];
                        scope.queryCondition = {
                            search: ''
                        };
                        scope.queryResult = {
                            list: [],
                            totalPage: -1
                        };
                        scope.selectedResult = {
                            list: []
                        };
                        scope.selectedResult.list = angular.copy(scope.data);
                        scope.currentState = {};

                        bindAccessor(scope);
                        loadTagTreeAndInit(scope);

                        scope.$on("gintLoadPageScrollData", function () {
                            if (!scope.isLoading && scope.currentState.page < scope.queryResult.totalPage) {
                                scope.currentState.page += 1;
                                loadData(scope, 'append');
                            }
                        });

                        scope.cancle = function () {
                            scope.isShow = false;
                            scope.cancleAction();
                            scope.selectedResult = {
                                list: []
                            };
                        };

                        scope.confirm = function () {
                            scope.isShow = false;
                            scope.confirmAction({
                                data: scope.selectedResult
                            });
                            scope.selectedResult = {
                                list: []
                            };
                        };

                        //点击左侧列表数据
                        scope.clickItem = function (index) {
                            var list = scope.queryResult.list;
                            var currentItem = list[index];

                            if (currentItem.isActive) {
                                currentItem.isActive = false;
                                var idx = _.findIndex(scope.selectedResult.list, {
                                    id: currentItem.id
                                });
                                //兼容主键为Id的数据
                                if (idx === -1) {
                                    idx = _.findIndex(scope.selectedResult.list, {
                                        Id: currentItem.Id
                                    });
                                }
                                if (idx !== -1) {
                                    scope.selectedResult.list.splice(idx, 1);
                                }
                            } else {
                                currentItem.isActive = true;
                                scope.selectedResult.list.push(currentItem);
                            }
                        };

                        //点击右侧已选择列表数据项
                        scope.clickSelectedItem = function (index) {
                            var currentItem = scope.selectedResult.list[index];

                            var idx = _.findIndex(scope.queryResult.list, {
                                id: currentItem.id
                            });

                            //兼容主键为Id的数据
                            if (idx === -1) {
                                idx = _.findIndex(scope.queryResult.list, {
                                    Id: currentItem.Id
                                });
                            }

                            if (idx !== -1) {
                                scope.queryResult.list[idx].isActive = false;
                            }

                            scope.selectedResult.list.splice(index, 1);
                        };

                        scope.toggleDropdown = function (tags) {
                            tags.isActive ^= true;
                        };

                        scope.selectCategoryItem = function (index, tags, item) {
                            tags.isActive = false;
                            tags.selected = item.title;
                        };

                        scope.switchTab = function (tab) {
                            if (tab.isActive) {
                                return;
                            }

                            _.each(scope.options.tabs, function (item) {
                                item.isActive = false;
                            });
                            tab.isActive = true;
                            //reset currentState(page,tag,search)
                            scope.currentState.netService = tab.netService;
                            scope.currentState.page = 1;
                            scope.currentState.search = '';
                            scope.currentState.tagId = 0;
                            resetUiTags(scope, scope.transformedTags);
                            scope.queryCondition.search = '';

                            loadData(scope, 'reset');
                        };

                        scope.search = function () {
                            scope.currentState.search = scope.queryCondition.search;
                            scope.currentState.page = 1;

                            loadData(scope, 'reset');
                        };

                        scope.onSearchKeyPress = function ($event) {
                            if ($event.keyCode == 13) {
                                scope.search();
                            }
                        };

                        scope.selectTag = function (level, tag) {
                            var currentDropdown = scope.uiTags[level];
                            currentDropdown.isActive = false;
                            if (tag.id === currentDropdown.selected.id) {
                                return;
                            }

                            currentDropdown.selected.id = tag.id;
                            currentDropdown.selected.name = tag.name;

                            if (tag.isLeaf) {
                                scope.currentState.tagId = tag.id;
                                scope.currentState.page = 1;

                                loadData(scope, 'reset');
                                return;
                            }

                            //clear descendant's uiTag 
                            _.each(scope.uiTags, function (uiTag, index, list) {
                                if (index > level) {
                                    list[index] = {};
                                }
                            });

                            if (tag.id !== 0) {
                                var uiTag = getUiTag(scope.transformedTags, tag.id, '请选择');
                                scope.uiTags[level + 1] = uiTag;
                            }

                            //选择所有时重新loadData
                            if (level === 0 && tag.id === 0) {
                                scope.currentState.tagId = tag.id;
                                scope.currentState.page = 1;
                                loadData(scope, 'reset');
                            }
                        };

                        //资料类别的处理
                        if (scope.options.taskTypesService) {
                            scope.options.taskTypesService.success(function (result) {
                                scope.taskTypes = result.data.list;
                            });
                        }

                        //点击资料题型项
                        scope.changeTaskTypeAction = function (id, cName) {
                            scope.isShowTaskTypeItem = false;
                            scope.taskTypeSelectId = id;
                            scope.taskTypeCName = cName;
                            scope.currentState.page = 1;
                            loadData(scope, 'reset');
                        };

                        scope.changeTaskTypeShow = function () {
                            scope.isShowTaskTypeItem = !scope.isShowTaskTypeItem;
                        };

                        //点击预览按钮
                        scope.openPreview = function (item) {
                            
                            console.log("1");
                            var url = '/Task/PreviewRedirect?id=' + item.Id + '&version=' + item.Version;
                            var height = window.screen.availHeight - 42;
                            var width = window.screen.availWidth - 18;
                            if (navigator.userAgent.toLowerCase().match(/chrome/) != null) {
                                height = window.screen.availHeight;
                                width = window.screen.availWidth;
                            }
                            var name = 'D_' + scope.getDatestr();
                            var new_window = window.open('about:blank', '', 'location=0,hotkeys=0,menubar=0,scrollbars=1,titlebar=0,toolbar=0,height=' + height + ',width=' + width + '');
                            new_window.location.href = url;
                            new_window.moveTo(0, 0);
                            window.event.cancelBubble = true;
                        };
                        scope.getDatestr = function() {
                            //visitTime
                            var now = new Date();
                            var year = now.getFullYear();
                            var month = now.getMonth() + 1;
                            var day = now.getDate();
                            var hour = now.getHours();
                            var minute = now.getMinutes();
                            if (month < 10) {
                                month = "0" + month;
                            }
                            if (day < 10) {
                                day = "0" + day;
                            }
                            if (hour < 10) {
                                hour = "0" + hour;
                            }
                            if (minute < 10) {
                                minute = "0" + minute;
                            }
                            var nowdate = year + "-" + month + "-" + day + " " + hour + ":" + minute;
                            return nowdate;
                        };
                    }
                };
            }
        ]);
});
