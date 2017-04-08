/**
* Created by Han Xinwei on 2015/4/2.
*/

define(['libs/angular-mocks/mock-min',
        'angular',
        'angularMock',
        'services/current-user-service'
], function (Mock) {
    return angular.module('services.net.common', ['service.currentUser'])
        .factory('commonNetService', ['$timeout', '$http', '$q', 'currentUserService', function ($timeout, $http, $q, currentUserService) {

            /*
            queryCondition object 列表查询参数
            search string default to null 查询字符串
            position object 位置信息
            start int default to 0 起始位置
            length int default to 20 长度
            sort 排序信息
            name string default to null 排序字段
            order string('asc'|'desc') default to 'asc' 升降序
            category 分类信息
            unLabel bool default to false 未分类
            labels array<array<int>> default to null 分类选择
            advanced object 高级筛选 与具体查询接口接口 须根据具体接口匹配
            */
            function getList(url, queryCondition) {
                queryCondition = queryCondition || {};
                var toBackendParams = {};
                if (queryCondition.searchType == null)
                    toBackendParams.key = queryCondition.search || null;
                else
                    toBackendParams.advancedSearch = {
                        search: queryCondition.search,
                        searchType: queryCondition.searchType
                    }
                toBackendParams.page = {};
                toBackendParams.page.pageIdx =
                    queryCondition.position && queryCondition.position.start && queryCondition.position.length ? queryCondition.position.start / queryCondition.position.length + 1 : 1;
                toBackendParams.page.pageSize = queryCondition.position && queryCondition.position.length ? queryCondition.position.length : 20;
                toBackendParams.order = {}
                toBackendParams.order.filed = queryCondition.sort && queryCondition.sort.name ? queryCondition.sort.name : null;
                toBackendParams.order.asc = queryCondition.sort && queryCondition.sort.order ? queryCondition.sort.order == "asc" ? true : false : true;
                toBackendParams.category = queryCondition.category || null;
                if (toBackendParams.category && toBackendParams.category.unLabel == null && toBackendParams.category.labels == null)
                    toBackendParams.category = null;
                /*                if (toBackendParams.category) {
                toBackendParams.category.unLabel = toBackendParams.category.unLabel || false;
                toBackendParams.category.labels = toBackendParams.category.labels || null;
                }*/
                toBackendParams.filter = queryCondition.advanced || null;
                if (toBackendParams.filter) {
                    if (queryCondition.otherListCondition) {
                        toBackendParams.filter.MyOrOtherExams = queryCondition.otherListCondition ? queryCondition.otherListCondition.myOrOtherExams : null; // NTODO 请求阶段传参
                    }
                }

                return $http.post(url, toBackendParams);
            }

            // 导航，获取是否有未批改项，判断显示红点

            function getTodoCorrectListCount() {
                return $http.post('/CorrectService/GetTodoCorrectListCount');
            }

            function getTodoListCount() {
                return $http.post('/UserService/GetTodoListCount');
            };

            //得到服务器当前时间
            var getCurrentDateTime = function () {
                return $http.post('/Common/GetCurrentDateTime');
            };

            //#region 获取公共配置

            //获取当前登录账户的所在校区--shaobo.wang
            var getSchoolArea = function () {
                return $http.get('/api/OrgApi/GetCRMSchoolListByUserId');
            }

            //用于单选框，获取校区
            var getSchoolList=function() {
                return $http.get("/api/OrgApi/GetCRMSchoolList");
            }

            //获取指定渠道列表
            var getChannelSimpleList = function (request) {
                return $http.post("/api/ChannelApi/GetChannelSimpleList",request);
            }
            // 获取校区、线索类别、渠道类别
            var getSystemType=function(request) {
                return $http.get('/api/SystypeApi/GetSystypes', { params: request });
            }

            //获取当前账户所选校区下的员工--shaobo.wang
            var getSubordinateBySchool = function (request) {
                return function (params) {
                    var obj = {
                        key: params.search,
                        filter: {
                            viewType: request.viewType,
                            userId: currentUserService.getCurrentUser().userId,
                            schoolIds: request.schoolIds,
                            userGrade: currentUserService.getCurrentUser().userGrade
                        },
                        page: {
                            pageIndex: params.page,
                            pageSize: 20
                        }
                    }
                    return $http.post('/api/userapi/GetStaffList', obj);
                }
            }
            //获取部门列表--cwj
            var getDepartment=function() {
                return function (params) {
                    var listRequest = {
                        key: params.search,
                        page: {
                            pageIndex: params.page,
                            pageSize: 20
                        }
                    }
                    var url = "/api/DepartmentApi/UserDepartments";
                    return $http.post(url, listRequest);
                }
            }
            //获取校区权限--cwj
            var getDepartmentSchoolList=function(request) {
                var url = "/api/DepartmentApi/GetDepartmentSchoolList";
                return $http.post(url, request);
            }
            //admin获取所有部门--cwj
            var orgDepartments = function () {
                return function (params) {
                    var listRequest = {
                        key: params.search,
                        page: {
                            pageIndex: params.page,
                            pageSize: 20
                        }
                    }
                    var url = "/api/DepartmentApi/OrgDepartments";
                    return $http.post(url, listRequest);
                }
            }
            //部门删除校验--cwj
            var hasUserChangeDepartmentClues = function (request) {
                var url = "/api/ClueApi/HasUserChangeDepartmentClues";
                return $http.post(url, request);
            }
            //#endregion
            //获取直播课堂列表
            var liveRoomList = function () {
                return $http.post("/api/LiveClassService/GetClassRoomList");
            }
            //通过手机号码获取学员信息
            function getStuInfosByPhone(request) {
                var url = "/api/StudentService/GetStuInfosByPhone";
                return $http.get(url, { params: request });
            }
            return {
                getList: getList,
                getTodoCorrectListCount: getTodoCorrectListCount,
                getTodoListCount: getTodoListCount,
                getCurrentDateTime: getCurrentDateTime,
                getSchoolArea: getSchoolArea,
                getSubordinateBySchool: getSubordinateBySchool,
                getSystemType: getSystemType,
                getSchoolList: getSchoolList,
                getChannelSimpleList: getChannelSimpleList,
                getDepartment: getDepartment,
                getDepartmentSchoolList: getDepartmentSchoolList,
                orgDepartments: orgDepartments,
                hasUserChangeDepartmentClues: hasUserChangeDepartmentClues,
                liveRoomList: liveRoomList,
                getStuInfosByPhone: getStuInfosByPhone
            }

        }]);
})