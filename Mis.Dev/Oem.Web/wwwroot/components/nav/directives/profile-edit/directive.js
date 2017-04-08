"use strict";

define([
    'angular',
    'services/bounced',
    'components/nav/service',
    'components/cropper/directive',
    'services/current-user-service',
    'services/dialogService'
], function (angular) {
    angular.module("components.nav.directive.profile", ['service.currentUser', 'Dialog.services', 'Bounced.services', 'components.nav.services'])
        .directive("profileEditDialog", [
            "$q", "$timeout", 'gintDialog', 'currentUserService', 'navNetService', 'navValidator','messages',
            function ($q, $timeout, gintDialog, currentUserService, navNetService, navValidator, messages) {

                function saveHeadImg(scope) {
                    var deferred = $q.defer();
                    scope.jsonImageData.userId = scope.jsonImageData.userId || currentUserService.getCurrentUser().userId;
                    navNetService.uploadUserHead(scope.jsonImageData).then(function (data) {
                        scope.headImgUrl = data;
                        currentUserService.getCurrentUser().userHeadImg = data;
                        scope.changeImgAction({
                            url: data
                        });
                        deferred.resolve();
                    }, function (reason) {
                        deferred.reject(reason);
                    });

                    return deferred.promise;
                }

                function reset(scope) {
                    scope.isChangePasswordTab = false;
                    scope.oldPwd = '';
                    scope.newPwd = '';
                    scope.comparePwd = '';
                    scope.headImgUrl = currentUserService.getCurrentUser().userHeadImg;
                }

                return {
                    restrict: 'EA',
                    scope: {
                        isShow: '=',
                        changeImgAction: '&'
                    },
                    templateUrl: 'components/nav/directives/profile-edit/template.html',
                    link: function (scope, iElement, iAttr) {
                        scope.headImgUrl = currentUserService.getCurrentUser().userHeadImg;
                        scope.jsonImageData = {};
                        reset(scope);

                        scope.switchTab = function (type) {
                            scope.isChangePasswordTab = (type === 1);
                        };

                        scope.cancle = function () {
                            scope.isShow = false;
                            reset(scope);
                        };

                        scope.confirm = function () {
                            var a=messages[25014];
                            if (scope.isChangePasswordTab) {
                                navValidator.password(scope.oldPwd, scope.newPwd, scope.comparePwd)
                                    .then(function (data) {
                                        return navNetService.changePassword(data);
                                    })
                                    .then(function () {
                                        scope.isShow = false;
                                        reset(scope);
                                        gintDialog.success('操作成功');
                                    })
                                    .catch(function (reason) {
                                        if (reason) {
                                            gintDialog.error(reason, 1);
                                        } else {
                                            gintDialog.error(messages[25014], 1);
                                        }
                     
                                    });
                            } else {
                                saveHeadImg(scope)
                                    .then(function () {
                                        scope.isShow = false;
                                        reset(scope);
                                        gintDialog.success('操作成功');
                                    })
                                    .catch(function (reason) {
                                        gintDialog.error(reason, 1);
                                    });
                            }
                        };
                    }
                }
            }
        ]);
});
