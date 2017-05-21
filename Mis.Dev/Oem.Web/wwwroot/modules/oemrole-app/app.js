"use strict";

define([
    "angular",
    'uiRouter',
    "modules/oemrole-app/controller",


], function (angular) {

    return angular.module("OemroleApp", [
            "ui.router",
            "OemroleApp.controllers",

    ])
        .config([
            '$stateProvider', function ($stateProvider) {
                $stateProvider
                    .state('oemrole', {

                        url: '/admin',
                        abstract: false,

                        title: '管理角色',
                        templateUrl: 'modules/oemrole-app/oemmrole.html',
                        controller: 'OemroleAppController',
                    });
            }
        ]);
});