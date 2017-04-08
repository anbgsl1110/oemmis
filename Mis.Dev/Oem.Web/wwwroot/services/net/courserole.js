"use strict";
/**
 * author :zy
 * time: 2016年7月14日17:37:37
 * description: 超管-1courserole 后端接口集合
 */

define(["angular"], function (angular) {
    return angular.module("services.net.courserole", [])
        .service("roleService",
        [
            "$http", "$q", function ($http, $q) {
                var roleService = {};
                roleService.getRoleList = function (roleListConfig) {
                    return $http.post('/api/RoleApi/GetCourseRoleList', roleListConfig);
                };
                roleService.getRoleById = function (roleId, orgId) {
                    return $http.get('/api/RoleApi/GetCourseRoleById', { params: { roleId: roleId, orgId: orgId } });
                };
                roleService.getOrgList = function () {
                    return $http.post("/api/OrgApi/GetOrgList", { page: { pageSize: 9999, pageIndex: 1 } });
                };
                roleService.editRole = function (model) { //新建or编辑
                    return $http.post('/api/RoleApi/SaveCourseRole', { Filter: model });
                };
                roleService.deleteRoleById = function (roleId) {
                    return $http.post('/api/RoleApi/DelectCourseRole', { filter: { roleId: roleId } });
                };


                //给角色添加员工
                roleService.addEmployeeByRole = function (EmployeeInfo) {
                    return $http.post('/api/UserApi/SaveUser', { filter: EmployeeInfo })
                };


                return roleService;
            }
        ]);
});
