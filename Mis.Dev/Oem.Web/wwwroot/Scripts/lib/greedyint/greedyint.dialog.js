
'use strict';
/*
*维护：小潘
*时间：2015年4月10日 16:56:36
*/

define(["jquery"], function ($) {

    var greedyint = greedyint || {};

    greedyint.dialog2 = greedyint.dialog2 || {};


    //dialog options
    //{
    //    top: int,
    //    left: int,
    //    lock: bool,
    //    lockAt: string "Open","Show"
    //    show: bool  // open时显示
    //    loading:bool //loading效果
    //    readyCallback:Function //回调
    //}
    greedyint.dialog2.createIframeDialog = function() {
        var dialog = {};

        //是否是预期src 只有通过open打开的src才会记入load状态 有stateId 通过src为空丢失状态后 认为弹窗没有目标
        dialog._srcExpected = false;
        dialog._loaded = false;
        dialog._loadCount = 0;
        dialog._readyCallback = null;
        dialog._elementDialog = $('<div style="position: fixed; z-index: 990;left:10px;top:10px">'
            + '<iframe></iframe>'
            + '</div>')[0];
        dialog._elementMask = $('<div style="position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden; background-color:rgb(0, 0, 0); opacity:0.5; z-index: 980; background-position: initial initial; background-repeat: initial initial;"></div>')[0];
        dialog._elementLoading = $('<div style="width: 100px; height: 80px; background: url(/Content-1.0/images/icon_bg14.gif) no-repeat;position: absolute; top: 50%; left: 50%; margin: -40px 0 0 -50px; z-index: 990;border-radius: 6px"></div>')[0];
        dialog._iframe = $(dialog._elementDialog).find("iframe")[0];
        dialog._options = null;

        //初始化隐藏
        $([dialog._elementDialog, dialog._elementMask, dialog._elementLoading]).hide();

        dialog.getStateId = function() {
            if (this._loaded)
                return this._loadCount;
            else
                return null;
        };
        dialog.getContentWindow = function() {
            return this._iframe.contentWindow;
        };
        dialog.getSrc = function() {
            return this._iframe.src;
        };
        dialog._setSrc = function(src) {
            this._loaded = false;
            this._iframe.src = src;
        };
        dialog.getReadyCallback = function() {
            return this._readyCallback;
        };
        dialog._setReadyCallback = function(callback) {
            this._readyCallback = callback;
            if (this._loaded)
                callback();
        };
        dialog.setOptions = function(options) {
            this._options = options;
        };
        dialog.getOptions = function() {
            return this._options;
        };
        dialog.show = function() {
            $(this._elementLoading).hide();
            $(this._elementDialog).show();
            //判断lockAt 默认为"Open"
            if (((this._options && this._options.lockAt) || "Open") == "Show") {
                if (this._options && typeof this._options.lock == "boolean") {
                    if (this._options.lock)
                        $(this._elementMask).show();
                } else
                    $(this._elementMask).show();
            }
            dialog.startAutoAdjust();
        };
        dialog.adjust = function() {
            if (this._iframe.contentWindow.document) {
                var $document = $(this._iframe.contentWindow.document);
                this._iframe.width = $document.width();
                this._iframe.height = $document.height();
            }

            var $elementDialog = $(this._elementDialog);
            var $window = $(window);
            if (this._options && typeof this._options.top == "number")
                $elementDialog.css("top", this._options.top + "px");
            else
                $elementDialog.css("top", ($window.height() - $elementDialog.height()) / 2 + "px");
            if (this._options && typeof this._options.left == "number")
                $elementDialog.css("left", this._options.left + "px");
            else
                $elementDialog.css("left", ($window.width() - $elementDialog.width()) / 2 + "px");
        };
        dialog._timerAutoAdjust = null;
        dialog.startAutoAdjust = function() {
            dialog.adjust();
            dialog._timerAutoAdjust = setInterval(function() {
                dialog.adjust();
            }, 200);
        };
        dialog.stopAutoAdjust = function() {
            clearInterval(dialog._timerAutoAdjust);
        }; //open() 
        //open(string src, function readyCallback = null) src 地址 readyCallback 成功回调
        //open(string src, object options = null)  src 地址 options 参数
        dialog.open = function(src, readyCallbackOrOptions) {
            if (arguments.length == 0) {
            } else if (arguments.length <= 2 && (src === null || typeof src == "string") && (readyCallbackOrOptions == null || typeof readyCallbackOrOptions == "function")) {
                this._srcExpected = true;
                this._setSrc(src || "");
                this._setReadyCallback(readyCallbackOrOptions || null);
            } else if (arguments.length <= 2 && (src === null || typeof src == "string") && (readyCallbackOrOptions == null || typeof readyCallbackOrOptions == "object")) {
                this._srcExpected = true;
                this._setSrc(src || "");
                this._setReadyCallback((readyCallbackOrOptions && typeof readyCallbackOrOptions.readyCallback == "function") ? readyCallbackOrOptions.readyCallback : null);
                if (readyCallbackOrOptions) {
                    delete readyCallbackOrOptions.readyCallback;
                    dialog._options = readyCallbackOrOptions;
                }
            } else {
                throw ""
                    + "\n Wrong Arguments"
                    + "\n () "
                    + "\n (string src, function readyCallback = null)";
            }

            //这里的执行顺序不要轻易修改

            if (!(this._options && this._options.loading === false)) {
                $(this._elementLoading).show();
            }

            //判断lockAt 默认为"Open"
            if (((this._options && this._options.lockAt) || "Open") == "Open") {
                if (this._options && typeof this._options.lock == "boolean") {
                    if (this._options.lock)
                        $(this._elementMask).show();
                } else
                    $(this._elementMask).show();
            }
            //当open恢复状态时，iframe load不会触发，在这里显示
            if (arguments.length == 0) {
                this.show();
                //            $(this._elementDialog).show();
            }

            if (this._elementLoading.parentNode != document.body)
                document.body.appendChild(this._elementLoading);
            if (this._elementMask.parentNode != document.body)
                document.body.appendChild(this._elementMask);
            if (this._elementDialog.parentNode != document.body)
                document.body.appendChild(this._elementDialog);
            //这里的执行顺序不要轻易修改
        }; //close(bool keepState = false, bool detach = false) // keepState 保持目标页面状态 detach 从DOM解离
        dialog.close = function(keepState, detach) {
            if (arguments.length <= 2 && (keepState === undefined || typeof keepState == "boolean") && (detach === undefined || typeof detach == "boolean")) {
                if (keepState && detach) {
                    throw ""
                        + "Cannot keep state on detaching.";
                }

                if (!(keepState === undefined ? false : keepState)) {
                    this._srcExpected = false;
                    this._setSrc("");
                    this._setReadyCallback(null);
                }
                if (detach) {
                    $([this._elementDialog, this._elementMask]).detach();
                }
            } else {
                throw ""
                    + "\n Wrong Arguments"
                    + "\n (bool keepState = true, bool detach = false)";
            }

            $([this._elementDialog, this._elementMask, this._elementLoading]).hide();
            this.stopAutoAdjust();
        };
        $(dialog._iframe).load(function() {
            if (dialog._srcExpected) {
                dialog._loaded = true;
                dialog._loadCount++;

                //这里的执行顺序不要轻易修改
                if (!(dialog._options && typeof dialog._options.show == "boolean" && !dialog._options.show)) {
                    dialog.show();
                    //                dialog.adjust();
                }
                if (dialog._readyCallback) {
                    var callback = dialog._readyCallback;
                    callback(dialog._iframe.contentWindow);
                }
                //这里的执行顺序不要轻易修改
            }
        });
        return dialog;
    }; //单例模式控制器
    greedyint.dialog2._controller = (function() {
        var dialog = greedyint.dialog2.createIframeDialog();
        return {
            //iframeDialogOpen() 
            //iframeDialogOpen(string src, function readyCallback = null) src 地址 readyCallback 成功回调
            iframeDialogOpen: function(src, readyCallback) {
                try {
                    dialog.open.apply(dialog, arguments);
                } catch (e) {
                    throw e;
                }
            },
            //iframeDialogClose(bool keepState = false, bool detach = false) // keepState 保持目标页面状态 detach 从DOM解离
            iframeDialogClose: function(keepState, detach) {
                try {
                    dialog.close.apply(dialog, arguments);
                } catch (e) {
                    throw e;
                }
            },
            iframeDialogStateId: function() {
                return dialog.getStateId();
            },
            iframeDialogAdjust: function() {
                dialog.adjust();
            },
            iframeDialogShow: function() {
                dialog.show();
            }
        };
    })();
    //单例模式函数
    greedyint.dialog2.iframeDialogOpen = greedyint.dialog2._controller.iframeDialogOpen;
    greedyint.dialog2.iframeDialogClose = greedyint.dialog2._controller.iframeDialogClose;
    greedyint.dialog2.iframeDialogStateId = greedyint.dialog2._controller.iframeDialogStateId;
    greedyint.dialog2.iframeDialogAdjust = greedyint.dialog2._controller.iframeDialogAdjust;
    greedyint.dialog2.iframeDialogShow = greedyint.dialog2._controller.iframeDialogShow;

    //成功弹窗
    greedyint.dialog2.createSuccessDialog = function() {
        var successDialog = {};
        successDialog._dialog = greedyint.dialog2.createIframeDialog();
        successDialog._dialog.setOptions({ laoding: false });
        //success(string msg, int duration = 3000)
        successDialog.success = function(msg, duration) {
            //参数检查
            if ((arguments.length >= 1 && arguments.length <= 2) &&
            (msg === null || typeof msg === "string") &&
            (duration === undefined || typeof duration == "number")) {

                this._dialog.open("", function(contentWindow) {
                    var stateId = successDialog._dialog.getStateId();

                    setTimeout(function() {
                        var contentWindow = successDialog._dialog.getContentWindow();
                        $(contentWindow.document.body).append(
                            '<div style="position:absolute;width:140px;height:100px;color:#fff;'
                            + 'background:url(' + contentWindow.parent.location.origin + '/Content-1.0/images/bg_tips3_1.png' + ') no-repeat">'
                            + '<em style="width:40px;height:40px;margin:20px auto 8px; display:block;'
                            + 'background:url(' + contentWindow.parent.location.origin + '/Content-1.0/images/bg_tips3_2.png) no-repeat"></em>'
                            + '<span style="font-size:12px; display:block; text-align:center;">' + msg || "" + '</span>'
                            + '</div>');
                        var $document = $(contentWindow.document);
                        var $element = $(contentWindow.document.body).find("div");
                        $element.css("top", ($document.height() - $element.height()) / 2 + "px");
                        $element.css("left", ($document.width() - $element.width()) / 2 + "px");

                        successDialog._dialog.adjust();
                    }, 0);

                    setTimeout(function() {
                        if (successDialog._dialog.getStateId() == stateId)
                            successDialog._dialog.close();
                    }, duration || 1000);
                });

            } else {
                throw ""
                    + "\n Wrong Arguments"
                    + "\n (string msg, int duration = 3000)";
            }
        };
        return successDialog;
    }; //单例模式控制器
    greedyint.dialog2._controller = (function() {
        var successDialog = greedyint.dialog2.createSuccessDialog();
        return {
            //success(string msg, int duration = 3000)
            success: function(msg, duration) {
                try {
                    successDialog.success.apply(successDialog, arguments);
                } catch (e) {
                    throw e;
                }
            }
        };
    })();
    //单例模式函数
    greedyint.dialog2.success = greedyint.dialog2._controller.success;

    //失败弹窗
    greedyint.dialog2.createErrorDialog = function() {
        var errorDialog = {};
        errorDialog._dialog = greedyint.dialog2.createIframeDialog();
        errorDialog._dialog._elementDialog.style.zIndex = "991";
        errorDialog._dialog.setOptions({ top: 65, lock: false, loading: false });
        //success(string msg, int duration = 3000)
        errorDialog.error = function(msg, duration) {
            //参数检查
            if ((arguments.length >= 1 && arguments.length <= 2) &&
            (msg === null || typeof msg === "string") &&
            (duration === undefined || typeof duration == "number")) {

                this._dialog.open("", function(contentWindow) {
                    var stateId = errorDialog._dialog.getStateId();
                    setTimeout(function() {
                        $(contentWindow.document.body).append(
                            '<div style="width:440px;height:36px;color:#fff;line-height: 36px; text-align: center; font-family:微软雅黑,Segoe UI,Arial,Helvetica,sans-serif;font-size:14px;'
                            + 'background:#c94032 url(' + contentWindow.parent.location.origin + '/Content-1.0/images/bg_tips3_3.png' + ') repeat-x">'
                            + '<a href="javascript:;" style="width:13px;height:13px;display:block;float:right;margin:12px 12px 0 0; text-decoration:none;'
                            + 'background:url(' + contentWindow.parent.location.origin + '/Content-1.0/images/icon_btn5_1.png' + ') no-repeat;"></a>'
                            + '<div>' + msg || '' + '</div>'
                            + '</div>');
                        $(contentWindow.document.body).find('a').
                            hover(function() {
                                $(this).css("backgroundPosition", "0 -13px");
                            }, function() {
                                $(this).css("backgroundPosition", "");
                            }).
                            click(function() {
                                errorDialog._dialog.close();
                            });

                        errorDialog._dialog.adjust();
                    }, 0);

                    setTimeout(function() {
                        if (errorDialog._dialog.getStateId() == stateId)
                            errorDialog._dialog.close();
                    }, duration || 3000);
                });
            } else {
                throw ""
                    + "\n Wrong Arguments"
                    + "\n (string msg, int duration = 3000)";
            }
        };
        return errorDialog;
    }; //单例模式控制器
    greedyint.dialog2._controller = (function() {
        var errorDialog = greedyint.dialog2.createErrorDialog();
        return {
            //success(string msg, int duration = 3000)
            error: function(msg, duration) {
                try {
                    errorDialog.error.apply(errorDialog, arguments);
                } catch (e) {
                    throw e;
                }
            }
        };
    })();
    //单例模式函数
    greedyint.dialog2.error = greedyint.dialog2._controller.error;


    greedyint.dialog2._controller = (function() {
        var dialog = greedyint.dialog2.createIframeDialog();
        var notify = function() {
            dialog.open("/Home/Notify", { show: false, lockAt: "Show", loading: false });
        };
        var show = function() {
            dialog.show();
        };
        var close = function() {
            dialog.close();
        };
        return {
            notify: notify,
            show: show,
            close: close
        };
    })();
    greedyint.dialog2.notify = greedyint.dialog2._controller.notify;
    greedyint.dialog2.notifyShow = greedyint.dialog2._controller.show;
    greedyint.dialog2.notifyClose = greedyint.dialog2._controller.close;


    //dialog方式打开页面,宽度高度最大化
    greedyint.dialog2.openNewWindow = function(url, isWinClose) {
        var height = window.screen.availHeight - 42;
        var width = window.screen.availWidth - 18;
        if (navigator.userAgent.toLowerCase().match(/chrome/) != null) {
            height = window.screen.availHeight;
            width = window.screen.availWidth;
        }
        var name = 'D_' + getDatestr();
        var new_window = window.open(url, '', 'location=0,hotkeys=0,menubar=0,scrollbars=1,titlebar=0,toolbar=0,height=' + height + ',width=' + width + '');
        //    new_window.location.href = url;
        //    new_window.moveTo(0, 0);
        //    if (isWinClose) {
        //        setTimeout(function () {
        //            closeWin();
        //        }, 1000);
        //    }
        return new_window;
    };
    greedyint.dialog2.confirm = function(content, yes, no, parent, okVal, cancelVal, cancel, zIndex) {
        var thisDialog = $.dialog({
            title: '提醒',
            icon: 'confirm.gif',
            fixed: true,
            lock: true,
            content: content,
            resize: false,
            parent: parent || null,
            ok: yes,
            cancel: no || function() {
            },
            okVal: okVal || '确定',
            cancelVal: cancelVal || '取消',
            zIndex: zIndex
        });
        //    thisDialog = greedyint.dialog2.resize(thisDialog);
        return thisDialog;
    };

    delete greedyint.dialog2._controller;


    return greedyint.dialog2;
})