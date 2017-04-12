"use strict";

define(["angular", 'ngDialog'],
    function(angular) {
        return angular.module("Dialog.services", ['ngDialog'])
            .service('gintDialog',
            [
                '$timeout', 'ngDialog', 'ERROR_DIALOG_TYPE', '$q',
                function($timeout, ngDialog, ERROR_DIALOG_TYPE, $q) {

                    var getDatestr = function() {
                        //visitTime
                        var now = new Date();
                        var year = now.getFullYear();
                        var month = now.getMonth() + 1;
                        var day = now.getDate();
                        var hour = now.getHours();
                        var minute = now.getMinutes();
                        if (month < 10) {
                            month = "0" + month;
                        }
                        if (day < 10) {
                            day = "0" + day;
                        }
                        if (hour < 10) {
                            hour = "0" + hour;
                        }
                        if (minute < 10) {
                            minute = "0" + minute;
                        }
                        var nowdate = year + "-" + month + "-" + day + " " + hour + ":" + minute;
                        return nowdate;
                    };

                    return {
                        // TOFIX: gintDialog弹出框在同时弹出两个弹框时message会相互覆盖!
                        confirm: function(title, message, sure, cancel, isShow) {
                            var deferred = $q.defer();

                            $('.body-layout').addClass("blur");
                            var dialog = ngDialog.openConfirm({
                                template: 'components/dialogs/confirm.html',
                                //增加确定取消按钮文案自定义功能 by cwj
                                data: {
                                    title: title,
                                    message: message,
                                    sure: sure || '确定',
                                    cancel: cancel || '取消',
                                    isShow: isShow === false ? false : true
                                }
                            }).then(function(data) {
                                    $('.body-layout').removeClass("blur");
                                    deferred.resolve(data);
                                },
                                function(reason) {
                                    $('.body-layout').removeClass("blur");
                                    deferred.reject(reason);
                                });

                            return deferred.promise;
                        },
                        error: function(message, type, duration) {
                            if (type == null) type = ERROR_DIALOG_TYPE.NORAML;
                            if (duration == null) duration = 2000;
                            if (typeof message === "function") {
                                message();
                                return;
                            }
                            var dialog = ngDialog.openConfirm({
                                template: 'components/dialogs/olderror.html',
                                data: {
                                    message: message,
                                    isTop: type == ERROR_DIALOG_TYPE.DIALOG,
                                    close: function() {
                                        ngDialog.close();
                                        $timeout.cancel(timer);
                                    }
                                }
                            });

                            var timer = $timeout(function() {
                                    ngDialog.close();
                                },
                                duration);
                        },
                        success: function(message, duration) {
                            if (duration == null) duration = 1000;
                            var dialog = ngDialog.openConfirm({
                                template: 'components/dialogs/success.html',
                                data: {
                                    message: message
                                }
                            });
                            //开启模糊效果
                            $('.body-layout').addClass("blur");

                            $timeout(function() {
                                    ngDialog.close();
                                    //移除模糊效果
                                    $('.body-layout').removeClass("blur");
                                },
                                duration);
                        },
                        //打开新窗口
                        openNewWindow: function(url, isWinClose) {
                            var height = window.screen.availHeight - 42;
                            var width = window.screen.availWidth - 18;
                            if (navigator.userAgent.toLowerCase().match(/chrome/) != null) {
                                height = window.screen.availHeight;
                                width = window.screen.availWidth;
                            }
                            var name = 'D_' + getDatestr();
                            var new_window = window.open(url,
                                '',
                                'location=0,hotkeys=0,menubar=0,scrollbars=1,titlebar=0,toolbar=0,height=' +
                                height +
                                ',width=' +
                                width +
                                '');
                            return new_window;
                        },
                        prompt: function(mainTitle, subTitle, finish) {
                            var dialog = ngDialog.openConfirm({
                                template: 'components/dialogs/prompt.html',
                                data: {
                                    mainTitle: mainTitle,
                                    subTitle: subTitle,
                                    finish: finish || "完成",
                                }
                            });
                        },
                        popupsuccess: function(title, content1, content2, duration) {
                            if (duration == null) duration = 1000;
                            var dialog = ngDialog.openConfirm({
                                template: 'components/dialogs/popupsuccess.html',
                                data: {
                                    title: title || "提示",
                                    content1: content1,
                                    content2: content2,
                                }
                            });
                            //开启模糊效果
                            $('.body-layout').addClass("blur");

                            $timeout(function() {
                                    ngDialog.close();
                                    //移除模糊效果
                                    $('.body-layout').removeClass("blur");
                                },
                                duration);
                        },
                        popupunsuccess: function(title, content1, content2, btnContent) {
                            var dialog = ngDialog.openConfirm({
                                template: 'components/dialogs/popupunsuccess.html',
                                data: {
                                    title: title || "提示",
                                    content1: content1,
                                    content2: content2,
                                    btnContent: btnContent,
                                }
                            });
                        },
                        closeAll: function() {
                            ngDialog.closeAll(); //清除所有弹出
                        }
                    };
                }
            ])
            .constant('ERROR_DIALOG_TYPE',
            {
                NORAML: 0, //主页面上错误信息
                DIALOG: 1 //弹出框上的错误信息
            });
    });
