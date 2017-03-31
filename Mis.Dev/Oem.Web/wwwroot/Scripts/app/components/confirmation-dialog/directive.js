define(['angular', 'ngDialog'], function (angular) {
    angular.module('Components.confirmationDialog', ['ngDialog'])
        .directive('confirmationDialog', ['gintDialog', '$rootScope', function (gintDialog, $rootScope) {

            return {
                restrict: 'EA',
                scope: {
                    cancelAction: '&',
                    confirmAction: '&',
                    dialogConfig: '=',
                },
                templateUrl: 'components/confirmation-dialog/template.html',
                link: function ($scope, element, attrs) {
                    console.log($scope.dialogConfig);
                    $scope.newPassword = "";
                    //点击了取消
                    $scope.dgCancel = function () {
                        $scope.newPassword = "";
                        $scope.dialogConfig.isShowDialog = false;
                        $scope.cancelAction();
                    }
                    //点击了确定
                    $scope.dgConfirm = function () {
                        if (!$scope.dialogConfig.isEmptyAble) {
                            if ($scope.validate()) {
                                if ($scope.newPassword.length < 6 || $scope.newPassword.length > 16) {
                                    gintDialog.error($scope.dialogConfig.outLengthErrMsg);
                                    return
                                }
                                $scope.dialogConfig.isShowDialog = false;
                                $scope.confirmAction({ data: { data: $scope.newPassword } });
                                $scope.newPassword = "";
                            } else {
                                gintDialog.error($scope.dialogConfig.emptErrMsg);
                            }
                        }
                    }
                    $scope.validate = function () {
                        var flg = true;
                        if ($scope.newPassword.trim()) {
                            flg = true;
                        } else {
                            flg = false;
                        }
                        return flg;
                    }
                }
            };
        }]);
});
