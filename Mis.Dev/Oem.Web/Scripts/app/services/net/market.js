/**
 * Created by hui.jin 2016.07.13
 */

define(["angular", "angularMock", "services/random"], function () {
    return angular.module("services.net.market", ["services.random"])
        .factory("marketService", ["$timeout", "$q","$http", "randomService", function ($timeout, $q,$http, randomService) {

            function randomNum(s, e) {
                return randomService.getRandomInt(s || 0, e || 500);
            }
            function getMarkets() {
                var d = $q.defer();
                var videoNames = ["视频入学测试", "官网问卷", "李老师推荐"];
                var testTypes = ["雅思", "托福", "sat"];
                var testTimes = ["00:20;00", "01:20:30", "00:12:48"];
                var manualTest = ["全部", "无", "有"];
                var associatedChannel = ["未关联", "1", "2"];
                var gainClue = ["1323","1211","987"];
                var schools = ["西湖校区", "上城校区", "下城校区"];
                var markets = [];
                //for (var i = 0, l = 10; i < l; i++) {
                //    var id = 100 * randomService.getRandomInt(1, 10) + randomService.getRandomInt(1, 15);
                //    markets.push({ Id: id, videoNames: videoNames[randomNum(0, 2)], testTypes: testTypes[randomNum(0, 2)], testTimes: testTimes[randomNum(0, 2)], manualTest: manualTest[randomNum(0, 2)], associatedChannel: associatedChannel[randomNum(0, 2)], gainClue: randomNum(), schools: schools[randomNum(0, 2)] });
                //}
                for (var i = 0; i < 3; i++) {
                    markets.push({ Id: i, videoNames: videoNames[i], testTypes: testTypes[i], testTimes: testTimes[i], manualTest: manualTest[i], associatedChannel: associatedChannel[i], gainClue: gainClue[i], schools: schools[i] });
                }
                console.log(markets);
                d.resolve(markets);
                return d.promise;
            }

            //选择校区
            function getSchoolsList() {
                var d = $q.defer();
                var schoolList = [];
                var schools = ["西湖校区", "上城校区", "下城校区"];
                for (var i = 0; i < schools.length; i++) {
                    schoolList.push({ id: i, value: schools[i] });
                }
                console.log(schoolList);
                d.resolve(schoolList);
                return d.promise;
            }
            //获取测试列表
            function getExamList(res,ord,pa) {
                var url = "/api/ExamApi/GetExamList";
                return $http.post(url, {  Filter: res,order:ord ,page:pa });
            }
            //获取试卷结构
            function getExam(id) {
                var url = "/api/ExamApi/GetExam";
                return $http.post(url,  { ExamId: id });
            }
            //获取使用次数统计
            function getStatistical(request) {
                var url = "/api/ExamApi/GetExamStatic";
                return $http.get(url, { params: request });
            }
            //获取当前用户校区列表
            function getCRMSchoolList() {
                var url = "/api/OrgApi/GetCRMSchoolListByUserId";
                return $http.get(url);
            }
            //获取校区列表
            function getCrmSchoolListForSingle(request) {
                return function (parmas) {
                    var req = {
                        filter: {

                        },
                        key: '',
                        order: {

                        },
                        page: {
                            //分页
                            pageSize: 20,
                            pageIndex: 1
                        }
                    }
     
                    req.key = parmas.search;
                    req.page.pageIndex = parmas.page;
                    console.log(parmas);
                    var url = "/api/OrgApi/GetCRMSchoolList";
                    return $http.post(url, req);
                }
            }
            //获取入学测试关联渠道列表
            function getChannelList(id) {
                var url = "/api/ChannelApi/ChannelRelationList";
                return $http.post(url, { ExamId: id });
            }
            //校验入测是否在同一个校区
            function getExamOrgIdIsTrue(id) {
                var url = "/api/ExamApi/GetExamOrgIdIsTrue";
                return $http.get(url, { params: { examIds: id } });
            }
            //入学测试所在的1Course站点对应的校区和当前登录用户所在的校区的交集校区
            function getExamSchoolListByExamIdAndUserId(id) {
                var req = {
                    filter: {
                        examIds: id
                    },
                    key: '',
                    order: {
                    },
                    page: {
                        //分页
                        pageSize: 1000,
                        pageIndex: 1
                    }
                }
                var url = "/api/ExamApi/GetExamSchoolListByExamIdAndUserId";
                return $http.post(url, req);
            }
            //获取交集校区列表
            function getCrmSchoolListForSingleList(id) {
                return function (parmas) {
                    var req = {
                        filter: {
                            examIds: id
                        },
                        key: '',
                        order: {

                        },
                        page: {
                            //分页
                            pageSize: 20,
                            pageIndex: 1
                        }
                    }

                    req.key = parmas.search;
                    req.page.pageIndex = parmas.page;
 
                    var url = "/api/ExamApi/GetExamSchoolListByExamIdAndUserId";
                    return $http.post(url, req);
                }
            }
            //获取测试是否存在
            function getTest(id) {
                var url = "/api/ExamApi/ChannleExamIsDel";
                return $http.post(url, { examIds: id });
            }
            //获取当前用户所在机构的校区
            function getSchoolsForMultipleList() {
                return function (params) {
                    var listRequest = {
                        key:params.search,
                        Page: { pageSize: 20, pageIndex: params.page }
                    }
                    var url = "/api/UserApi/UserSchools";
                    return $http.post(url, listRequest);
                }
            }
            //获取编辑状态下 获取登陆人校区与所选直播校区的交集
            function getEditSchools(id) {
                var url = "/api/LiveClassService/GetLiveSchoolIdInterUserSchoolId";
                return $http.post(url, {liveIds: id});
            }
            function getCurrentSchools() {
                var url = "/api/UserApi/UserSchools";
                return $http.post(url, {
                    Page: { pageSize: 10000, pageIndex: 1 }
                });
            }
            //编辑直播课保存
            function getLiveEditInfo(liveJson) {
                var url = "/api/LiveClassService/EditLiveClass";
                return $http.post(url, liveJson);
            }
            //新建直播课保存
            function getSaveLiveEdit(liveJson) {
                var url = "/api/LiveClassService/CreateLiveClass";
                return $http.post(url, liveJson);
                //return $http.post(url, { LiveRoomId: liveClass.LiveRoomId, Name: liveClass.Name, StartTime: liveClass.StartTime, EndTime: liveClass.EndTime, TeacherId: liveClass.TeacherId, AssistantId: liveClass.AssistantId, TeacherIntro: liveClass.TeacherIntro, ClassIntro: liveClass.ClassIntro, SchoolId: liveClass.SchoolId })
            }
            //获取职工列表
            function getStaffBySchoolIds(type, schools) {
                return function (params) {
                    var url = "/api/UserApi/GetStaffBySchoolIds";
                    return $http.post(url,
                    {
                        filter:{ViewType: type, SchoolIds: schools},
                        key: params.search,
                        page: { pageSize: 20, pageIndex: params.page }
                    });
                }
            }
            function getStaffBySchoolIdsinCtrl(type, schools) {
                var url = "/api/UserApi/GetStaffBySchoolIds";
                return $http.post(url,
                {
                    filter: { ViewType: type, SchoolIds: schools },
                    key: "",
                    Page: { pageSize: 10000, pageIndex: 1 }
                });
            }
            //获取课堂列表
            function getClassRoomList() {
                var url = "/api/LiveClassService/GetClassRoomList";
                return $http.post(url);
            }
            //获取直播课详情
            function getLiveClassDetail(id) {
                var url = "/api/LiveClassService/GetLiveClassDetail";
                return $http.post(url, id);
            }
            //获取登陆人校区与所选直播校区的交集
            function getLiveSchoolIdInterUserSchoolId(id) {
                var ids = [];
                ids.push(id);
                var url = "/api/LiveClassService/GetLiveSchoolIdInterUserSchoolId";
                return $http.post(url,
                {
                    filter: { liveIds: ids },
                    key: "",
                    page: { pageSize: 10000, pageIndex: 1 }
                });
            }
            //获取主讲讲师和助教是否处于不可操作校区所对应的员工列表
            function getStaffsInSchoolsIds(schoolsIds,staffIds) {
                var url = "/api/UserApi/IsStaffsInSchools";
                return $http.post(url, { SchoolIds: schoolsIds, StaffIds: staffIds });
            }
            return {
                getMarkets: getMarkets,
                getSchoolsList: getSchoolsList,
                getExamList: getExamList,
                getExam: getExam,
                getCRMSchoolList: getCRMSchoolList,
                getCrmSchoolListForSingle: getCrmSchoolListForSingle,
                getCrmSchoolListForSingleList: getCrmSchoolListForSingleList,
                getStatistical: getStatistical,
                getChannelList: getChannelList,
                getExamOrgIdIsTrue: getExamOrgIdIsTrue,
                getExamSchoolListByExamIdAndUserId: getExamSchoolListByExamIdAndUserId,
                getTest: getTest,
                getSchoolsForMultipleList: getSchoolsForMultipleList,
                getEditSchools: getEditSchools,
                getCurrentSchools: getCurrentSchools,
                getLiveEditInfo: getLiveEditInfo,
                getSaveLiveEdit: getSaveLiveEdit,
                getStaffBySchoolIds: getStaffBySchoolIds,
                getStaffBySchoolIdsinCtrl: getStaffBySchoolIdsinCtrl,
                getClassRoomList: getClassRoomList,
                getLiveClassDetail: getLiveClassDetail,
                getLiveSchoolIdInterUserSchoolId: getLiveSchoolIdInterUserSchoolId,
                getStaffsInSchoolsIds: getStaffsInSchoolsIds
        }
        }]);
})