"use strict";



define([
    "angular",
    'uiRouter',
    "modules/index-app/controller",
    "highcharts-ng",
    "funnel",
    "components/selectBox/directive"
],
    function(angular) {

        return angular.module("IndexApp",
            [
                "ui.router",
                "IndexApp.controllers",
            ])
            .config([
                "$stateProvider",
                function($stateProvider) {

                    $stateProvider
                        .state("index",
                        {
                            parent: "base",
                            url: "/index",
                            templateUrl: "modules/index-app/index.html",
                            controller: "IndexAppController",
                            title: "首页"
                        });
                }
            ]);
    });