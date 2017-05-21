
define(
    ["angular",
     "services/net/common",
     "angularMock",
     "services/random"],
    function() {
        return angular.module("services.net.index",["services.random", "services.net.common"])
            .factory("indexService",["$http",
            "$timeout",
            "$q",
            "randomService",
            "commonNetService",
            function($http, $timeout, $q, randomService, commonNetService) {

                        //获取任务列表
                        function getTasks(req) {
                            var url = "/api/MissionApi/GetMissionList";
                            return $http.post(url, req);
                        }
                        //饼图数据
                        function getDonutData(request) {
                            var url = "/api/StatisticsApi/GetChannelDistribution";
                            return $http.get(url, { params: request });
                        }
                    
                        return {
                            getTasks: getTasks,
                            getDonutData: getDonutData
                        }
                    }
        ]);
    });