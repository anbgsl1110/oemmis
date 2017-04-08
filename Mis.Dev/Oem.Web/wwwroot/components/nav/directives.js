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
                    link: function (scope, iElement, iAttr) {
                        //导航权限后台还是员工
                        scope.adminLimit = currentUserService.hasPermission([rolesService.crm_超级管理员], false);
                        scope.productsLimit = currentUserService.hasPermission([rolesService.crm_产品库], false);
                        scope.consultLimit = currentUserService.hasPermission([rolesService.crm_咨询], false);
                        scope.channelLimit = currentUserService.hasPermission([rolesService.crm_渠道], false);
                        scope.clueLimit = currentUserService.hasPermission([rolesService.crm_线索], false);
                        scope.employeeLimit = currentUserService.hasPermission([rolesService.crm_员工管理], false);
                        scope.statisticsLimit = currentUserService.hasPermission([rolesService.crm_统计分析], false);
                        scope.toolLimit = currentUserService.hasPermission([rolesService.crm_营销工具], false);
                        scope.testLimit = currentUserService.hasPermission([rolesService.crm_入学测试], false);
                        scope.xbxLimit = currentUserService.hasPermission([rolesService.crm_校宝秀], false);
                        scope.liveLimit = currentUserService.hasPermission([rolesService.crm_直播课], false);
                        scope.reportLimit = currentUserService.hasPermission([rolesService.crm_数据报表], false);
                        var currentUser = currentUserService.getCurrentUser();
                        scope.siteList = [];
                        if (currentUser.orgBaseInfos) {
                            for (var i = 0, l = currentUser.orgBaseInfos.length; i < l; i++) {
                                if (currentUser.orgBaseInfos[i].state) {
                                    scope.siteList.push(currentUser.orgBaseInfos[i])
                                }
                            }
                        }
                        //scope.logo = currentUser.Org.OrganConfig.Logos.nav_1;
                        scope.headImgUrl = currentUser.userHeadImg;
                        scope.userName = currentUser.userName;
                        scope.hasCourse = currentUser.hasCourse;
                        init(scope);
                        scope.isShow = false;

                        scope.openDialog = function () {
                            scope.isShow = true;
                            $(".account-head-pic img", iElement).attr("src", currentUser.userHeadImg)
                        };

                        scope.changeImgAction = function (url) {
                            scope.headImgUrl = url;
                        };

                        scope.logout = function () {
                            navNetService.logout().then(function (result) {
                                    var school = document.cookie.match(/\bschool=([^;]+)/);
                                    school = school && school.length > 1 ? school[1] : null;
                                    if (school)
                                        window.location = '/' + school + '/login';
                                    else
                                        window.location = '/';
                                })
                                .catch(function (reason) {
                                    window.location = '/';
                                });
                        };

                        scope.openSite = function (idx) {
                            $.ajax({
                                url: '/api/UserApi//RedirectToCourse',
                                data: {
                                    orgId: scope.siteList[idx].id
                                },
                                type: 'POST',
                                dataType: 'text',
                                async: false,
                                cache: false,
                                success: function (result) {
                                    var newwindow = window.open("");
                                    newwindow.location.href = JSON.parse(result).data;
                                }
                            });
                            //navNetService.openSite({ orgId: scope.siteList[idx].id }).then(function (result) {
                            //    var newwindow = window.open("");
                            //    newwindow.location.href = result;
                            //});
                        }
                    }
                };
            }
        ]);
});
