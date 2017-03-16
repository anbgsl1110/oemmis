"use strict";
/**
 * author :CBH
 * time:2016年10月18日15:46:07
 * description:咨询 后端接口集合
 */

define(["angular", "services/net/common"], function(angular) {
    return angular.module("services.net.consult", ["services.net.common"])
        .factory("consultNetService", [
            "$timeout", "$q", "randomService", "$http", function($timeout, $q, randomService, $http) {
                function createNewConsult(request) {
                    var url = "/api/ConsultApi/CreateConsult";
                    return $http.post(url, request);
                }

                function checkPhoneUnique(request) {
                    var rq = {
                        Phone: request.phone,
                        ClueId: request.clueId
                    }
                    var url = "/api/ClueApi/IsRepeatCluePhone";
                    return $http.post(url, rq);
                }
                //新建：获取渠道
                function getChannelSimpleList(request) {
                    var url = "/api/ChannelApi/UserChannelsBySchool";
                    return $http.post(url, request);
                }
//咨询详情
                function getConsultDetail(id) {
                    var url = "/api/ConsultApi/ConsultDetail";
                    return $http.get(url, { params: { consultId: id } });
                }

                function getFollowURecordList(request) {
                    var url = "/api/ClueApi/FollowURecordList";
                    return $http.get(url, { params: request });
                }

                function delClue(request) {
                    var url = "/api/ClueApi/DelClue";
                    return $http.post(url, request);
                }

                function clueTransfer(request) {
                    var url = "/api/ClueApi/ClueTransfer";
                    return $http.post(url, request);
                }

                function distributeClue(request) {
                    var url = "/api/ClueApi/DistributeClue";
                    return $http.post(url, request);
                }

                function mergeClue(request) {
                    var url = "/api/ClueApi/MergeClue";
                    return $http.post(url, request);
                }

                function signContactDetail(request) {
                    var url = "/api/ClueApi/SignContactDetail";
                    return $http.get(url, { params: request });
                }

                function clueSignContact(request) {
                    var url = "/api/ClueApi/ClueSignContact";
                    return $http.post(url, request);
                }

                function consultGlobalSearch(request) {
                    var url = "/api/ConsultApi/GlobalSearchConsult";
                    return $http.post(url, request);
                }

                function clueCreateCourseAccount(request) {
                    var url = "/api/ClueApi/ClueCreateCourseAccount";
                    return $http.post(url, request);
                }

                function userSchools(request) {
                    return function(params) {
                        var listRequest = {
                            key: params.search,
                            //order: {
                            //    //     filed: 'createdAt',
                            //    asc: false
                            //},
                            filter: {
                                NotContainShoolIds: request
                            },
                            page: {
                                pageIndex: params.page,
                                pageSize: 20
                            }
                        }
                        var url = "/api/UserApi/UserSchools";
                        return $http.post(url, listRequest);
                    }
                }

                function getClueExamTab(request) {
                    var url = "/api/ExamApi/GetClueExamTab";
                    return $http.post(url, request);
                }

                function mergeClueList(request) {
                    return function(params) {
                        var listRequest = {
                            key: params.search,
                            //order: {
                            //    //     filed: 'createdAt',
                            //    asc: false
                            //},
                            filter: {
                                clueId: request
                            },
                            page: {
                                pageIndex: params.page,
                                pageSize: 20
                            }
                        }
                        var url = "/api/ClueApi/MergeClueList";
                        return $http.post(url, listRequest);
                    }
                }

                function clueExcelTemplate() {
                    var url = "/api/ClueApi/ClueExcelTemplate";
                    return $http.post(url);
                }

                function getTestReportUrl(request) {
                    var url = "/api/ExamApi/GetTestReportUrl";
                    return $http.get(url, { params: request });
                }

                function isContainDelClue(request) {
                    var url = "/api/ClueApi/IsContainDelClue";
                    return $http.post(url, request);
                }
                function consultExcelTemplate() {
                    var url = "/api/ConsultApi/ConsultExcelTemplate";
                    return $http.post(url);
                }
                return {
                    getChannelSimpleList:getChannelSimpleList,
                    getConsultDetail: getConsultDetail,
                    createNewConsult: createNewConsult,
                    checkPhoneUnique: checkPhoneUnique,
                    getFollowURecordList: getFollowURecordList,
                    delClue: delClue,
                    clueTransfer: clueTransfer,
                    distributeClue: distributeClue,
                    mergeClue: mergeClue,
                    signContactDetail: signContactDetail,
                    clueSignContact: clueSignContact,
                    consultGlobalSearch: consultGlobalSearch,
                    clueCreateCourseAccount: clueCreateCourseAccount,
                    userSchools: userSchools,
                    getClueExamTab: getClueExamTab,
                    mergeClueList: mergeClueList,
                    clueExcelTemplate: clueExcelTemplate,
                    getTestReportUrl: getTestReportUrl,
                    isContainDelClue: isContainDelClue,
                    consultExcelTemplate:consultExcelTemplate
                }
            }
        ]);
});