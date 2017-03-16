
define(["angular", "services/net/common", "angularMock", "services/random"], function () {
    return angular.module("services.net.statistics", ["services.random", "services.net.common", ])
        .factory("statisticsService", ["$http", "$timeout", "$q", "randomService", "commonNetService", function ($http, $timeout, $q, randomService, commonNetService) {
            
            function getClueNumbers(request) {
                var url = "/api/StatisticsApi/GetClueCountStatistics";
                return $http.get(url, { params: request });
            }
            function getFollowNumbers(request) {
                var url = "/api/StatisticsApi/GetFollowuprecordStatistics";
                return $http.get(url, { params: request });
            }
            function getSigningMoney(request) {
                var url = "/api/StatisticsApi/GetSalesCountStatistics";
                return $http.get(url, { params: request });
            }
            function getSigningNumbers(request) {
                var url = "/api/StatisticsApi/GetSigncontractCountStatistics";
                return $http.get(url, { params: request });
            }
            function getConsultCountStatistics(request) {
                var url = "/api/StatisticsApi/GetConsultCountStatistics";
                return $http.get(url, { params: request });
            }
            return {
                getClueNumbers: getClueNumbers,
                getFollowNumbers: getFollowNumbers,
                getSigningMoney: getSigningMoney,
                getSigningNumbers: getSigningNumbers,
                getConsultCountStatistics: getConsultCountStatistics,

            }

        }]);
})