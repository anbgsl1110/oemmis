/**
 * author:shaobo.wang
 * date:2016.7.13
 * description:渠道获取数据接口定义
 */
define(['angular', 'services/net/common'], function () {
    return angular.module('services.net.channel', ['services.net.common'])
        .service('channelNetService', ['$http', '$q', 'commonNetService', function ($http, $q, commonNetService) {
            //删除渠道
            this.deleteChannel = function (param) {
                return $http.post('/api/ChannelApi/DelChannel', param);
            };

            //渠道启用、禁用接口
            this.freezeChannel = function (param) {
                return $http.post('/api/ChannelApi/FreezeChannel', param);
            };

            //新增，修改渠道详情
            this.channelEdit = function (param) {
                return $http.post('/api/ChannelApi/CreateNewChannel', param);
            };

            //获取渠道详细信息
            this.getChannelDetail = function (param) {
                return $http.get('/api/ChannelApi/ChannelDetail', { params: param });
            };

            //获取渠道详情的统计信息
            this.getChannelDetailStatistics = function (param) {
                return $http.post('/api/ChannelApi/ChannelClueStatistics', param);
            };

            //根据入测Id查询测试信息
            this.getExamInfoByIds = function (parameters) {
                return $http.post('/api/ExamApi/Exams', parameters);
            };

            //获取校区入测列表
            this.getSchoolExams = function (schoolIds) {
                return function (params) {
                    var obj = {
                        filter: {
                            schoolId: schoolIds
                        },
                        key: params.search,
                        page: {
                            pageIndex: params.page,
                            pageSize: 20
                        }
                    };
                    return $http.post('/api/ExamApi/SchoolExams', obj);
                }
            };

            /*============CRM v1.5后新加=============
                后端将渠道详情的Response模型进行了拆分：入测、直播
            */
            //根据直播课Id查询渠道详情
            this.getLiveClassSelectListByIds = function (param) {
                return $http.post('/api/LiveClassService/GetLiveClassSelectListByIds', param);
            };

            //根据渠道Id获取渠道入测列表
            this.getAdmissionTestByChannelId = function (param) {
                return $http.post('/api/AdmissionTestService/GetAdmissionTestByChannelId', param);
            };
            //根据渠道Id获取渠道直播列表
            this.getLiveClassSelectListByChannelId = function(param) {
                return $http.post('/api/LiveClassService/GetLiveClassSelectListByChannelId', param);
            };
            //根据校区Id获取当前校区内的直播
            this.getLiveClassSelectList = function (schoolIds) {
                return function (params) {
                    var obj = {
                        schoolIds: schoolIds,
                        key: params.search,
                        page: {
                            pageIndex: params.page,
                            pageSize: 20
                        }
                    };
                    return $http.post('/api/LiveClassService/GetLiveClassSelectList', obj);
                };
            };
        }]);
});