"use strict"
/**
 * Created by sue on 2015/3/30. 公用弹框
 */
define(["angular"],
    function(angular) {
        return angular.module("Bounced.services", [])
            .service('openBouncedService',
            [
                '$document', '$compile', '$rootScope', function($document, $compile, $rootScope) {
                    var baseTemplate = '\
				<div class="modal" style="display:none;">\
					<div class="modal-backdrop" style="height:100%;"></div>\
					<div class="modal-dialog-ab modal-content usual-large" style="display: block;">\
						<div id="_bounced-title" class="pop-up-title" >更换头像</div>\
						<div class="popup-btn-box clearfix">\
				            <button type="button" class="btn-default btn-cancel" id="_bounced-box-cancel">取消</button>\
				            <button type="button" class="btn-default btn-sure" id="_bounced-box-ok">保存</button>\
				        </div>\
				    </div>\
				</div>',
                        baseContainer = null,
                        currentContainer = null,
                        callbacks = {
                            ok: [],
                            cancel: []
                        };

                    function init() {
                        var head = angular.element('head');

                        var body = angular.element('body');
                        baseContainer = angular.element(baseTemplate);

                        body.attr('class', 'body-template');
                        body.append(baseContainer);

                        baseContainer.find('#_bounced-box-cancel').click(function(ev) {
                            for (var i = 0; i < callbacks.cancel.length; i++) {
                                if (callbacks.cancel[i](ev || event) == false)
                                    return;
                            }
                            _bouncedService.close();
                        });

                        baseContainer.find('#_bounced-box-ok').click(function(ev) {
                            for (var i = 0; i < callbacks.ok.length; i++) {
                                if (callbacks.ok[i](ev || event) == false)
                                    return;
                            }
                            _bouncedService.close();
                        });
                    }

                    function update(config) {

                        // check params
                        if (!config.template && !config.templateUrl) {
                            console.error('Missing params: template');
                            return false;
                        }

                        currentContainer = angular.element('<div></div>');

                        // insert template
                        if (config.template) {
                            currentContainer.append(config.template);
                        } else if (config.templateUrl) {
                            currentContainer.attr('ng-include', '"' + config.templateUrl + '"');
                        }

                        // compile and insert template into the dom
                        $compile(currentContainer)(config.scope || $rootScope.$new());
                        baseContainer.find('#_bounced-title').html(config.title || '编辑头像').after(currentContainer);

                        // save callback queue
                        if (config.callbacks) {
                            if (config.callbacks.ok) {
                                callbacks.ok.push(config.callbacks.ok);
                            }
                            if (config.callbacks.cancel)
                                callbacks.cancel.push(config.callbacks.cancel);
                        }

                        // set styles from config
                        if (config.css) {
                            baseContainer.css(config.css);
                        }

                        return true;
                    }

                    var _bouncedService = {
                        init: function(config) {
                            if (!baseContainer) {
                                init();
                            }

                            update(config);

                            return this;
                        },
                        open: function() {
                            baseContainer.fadeIn(200);
                            return this;
                        },
                        close: function() {
                            baseContainer.fadeOut(200);
                            callbacks = {
                                ok: [],
                                cancel: []
                            }
                            currentContainer && currentContainer.empty();
                            return this;
                        },
                        destroy: function() {
                            callbacks = {
                                ok: [],
                                cancel: []
                            }
                            currentContainer && currentContainer.empty();
                            return this;
                        }

                    }


                    return _bouncedService;


                }
            ])
            .service('errorPopService',
            [
                '$document', '$compile', '$rootScope', '$interval',
                function($document, $compile, $rootScope, $interval) {
                    var baseTemplate = '<div class="clue-fail-box" >\
                                    <div class="text-box1">操作失败！</div>\
                                    <div class="text-box2">{{dialogErrorData.message}}</div>\
                                    <div class="clue-fail-btn-box">\
                                        <span id="dasdas">{{dialogErrorData.duration}}s关闭</span>\
                                        <button type="button" class="btn-copy" ng-click="dialogErrorData.close()">知道了</button>\
                                    </div>\
                                </div>',
                        baseContainer = null,
                        currentContainer = null,
                        callbacks = {
                            ok: [],
                            cancel: []
                        };

                    function init(config) {
                        var head = angular.element('head');

                        var body = angular.element('body');
                        baseContainer = angular.element(baseTemplate);
                        if (body.find(".clue-fail-box").length != 0) {
                            angular.element(body.find(".clue-fail-box")[0]).remove();
                        }
                        body.append(baseContainer);
                        //知道了按钮
                        baseContainer.find('.btn-copy').click(function(ev) {
                            for (var i = 0; i < callbacks.ok.length; i++) {
                                if (callbacks.ok[i](ev || event) == false)
                                    return;
                            }
                            _bouncedService.close();
                        });
                        config.scope.dialogErrorData = config;
                        // compile and insert template into the dom
                        $compile(baseContainer)(config.scope);
                    }

                    function update(config) {


                        // save callback queue
                        if (config.callbacks) {
                            if (config.callbacks.ok) {
                                callbacks.ok.push(config.callbacks.ok);
                            }
                            if (config.callbacks.cancel)
                                callbacks.cancel.push(config.callbacks.cancel);
                        }
                        // set styles from config
                        if (config.css) {
                            baseContainer.css(config.css);
                        }
                    }

                    var _bouncedService = {
                        time: null,
                        set: function(scope, message, duration) {
                            this.init({ scope: scope, message: message, duration: duration })
                            this.open();
                        },
                        init: function(config) {
                            var _this = this;

                            init(config);

                            if (this.time != null) {
                                $interval.cancel(this.time);
                            }
                            update(config);

                            if (config.duration) {
                                this.time = $interval(function() {
                                        if (config.duration-- <= 1) {
                                            $interval.cancel(_this.time);
                                            _this.close();
                                        }
                                    },
                                    1000)
                            }
                            return this;
                        },
                        open: function() {
                            baseContainer.addClass("fail-box-show");
                            return this;
                        },
                        close: function() {
                            if (this.time != null) {
                                $interval.cancel(this.time);
                            }
                            if (baseContainer != null) {
                                baseContainer.removeClass("fail-box-show");
                            }
                            callbacks = {
                                ok: [],
                                cancel: []
                            }
                            return this;
                        },
                        destroy: function() {
                            callbacks = {
                                ok: [],
                                cancel: []
                            }
                            return this;
                        }

                    }


                    return _bouncedService;


                }
            ]);

    });