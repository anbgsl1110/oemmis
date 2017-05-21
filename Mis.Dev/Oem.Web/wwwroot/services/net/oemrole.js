"use strict";
/**
 * author :zy
 * time: 2016年7月14日17:37:37
 * description: 后端接口集合
 */

define(["angular", "services/net/common"], function (angular) {
    return angular.module("services.net.oemrole", ["services.net.common"])
        .service("oemRoleNetService",
        [
            "$http", "$q", "commonNetService", function ($http, $q, commonNetService) {
                var oemRoleNetService = {};
                oemRoleNetService.getRoleList = function (roleListConfig) {
                    return $http.post('/api/RoleApi/GetCRMRoleList', roleListConfig);
                };
                oemRoleNetService.getRoleById = function (roleId) {
                    return $http.get('/api/RoleApi/GetCRMRoleById', { params: { roleId: roleId } });
                };
                oemRoleNetService.editRole = function (model) { //新建or编辑
                    return $http.post('/api/RoleApi/SaveCRMRole', { Filter: model });
                };
                oemRoleNetService.deleteRoleById = function (roleId) {
                    return $http.post('/api/RoleApi/DeleteCRMRole', { filter: { roleId: roleId } });
                };
                //给角色添加员工
                oemRoleNetService.addEmployeeByRole = function (EmployeeInfo) {
                    return $http.post('/api/UserApi/SaveAdminUser', { filter: EmployeeInfo })
                };

                return oemRoleNetService;
            }
        ]);
});
