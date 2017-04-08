define(["angular", "angularMock", "services/random"], function () {
    return angular.module("service.net.clue", ["services.random"])
    .factory("clueNetService", ["$timeout", "$q","randomService","$http", function ($timeout, $q, randomService,$http) {
        function createNewClue(request) {
            var url = "/api/ClueApi/CreateNewClue";
            return $http.post(url, request);
        }
        function checkPhoneUnique(request) {
            var rq = {
                Phone: request.phone,
                ClueId:request.clueId
        }
            var url = "/api/ClueApi/IsRepeatCluePhone";
            return $http.post(url, rq);
        }
        //新建：获取渠道
        function getChannelSimpleList(request) {
            var url = "/api/ChannelApi/UserChannelsBySchool";
            return $http.post(url, request);
        }
        //签约详情
        function getSignContactDetail(request) {
            var url = "/api/ClueApi/SignContactDetail";
            return $http.get(url, { params:request });
        }
        //线索详情
        function getClueDetail(id) {
            var url = "/api/ClueApi/ClueDetail";
            return $http.get(url, { params: { clueId: id } });
            }
        function createFollowUp(request) {
            var url = "/api/ClueApi/CreateFollowURecord";
            return $http.post(url, request);
        }
        function createAppointment(request) {
            var url = "/api/ClueApi/CreateAppointment";
            return $http.post(url, request);
        }
        function getFollowURecordList(request) {
            var url = "/api/ClueApi/FollowURecordList";
            return $http.get(url, { params: request });
        }
        function delClue(request) {
            var url = "/api/ClueApi/DelClue";
            return $http.post(url, request);
        }
        function clueTransfer(request) {
            var url = "/api/ClueApi/ClueTransfer";
            return $http.post(url, request);
        }
        function distributeClue(request) {
            var url = "/api/ClueApi/DistributeClue";
            return $http.post(url, request);
        }
        function mergeClue(request) {
            var url = "/api/ClueApi/MergeClue";
            return $http.post(url, request);
        }
        function signContactDetail(request) {
            var url = "/api/ClueApi/SignContactDetail";
            return $http.get(url, { params: request });
        }
        function clueSignContact(request) {
            var url = "/api/ClueApi/ClueSignContact";
            return $http.post(url, request);
        }
        function clueGlobalSearch(request) {
            var url = "/api/ClueApi/ClueGlobalSearch";
            return $http.post(url, request);
        }
        function clueCreateCourseAccount(request) {
            var url = "/api/ClueApi/ClueCreateCourseAccount";
            return $http.post(url, request);
        }
        function userSchools(request) {
            return function (params) {
                var listRequest = {
                    key: params.search,
                    //order: {
                    //    //     filed: 'createdAt',
                    //    asc: false
                    //},
                    filter: {
                        NotContainShoolIds: request
                    },
                    page: {
                        pageIndex: params.page,
                        pageSize: 20
                    }
                }
                var url = "/api/UserApi/UserSchools";
                return $http.post(url, listRequest);
            }
        }
        function getClueExamTab(request) {
            var url = "/api/ExamApi/GetClueExamTab";
            return $http.post(url, request);
        }
        function mergeClueList(request) {
            return function(params) {
                var listRequest = {
                    key: params.search,
                    //order: {
                    //    //     filed: 'createdAt',
                    //    asc: false
                    //},
                    filter: {
                        clueId: request
                    },
                    page: {
                        pageIndex: params.page,
                        pageSize: 20
                    }
                }
                var url = "/api/ClueApi/MergeClueList";
                return $http.post(url, listRequest);
            }
        }
        function clueExcelTemplate() {
            var url = "/api/ClueApi/ClueExcelTemplate";
            return $http.post(url);
        }
        function getTestReportUrl(request) {
            var url = "/api/ExamApi/GetTestReportUrl";
            return $http.get(url, { params: request });
        }
        function isContainDelClue(request) {
            var url = "/api/ClueApi/IsContainDelClue";
            return $http.post(url,request);
        }
        //获取直播课信息
        function getClueLiveInfoList(request) {
            var url = "/api/ClueApi/GetClueLiveInfoList";
            return $http.get(url, { params: request });
        }
        return {
            getClueDetail: getClueDetail,
            createNewClue: createNewClue,
            checkPhoneUnique: checkPhoneUnique,
            getChannelSimpleList: getChannelSimpleList,
            getSignContactDetail: getSignContactDetail,
            createFollowUp: createFollowUp,
            createAppointment: createAppointment,
            getFollowURecordList: getFollowURecordList,
            delClue: delClue,
            clueTransfer: clueTransfer,
            distributeClue: distributeClue,
            mergeClue: mergeClue,
            signContactDetail: signContactDetail,
            clueSignContact: clueSignContact,
            clueGlobalSearch: clueGlobalSearch,
            clueCreateCourseAccount: clueCreateCourseAccount,
            userSchools: userSchools,
            getClueExamTab: getClueExamTab,
            mergeClueList: mergeClueList,
            clueExcelTemplate: clueExcelTemplate,
            getTestReportUrl: getTestReportUrl,
            isContainDelClue: isContainDelClue,
            getClueLiveInfoList: getClueLiveInfoList
        }
    }]);
})