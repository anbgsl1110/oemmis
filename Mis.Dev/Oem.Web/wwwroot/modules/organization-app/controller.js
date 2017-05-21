"use strict";

define(["angular", 'services/dialogService'], function (angular) {
    return angular.module("OrganizationApp.controllers", ["Dialog.services", "Components.singlePopup"])
        .controller("OrganizationAppController", [
            "$scope", "$rootScope", "$state","OrganizationAppServices","$http", "gintDialog",
            function ($scope, $rootScope, $state, OrganizationAppServices, $http, gintDialog) {
                console.log("OrganizationApp");
                //对树操作的类型 0:详情 1:添加 2:编辑
                $scope.treeType = 0;
                $scope.TreeData = [];
                //根据id向一个数组中添加对象 去除重复 （item加到con）
                function addItem(con, item, id) {
                    id = id || "id";
                    item.forEach(function (v) {
                        con.forEach(function (value) {
                            v.id == value[id] && !value.isDelete && (v["has"] = true, value.isDelete = false);
                        });
                        !v["has"] && con.push(v);
                    });
                }
                 OrganizationAppServices.services().getChildren(0).success(function(data) {
                     $scope.TreeData = data.data.children;
                     $scope.selectedItem = $scope.TreeData[0];
                     console.log($scope.selectedItem);
                 });
                $scope.itemClicked = function ($item, $even) {
                    $scope.selectedItem = $item;
                    $scope.departmentName = $item.name;
                    $scope.prevName = "";
                    $scope.treeType = 0;
                    console.log($scope.selectedItem, 'item clicked');
                };
                //点击编辑当前部门
                $scope.editSelected = function() {
                    $scope.treeType = 2;
                    $scope.editItemName = $scope.selectedItem.name;
                    $scope.tempSchoolIds = angular.copy($scope.selectedItem.schools);
                }
                //校区事件 
                $scope.showSchool = function () {
                    $scope.schoolModalOptions.accessor.reload();
                    $scope.isShowSchoolModal = true;
                    console.log("show School!");
                }
                $scope.shoolConfirmCallback = function (data) {
                    $scope.tempSchoolIds = $scope.tempSchoolIds || [];
                    addItem($scope.tempSchoolIds, data.list);
                    $scope.isShowSchoolModal = false;
                };
                $scope.shoolCancleCallback = function () {
                    $scope.isShowSchoolModal = false;
                }
                $scope.delShool = function (schoole) {
                    $scope.tempSchoolIds.splice($scope.tempSchoolIds.indexOf(schoole), 1);
                }
                //校区多选框
                $scope.isShowSchoolModal = false;
                $scope.schoolList = [];
                $scope.schoolModalOptions = OrganizationAppServices.services().schoolPop;
                //添加下级部门
                $scope.saveSub = function () {
                    var isInvalid = false;
                    $scope.addSubName || (gintDialog.error("请输入部门名称！"), isInvalid = true);
                    $scope.addSubName.length < 32 || (gintDialog.error("部门名称最多允许输入32个字！"), isInvalid = true);
                    $scope.tempSchoolIds.length || (gintDialog.error("请选择校区权限！"), isInvalid = true);
                    if (isInvalid) return false;
                    var _item = {
                        name: $scope.addSubName,
                        parentId: $scope.selectedItem.id,
                        parentName: $scope.selectedItem.name,
                        schools: $scope.tempSchoolIds.map(function (v) {
                            return v.id;
                        })
                    };
                    $scope.canDo = true;
                    OrganizationAppServices.services().addChildren(_item).success(function (result) {
                        console.log(1);
                        if (!result.type) {
                            _item.id = result.data;
                            _item.schools = $scope.tempSchoolIds;
                            $scope.selectedItem.children = $scope.selectedItem.children || [];
                            $scope.selectedItem.children = $scope.selectedItem.children.concat([_item]);
                            $scope.selectedItem.$$isExpend = true;
                            $scope.selectedItem.hasChildren = true;
                            $scope.selectedItem = _item;
                            $scope.treeType = 0;
                            gintDialog.success("操作成功");
                        } else {
                            gintDialog.error(result.message);
                        }
                        $scope.canDo = false;
                    });
                   
                }
                //删除部门
                $scope.delDep = function () {
                    if (!$scope.selectedItem.parentId) return false;
                    gintDialog.confirm("提醒", "确定要删除该部门吗？").then(function () {
                        OrganizationAppServices.services().DeleteDepartment($scope.selectedItem.id).success(function(result) {
                            if (!result.type) {
                                $scope.selectedItem.isDelete = true;
                                $scope.selectedItem = $scope.TreeData[0];
                                gintDialog.success("操作成功");
                                $scope.treeType = 0;
                            } else {
                                gintDialog.error(result.message);
                            }
                        });
                    });
                }
                //保存编辑部门
                $scope.saveEditDep = function () {
                    var isInvalid = false;
                    $scope.editItemName || (gintDialog.error("请输入部门名称！"), isInvalid = true);
                    $scope.editItemName.length <= 32 || (gintDialog.error("部门名称最多允许输入32个字！"), isInvalid = true);
                    $scope.tempSchoolIds.length || (gintDialog.error("请选择校区权限！"), isInvalid = true);
                    if (isInvalid) return false;
                    if ((angular.toJson($scope.selectedItem.schools) != angular.toJson($scope.tempSchoolIds))) {

                        OrganizationAppServices.services().IsDepartmentHasUser(
                             $scope.selectedItem.id
                        ).success(function (hasEmp) {
                            if (!hasEmp.data) {
                                $scope.toSave();
                                return false;
                            }
                            OrganizationAppServices.services().DepartmentHasChangeClues({
                                departmentId: $scope.selectedItem.id,
                                schoolIds: $scope.tempSchoolIds.map(function (v) {
                                    return v.id;
                                })
                            }).success(function (result) {
                                if (result.data) {
                                    gintDialog.confirm("提醒", "您修改了部门的校区权限，保存后部门内员工的校区权限将会被更新，且员工原校区中待跟进或跟进中的线索会被更新为待分配状态，是否确定？").then(function () {
                                        $scope.isLoading = true;
                                        $scope.toSave();
                                    });
                                } else {
                                    gintDialog.confirm("提醒", "您修改了部门的校区权限，保存后部门内员工的校区权限将会被更新，是否确定？").then(function () {
                                        $scope.isLoading = true;
                                        $scope.toSave();
                                    });
                                }
                            });
                        });
                    } else {
                        $scope.toSave();
                    }
                }
                $scope.toSave = function () {
                    var tempItem = angular.copy($scope.selectedItem);
                    tempItem.name = $scope.editItemName;
                    tempItem.schools = $scope.tempSchoolIds.map(function (v) {
                        return v.id;
                    });
                    $scope.canDo = true;
                    OrganizationAppServices.services().updateDepartment(tempItem).success(function (result) {
                        console.log($scope.selectedItem);
                        if (!result.type) {
                            $scope.selectedItem.schools = $scope.tempSchoolIds;
                            $scope.selectedItem.name = $scope.editItemName;
                            $scope.selectedItem.children && $scope.selectedItem.children.length && $scope.selectedItem.children.map(function (v, i) {
                                v.parentName = $scope.editItemName;
                            });
                            $scope.isLoading = false;
                            gintDialog.success("操作成功");
                            $scope.treeType = 0;
                        } else {
                            $scope.isLoading = false;
                            gintDialog.error(result.message);
                        }
                        $scope.canDo = false;
                    });
                }
            }
        ]);
});