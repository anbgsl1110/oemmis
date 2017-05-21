"use strict";
/**
 * author :zy
 * time: 2016年07月012日 11:05:28
 * description: 系统参数控制器
 * modify：新增3个类别参数  产品类别  4，收款方式 5 ，班级类型 6
 */

define(["angular", "services/net/parameter", 'services/dialogService'], function (angular) {
    return angular.module("ParameterApp.controllers", ["services.net.parameter", "Dialog.services"])
        .controller("ParameterAppController", [
            "$scope", "$rootScope", "$state", "$timeout", "$http", "parameterNetService", "gintDialog", "messages",
            function ($scope, $rootScope, $state, $timeout, $http, parameterNetService, gintDialog, messages) {

                $scope.addLabelHtml = false;//显示隐藏弹窗
                // 提交判重
                $scope.commitFlg = true;
                $scope.currentLabel = {};
                $scope.parameterData = {};//页面数据
                $scope.orangeData = [];//橙色选择数组
                //$scope.checkRange = [];//查重选择数组
                //for (var i = 0; i <= 36; i++) {
                //    $scope.checkRange.push(i);
                //}
                for (var i = 0; i <= 167; i++) {
                    $scope.orangeData.push(i);
                }
                //$scope.isShowCheckRangeTime = false;
                $scope.isShowOrangeTime = false;
                $scope.isShowRedTime = false;

                //初始化、转换数据
                //modified at 2016-12-22 11:45:25 删除查重区间字段
                $scope.changeInitData = function (data) {
                    $scope.parameterData = {};
                    if (!data) {
                        gintDialog.error("系统异常");

                    }
                    if (!data.orangeTimeLimit) {
                        data.orangeTimeLimit = 0;

                        $scope.redData = [];
                        $scope.redData.push("永不提醒");

                    } else {

                        $scope.redData = [];
                        for (var i = data.orangeTimeLimit + 1; i <= 168; i++) {
                            $scope.redData.push(i);
                        }
                    }

                    if (!data.redTimeLimit) {
                        data.redTimeLimit = 1;
                    }
                    //if (!data.clueIsRepeatTimeLimit) {
                    //    data.clueIsRepeatTimeLimit = 0;
                    //}
                    $scope.parameterData.orangeTime = data.orangeTimeLimit;
                    $scope.parameterData.redTime = data.redTimeLimit;
                    //$scope.parameterData.autoMergeTime = data.clueIsRepeatTimeLimit;
                    if (data.orgLableList) {
                        var obj = {}
                        obj.Name = "渠道类别";
                        obj.ChildLabels = [];
                        var obj1 = {};
                        obj1.Name = "线索类别";
                        obj1.ChildLabels = [];
                        var obj2 = {};
                        obj2.Name = "跟进方式";
                        obj2.ChildLabels = [];
                        var obj3 = { Name: "产品类别", ChildLabels: [] };
                        var obj4 = { Name: "收款方式", ChildLabels: [] };
                        var obj5 = { Name: "班级类型", ChildLabels: [] };

                        for (var i = 0; i < data.orgLableList.length; i++) {
                            var childObj = {};
                            childObj.Name = data.orgLableList[i].name;
                            childObj.Id = data.orgLableList[i].id;
                            childObj.isDelete = data.orgLableList[i].isDelete;
                            childObj.isFixed = data.orgLableList[i].isFixed;
                            childObj.type = data.orgLableList[i].type;
                            if (data.orgLableList[i].type == 1) {
                                obj.ChildLabels.push(childObj);
                            }
                            else if (data.orgLableList[i].type == 2) {
                                obj1.ChildLabels.push(childObj);
                            }
                            else if (data.orgLableList[i].type == 3) {
                                obj2.ChildLabels.push(childObj);
                            }
                            else if (data.orgLableList[i].type == 4) {
                                obj3.ChildLabels.push(childObj);
                            }
                            else if (data.orgLableList[i].type == 5) {
                                obj4.ChildLabels.push(childObj);
                            }
                            else if (data.orgLableList[i].type == 6) {
                                obj5.ChildLabels.push(childObj);
                            }
                        }
                        $scope.parameterData.Labels = [];
                        $scope.parameterData.Labels.push(obj3);
                        $scope.parameterData.Labels.push(obj);
                        $scope.parameterData.Labels.push(obj1);
                        $scope.parameterData.Labels.push(obj2);
                        $scope.parameterData.Labels.push(obj4);
                        $scope.parameterData.Labels.push(obj5);
                    }

                    //console.log(data);
                    //console.log($scope.parameterData);
                }

                //获取数据方法
                $scope.getData = function () {
                    parameterNetService.getParameter().then(function (result) {
                        if (result.data.status == 1) {
                            $scope.changeInitData(result.data.data);
                        }
                        else {
                            gintDialog.error(messages[result.data.type]);
                        }

                    });
                    //获取数据
                }
                $scope.getData();

                //限时click事件
                //$scope.changeCheckRangeTime = function (data) {
                //    $scope.parameterData.autoMergeTime = data;
                //    $scope.isShowCheckRangeTime = false;
                //}
                $scope.changeOrangeTime = function (data) {
                    $scope.parameterData.orangeTime = data;
                    $scope.isShowOrangeTime = false;
                    //橙色选中后需要限制红色的
                    $scope.redData = [];
                    if (data == 0) {
                        $scope.redData.push("永不提醒");
                    } else {
                        for (var i = data + 1; i <= 168; i++) {
                            $scope.redData.push(i);
                        }
                    }
                    $scope.parameterData.redTime = data + 1;
                }
                $scope.changeRedTime = function (data) {
                    $scope.parameterData.redTime = data;
                    $scope.isShowRedTime = false;
                }

                //添加标签别弹窗、校验、取消
                $scope.addLabel = function (data) {
                    ////填写类别
                    $scope.fatherName = data;
                    if ($scope.fatherName == "渠道类别") {
                        $scope.fatherType = 1;
                    }
                    if ($scope.fatherName == "线索类别") {
                        $scope.fatherType = 2;
                    }
                    if ($scope.fatherName == "跟进方式") {
                        $scope.fatherType = 3;
                    }
                    if ($scope.fatherName == "产品类别") {
                        $scope.fatherType = 4;
                    }
                    if ($scope.fatherName == "收款方式") {
                        $scope.fatherType = 5;
                    }
                    if ($scope.fatherName == "班级类型") {
                        $scope.fatherType = 6;
                    }
                    $scope.addLabelHtml = true;
                }
                $scope.checkLabel = function (labelName) {
                    //前端查重
                    for (var i = 0; i < $scope.parameterData.Labels.length; i++) {
                        if ($scope.parameterData.Labels[i].Name == $scope.fatherName) {
                            for (var s = 0; s < $scope.parameterData.Labels[i].ChildLabels.length; s++) {
                                if ($scope.parameterData.Labels[i].ChildLabels[s].Name == labelName) {
                                    gintDialog.error('类别名称已存在！');
                                    return;
                                };
                            };
                        };
                    };


                    //后端查重
                    parameterNetService.checkLabel(labelName,$scope.fatherType).then(function (result) {
                        if(result.data.status==1){
                            if(!result.data.data){//不存在
                                var obj = {};
                                obj.isDelete = false;
                                obj.isFixed = false;
                                obj.type = $scope.fatherType;
                                obj.Id = 0;
                                obj.Name = labelName;
                                var keepGoing = true;
                                angular.forEach($scope.parameterData.Labels, function (ss) {
                                    if (keepGoing && ss.Name == $scope.fatherName) {
                                        ss.ChildLabels.push(obj);
                                        keepGoing = false;
                                    }

                                });//标签加到页面上

                                $scope.addLabelHtml = false;
                            }
                            else {
                                gintDialog.error('类别名称已存在！');
                            }
                        }

                    });


                }
                $scope.cancelLabel = function () {
                    $scope.addLabelHtml = false;
                }

                //删除标签
                $scope.deleteLabel = function (data, pData) {//pData居然是引用而非值传递
                    //如果是新建直接从队列中删除，如果是原有的先查其关联，后改其字段
                    if (data.Id == 0) {
                        for (var i = 0; i < pData.ChildLabels.length; i++) {
                            if (pData.ChildLabels[i] == data) {
                                pData.ChildLabels.splice(i, 1);
                                break;
                            }
                        }
                    } else {
                        //原有的标签
                        parameterNetService.labelIsRelated(data.Id,data.type).then(function (result) {
                            if (result.data.status == 1) {

                                if (result.data.data == true) {
                                    gintDialog.confirm('提醒', '该类别已经被关联，如果删除，将无法通过该类别查询到已经关联的数据，删除后无法撤回，是否确定删除？').then(function () {
                                        data.isDelete = true;

                                    }, function () {
                                        return
                                    })
                                }
                                else {//未被关联直接删除
                                    data.isDelete = true;
                                }
                            }
                            else {
                                gintDialog.error(messages[result.data.type]);//查关联失败报错
                            }

                        }, function (result) {
                            gintDialog.error(result);//服务器出错？
                        }
                        )
                    }
                }

                //保存
                $scope.save = function () {
                    // 重复提交限制
                    if (!$scope.commitFlg) {
                        gintDialog.error('请勿重复提交！');
                        return;
                    }
                    $scope.commitFlg = false;
                    var filter = {};
                    //ClueIsRepeatTimeLimit 这个字段不要了，设为undefined
                    filter.ClueIsRepeatTimeLimit = null;
                    filter.OrangeTimeLimit = $scope.parameterData.orangeTime;
                    filter.RedTimeLimit = $scope.parameterData.redTime;
                    filter.OrgLableList = [];
                    for (var i = 0; i < $scope.parameterData.Labels.length; i++) {
                        for (var l = 0; l < $scope.parameterData.Labels[i].ChildLabels.length; l++) {

                            if (!$scope.parameterData.Labels[i].ChildLabels[l].Id || $scope.parameterData.Labels[i].ChildLabels[l].isDelete) {


                                var obj = {};
                                obj.Id = $scope.parameterData.Labels[i].ChildLabels[l].Id;
                                obj.Name = $scope.parameterData.Labels[i].ChildLabels[l].Name;
                                obj.isDelete = $scope.parameterData.Labels[i].ChildLabels[l].isDelete;
                                obj.isFixed = $scope.parameterData.Labels[i].ChildLabels[l].isFixed;
                                obj.type = $scope.parameterData.Labels[i].ChildLabels[l].type;

                                filter.OrgLableList.push(obj);

                            }
                        }
                    }
                    parameterNetService.saveParameter(filter).then(function (result) {
                        if (result.data.status == 1) {
                            gintDialog.success("保存成功！");
                            $scope.getData();
                            $scope.commitFlg = true;
                        }
                        else {
                            var str = result.data.data.message.substring(0, result.data.data.message.length - 1);
                            gintDialog.error("已存在类别" + str);
                            $scope.getData();
                         //   gintDialog.error(messages[result.data.type]);
                            $scope.commitFlg = true;
                        }

                    })

                }
                $scope.cancel = function () {
                    $scope.getData();
                }
            }
        ]);
});