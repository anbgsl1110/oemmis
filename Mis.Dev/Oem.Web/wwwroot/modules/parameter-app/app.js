"use strict";
/**
 * author :zy
 * time: 2016年7月12日 
 * description: 参数设置
 */


define([
    "angular",
    'uiRouter',
    "modules/parameter-app/controller",
    "modules/parameter-app/directive",


], function (angular) {

    return angular.module("ParameterApp", [
            "ui.router",
            "ParameterApp.controllers",
            "ParameterApp.textPopup",

    ])
        .config([
            '$stateProvider', function ($stateProvider) {
                $stateProvider
                    .state('parameter', {

                        url: '/parameter',
                        abstract: false,

                        title: '系统参数',
                        templateUrl: 'modules/parameter-app/parameter.html',
                        controller: 'ParameterAppController',
                        resolve: {
                            permission: ["currentUserService", "rolesService", function (currentUserService, rolesService) {
                                return currentUserService.hasPermission([rolesService.crm_超级管理员], true);
                            }]
                        }
                    });
            }
        ]);
});