'use strict';
define(["angular"], function (angular) {
    return angular.module('GridService', [])
        .factory('gridHelper', [
            '$timeout',
            function ($timeout) {
                return {
                    extendGridScope: function (scope, http, q, defultQueryPath, defaultOrder, filterFixed) {
                        scope.queryPath = defultQueryPath;
                        //搜索和高级搜索相关变量
                        scope.filterFixed = filterFixed || {}; //用于查询时有特定固化查询条件，不在界面控制
                        scope.isAdvancedQueryVisable = false;
                        scope.filterKey = {
                            Pre: '',
                            Now: ''
                        };
                        scope.filter = {};
                        scope.filterPreNow = {};
                        //选择行相关
                        scope.selectedKeyName = scope.selectedKeyName || 'id';
                        scope.selectedKeys = {};
                        scope.isAllSelected = false;
                        //排序相关
                        scope.order = defaultOrder === null ? {} : defaultOrder;
                        scope.pageIdx = 1;

                        //适配后端列表接口 新增page对象 by xp 2015年4月8日 16:30:41
                        scope.page = {
                            pageSize: 10,
                            pageIndex: 1
                        }

                        scope.toggleAdvancedQuery = function () {
                            scope.isAdvancedQueryVisable = !scope.isAdvancedQueryVisable;
                            if (scope.isAdvancedQueryVisable) {
                                scope.filterKey.Pre = '';
                                scope.filterKey.Now = '';
                            } else {
                                //切换到高级搜索时，初始化placeholder
                                scope.filterPreNow = {};
                                scope.filter = {};
                            }
                            scope.queryData(1);
                        };

                        scope.changeOrder = function (filedName) {
                            if (scope.order.filed != filedName) {
                                scope.order = {
                                    filed: filedName,
                                    asc: false
                                };
                            } else {
                                scope.order.asc = !scope.order.asc;
                            }
                            scope.queryData(1);
                        };

                        scope.select = function (key) {
                            if (scope.selectedKeys[key]) {
                                scope.selectedKeys[key] = false;
                                //有一个没选中，全选直接取消
                                scope.isAllSelected = false;
                            } else {
                                scope.selectedKeys[key] = true;
                                //选中一个时需要遍历全部判断是否全选了
                                scope.isAllSelected = true;
                                for (var sKey in scope.selectedKeys) {
                                    if (!scope.selectedKeys[sKey])
                                        scope.isAllSelected = false;
                                }
                            }
                        };

                        scope.selectAll = function () {
                            scope.isAllSelected = !scope.isAllSelected;
                            for (var key in scope.selectedKeys) {
                                scope.selectedKeys[key] = scope.isAllSelected;
                            }
                        };

                        scope.onSearchKeyPress = function ($event) {
                            console.log($event);
                            if ($event.keyCode == 13) {
                                if (!scope.isAdvancedQueryVisable)
                                    scope.search();
                                else
                                    scope.advanceSearch();
                            }
                        };

                        scope.search = function (callbackFunc) {
                            scope.filterKey.Now = scope.filterKey.Pre;
                            scope.queryData(1).then(callbackFunc);
                        };

                        scope.searchPromise = function () {
                            scope.filterKey.Now = scope.filterKey.Pre;
                            return scope.queryData(1);
                        };

                        scope.advanceSearch = function (callbackFunc) {
                            scope.filter = scope.filterPreNow;
                            scope.queryData(1).then(callbackFunc);
                        };

                        scope.queryData = function (pageIdx) {
                            //新增需求 加载数据前限时Loading效果 by xp 2014年10月13日 09:54:59
                            //                    if ($(".lockMask").length && $(".ListPageLoading").length) {
                            //                        $(".lockMask").show();
                            //                        $(".ListPageLoading").show();
                            //                    } else {
                            //                        $("body").append('<div class="lockMask"></div>');
                            //                        $("body").append('<div class="ListPageLoading"></div>');
                            //                    }

                            //Creating a deferred object
                            var deferred = q.defer();
                            var filterForQuery = {};
                            angular.extend(filterForQuery, scope.filter);
                            angular.extend(filterForQuery, scope.filterFixed);
                            scope.pageIdx = pageIdx;
                            scope.page.pageIndex = pageIdx;
                            http.post(scope.queryPath, {
                                key: scope.filterKey.Now,
                                filter: scope.filterPreNow,
                                order: scope.order,
                                pageIdx: pageIdx,
                                postData: scope.postData,
                                type: scope.type,
                                page: scope.page
                            }).success(function (result) {
                                //返回操作失败的处理
                                if (result.status == 0) {
                                    deferred.reject(result.message);
                                    return;
                                }
                                scope.isAllSelected = false;
                                scope.data = result.data;
                                scope.selectedKeys = {};
                                for (var rowIdx in scope.data.list) {
                                    scope.selectedKeys[scope.data.list[rowIdx][scope.selectedKeyName]] = false;
                                }

                                //Passing data to deferred's resolve function on successful completion
                                deferred.resolve(result.data);

                                //请求成功时，将其隐藏
                                $timeout(function () {
                                    $(".lockMask").hide();
                                    $(".ListPageLoading").hide();
                                });


                            }).error(function (error) {
                                scope.error = "error";
                                //Sending a friendly error message in case of failure
                                deferred.reject("An error occured while fetching items");
                            });

                            return deferred.promise;
                        };

                        scope.queryDataAppend = function (pageIdx) {
                            //Creating a deferred object
                            var deferred = q.defer();

                            scope.pageIdx = pageIdx;
                            http.post(scope.queryPath, {
                                key: scope.filterKey.Now,
                                filter: scope.filter,
                                order: scope.order,
                                pageIdx: pageIdx,
                                postData: scope.postData
                            }).success(function (result) {
                                //返回操作失败的处理
                                if (result.status == 0) {
                                    deferred.reject(result.message);
                                    return;
                                }

                                //scope.isAllSelected = false;
                                var list = result.data.list;
                                for (var rowIdx in list) {
                                    scope.data.list.push(list[rowIdx]);
                                    scope.selectedKeys[list[rowIdx][scope.selectedKeyName]] = scope.isAllSelected;
                                }

                                //Passing data to deferred's resolve function on successful completion
                                deferred.resolve(result.data);

                            }).error(function () {
                                scope.error = "error";
                                //Sending a friendly error message in case of failure
                                deferred.reject("An error occured while fetching items");
                            });

                            return deferred.promise;
                        };

                        scope.requery = function () {
                            scope.queryData(scope.pageIdx);
                        };

                        scope.clearFilter = function () {
                            scope.filterKey.Pre = '';
                            scope.filterKey.Now = '';
                            scope.filterPreNow = {};
                            scope.filter = {};
                        };

                        scope.countSelected = function () {
                            var selected = [];
                            for (var sKey in scope.selectedKeys) {
                                if (scope.selectedKeys[sKey])
                                    selected.push(sKey);
                            }
                            return selected.length;
                        };
                    }
                };
            }
        ]);
});
