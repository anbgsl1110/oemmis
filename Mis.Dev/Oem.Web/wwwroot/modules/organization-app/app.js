"use strict";
/**
 * author :CBH
 * time:
 * description: 后台组织结构
 */


define([
    "angular",
    'uiRouter',
    "modules/organization-app/controller",
    //挂载子模块
    "modules/organization-app/services",
    "modules/organization-app/directive/directive"
], function (angular) {

    return angular.module("OrganizationApp", [
            "ui.router",
            "OrganizationApp.controllers",
            "OrganizationApp.services",
            "OrganizationApp.tree"
    ])
        .config([
            '$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('organization', {
                        url: '/organization',
                        //abstract: true,
                        title: '组织结构',
                        templateUrl: 'modules/organization-app/organization.html',
                        controller: 'OrganizationAppController',
                        resolve: {
                            permission: ["currentUserService", "rolesService", function (currentUserService, rolesService) {
                                return currentUserService.hasPermission([rolesService.crm_超级管理员], true);
                            }]
                        }
                    });
            }
        ]);
});