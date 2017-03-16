'use strict';

/**
 * author :cwj
 * time: 2016年12月21日14:47:59
 * description: 发现同手机学员，选择已有学员 弹窗
 */

define(['angular', 'services/dialogService', "services/net/common"], function (angular) {
    angular.module('Components.SameStudentPopup', ["Dialog.services", "services.net.common"])
        .directive('sameStudentPopup', [
            "$rootScope", "$timeout", "$http", "gintDialog", "messages", "commonNetService", function ($rootScope, $timeout, $http, gintDialog, messages, commonNetService) {
                return {
                    restrict: 'E',
                    templateUrl: 'components/samestudent-popup/template.html',
                    replace: true,
                    scope: {
                        //展示类型（隐藏 0，选择已有学员 1，发现同手机号学员弹窗 2）
                        renderType: '=',
                        //相同手机号学员列表
                        sameStudents: '=',
                        confirmCallback: '&'
                    },
                    link: function (scope, $element, $attrs) {
                        var chooseData = null;
                        //初始化函数
                        scope.init = function () {
                            //选择已有学员第一步，手机号搜索
                            scope.step = 1;
                            scope.chooseIndex = undefined;
                            scope.inputPhone = "";
                        }
                        //选择数据
                        scope.chooseItem = function (data, index) {
                            //选择
                            if (scope.chooseIndex != index) {
                                scope.chooseIndex = index;
                                chooseData = data;
                            }
                                //取消
                            else {
                                scope.chooseIndex = undefined;
                                chooseData = null;
                            }
                        }
                        scope.searchStudent = function () {
                            if (scope.inputPhone) {
                                commonNetService.getStuInfosByPhone({ phone: scope.inputPhone }).success(function (result) {
                                    scope.sameStudents = result.data;
                                    scope.step = 2;
                                });

                            } else {
                                //叶亮说，啥事都不做。
                            }
                        }
                        //取消按钮
                        scope.cancel = function () {
                            scope.reset();
                        }
                        //确定按钮操作
                        scope.confirm = function () {
                            if (chooseData != null) {
                                scope.confirmCallback({ data: chooseData });
                                scope.reset();
                            } else {
                                //这个else讲道理永远触发不到。
                                gintDialog.error("请选择学员，再确定");
                            }
                        }
                        scope.reset = function () {
                            scope.inputPhone = "";
                            scope.renderType = 0;
                            scope.step = 1;
                            chooseData = null;
                            scope.chooseIndex = undefined;
                        }
                        scope.init();
                    }
                };
            }
        ]);
});
