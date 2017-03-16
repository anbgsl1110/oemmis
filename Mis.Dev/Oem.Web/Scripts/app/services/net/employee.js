"use strict";
/**
 * author :小潘
 * time: 2015年4月8日 17:42:22
 * description: 员工系统-员工管理 后端接口集合
 */

define(["angular", "services/net/common"], function(angular) {
    return angular.module("services.net.employee", ["services.net.common"])
        .service("employeeNetService", [
            "$http", "$q", "commonNetService", function ($http, $q, commonNetService) {
                //上传图片
                function uploadImage(model) {
                    var fd = new FormData();
                    fd.append("fileBase", model);
                    //这里传的url还没写好，占个位置
                    var promise = $http.post("/api/UserApi/UpLoadHeadImg", fd, {
                        transformRequest: angular.identity,
                        headers: { 'Content-Type': undefined }
                    });
                    return promise;
                }
                //裁剪图片
                function cropperImage(data) {
                    return $http.post("/api/UserApi/UpdateUserHeadImgUrl", data);
                }
                //获取线索列表
                function getClueSimpleList(idx) {
                    return function (params) {
                            var listRequest = {
                                order: {
                                    asc: false
                                },
                                filter: {
                                    userId:  idx
                        },
                            page: {
                                pageIndex: 1,
                                pageSize: 20
                            }
                        }
                        listRequest.key = params.search;
                        listRequest.page.pageIndex = params.page;
                        return $http.post("/api/Clueapi/GetClueSimpleList", listRequest);
                    };
                }
                //获取员工列表
                function getStaffList(idx) {
                    return function (params) {
                        var listRequest = {
                            order: {
                                asc: false
                            },
                            filter: {
                                viewType: 0,
                                excludeUserIds: idx
                            },
                            page: {
                                pageIndex: 1,
                                pageSize: 20
                            }
                        }
                        listRequest.key = params.search;
                        listRequest.page.pageIndex = params.page;
                        return $http.post("/api/UserApi/GetStaffList", listRequest);
                    };
                }
                //获取员工列表 --报表
                function NewStaffList(idx) {
                    return function (params) {
                        var listRequest = {
                            order: {
                                asc: false
                            },
                            filter: {
                                viewType: 0,
                                excludeUserIds: idx
                            },
                            page: {
                                pageIndex: 1,
                                pageSize: 20
                            }
                        }
                        listRequest.key = params.search;
                        listRequest.page.pageIndex = params.page;
                        return $http.post("/api/UserApi/NewStaffList", listRequest);
                    };
                }
                //获取上级列表
                function getParentList(idx) {
                    return function (params) {
                        var listRequest = {
                            order: {
                                asc: false
                            },
                            filter: idx,
                            page: {
                                pageIndex: 1,
                                pageSize: 20
                            }
                        }
                        listRequest.key = params.search;
                        listRequest.page.pageIndex = params.page;
                        return $http.post("/api/UserApi/GetManageChooseList", listRequest);
                    };
                }
                //获取下级列表
                function getChildrenList(idx) {
                    return function (params) {
                        var listRequest = {
                            order: {
                                asc: false
                            },
                            filter: idx,
                            page: {
                                pageIndex: 1,
                                pageSize: 20
                            }
                        }
                        listRequest.key = params.search;
                        listRequest.page.pageIndex = params.page;
                        return $http.post("/api/UserApi/GetSubChooseList", listRequest);
                    };
                }
                //用于多选框，获取校区
                function getSchoolList() {
                    return function (params) {
                        var listRequest = {
                            name: params.search
                        }
                        return $http({
                            url: "/api/OrgApi/GetCRMSchoolListByUserId",
                            params: listRequest,
                            method :"GET"
                        });
                    };
                }
                //用于多选框，获取CRM角色
                function getCrmRoleList() {
                    return function (params) {
                        var listRequest = {
                            order: {
                                asc: false
                            },
                            filter: {
                                roleName: ''
                            },
                            page: {
                                pageIndex: 1,
                                pageSize: 20
                            }
                        }
                        listRequest.filter.roleName = params.search;
                        listRequest.page.pageIndex = params.page;
                        return $http.post("/api/RoleApi/GetCRMRoleList", listRequest);
                    };

                }
                return {
                    uploadImage: uploadImage,
                    getStaffList: getStaffList,
                    getSchoolList: getSchoolList,
                    getCrmRoleList: getCrmRoleList,
                    getClueSimpleList: getClueSimpleList,
                    cropperImage: cropperImage,
                    getParentList: getParentList,
                    getChildrenList: getChildrenList,
                    NewStaffList: NewStaffList
                };
            }
        ]);
});