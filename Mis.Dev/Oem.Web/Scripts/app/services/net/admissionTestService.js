"use strict";
/**该文件由T4模板生成，请勿手工修改
 * author :
 * time: 
 * description: 服务集合模板
 */

define(["angular"], function(angular) {
	return angular.module("services.net.admissionTestService", [])
		.service("admissionTestService", [
			"$http", "$q", function ($http, $q) {
				/// 根据渠道id获取关联的入学测试对象
				///  channelId  渠道Id
				function getAdmissionTestByChannelId(channelId) {
					return $http.post("/api/admissionTestService/getAdmissionTestByChannelId", channelId);
				}
				return {
					getAdmissionTestByChannelId: getAdmissionTestByChannelId
				};
			}
		]);
});
