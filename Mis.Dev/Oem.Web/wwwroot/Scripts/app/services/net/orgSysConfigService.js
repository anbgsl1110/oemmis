"use strict";
/**该文件由T4模板生成，请勿手工修改
 * author :
 * time: 
 * description: 服务集合模板
 */

define(["angular"], function(angular) {
	return angular.module("services.net.orgSysConfigService", [])
		.service("orgSysConfigService", [
			"$http", "$q", function ($http, $q) {
				/// 获取配置值
				///  orgKeyType  配置key类型
				function getOrgSysConfigValue(orgKeyType) {
					return $http.post("/api/orgSysConfigService/getOrgSysConfigValue", orgKeyType);
				}
				return {
					getOrgSysConfigValue: getOrgSysConfigValue
				};
			}
		]);
});
