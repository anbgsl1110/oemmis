"use strict";
/**
 * author :LTD
 * time: 2016年7月5日 
 * description: 首页
 */


define([
    "angular",
    'uiRouter',
    "modules/message-app/controller",
    "components/selectBox/directive",
    "components/single-popup/directive",
    "components/multiple-popup/directive"
], function (angular) {

    return angular.module("MessageApp", [
            "ui.router",
            "MessageApp.controllers",
            "Components.selectBox",
            "Components.singlePopup",
            "Components.multiplePopup"
    ])
        .config([
            "$stateProvider",
            function ($stateProvider) {

                $stateProvider
                    .state("message", {
                        //parent: "base",
                        url: "/index/message/:msgIndex/",
                        templateUrl: "modules/message-app/message.html",
                        controller: "MessageAppController",
                        title: "消息中心",
                        resolve: {
                            permission: ["currentUserService", "rolesService", function (currentUserService, rolesService) {
                                return currentUserService.hasPermission([rolesService.crm_员工], true);
                            }]
                        }
                    });
            }
        ]);
});