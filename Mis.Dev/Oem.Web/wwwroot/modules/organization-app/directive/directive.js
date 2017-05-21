'use strict';

/**
 * author :CBH
 * time: 2016年9月26日20:26:24
 * description: 树节点
 */

define(['angular', 'jquery'], function (angular, $) {
    angular.module('OrganizationApp.tree', ["OrganizationApp.services"])
        .directive('treeView', [
            "$rootScope", "$timeout", "OrganizationAppServices", function ($rootScope, $timeout, OrganizationAppServices) {
                return {
                    restrict: 'E',
                    templateUrl: 'modules/organization-app/directive/treeView.html',
                    scope: {
                        treeData: '=',
                        canChecked: '=',
                        textField: '@',
                        itemClicked: '&',
                        itemCheckedChanged: '&',
                        itemTemplateUrl: '@',
                        selectedItem: '=',
                        ulWidth: '='
                    },
                    controller: [
                        '$scope', function ($scope) {
                            $scope.ulWidth = { "width": "182px" };
                            $scope.itemExpended = function(item, $event) {
                                item.$$isExpend = !item.$$isExpend;
                                OrganizationAppServices.services().getChildren(item.id).success(function (data) {
                                    if (data.data.children.length){
                                        var resultWidth = (157 + 25 * (data.data.children[0].level)) + "px";
                                        if (parseInt($scope.ulWidth.width) <= parseInt(resultWidth)) {
                                            if (item.$$isExpend) {
                                                $scope.ulWidth.width = resultWidth;
                                            } else {
                                                $scope.ulWidth.width = (157 + 25 * (data.data.children[0].level - 1)) + "px";
                                            }
                                        }
                                        if (data.data.children[0].level == 2 && !item.$$isExpend)
                                            $scope.ulWidth.width = "182px";
                                        item.children = data.data.children;
                                    }
                                }); 
                                $event.stopPropagation();
                            };

                            $scope.isLeaf = function (item) {
                                var deleteNum = 0;
                                try {
                                    item.children.forEach(function (v, i) {
                                        if (v.isDelete) {
                                            deleteNum++;
                                        }
                                    });
                                } catch (e) {
                                    
                                }
                                return !item.hasChildren || (deleteNum === item.children.length);
                                //return false;
                            };
                            $scope.isSelected = function (item) {
                                return $scope.selectedItem && item.id == $scope.selectedItem.id;
                            }
                            $scope.warpCallback = function(callback, item, $event) {
                                ($scope[callback] || angular.noop)({
                                    $item: item,
                                    $event: $event
                                });
                            };
                        }
                    ]
                };
            }
        ]);
});
