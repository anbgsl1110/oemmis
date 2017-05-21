"use strict";
/**
 * author :CBH
 * time: 2016年9月26日15:57:42
 * description: 组织结构服务集合
*/

define([
    "angular"
], function (angular) {
    return angular.module("OrganizationApp.services", [])
        .service("OrganizationAppServices", [
            "$rootScope", "$http", "accountNetService",
            function ($rootScope, $http, accountNetService) {
                var OrganizationServices = {};
                OrganizationServices.services = function () {
                    var servicesConfig = {}
                    servicesConfig.getChildren = function (id) {
                        
                        return $http.get("/api/DepartmentApi/GetDepartmentChildren", { params: { ParentId:id} });
                    },
                    servicesConfig.addChildren = function(item) {
                        return $http.post("/api/DepartmentApi/CreateDepartment", item );
                    },
                    servicesConfig.updateDepartment = function (item) {
                        return $http.post("/api/DepartmentApi/UpdateDepartment", item);
                    },
                    servicesConfig.DeleteDepartment = function (item) {
                        return $http.post("/api/DepartmentApi/DeleteDepartment", { id: item });
                    },
                    //检测部门是否含有跟进线索
                    servicesConfig.DepartmentHasChangeClues = function (item) {
                        return $http.post("/api/ClueApi/DepartmentHasChangeClues",  item );
                    },
                    //检测部门是否含有员工
                    servicesConfig.IsDepartmentHasUser = function (item) {
                        return $http.get("/api/DepartmentApi/IsDepartmentHasUser", { params: {departmentId: item } });
                    },
                    servicesConfig.schoolPop = {
                        tabs: accountNetService.getSchoolList(),
                        title: "选择校区",
                        placeholder: "校区名",
                        list: [
                            {
                                title: "校区",
                                field: "name"
                            }
                        ],
                        selectedList: [
                            {
                                title: "校区",
                                field: "name"
                            }
                        ]
                    };
                    return servicesConfig;
                };
                return OrganizationServices;
            }
        ]);
});
