"use strict";
/**
 * author :zy
 * time: 2016年7月19日12:05:02
 * description: crm角色设置 控制器
 */

define(["angular", "services/net/oemrole", 'services/dialogService', 'services/commonService', 'modules/oemrole-app/services'], function (angular) {
    return angular.module("CrmroleApp.controllers", ["services.net.crmrole", "Dialog.services", 'Common.services', 'CrmRoleApp.services'])
        .controller("OemroleAppController", [
            "$scope", "$q", "$rootScope", "$state", "$timeout", "$http", "oemRoleNetService", "gintDialog", 'singleThreadedNetService', 'verifyEmployeeService', 'oemroleService',"messages",
            function ($scope, $q, $rootScope, $state, $timeout, $http, crmRoleNetService, gintDialog, singleThreadedNetService, verifyEmployeeService, crmRoleService, messages) {


                $scope.roleList = [];//左边列表
                $scope.selected = {};//左边列表的当前选中项
                $scope.selectedBackup = {};//左边列表的当前选中项——备份
                $scope.btnDisable = false;//全功能按钮禁用设置
                $scope.btnDisable1 = false;//删除、员工功能按钮禁用设置
                $scope.selectedOrg = {};//当前选择的Org
                $scope.roleListConfig = { order: { asc: false }, filter: { RoleName: "" }, page: { PageIndex: 1, PageSize: 20 } }; //获取角色列表的参数
                $scope.totalCount = 0;//角色总数
                $scope.isLoading = false;//防止多次请求加载roleList
                $scope.searchText = "";//显示搜索字段提示
                $scope.uiModel = {};//页面右边树结构模型
                $scope.isShowQuickAdditions = false; //快速添加弹框
                $scope.quickAdditions = { LoginName: '', Name: '', Password: '123456' };
                $scope.isSearch = false;//判断是否是搜索，主要用于无数据时判断
                $scope.showData = false;//右边是否显示树结构


                var _init = function () {

                    _queryList();
                }

                //左边列表
                var _queryList = function () {

                    crmRoleNetService.getRoleList($scope.roleListConfig).then(function (result) {
                        if (result.data.status == 1) {
                            $scope.btnDisable = false;
                            $scope.roleList = result.data.data.list;
                            $scope.showData = false;
                            if ($scope.roleList.length) {
                                $scope.selected = $scope.roleList[0];
                                $scope.totalCount = result.data.data.totalCount;
                                $scope.btnDisable1 = false;
                                _changeUiModelAndView($scope.selected.id);
                            }
                            else if (!$scope.roleList.length && !$scope.isSearch) { //如果第一次进来没数据
                                $scope.showData = true;
                                $scope.btnDisable1 = true;
                                $scope.totalCount = result.data.data.totalCount;
                                _changeUiModelAndView(0);
                            }
                            else {
                                $scope.selected = {};
                                $scope.totalCount = result.data.data.totalCount;
                                $scope.btnDisable1 = true;
                            }

                        }
                        else {
                            gintDialog.error(messages[result.data.type]);

                        }
                    });
                };

                //获取右边结构
                var _changeUiModelAndView = function (roleId) {

                    crmRoleService.getRoleById(roleId).then(function (uiModel) {
                        $scope.uiModel = uiModel;
                        document.body.scrollTop = 0;
                    });

                };

                //滚动条加载
                $scope.$on("gintLoadPageScrollData", function () {
                    if (!$scope.isLoading && $scope.roleListConfig.page.PageIndex < $scope.totalCount / $scope.roleListConfig.page.PageSize) {
                        $scope.isLoading = true;
                        $scope.roleListConfig.page.PageIndex += 1;
                        crmRoleNetService.getRoleList($scope.roleListConfig).then(function (result) {
                            if (result.data.status == 1) {
                                Array.prototype.push.apply($scope.roleList, result.data.data.list);
                            }
                            else {
                                gintDialog.error(messages[result.data.type]);
                            }
                            $scope.isLoading = false;
                        });
                    }
                });

                //点击三级权限开关
                $scope.changeThreeLevel = function (obj) {
                    //{father:fun,functionModel:childfun}
                    obj.functionModel.isRight = !obj.functionModel.isRight;
                    if (obj.functionModel.isRight) {
                        obj.father.setIsRight(true);
                    }
                };

                //点击一级权限
                $scope.isRightAll = function (functionGroup) {
                    var isRight = !functionGroup.isRight;
                    functionGroup.setAllChildrenIsRight(isRight);
                    functionGroup.setAllThreeFunIsRight(isRight);
                    //没有子权限，手动设置functionGroup的isRight
                    functionGroup.setIsRight(isRight);
                };

                //一级权限是否开{根据二级权限判断}
                $scope.getFirstLevelisRight = function (functionGroup) {
                    var isRight = functionGroup.getChilderIsHaveRight();
                    //如果没有子孩子isRigh为-1
                    if (isRight != -1) {
                        functionGroup.setIsRight(isRight);
                    }
                    return functionGroup.getIsRight()
                };

                //点击二级权限开关
                $scope.clickSecondLevel = function (fun) {
                    console.log(fun);
                    fun.setAllChildrenIsRight(!fun.getIsRight());
                    fun.setIsRight(!fun.getIsRight());
                };

                //点击列表
                $scope.onItemClick = function (item) {

                    if (uiModelIsHaveChange()) {
                        if ($scope.selected.id === 0) {

                            gintDialog.confirm("提醒", "是否放弃添加？").then(function () {
                                $scope.selected = item;
                                $scope.showData = false;
                                _changeUiModelAndView(item.id);
                                $scope.btnDisable = false;
                            }, function () {
                                return
                            });

                        }
                        else {

                            gintDialog.confirm('提醒', '是否放弃修改？').then(function () {
                                $scope.selected = item;
                                $scope.showData = false;
                                _changeUiModelAndView(item.id);
                                $scope.btnDisable = false;
                            }, function () {
                            });
                        }

                    }
                    else {
                        $scope.selected = item;
                        $scope.showData = false;
                        _changeUiModelAndView(item.id);
                        $scope.btnDisable = false;
                    }

                }

                //删除角色
                $scope.deleteRole = function () {
                    gintDialog.confirm('提醒', '确定删除？').then(function () {
                        crmRoleService.deleteRoleById($scope.selected.id).then(function (result) {
                            if (result.data.status == 1) {
                                gintDialog.success("操作成功");
                             //   $scope.isSearch = false;
                                _queryList();
                            } else {
                                gintDialog.error(messages[result.data.type]);
                            }
                        }
                        )
                    }, function () {
                        return
                    })
                };

                //加员工弹窗
                $scope.addEmployee = function () {
                    $scope.isShowQuickAdditions = true;
                };

                //加员工确定
                $scope.quickAdditionsSure = singleThreadedNetService(
                    function () {
                        //var s = addEmployeeVerifyService;
                        var verifyResult = verifyEmployeeService.verifyEmployeeInfo($scope.quickAdditions);
                        if (!verifyResult.status) {
                            gintDialog.error(verifyResult.message);
                            return false;

                        }
                        var EmployeeInfo = {
                            LoginName: $scope.quickAdditions.LoginName,
                            Name: $scope.quickAdditions.Name,
                            LoginPwd: $scope.quickAdditions.Password,
                            //CourseRole: [{ RoleIds: $scope.selected.id }],
                            RoleIds: [{ RoleId: $scope.selected.id }]

                        };
                        return crmRoleService.addEmployeeByRole(EmployeeInfo)
                            .success(function (result) {
                                if (result.status == 1) {
                                    $scope.isShowQuickAdditions = false;
                                    gintDialog.success("操作成功！");
                                    $scope.quickAdditions = { LoginName: '', Name: '', Password: '123456' };
                                    $scope.selected.bandCount = $scope.selected.bandCount + 1;
                                    for (var i = 0; i < $scope.roleList.length; i++) {
                                        if ($scope.roleList.id == $scope.selected.id) {
                                            $scope.roleList.bandCount = $scope.selected.bandCount;
                                            break;
                                        }
                                    }
                                } else {
                                    gintDialog.error(messages[result.type]);
                                }
                            })
                            .error(function (error) {
                            });
                    }
                );

                //加员工取消
                $scope.quickAdditionsCancel = function () {
                    $scope.isShowQuickAdditions = false;
                    $scope.quickAdditions = { LoginName: '', Name: '', Password: '123456' };

                };

                //加角色
                $scope.addRole = function () {
                    $scope.selectedBackup = $scope.selected;

                    if (uiModelIsHaveChange()) {
                        gintDialog.confirm('提醒', '是否放弃修改？').then(function () {
                            $scope.selected = { id: 0 };
                            $scope.btnDisable = true;
                            $scope.showData = true;
                            _changeUiModelAndView(0);
                        }, function () {
                        });
                    } else {
                        $scope.btnDisable = true;
                        $scope.selected = { id: 0 };
                        $scope.showData = true;
                        _changeUiModelAndView(0);
                    }
                };

                //时间排序
                $scope.orderByCreatedAt = function () {

                    $scope.roleListConfig.order.asc = !$scope.roleListConfig.order.asc;
                    $scope.roleListConfig.page.PageIndex = 1;
                    _queryList();
                };

                //保存
                $scope.submitRole = singleThreadedNetService(
                    function () {
                        //新建or编辑角色，根据role的Id判断
                        if (!$scope.uiModel.getName()) {
                            gintDialog.error("请输入角色名！");
                            return
                        }
                        if (!$scope.uiModel.getFunctionListIsHaveRight()) {
                            gintDialog.error("角色没有开启权限！");
                            return
                        }
                        if ($scope.uiModel.getName().length > 32) {
                            gintDialog.error("角色名不能超过32个字");
                            return;
                        }
                        return crmRoleService.editRole($scope.uiModel).then(function (result) {
                            if (result.data.status == 1) {
                                gintDialog.success("操作成功!");
                                //编辑
                                if ($scope.selected.id) {
                                    //如果是不是新建项,更新左侧对应列表的Name{业务上只有name可以修改影响到list}
                                    $scope.selected.roleName = $scope.uiModel.name;
                                    for (var i = 0; i < $scope.roleList.length; i++) {
                                        if ($scope.roleList.roleName == $scope.selectedBackup.roleName) {
                                            $scope.roleList.roleName = $scope.uiModel.name;
                                            break;
                                        }
                                    }

                                } else {
                                    //新建
                                    $scope.roleListConfig.page.PageIndex = 1;
                                    $scope.roleListConfig.filter.RoleName = "";
                                    $scope.searchText = "";
                                    $scope.isSearch = false;
                                    _queryList();
                                }
                                $scope.btnDisable = false;
                            }
                            else {
                                gintDialog.error(messages[result.data.type]);

                            }
                        }, function (result) {
                            gintDialog.error(result);
                        })

                    }
                );

                //取消
                $scope.cancelSubmit = function () {
                    if (uiModelIsHaveChange()) {


                        if ($scope.selected.id === 0) {
                            //如果是新建页面

                            gintDialog.confirm("提醒", "是否取消新建？")
                                .then(function () {
                                    //还原list选中项
                                    $scope.selected = $scope.selectedBackup;
                                    _changeUiModelAndView($scope.selected.id);
                                    $scope.btnDisable = false;//全功能按钮禁用设置
                                    $scope.showData = false;
                                }, function () {
                                    return
                                });

                        }
                        else {
                            if (uiModelIsHaveChange()) {
                                gintDialog.confirm("提醒", "是否放弃修改？")
                                    .then(function () {
                                        _changeUiModelAndView($scope.selected.id);
                                        $scope.btnDisable = false;//全功能按钮禁用设置
                                    }, function () {
                                        return
                                    });
                            } else {
                                return
                            }
                        }
                    }
                    else {
                        if ($scope.selected.id === 0) {
                            //如果是新建页面
                            //还原list选中项
                            $scope.selected = $scope.selectedBackup;
                            _changeUiModelAndView($scope.selected.id);
                            $scope.btnDisable = false;//全功能按钮禁用设置
                            $scope.showData = false;
                        }
                    }
                };

                //得到uiModel是否有过修改
                var uiModelIsHaveChange = function () {
                    var isHaveChange = false;
                    if ($scope.uiModel.id || $scope.uiModel.id === 0) {
                        isHaveChange = crmRoleService.getUiModelIsHaveChanage();
                    }
                    return isHaveChange;
                };

                //搜索
                $scope.searchByName = function () {

                    if (uiModelIsHaveChange()) {
                        if ($scope.selected.id === 0) {

                            gintDialog.confirm("提醒", "是否放弃添加？").then(function () {
                                $scope.roleListConfig.page.PageIndex = 1;
                                $scope.roleListConfig.order.asc = false;
                                $scope.roleListConfig.filter.RoleName = $scope.searchText;
                                if ($scope.searchText != "") {
                                    $scope.isSearch = true;
                                }
                                else {
                                    $scope.isSearch = false;
                                }
                                _queryList();
                            }, function () {
                                return
                            });

                        }
                        else {

                            gintDialog.confirm('提醒', '是否放弃修改？').then(function () {
                                $scope.roleListConfig.page.PageIndex = 1;
                                $scope.roleListConfig.order.asc = false;
                                $scope.roleListConfig.filter.RoleName = $scope.searchText;
                                if ($scope.searchText != "") {
                                    $scope.isSearch = true;
                                }
                                else {
                                    $scope.isSearch = false;
                                }
                                _queryList();
                            }, function () {
                            });
                        }

                    } else {
                        $scope.roleListConfig.page.PageIndex = 1;
                        $scope.roleListConfig.order.asc = false;
                        $scope.roleListConfig.filter.RoleName = $scope.searchText;
                        if ($scope.searchText != "") {
                            $scope.isSearch = true;
                        }
                        else {
                            $scope.isSearch = false;
                        }
                        _queryList();
                    }

                };

                _init();

                $scope._search = function (event) {
                    var e = event
                    var keyCode = e.keyCode;
                    if (keyCode == 13) {
                        $scope.searchByName();
                    }
                }
            }

        ]);
});