"use strict";



define(["angular", "services/net/index", "components/fullcalendar/calendar", "commonDirective", "services/net/common"],
    function(angular) {
        return angular.module("IndexApp.controllers",
                ["services.net.index", "ui.calendar", "CommonDirective", 'services.net.common', 'service.currentUser'])
            .controller("IndexAppController",
            [
                "$scope", "$rootScope", "indexService", "$filter", 'commonNetService', 'currentUserService',
                '$location',
                'rolesService',
                function($scope,
                    $rootScope,
                    indexService) {

                    $scope.showOptions = true;
                    $scope.showOptions2 = true;
                    $scope.showOptions3 = true;
                    $scope.showSchoolOptions = true;
                    $scope.showSchoolOptions2 = true;
                    $scope.showSchoolOptions3 = true;
                    $scope.currentSelectedMonth = '按月选择';

                    //时间显示坐标
                    $scope.SelectedIndex = 2;
                    //是否显示目标
                    $scope.hasGoal = true;

                    function dateStart() {
                        var date = new Date();
                        var month = date.getMonth() + 1;
                        return date.getFullYear() + "-" + month + "-" + date.getDate() + " " + "00:00:00"
                    }
                    $scope.loadList = function() {
                        $scope.currentUser = $scope.currentUser.userId;
                        var req_task = {
                            Filter: {
                                UserId: $scope.currentUser,
                                BeginTime: dateStart(),
                                EndTime: dateStart()
                            },
                            Order: {
                                filed: 'NextFollowUpAt',
                                asc: true
                            },
                            Page: {
                                pageSize: 5,
                                pageIndex: 1
                            }
                        };
                        //任务
                        indexService.getTasks(req_task).then(function(result) {
                            $scope.tasksCount = result.data.data.totalCount;
                            $scope.tasks = result.data.data.missions;
                        });
                    };

                    var init = function() {
                        //$scope.loadList();
                    };
                    init();
                }
            ]);
    });