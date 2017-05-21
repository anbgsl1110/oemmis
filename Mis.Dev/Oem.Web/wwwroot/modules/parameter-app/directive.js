'use strict';

/**
 * author :zy
 * time: 2016年7月13日16:34:54
 * description: 小弹窗
 */

define(['angular', 'jquery', 'services/dialogService'], function (angular, $) {
    angular.module('ParameterApp.textPopup', ["Dialog.services"])
        .directive('textPopup', [
            "$rootScope", "$timeout", "gintDialog", function ($rootScope, $timeout, gintDialog) {
                return {
                    restrict: 'E',
                    templateUrl: 'modules/parameter-app/template.html',
                    replace: true,
                    scope: {
                        mycallback: "&",        //确定
                        fatherName: "=",       //调用者
                        myCancel:"&"            //取消
                    },
                    link: function ($scope, $element, $attrs) {
                        $scope.newLabel="";
                        $scope.save = function () {
                            if ($scope.newLabel.trim() == "") {
                                gintDialog.error("请输入类别名称！");
                                return;
                            }
                            $scope.mycallback({ data: $scope.newLabel });
                        };
                        $scope.cancel = function () {
                            $scope.myCancel();
                        };


                    }
                };
            }
        ]);
});
