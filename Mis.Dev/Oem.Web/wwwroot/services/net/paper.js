/**
* Created by hui.jin 2016.07.19
*/
define(["angular", 'services/net/common'], function (angular) {
    return angular.module("services.net.paper", ['services.net.common']).service("paperNetService", [
        "$http", "$q", 'commonNetService',
        function($http, $q, commonNetService) {


            return {

            }
        }
    ]);
});