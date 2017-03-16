"use strict";
/**
 * author :
 * time: 
 * description: 超管员工账号
 */

define(["angular", "services/net/common"], function (angular) {
    return angular.module("services.net.account", ["services.net.common"])
        .service("accountNetService", [
            "$http", "$q", "commonNetService", function ($http, $q, commonNetService) {


                //获取账号详情
                function getUserDetails(id) {
                    if (typeof (id) != "number" && typeof (id) != "string") {
                        id = 0;
                    }
                    return $http.get("/api/UserApi/GetUserDetails", { params: { userId: id } });
                }
                //获取重名账号列表
                function getRepeatUserList(name) {
                    if (typeof (name) != "string") {
                        name = "";
                    }
                    return $http.get("/api/UserApi/GetRepeatUserList", { params: { user: name } });
                }
                //合并重名账号
                function saveRepeatUser(ids, id, name,isAll) {
                    var request = {
                        userIds: ids,
                        userId: id,
                        userName: name,
                        isAll:isAll
                    }
                    return $http.post("/api/UserApi/MergeUser", { filter: request });
                }
                //用于多选框，获取校区
                function getSchoolList() {
                    //if (!data) {
                    //    var data = {}
                    //    data.page = 1;
                    //}
                    //return $http.post("/api/OrgApi/GetCRMSchoolList", { page: { pageSize: 20, pageIndex: data.page || 1 } });

                    return function (params) {
                        var listRequest = {
                            //order: {
                            //    asc: false
                            //},
                            //filter: {
                            //    roleName: ''
                            //},
                            page: {
                                pageIndex: 1,
                                pageSize: 20
                            },
                            key:''
                        }
                        listRequest.key = params.search;
                        listRequest.page.pageIndex = params.page;
                        return $http.post("/api/OrgApi/GetCRMSchoolList", listRequest);
                    };
                }
                //全部获取，给下拉框，暂时未做分页
                function getSchoolListModelTwo() {
                    return $http.post("/api/OrgApi/GetCRMSchoolList", { page: { pageSize: 9999, pageIndex: 1 } });
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
                //用于多选框，获取COURSE角色
                function getCourseRoleList(orgid) {
                    return function (params) {
                        var listRequest = {
                            order: {
                                //     filed: 'createdAt',
                                asc: false
                            },
                            filter: {
                                roleName: '',
                                orgId: 2
                            },
                            page: {
                                pageIndex: 1,
                                pageSize: 20
                            }
                        }
                        listRequest.filter.roleName = params.search;
                        listRequest.filter.orgId = orgid;
                        listRequest.page.pageIndex = params.page;
                        return $http.post("/api/RoleApi/GetCourseRoleList", listRequest);
                    };
                }
                function getSiteList() {
                    //if (!data) {
                    //    var data = {}
                    //    data.page = 1;
                    //}
                    //return $http.post("/api/OrgApi/GetOrgList", { page: { pageSize: 20, pageIndex: data.page || 1 } });
                    return function (params) {
                        var listRequest = {
                            //order: {
                            //    asc: false
                            //},
                            //filter: {
                            //    roleName: ''
                            //},
                            page: {
                                pageIndex: 1,
                                pageSize: 20
                            },
                            key:''
                        }
                        listRequest.key = params.search;
                        listRequest.page.pageIndex = params.page;
                        return $http.post("/api/OrgApi/GetOrgList", listRequest);
                    };
                }
                //全部获取，给下拉框，暂时未做分页
                function getSiteListModelTwo() {
                    return $http.post("/api/OrgApi/GetOrgList", { page: { pageSize: 9999, pageIndex: 1 } });
                }
                function save(req) {
                    return $http.post("/api/UserApi/SaveUser", { filter: req });
                }
                function checkCourse(uId, oId) {//查course站点关联
                    if (typeof (uId) != "number" && typeof (uId) != "string") {
                        uId = 0;
                    }
                    if (typeof (oId) != "number" && typeof (oId) != "string") {
                        oId = 0;
                    }
                    return $http.get("/api/UserApi/CheckCourseUserRelation", { params: { userId: uId, orgId: oId } });
                }
                function checkCRM(uId, oId) {//查校区关联
                    if (typeof (uId) != "number"&&typeof (uId) != "string") {
                        uId = 0;
                    }
                    if (typeof (oId) != "number" && typeof (oId) != "string") {
                        oId = 0;
                    }
                    return $http.get("/api/UserApi/CheckCrmUserRealtion", { params: { userId: uId, schoolIds: oId } });
                }
                function deleteUserSchool(obj) {//删校区
                    return $http.post("/api/UserApi/DeleteUserSchool", obj);
                }
                function deleteCRM(userId) {//删CRM
                    if (typeof (userId) != "number" && typeof (userId) != "string") {
                        userId = 0;
                    }
                    return $http.get("/api/UserApi/CheckUserChannelIsTrue", { params: { userId: userId } });
                }
                function checkCourseLoginName(userName, orgIds,uid) {//加course时查重名
                    console.log(orgIds);
                    return $http.post("/api/UserApi/CheckCourseLoginName", { name: userName, orgIds: orgIds,UserId:uid });
                }

                return {
                    getSchoolListModelTwo: getSchoolListModelTwo,
                    getSiteListModelTwo: getSiteListModelTwo,
                    getUserDetails: getUserDetails,
                    getRepeatUserList: getRepeatUserList,
                    saveRepeatUser: saveRepeatUser,
                    getSchoolList: getSchoolList,
                    getCrmRoleList: getCrmRoleList,
                    getCourseRoleList: getCourseRoleList,
                    getSiteList: getSiteList,
                    saveUser: save,
                    checkCourseRelation: checkCourse,
                    checkCRM: checkCRM,
                    deleteSchool: deleteUserSchool,
                    deleteCRM: deleteCRM,
                    checkCourseLoginName: checkCourseLoginName
                };
            }
        ]);
});