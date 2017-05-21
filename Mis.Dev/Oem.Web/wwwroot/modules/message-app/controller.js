"use strict";



define(["angular", "services/grid", "services/net/index", 'components/paging/directive', 'components/comm_popup/directive', 'services/bounced'], function (angular) {
    return angular.module("MessageApp.controllers", ["GridService", "services.net.index", 'brantwills.paging', "Components.commPopup", 'Bounced.services', 'service.currentUser', ])
        .controller("MessageAppController", [
            "$scope", "$http", "$q", "$rootScope", "gridHelper", "indexService",  "$stateParams", "selectedKeyService", 'gintDialog', 'errorPopService', "$filter", 'currentUserService',
            function ($scope, $http, $q, $rootScope, gridHelper, indexService,  $stateParams, selectedKeyService, gintDialog, errorPopService, $filter, currentUserService) {
                
                console.log("message")
                console.log("id为" + $stateParams.msgIndex)
                $scope.IsIgnore = false;
                $scope.currentUser = $scope.currentUser.userId;;
                $scope.currentPage = 1;
                $scope.pageSize = 10;
                $scope.isMsgAsc = false;
                $scope.isClickSearch = false;
                $scope.searchConditions =
                {
                    searchKey: null,
                    startTime: null,
                    endTime:null
                }
                //消息、预约、任务tab 切换
                $scope.preview = function (msgIndex) {
                    var z = $scope.searchConditions;
                    if (z.searchKey != $scope.searchKey || z.startTime != $scope.startTime || z.endTime != $scope.endTime) {
                        $scope.isClickSearch = false;
                    }
                    //不是当前tab重置筛选条件
                    if ($scope.msgIndex != msgIndex) {
                        $scope.startTime = null;
                        $scope.endTime = null;
                        $scope.searchKey = null;
                        $scope.isMsgAsc = false;
                        $scope.IsIgnore = false;
                        $scope.searchKey = null;
                        $scope.currentPage = 1;
                        $scope.isClickSearch = false;
                        $scope.searchConditions = {
                            searchKey: null,
                            startTime: null,
                            endTime: null
                        };
                    }
                    $scope.msgIndex = msgIndex;
                    var req = {
                        Filter: {
                            UserId: $scope.currentUser,
                            BeginDate: $scope.startTime,
                            EndDate: $scope.endTime,
                            //IsIgnore: $scope.IsIgnore
                        },
                        Key: $scope.searchKey,
                        Order: {
                            filed: '',
                            asc: $scope.isMsgAsc
                        },
                        Page: {
                            //分页
                            pageSize : 10,
                            pageIndex: $scope.currentPage
                        }
                    }
                    if ($scope.isClickSearch == false) {
                        req.Key = $scope.searchConditions.searchKey;
                        req.Filter.BeginDate = $scope.searchConditions.startTime;
                        req.Filter.EndDate = $scope.searchConditions.endTime;
                    }
                    if ($scope.msgIndex == 0) {
                        $scope.searchKeyRemind = "学员姓名/拟沟通内容";
                        req.Order.filed = "VisitTime";
                        req.Filter.beginTime = $scope.startTime;
                        req.Filter.endTime = $scope.endTime;
                        //预约
                        indexService.getReservesList(req).then(function (result) {
                            $scope.total = result.data.data.totalCount;
                            $scope.reserves = result.data.data.list;

                        });
                        
                    } else if ($scope.msgIndex == 1) {
                        $scope.searchKeyRemind = "学员姓名/操作人";
                        req.Order.filed = "CreatedAt";
                       // req.Order.asc = $scope.isMsgAsc;
                        req.Filter.IsIgnore= $scope.IsIgnore;
                        //消息
                        indexService.getMessages(req).then(function (result) {
                            $scope.total = result.data.data.totalCount;
                            $scope.messages = result.data.data.notices;
                        });
                       
                    } else if ($scope.msgIndex == 2) {
                        $scope.searchKeyRemind = "布置人/任务名称/任务描述";
                        //var d = new Date();
                        //if ($scope.startTime == null || !$scope.startTime) {
                        //    req.Filter.BeginDate = $filter("formatJsonDate")("/Date(" + d.valueOf() + ")/", "yyyy-MM-dd");
                        //}
                        req.Order.filed = "Datetime";
                       
                        //任务
                        indexService.getTasks(req).then(function (result) {
                            $scope.total = result.data.data.totalCount;
                            $scope.tasks = result.data.data.missions;
                        });
                    } else if ($scope.msgIndex == 3) {
                        $scope.searchKeyRemind = "学员姓名";
                        req.Order.filed = "NextFollowUpAt";
                        req.Filter.beginTime = $scope.startTime;
                        req.Filter.endTime = $scope.endTime;
                        //跟进
                        indexService.getTodayFullowUp(req).then(function (result) {
                            $scope.total = result.data.data.totalCount;
                            $scope.fullowUp = result.data.data.list;
                        });
                    }
                }

                $scope.selectItem = function (id) {
                    $scope.select(id);
                };
                $scope.selectAllItem = function () {
                    $scope.selectAll();
                    console.log($scope.selectedKeys);
                }

                // 消息忽略
                $scope.selectedIgnore = function (id, index) {
                    var id = selectedKeyService.all($scope.selectedKeys);
                    if (id != -1) {
                        $scope.selectedIgnoreIds = [];
                        $scope.selectedIgnoreIdspush(id);
                    }
                    if (id.length !== 0) {
                        gintDialog.confirm('提醒', '确认忽略？')
                            .then(function (result) {
                                indexService.IgnoreMessages($scope.selectedIgnoreIds).success(function (result) {
                                    $scope.queryData($scope.pageIdx);
                                    if (result.status == 1) {
                                        gintDialog.success('操作成功！');
                                    } else {
                                        gintDialog.error(result.message);
                                    }
                                });
                            });
                    } else {
                        errorPopService.set($scope, "请至少选中一个消息", 5)
                    }
                }
   
                //忽略、未忽略tab 切换
                $scope.changeSelected = function (data) {
                   var index= $scope.currentSelectedItem.id;
                    if (index == 1) {
                        $scope.IsIgnore = true;
                    } else {
                        $scope.IsIgnore = false ;
                    }
                    $scope.preview(1);
                }
                //切换页码
                $scope.changePage = function (page) {
                    $scope.currentPage = page;
                    $scope.preview($scope.msgIndex);
                };
                //排序
                $scope.sort=function(index){
                    $scope.isMsgAsc = !$scope.isMsgAsc;
                    $scope.preview(index);
                }
                //查询
                $scope.searchMsg = function () {
                    $scope.isClickSearch = true;
                    $scope.currentPage = 1; 
                    $scope.searchConditions =
                       {
                           searchKey: $scope.searchKey,
                           startTime: $scope.startTime,
                           endTime: $scope.endTime
                       }
                    $scope.preview($scope.msgIndex);
                }
                $scope.init = function () {
                    //所在校区
                    //$scope.SelectedItems = [{ id:0 , name: "未忽略" }, { id: 1 , name: "忽略" }];
                    //$scope.currentSelectedItem = $scope.SelectedItems[0];
                    //初始化tab显示项 
                    if ($stateParams.msgIndex.length == 0) {
                        $scope.msgIndex = 0;
                    } else {
                        $scope.msgIndex = $stateParams.msgIndex;
                    }
                    
                    $scope.preview($scope.msgIndex);
                  
                }
                $scope.init();
            }
        ]);
});