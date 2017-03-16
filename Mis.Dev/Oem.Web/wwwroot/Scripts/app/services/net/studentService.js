"use strict";
/**该文件由T4模板生成，请勿手工修改
 * author :
 * time: 
 * description: 服务集合模板
 */

define(["angular"], function(angular) {
	return angular.module("services.net.studentService", [])
		.service("studentService", [
			"$http", "$q", function ($http, $q) {
				/// 通过手机号码获取学员信息
				///  phone  
				function getStuInfosByPhone(phone) {
					return $http.get("/api/studentService/getStuInfosByPhone", { params: { phone: phone } });
				}
				return {
					getStuInfosByPhone: getStuInfosByPhone
				};
			}
		]);
});
