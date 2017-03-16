"use strict";
/**
 * author :zy
 * time: 2016年7月14日17:37:37
 * description: 超管-1courserole 后端接口集合
 */

define(["angular", "services/net/common"], function (angular) {
    return angular.module("services.net.crmrole", ["services.net.common"])
        .service("crmRoleNetService",
        [
            "$http", "$q", "commonNetService", function ($http, $q, commonNetService) {
                var crmRoleNetService = {};
                crmRoleNetService.getRoleList = function (roleListConfig) {
                    return $http.post('/api/RoleApi/GetCRMRoleList', roleListConfig);
                };
                crmRoleNetService.getRoleById = function (roleId) {
                    return $http.get('/api/RoleApi/GetCRMRoleById', { params: { roleId: roleId } });
                };
                //crmRoleNetService.getOrgList = function () {
                //    return $http.get('/api/OrgApi/GetOrgList');
                //};
                crmRoleNetService.editRole = function (model) { //新建or编辑
                    return $http.post('/api/RoleApi/SaveCRMRole', { Filter: model });
                };
                crmRoleNetService.deleteRoleById = function (roleId) {
                    return $http.post('/api/RoleApi/DeleteCRMRole', { filter: { roleId: roleId } });
                };


                //给角色添加员工
                crmRoleNetService.addEmployeeByRole = function (EmployeeInfo) {
                    return $http.post('/api/UserApi/SaveAdminUser', { filter: EmployeeInfo })
                };

                return crmRoleNetService;
            }
        ]);
});
