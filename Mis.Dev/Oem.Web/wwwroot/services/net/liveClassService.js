"use strict";
/**该文件由T4模板生成，请勿手工修改
 * author :
 * time: 
 * description: 服务集合模板
 */

define(["angular"], function(angular) {
	return angular.module("services.net.liveClassService", [])
		.service("liveClassService", [
			"$http", "$q", function ($http, $q) {
				/// 获取课堂列表
				function getClassRoomList() {
					return $http.post("/api/liveClassService/getClassRoomList");
				}
				/// 新建直播课
				///  liveClassRequest  直播课Info
				function createLiveClass(liveClassRequest) {
					return $http.post("/api/liveClassService/createLiveClass", liveClassRequest);
				}
				/// 编辑直播
				///  liveClassRequest  
				function editLiveClass(liveClassRequest) {
					return $http.post("/api/liveClassService/editLiveClass", liveClassRequest);
				}
				/// 获取直播课关联的渠道
				///  liveClassId  
				function getLiveClassChannelRelationList(liveClassId) {
					return $http.post("/api/liveClassService/getLiveClassChannelRelationList", liveClassId);
				}
				/// 获取直播课报名人数列表
				function getLiveClassEnrollList(data) {
					return $http.post("/api/liveClassService/getLiveClassEnrollList", data);
				}
				/// 获取直播课列表
				///  liveClassListRequest  
				function getLiveClassList(liveClassListRequest) {
					return $http.post("/api/liveClassService/getLiveClassList", liveClassListRequest);
				}
				/// 获取直播课详情
				///  liveClassId  
				function getLiveClassDetail(liveClassId) {
					return $http.post("/api/liveClassService/getLiveClassDetail", liveClassId);
				}
				/// 删除直播课
				///  classId  
				function delLiveClass(classId) {
					return $http.post("/api/liveClassService/delLiveClass", classId);
				}
				/// 鉴权-是否能操作该直播课
				///  liveClassId  
				function isCanOperateLiveClass(liveClassId) {
					return $http.post("/api/liveClassService/isCanOperateLiveClass", liveClassId);
				}
				/// 获取直播课内容
				///  liveClassId  直播课Id
				function getLiveClass(liveClassId) {
					return $http.post("/api/liveClassService/getLiveClass", liveClassId);
				}
				/// 获取LiveClass选择列表
				function getLiveClassSelectList(data) {
					return $http.post("/api/liveClassService/getLiveClassSelectList", data);
				}
				/// 根据Id列表获取liveClass列表
				///  liveClassIds  直播课id列表
				function getLiveClassSelectListByIds(liveClassIds) {
					return $http.post("/api/liveClassService/getLiveClassSelectListByIds", liveClassIds);
				}
				/// 获取登陆人校区与所选直播校区的交集
				///  liveIds  直播ID集合
				function getLiveSchoolIdInterUserSchoolId(liveIds) {
					return $http.post("/api/liveClassService/getLiveSchoolIdInterUserSchoolId", liveIds);
				}
				/// 根据渠道Id获取关联的LiveClass
				///  channelId  渠道Id
				function getLiveClassSelectListByChannelId(channelId) {
					return $http.post("/api/liveClassService/getLiveClassSelectListByChannelId", channelId);
				}
				/// 获取在报名表中是否有对应信息
				function getLiveClassPhoneJudge(data) {
					return $http.post("/api/liveClassService/getLiveClassPhoneJudge", data);
				}
				/// 获取直播课访问统计
				function getVisiteStatistics(data) {
					return $http.post("/api/liveClassService/getVisiteStatistics", data);
				}
				/// 添加学员报名信息
				///  request  请求信息
				function createLiveClassStuInfo(request) {
					return $http.get("/api/liveClassService/createLiveClassStuInfo", { params: request });
				}
				/// 定时服务 从Gensee获取数据
				function pullConcurrentDataFromGensee() {
					return $http.get("/api/liveClassService/pullConcurrentDataFromGensee");
				}
				/// 直播课新建咨询/线索
				///  request  
				function liveClassCreateClue(request) {
					return $http.get("/api/liveClassService/liveClassCreateClue", { params: request });
				}
				/// 判断学生是否有观看直播课的权限
				function studentHasLiveClass(data) {
					return $http.get("/api/liveClassService/studentHasLiveClass", { params: data });
				}
				/// 判断助教是否有观看直播课的权限
				function assistantHasLiveClass(data) {
					return $http.get("/api/liveClassService/assistantHasLiveClass", { params: data });
				}
				/// 根据id获取直播间信息
				///  id  
				function getLiveRoomById(id) {
					return $http.get("/api/liveClassService/getLiveRoomById", { params: { id: id } });
				}
				/// 更新学生观看直播的信息，（观看设备、是否观看）
				function updateStudentWatchInfo(data) {
					return $http.get("/api/liveClassService/updateStudentWatchInfo", { params: data });
				}
				/// 更新观看直播的时间
				function updateUserTime(data) {
					return $http.get("/api/liveClassService/updateUserTime", { params: data });
				}
				/// 获得直播课学员报名信息
				///  id  报名表主键Id
				function getLiveClassStuInfo(id) {
					return $http.get("/api/liveClassService/getLiveClassStuInfo", { params: { id: id } });
				}
				/// 获取页面时间和本地时间差值
				///  clientTime  页面时间
				function getTimeDvalue(clientTime) {
					return $http.get("/api/liveClassService/getTimeDvalue", { params: { clientTime: clientTime } });
				}
				return {
					getClassRoomList: getClassRoomList,
					createLiveClass: createLiveClass,
					editLiveClass: editLiveClass,
					getLiveClassChannelRelationList: getLiveClassChannelRelationList,
					getLiveClassEnrollList: getLiveClassEnrollList,
					getLiveClassList: getLiveClassList,
					getLiveClassDetail: getLiveClassDetail,
					delLiveClass: delLiveClass,
					isCanOperateLiveClass: isCanOperateLiveClass,
					getLiveClass: getLiveClass,
					getLiveClassSelectList: getLiveClassSelectList,
					getLiveClassSelectListByIds: getLiveClassSelectListByIds,
					getLiveSchoolIdInterUserSchoolId: getLiveSchoolIdInterUserSchoolId,
					getLiveClassSelectListByChannelId: getLiveClassSelectListByChannelId,
					getLiveClassPhoneJudge: getLiveClassPhoneJudge,
					getVisiteStatistics: getVisiteStatistics,
					createLiveClassStuInfo: createLiveClassStuInfo,
					pullConcurrentDataFromGensee: pullConcurrentDataFromGensee,
					liveClassCreateClue: liveClassCreateClue,
					studentHasLiveClass: studentHasLiveClass,
					assistantHasLiveClass: assistantHasLiveClass,
					getLiveRoomById: getLiveRoomById,
					updateStudentWatchInfo: updateStudentWatchInfo,
					updateUserTime: updateUserTime,
					getLiveClassStuInfo: getLiveClassStuInfo,
					getTimeDvalue: getTimeDvalue
				};
			}
		]);
});
