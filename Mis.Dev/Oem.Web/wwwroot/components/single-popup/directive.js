define(['angular', 'underscore', 'components/common/directive', 'services/tagService'], function (angular, _) {
    angular.module('Components.singlePopup', [ 'Components.common', 'Tag.services'])
        .directive('singlePopup', [ 'tagTreeService', 'tagNetService', '$filter',
            function ( tagTreeService, tagNetService, $filter) {

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

                function loadData(scope, method) {
                    method = method || 'reset';
                    scope.isLoading = true;

                    //reset selectedResult & queryResult
                    if (method === 'reset') {
                        scope.queryResult.list = [];
                        scope.selectedResult.obj = null;
                        scope.selectedResult.index = -1;
                    }

                    if (!scope.currentState.netService) {
                        throw {
                            name: 'TypeError',
                            message: 'singlePopup:netService is not a function!'
                        };
                    }

                    return scope.currentState.netService({
                        tagId: scope.currentState.tagId,
                        page: scope.currentState.page,
                        search: scope.currentState.search
                    }).success(function (result) {
                        scope.queryResult.totalPage = Math.ceil(result.data.totalCount / 20);
                        var list = filterData(scope, result.data.list);

                        if (method === 'reset') {
                            scope.queryResult.list = list;
                        } else {
                            scope.queryResult.list = scope.queryResult.list.concat(list);
                        }

                        scope.isLoading = false;
                    });
                }

                function getTransformedTags(tags) {
                    var res = [];
                    if (!tags) return res;

                    _.each(tags, function (tag) {
                        res = res.concat(getTransformedTags(tag.list))
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

                    angular.element('#single-popup-data').scrollTop(0);

                    scope.queryCondition.search = '';
                    scope.selectedResult = {
                        obj: null,
                        index: -1
                    };

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

                    var promiss = loadData(scope);
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
                        init(scope);
                    });
                }

                function bindAccessor(scope) {
                    scope.options.accessor = {
                        reload: function () {
                           return init(scope);
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
                        confirmAction: '&'
                    },
                    replace: false,
                    templateUrl: 'components/single-popup/template.html',
                    link: function (scope, element, attrs) {
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
                            obj: null,
                            index: -1
                        };
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
                            scope.selectedResult.obj = null;
                        };

                        scope.confirm = function () {
                            scope.isShow = false;
                            scope.confirmAction({
                                data: scope.selectedResult.obj
                            });
                            scope.selectedResult.obj = null;
                        };

                        scope.clickItem = function (index) {
                            var list = scope.queryResult.list;
                            var currentItem = list[index];

                            //不允许反选
                            if (scope.selectedResult.index === index) {
                                return;
                            }

                            if (currentItem.isActive) {
                                currentItem.isActive = false;
                                scope.selectedResult.obj = null;
                                scope.selectedResult.index = -1;
                            } else {
                                currentItem.isActive = true;
                                if (scope.selectedResult.index !== -1 && scope.selectedResult.index !== index) {
                                    list[scope.selectedResult.index].isActive = false;
                                }

                                scope.selectedResult.obj = angular.copy(currentItem);
                                scope.selectedResult.index = index;
                            }
                        };

                        scope.toggleDropdown = function (tags) {
                            tags.isActive ^= true;
                        };

                        scope.switchTab = function (tab) {
                            if (tab.isActive) {
                                return;
                            }

                            _.each(scope.options.tabs, function (item) {
                                item.isActive = false;
                            });
                            tab.isActive = true;

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
                    }
                };
            }
        ]);
});
