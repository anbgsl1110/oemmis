"use strict";
/**
 * author :cbh
 * time: 2016年11月23日11:53:32
 * description: 数据报表服务集合
 */

define(["angular", "services/net/common"], function (angular) {
    return angular.module("services.net.report", ["services.net.common"])
        .service("reportNetService", [
            "$http", "$q", "commonNetService", function($http, $q, commonNetService) {
                var reportNetService = {};
                reportNetService.getRoleList = function() {
                    return $http.get("/api/DataReportApi/GetDataReportTypes");
                };


                return reportNetService;
            }
        ]);
});
