"use strict";
/**
 * author :CBH
 * time:2016年12月21日17:28:05
 * description:直播 后端接口集合
 */

define(["angular", "services/net/common"], function(angular) {
    return angular.module("services.net.liveLesson", ["services.net.common"])
        .factory("liveLessonNetService", [
            "$timeout", "$q", "randomService", "$http", function ($timeout, $q, randomService, $http) {

                //获取交集校区列表
                function getCrmSchoolListForSingleList(id) {
                    return function (parmas) {
                        var req = {
                            filter: {
                                liveIds: id
                            },
                            key: '',
                            order: {

                            },
                            page: {
                                //分页
                                pageSize: 20,
                                pageIndex: 1
                            }
                        }

                        req.key = parmas.search;
                        req.page.pageIndex = parmas.page;

                        var url = "/api/LiveClassService/GetLiveSchoolIdInterUserSchoolId";
                        return $http.post(url, req);
                    }
                }


                
                return {
                    getCrmSchoolListForSingleList: getCrmSchoolListForSingleList
                }
            }
        ]);
});