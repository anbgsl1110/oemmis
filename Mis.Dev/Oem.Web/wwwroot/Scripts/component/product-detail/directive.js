/**
 * Created by cwj on 2016/10/20.
 * 产品库详情用于线索   可用于显签约详情和签约编辑。
 */

define(['angular', "components/multiple-popup/directive", "components/selectBox/directive", "services/dialogService"], function (angular) {
    return angular.module('Components.productDetail', ["Components.multiplePopup", "Components.selectBox", "Dialog.services"])
        .directive('productDetail', [
            '$http', "gintDialog", "$filter", "$timeout", function ($http, gintDialog, $filter, $timeout) {
                return {
                    restrict: 'E',
                    scope: {
                        //显示类型
                        showType: "=",
                        listData: "=",
                        schoolId: "=",
                        classTypes: "=",
                        schoolName: "=",
                        classHour: "=",
                        amount: "="
                    },
                    templateUrl: 'components/product-detail/template.html',
                    link: function ($scope) {
                        //金额校验正则
                        var reg = /^(\d)+(\.)?[0-9]{0,2}$/;
                        //获取可用产品列表。
                        function getProductList(request) {
                            return function (params) {
                                var listRequest = {
                                    key: params.search,
                                    filter:
                                        request,
                                    page: {
                                        pageIndex: params.page,
                                        pageSize: 20
                                    }
                                }
                                var url = "/api/ProductApi/GetCanSignProductList";
                                return $http.post(url, listRequest);
                            }
                        }
                        $scope.getClassHourSum = function (index) {
                            if ($scope.listData) {
                                $scope.classHour = 0;
                                for (var i = 0; i < $scope.listData.length; i++) {
                                    if (index == i) {
                                        if ($scope.listData[i].signClassHour) {
                                            if (!reg.test($scope.listData[i].signClassHour)) {
                                                gintDialog.error("课时数只支持输入0或小数点后最多两位的正数，且不能大于产品“总课时”！");
                                            } else {
                                                if ($scope.listData[i].signClassHour > $scope.listData[i].classHour) {
                                                    gintDialog.error("课时数只支持输入0或小数点后最多两位的正数，且不能大于产品“总课时”！");
                                                } else {
                                                    $scope.classHour += parseFloat($scope.listData[i].signClassHour);
                                                }
                                            }

                                        } else {
                                            gintDialog.error("请输入课时数！");
                                        }
                                    } else {
                                        if ($scope.listData[i].signClassHour) {
                                            $scope.classHour += parseFloat($scope.listData[i].signClassHour);
                                        }
                                    }
                                }

                            } else {
                                return;
                            }
                        }
                        $scope.getAmountSum = function (index) {
                            if ($scope.listData) {
                                $scope.amount = 0;
                                for (var i = 0; i < $scope.listData.length; i++) {
                                    if (index == i) {
                                        if ($scope.listData[i].amount) {
                                            if (!reg.test($scope.listData[i].amount)) {
                                                gintDialog.error("签约金额只支持输入0或小数点后最多两位的正数！");
                                            } else {
                                                $scope.amount += parseFloat($scope.listData[i].amount);
                                            }
                                        } else {
                                            gintDialog.error("请输入签约金额！");
                                        }
                                    } else {
                                        if ($scope.listData[i].amount) {
                                            $scope.amount += parseFloat($scope.listData[i].amount);
                                        }
                                    }
                                }

                            } else {
                                return;
                            }
                        }
                        //初始化产品页面
                        $scope.init = function () {
                            //弹窗设置
                            $scope.isShowProduct = false;
                            $scope.productList = [];
                            $scope.productModalOptions = {
                                tabs: function (params) {
                                    var listRequest = {
                                        key: params.search,
                                        filter: {
                                            schoolId: request
                                        },
                                        page: {
                                            pageIndex: params.page,
                                            pageSize: 20
                                        }
                                    }
                                    var url = "/api/ProductApi/GetCanSignProductList";
                                    return $http.post(url, listRequest);
                                },
                                title: "添加签约产品",
                                placeholder: "产品编号/产品名称",
                                list: [
                                    {
                                        title: "产品编号",
                                        field: "serial"
                                    },
                                    {
                                        title: "产品名称",
                                        field: "name"
                                    }
                                ],
                                selectedList: [
                                    {
                                        title: "产品编号",
                                        field: "serial"
                                    },
                                    {
                                        title: "产品名称",
                                        field: "name"
                                    }
                                ]
                            };
                            //编辑设置初始化
                            if ($scope.showType == 2) {
                                //product弹窗配置

                                if ($scope.listData) {
                                    //编辑签约
                                    var tempProductIds = [];
                                    if ($scope.listData.length > 0) {

                                        for (var i = 0; i < $scope.listData.length; i++) {
                                            //初始化上课校区
                                            $scope.listData[i].schoolData = { id: $scope.schoolId, name: $scope.schoolName }
                                            //格式化预开班时间                                           
                                            if ($scope.listData[i].beginDate != "/Date(-62135596800000)/") {
                                                $scope.listData[i].beginDate = $filter("formatJsonDate")($scope.listData[i].beginDate, "yyyy/MM/dd");
                                            } else {
                                                $scope.listData[i].beginDate = "";
                                            }
                                            //初始化报名班型
                                            if ($scope.listData[i].classTypeId) {
                                                $scope.listData[i].classTypeData = { id: $scope.listData[i].classTypeId, name: $scope.listData[i].typeName }
                                            } else {
                                                $scope.listData[i].classTypeData = { id: undefined, name: "请选择报名班型" };
                                            }
                                            tempProductIds.push($scope.listData[i].id);
                                        }

                                    }
                                    $scope.getItemSchoolList({ ProductIds: tempProductIds }).then(function (result) {
                                        if (result.data.status) {
                                            if (result.data.data.list.length > 0) {
                                                for (var i = 0; i < result.data.data.list.length; i++) {
                                                    $scope.listData[i].schoolTypes = result.data.data.list[i].list;
                                                }
                                            }
                                        }
                                    });

                                    //初始化生成金额和课时之和
                                    $scope.getAmountSum();
                                    $scope.getClassHourSum();
                                }
                            }
                        }

                        //获取可选择校区列表
                        $scope.getItemSchoolList = function (request) {
                            return $http.post("/api/OrgApi/GetProductSchoolListByProductId", request);
                        }
                        //选择后产品回调
                        $scope.chooseProductCallBack = function (data) {
                            $scope.isShowProduct = false;
                            if (data) {
                                //签约分支
                                if (!$scope.listData) {
                                    $scope.listData = [];
                                    var tempArray = [];
                                    for (var i = 0; i < data.list.length; i++) {
                                        var tempData = data.list[i];

                                        tempData.classTypeData = $scope.classTypes[0];
                                        tempData.schoolData = {
                                            id: $scope.schoolId, name:
                                                       $scope.schoolName
                                        };
                                        tempData.amount = angular.copy(tempData.price);
                                        tempData.signClassHour = angular.copy(tempData.classHour);
                                        tempData.schoolId = $scope.schoolId;
                                        $scope.listData.push(tempData);
                                        tempArray.push(tempData.id);
                                    }
                                    $scope.getItemSchoolList({ ProductIds: tempArray }).then(
                                        function (result) {
                                            if (result.data.status) {
                                                if (result.data.data.list.length > 0) {
                                                    for (var i = 0; i < result.data.data.list.length; i++) {
                                                        $scope.listData[i].schoolTypes = result.data.data.list[i].list;
                                                    }
                                                }
                                            }
                                        });
                                } else {
                                    //编辑签约分支
                                    var tempArray = [];
                                    for (var j = 0; j < $scope.listData.length; j++) {
                                        tempArray.push($scope.listData[j].id);
                                    }
                                    for (var i = 0; i < data.list.length; i++) {
                                        var index = tempArray.indexOf(data.list[i].id);
                                        if (index == -1) {
                                            tempArray.push(data.list[i].id);
                                            var tempData = data.list[i];
                                            tempData.classTypeData = $scope.classTypes[0];
                                            tempData.schoolData = {
                                                id: $scope.schoolId,
                                                name:
                                                    $scope.schoolName
                                            };
                                            tempData.amount = angular.copy(tempData.price);
                                            tempData.signClassHour = angular.copy(tempData.classHour);
                                            tempData.schoolId = $scope.schoolId;
                                            $scope.listData.push(tempData);

                                        }
                                    }
                                    $scope.getItemSchoolList({ ProductIds: tempArray }).then(
                                        function (result) {
                                            if (result.data.status) {
                                                if (result.data.data.list.length > 0) {
                                                    for (var i = 0; i < result.data.data.list.length; i++) {
                                                        $scope.listData[i].schoolTypes = result.data.data.list[i].list;
                                                    }
                                                }
                                            }
                                        });

                                }
                            }
                            $scope.getAmountSum();
                            $scope.getClassHourSum();
                        }
                        
                        //显示可选择产品
                        $scope.showProduct = function () {
                            var tempIds = [];
                            if ($scope.listData) {
                                for (var i = 0; i < $scope.listData.length; i++) {
                                    tempIds.push($scope.listData[i].id);
                                }
                            }
                            $scope.productModalOptions.tabs = getProductList({ schoolId: $scope.schoolId, productIds: tempIds });
                            if ($scope.productModalOptions) {
                                $scope.productModalOptions.accessor.reload();
                            }
                            $scope.isShowProduct = true;

                        }
                        //下拉选择班级类型筛选
                        $scope.selectdClassType = function (item, data) {
                            item.classTypeId = data.id;
                        }
                        //产品取消回调，弹窗不再弹窗。
                        $scope.cancleCallBack = function () {
                            $scope.isShowProduct = false;
                        }
                        //删除产品，重新计算金额
                        $scope.deleteItem = function (index) {
                            $scope.listData.splice(index, 1);
                            $scope.getAmountSum();
                            $scope.getClassHourSum();
                        }
                        $scope.init();
                    }
                };
            }
        ]);
});
