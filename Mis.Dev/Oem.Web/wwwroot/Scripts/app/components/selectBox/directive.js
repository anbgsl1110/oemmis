/**
 * Created by LTD on 2016/7/8.
 * CRM下拉组件
 */

define(['angular'], function (angular) {
    return angular.module('Components.selectBox', [])
        .directive('selectBox', ['$http', function ($http) {
            return {
                restrict: 'E',
                scope: {
                    //是否禁用
                    isDisabled: "=",
                    //显示默认值，配合keyWords使用
                    defaultData: "=",
                    //选中内容
                    selectedData: "=",
                    //下拉数组
                    selectListData: "=",
                    //关键字对应的文案
                    selectFiled: "@",
                    //选中回调事件
                    whenSelectedAction: "&",
                    selectedStyle: "@",
                },
                templateUrl: 'components/selectBox/template.html',
                link: function ($scope, element, attrs) {
                    $scope.showlist = false;
                    $(element[0]).find('button,ul').attr("style", $scope.selectedStyle);
                    $scope.selectd = function (idx) {
                        $scope.selectedData = $scope.selectListData[idx];
                        $scope.whenSelectedAction({
                            data: $scope.selectedData
                        });
                    }
              }
            };
        }])
});

