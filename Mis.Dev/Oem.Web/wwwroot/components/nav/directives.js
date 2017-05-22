/**
 * Created by CaiFeng on 2015/3/3 0003.
 */
'use strict';


define([
    'angular',
    'jquery',
    'services/current-user-service',
    'services/bounced',
    'components/nav/service',
    'components/cropper/directive',
    'services/dialogService',
    'uiRouter'
], function (angular, $) {
    angular.module('components.nav.directive', ['service.currentUser', 'Dialog.services', 'Bounced.services', 'components.nav.services', 'ui.router', 'Components.cropper'])
        .directive('gintNav', ['version', 'currentUserService', 'rolesService', '$state', '$rootScope', '$timeout', 'openBouncedService', 'navNetService', 'gintDialog','errorPopService',
            function (version, currentUserService, rolesService, $state, $rootScope, $timeout, openBouncedService, navNetService, gintDialog, errorPopService) {
                function moveToActive(left,width) {
                    $("li.navbar-current").stop(true, true).animate({
                        left: left,
                        width: width
                    }, 'fast');
                }

                function mouseEnterAction() {
                    var left = $(this).position().left;
                    var width = $(this).width();
                    moveToActive(left, width);
                }

                function mouseLeaveAction() {
                    var navItems = $('ul.navbar-nav-left li.navbar-nav-item');
                    for (var i = 0, length = navItems.length; i < length; i++) {
                        if ($(navItems[i]).find('.active').length > 0) {
                            var position = $(navItems[i]).position();
                            var left = position ? position.left : 0;
                            var width = $(navItems[i]).width();
                            moveToActive(left, width);
                            return;
                        }
                    };
                }

                function navDownAction() {
                    var navItems = $('ul.navbar-nav-left li.navbar-nav-item li.navbar-dropitem');
                    //点击导航栏的时候将错误提示框关闭
                    errorPopService.close();
                    //点击导航栏的时候将滚动条置顶
                    $("body").getNiceScroll(0).doScrollTop(0);
                    for (var i = 0, length = navItems.length; i < length; i++) {
                        if ($(navItems[i]).find('.active').length > 0) {
                            $(navItems[i]).addClass('dropitem-current');
                        } else {
                            $(navItems[i]).removeClass('dropitem-current');
                        }
                    }
                }

                function init(scope) {
                    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                        //TOFIX
                        $timeout(mouseLeaveAction);
                        $timeout(navDownAction);
                    });
                    $('ul.navbar-nav-left li.navbar-nav-item').mouseenter(mouseEnterAction);
                    $("ul.navbar-nav-left").mouseleave(mouseLeaveAction);
                }

                return {
                    restrict: 'EA',
                    scope: {
                        ngModel: '=',
                        hasCorrect: "=",
                        countData: "="
                    },
                    templateUrl: 'components/nav/nav.html',
                    link: function (scope) {  
                        //导航权限后台还是员工
                        scope.businessLimit = false;
                        scope.adminLimit = false;
                        var currentUser = currentUserService.getCurrentUser();
                        if (currentUser.userId === 1) {
                            scope.adminLimit = true;
                        }
                        if (currentUser.userId > 1){
                            scope.businessLimit = true;
                        }
                        scope.userName = currentUser.userName;
                        init(scope);
                        scope.isShow = false;

                        scope.logout = function () {
                            navNetService.logout().then(function (result) {
                                    var org = document.cookie.match(/\bschool=([^;]+)/);
                                    org = org && org.length > 1 ? org[1] : null;
                                    if (org)
                                        window.location = '/' + org + '/login';
                                    else
                                        window.location = '/';
                                })
                                .catch(function (reason) {
                                    window.location = '/';
                                });
                        };
                    }
                };
            }
        ]);
});
