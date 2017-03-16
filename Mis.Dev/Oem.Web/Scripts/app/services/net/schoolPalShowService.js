"use strict";
/**该文件由T4模板生成，请勿手工修改
 * author :
 * time: 
 * description: 服务集合模板
 */

define(["angular"], function(angular) {
	return angular.module("services.net.schoolPalShowService", [])
		.service("schoolPalShowService", [
			"$http", "$q", function ($http, $q) {
				/// 绑定校宝秀用户（根据云账号sign，获取机构账号并绑定，可能是多个机构账户）
				function bindUser(data) {
					return $http.post("/api/schoolPalShowService/bindUser", data);
				}
				/// 获取已绑定的账户
				function getBindedUsers() {
					return $http.get("/api/schoolPalShowService/getBindedUsers");
				}
				/// 
				function startImport(data) {
					return $http.post("/api/schoolPalShowService/startImport", data);
				}
				/// 读取校宝秀数据
				function getXbxClueData(data) {
					return $http.post("/api/schoolPalShowService/getXbxClueData", data);
				}
				/// 读取失败的数据
				function getFailedImportData(data) {
					return $http.post("/api/schoolPalShowService/getFailedImportData", data);
				}
				/// 根据id获取导入任务对象
				function getImportTask() {
					return $http.get("/api/schoolPalShowService/getImportTask");
				}
				/// 读取导入状态
				function getImportStatus() {
					return $http.get("/api/schoolPalShowService/getImportStatus");
				}
				return {
					bindUser: bindUser,
					getBindedUsers: getBindedUsers,
					startImport: startImport,
					getXbxClueData: getXbxClueData,
					getFailedImportData: getFailedImportData,
					getImportTask: getImportTask,
					getImportStatus: getImportStatus
				};
			}
		]);
});
