
define(["angular", "services/net/common","angularMock", "services/random"], function () {
    return angular.module("services.net.index", ["services.random","services.net.common",])
        .factory("indexService", ["$http", "$timeout", "$q", "randomService", "commonNetService", function ($http, $timeout, $q, randomService, commonNetService) {


            //获取今日预约
            function getReserves(req) {               
                var url = "/api/VisitAppointmentService/GetTodayVisitAppointments"; 
                return $http.post(url, req);    
            }
            //获取今日跟进/信息中心跟进列表
            function getTodayFullowUp(req) {
                var url = "/api/ClueApi/NextFullowUpClues";
                return $http.post(url, req);
            }
            //获取预约列表
            function getReservesList(req) {
                var url = "/api/VisitAppointmentService/GetClueVisitAppointments";
                return $http.post(url, req);
            }
            //获取消息列表
            function getMessages(req) {
                var url = "/api/NoticeApi/GetNoticeList";
                return $http.post(url, req);
            }
            //获取任务列表
            function getTasks(req) {
                var url = "/api/MissionApi/GetMissionList";
                return $http.post(url, req);
            }

            //忽略消息
            function IgnoreMessages(req) {
                var url = "/api/NoticeApi/IgnoreNotice";
                return $http.post(url, req);
            }

             
            //获取销售漏斗数据
            function getFunnelData(request) {
                var url = "/api/StatisticsApi/GetSalesFunnel";
                return $http.get(url, { params: request });
            }
            //获取目标数据
            function getTarget(request) {
                var url = "/api/StatisticsApi/GetUserSalesTarget";
                return $http.get(url, { params: request });
            }
           
            //
            function getMultipleData(request) {
                var url = "/api/StatisticsApi/GetSalesStatistics";
                return $http.get(url, { params: request });

            }

            //饼图数据
            function getDonutData(request) {
                var url = "/api/StatisticsApi/GetChannelDistribution";
                return $http.get(url, { params: request });
            }
            return {
                getTodayFullowUp:getTodayFullowUp,
                getReservesList:getReservesList,
                getReserves: getReserves,
                getMessages: getMessages,
                getTasks: getTasks,
                getFunnelData: getFunnelData,
                getMultipleData: getMultipleData,
                getDonutData: getDonutData,
                IgnoreMessages: IgnoreMessages,
                getTarget: getTarget
            }
            
        }]);
})