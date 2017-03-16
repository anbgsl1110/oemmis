"use strict";
/**
 * author :zy
 * time: 2016年7月14日11:54:21
 * description: 超管-系统参数 后端接口集合
 */

define(["angular", "services/net/common"], function(angular) {
    return angular.module("services.net.parameter", ["services.net.common"])
        .service("parameterNetService", [
            "$http", "$q", function($http, $q) {



                //获取页面上的初始数据
                function getParameter() {
                    return $http.get("/api/OrgApi/GetOrgConfig");
                }

                //标签查重
                function checkLabelExisted(labelName,type) {
                    return $http.post("/api/OrgApi/CheckLableName",{filter: { labelName: labelName,type:type }});
                }

                //标签查是否关联  true表示已关联 CheckTypeIsRelation
                function checkLabelIsRelated(id,type) {
                    return $http.post("/api/SystypeApi/CheckTypeIsRelation", { filter: {LabelId:id ,type:type} });

                }

                //save
                function saveParameter(filter) {
                    return $http.post("/api/OrgApi/SaveOrgConfig", {filter:filter});

                }

                return {
                    getParameter: getParameter,
                    checkLabel: checkLabelExisted,
                    labelIsRelated: checkLabelIsRelated,
                    saveParameter: saveParameter
                };
            }
        ]);
});