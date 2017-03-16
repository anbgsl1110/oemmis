"use strict";
/**该文件由T4模板生成，请勿手工修改
 * author :
 * time: 
 * description: 服务集合模板
 */

define(["angular"], function(angular) {
	return angular.module("services.net.visitAppointmentService", [])
		.service("visitAppointmentService", [
			"$http", "$q", function ($http, $q) {
				/// 创建预约到访
				///  visitAppointment  预约到访数据
				function createVisitAppointment(visitAppointment) {
					return $http.post("/api/visitAppointmentService/createVisitAppointment", visitAppointment);
				}
				/// 删除预约到访
				///  visitAppointmentId  
				function deleteVisitAppointment(visitAppointmentId) {
					return $http.post("/api/visitAppointmentService/deleteVisitAppointment", visitAppointmentId);
				}
				/// 
				function setVisitAppointmentState(data) {
					return $http.post("/api/visitAppointmentService/setVisitAppointmentState", data);
				}
				/// 获取线索的到访预约
				function getVisitAppointmentsByClueId(data) {
					return $http.post("/api/visitAppointmentService/getVisitAppointmentsByClueId", data);
				}
				/// 获取用户今日预约
				///  takeCount  
				function getTodayVisitAppointments(takeCount) {
					return $http.post("/api/visitAppointmentService/getTodayVisitAppointments", takeCount);
				}
				/// 获取属于用户自己的到访预约
				///  request  
				function getClueVisitAppointments(request) {
					return $http.post("/api/visitAppointmentService/getClueVisitAppointments", request);
				}
				return {
					createVisitAppointment: createVisitAppointment,
					deleteVisitAppointment: deleteVisitAppointment,
					setVisitAppointmentState: setVisitAppointmentState,
					getVisitAppointmentsByClueId: getVisitAppointmentsByClueId,
					getTodayVisitAppointments: getTodayVisitAppointments,
					getClueVisitAppointments: getClueVisitAppointments
				};
			}
		]);
});
