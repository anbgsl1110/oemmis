/**
 * author :LTD
 * time: 2016年7月5日 
 * description: 顶层模块，所有模块继承该模块，在此创建公用变量，注册公用方法, 挂载子模块
 */


define([
        "angular",
        "uiRouter",
        "modules/baseapp/controller",
        "components/nav/app",
        "nicescroll",

        //挂载子模块
        "modules/index-app/app"],
    function () {
        return angular.module("BaseApp",
            [
                "ui.router",
                "BaseApp.controllers",
                "components.nav",

                "IndexApp"
            ])
            .config([
                "$urlRouterProvider", function($urlRouterProvider) {
                    $urlRouterProvider.otherwise('/index');

                }
            ])
            .run([
                '$rootScope', '$state', '$stateParams',
                function($rootScope, $state, $stateParams) {
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                }
            ])
            // 对请求中html文件 做非缓存处理
            // 全局HTTP处理
            .config([
                "$httpProvider", function($httpProvider) {
                    $httpProvider.interceptors.push([
                        '$q', '$rootScope', function($q, $rootScope) {
                            return {
                                request: function(config) {
                                    //监控Angularjs get请求 如果请求地址含有html文件，则给其加版本戳，已防止缓存
                                    var urlArgs = "version=" + (new Date()).getTime();
                                    var baseUrl = "";
                                    if (typeof (requirejs) != "undefined") {
                                        urlArgs = requirejs.s.contexts._.config.urlArgs;
                                        baseUrl = requirejs.s.contexts._.config.baseUrl;
                                    }
                                    if (config.method == 'GET') {
                                        if (config.url.indexOf('.html') !== -1 || config.url.indexOf('.htm') !== -1) {
                                            baseUrl = '/';
                                            var separator = config.url.indexOf('?') === -1 ? '?' : '&';
                                            config.url = baseUrl + config.url + separator + urlArgs;
                                            //config.url = config.url + separator + urlArgs;
                                        }
                                    }
                                    return config;
                                },
                                responseError: function(response) {
                                    var school = document.cookie.match(/\bschool=([^;]+)/)[1];
                                    switch (response.status) {
                                    case 497:
                                        alert("无权操作");
                                        top.location.href = '/' + school + '/Login';
                                        break;
                                    case 498:
                                        alert("会话超时，请重新登录");
                                        top.location.href = '/' + school + '/Login';
                                        break;
                                    case 499:
                                    case 500:
                                        alert("未知错误，通知系统管理员");
                                        break;
                                    default:
                                        break;
                                    }
                                    return $q.reject(response);
                                }
                            };
                        }
                    ]);
                }
            ]);
    }
);