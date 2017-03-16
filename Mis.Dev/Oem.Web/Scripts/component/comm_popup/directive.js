define(['angular', 'ngDialog'], function (angular) {
    angular.module('Components.commPopup', ['ngDialog'])
        .directive('commPopup', ['gintDialog', function (gintDialog) {

            return {
                restrict: 'E',
                scope: {
                    myTitle: '@',
                    cancelAction: '&',
                    confirmAction: '&',
                    clearAction: "=",
                    arrList:"="
                },
                templateUrl: 'components/comm_popup/template.html',
                link: function ($scope, element, attrs) {
                    //点击了取消
                    $scope.doCancel = function () {
                        //element.fadeOut();
                        $scope.cancelAction();
                        console.log($scope.commPoppuInput);
                    }
                    $scope.commPoppuTime = new Date().toLocaleDateString();
                    //点击了确定
                    $scope.doConfirm = function () {
                        if ($scope.validate()) {
                            var data = {};
                            if ($scope.type == 1) {
                                data.name = $scope.name;
                                $scope.lastName = $scope.name;
                                $scope.lastNum = $scope.number;
                                data.number = $scope.number;
                            }
                            else if ($scope.type == 0) {
                                $scope.lastName = $scope.name;
                                data.name = $scope.name;
                            }
                            $scope.confirmAction({ data: { data: data} });
                        }
                    }
                    $scope.validate = function () {
                        var flg = true;
                        if ($scope.type == 1) {
                            if ($scope.number.trim() == "") {
                                gintDialog.error('请输入编号');
                                flg = false;
                                return flg;
                            }
                            if ($scope.number.length > 100) {
                                gintDialog.error('编号不能超过100');
                                flg = false;
                                return flg;
                            }
                        }
                        if ($scope.name.trim() == "") {
                            gintDialog.error('请输入名称');
                            flg = false;
                            return flg;
                        }
                        if ($scope.name.length > 100) {
                            gintDialog.error('名称不能超过100');
                            flg = false;
                        }
                        return flg;
                    }
                    $scope.clearAction = function () {
                        $scope.name = $scope.lastName;
                        if ($scope.type == 1) {
                            $scope.number = $scope.lastNum;
                        } else {
                            $scope.number = "";
                        }
                    }
                }
            };
        } ]);
});
