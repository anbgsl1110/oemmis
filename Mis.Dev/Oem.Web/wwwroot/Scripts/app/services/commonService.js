"use strict";
define([
    'angular',
    'underscore',
    'jquery',
    'angularResource'
], function (angular, _, $) {
    return angular.module("Common.services", ['ngResource'])
        .service('messageBus', ['$rootScope', function ($rootScope) {
            var messageBus = {};

            messageBus.publish = function (msg, data) {
                data = angular.copy(data) || {};
                $rootScope.$emit(msg, data);
            };

            messageBus.subscribe = function (msg, scope, func) {
                var unsubscribe = $rootScope.$on(msg, func);
                if (scope) {
                    //remove the listener when $scope is destroyed
                    scope.$on('$destroy', unsubscribe);
                }
                //return the unsubscribe function so the user can do their own memory management
                return unsubscribe;
            };

            return messageBus;
        }])
        .service('openWindowsService', ['$rootScope', function ($rootScope) {
            /////用window.open的方式post数据
            function openWindow(name) {
                var height = window.screen.availHeight - 42;
                var width = window.screen.availWidth - 18;
                if (navigator.userAgent.toLowerCase().match(/chrome/) != null) {
                    height = window.screen.availHeight;
                    width = window.screen.availWidth;
                }
                var new_window = window.open('about:blank', name, 'location=no,hotkeys=no,menubar=no,scrollbars=yes,titlebar=no,toolbar=no,height=' + height + ',width=' + width + '');
                new_window.focus();
                new_window.resizeTo(width, height);
                new_window.moveTo(0, 0);
            };

            //data应该是一个hashMap
            function openPostWindow(url, data, name) {
                var tempForm = document.createElement("form");
                tempForm.id = "tempForm1";
                tempForm.method = "post";
                tempForm.action = url;
                tempForm.target = name;

                var hideInput;
                if (Object.prototype.toString.call(data) != "[object Array]") {
                    for (var dataIdx in data) {
                        if (Object.prototype.toString.call(data[dataIdx]) == "[object Array]") {
                            for (var i = 0; i < data[dataIdx].length; i++) {

                                for (var dataIdx1 in data[dataIdx][i]) {
                                    hideInput = document.createElement("input");
                                    hideInput.type = "hidden";
                                    hideInput.name = "data[" + i + "]" + "." + dataIdx1;
                                    hideInput.value = data[dataIdx][i][dataIdx1];
                                    tempForm.appendChild(hideInput);
                                }
                            }
                        } else {
                            hideInput = document.createElement("input");
                            hideInput.type = "hidden";
                            hideInput.name = dataIdx;
                            hideInput.value = data[dataIdx];
                            tempForm.appendChild(hideInput);
                        }
                    }
                } else {
                    for (var i = 0; i < data.length; i++) {

                        for (var dataIdx in data[i]) {
                            hideInput = document.createElement("input");
                            hideInput.type = "hidden";
                            hideInput.name = "data[" + i + "]" + "." + dataIdx;
                            hideInput.value = data[i][dataIdx];
                            tempForm.appendChild(hideInput);
                        }
                    }
                }

                //tempForm.attachEvent("onsubmit", function () { openWindow(name); });
                $(tempForm).submit(function () {
                    openWindow(name);
                });
                document.body.appendChild(tempForm);
                //tempForm.fireEvent("onsubmit");
                //tempForm.submit();
                $(tempForm).submit();
                document.body.removeChild(tempForm);
            };

            return {
                openPostWindow: openPostWindow,
                openWindow: openWindow
            };

        }])
        .service('log', function () {
            return {
                json: function (obj) {
                    console.log(JSON.stringify(obj));
                }
            };
        })
        .service('currentUserApi', ['$http', '$q', '$resource', function ($http, $q, $resource) {
            return $resource('/UserService/GetCurrentUser');
        }])
        .factory('trim', function () {
            return function (str) {
                return str.replace(/(^\s*)|(\s*$)/g, "");
            };
        })
        .factory('hasSpace', function () {
            return function (str) {
                return str.indexOf(" ") !== -1;
            };
        })
        .factory('stringToDate', function () {
            return function (dateStr) {
                var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
                var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;
                var date;
                if (typeof dateStr === 'string') {
                    var a = reISO.exec(dateStr);
                    if (a)
                        date = new Date(dateStr);
                    a = reMsAjax.exec(dateStr);
                    if (a) {
                        var b = a[1].split(/[-+,.]/);
                        date = new Date(b[0] ? +b[0] : 0 - +b[1]);
                    }
                }
                return date;
            };
        })
        .factory('httpRequestWapper', ['$http', '$q', function ($http, $q) {
            return {
                get: function (url) {
                    var deferred = $q.defer();

                    $http.get(url).success(function (result) {
                        if (result.status === 1) {
                            deferred.resolve(result.data);
                        } else {
                            deferred.reject(result.message);
                        }
                    }).error(function (reason) {
                        deferred.reject(reason);
                    });

                    return deferred.promise;
                },
                post: function (url, arg) {
                    var deferred = $q.defer();

                    $http.post(url, arg).success(function (result) {
                        if (result.status === 1) {
                            deferred.resolve(result.data);
                        } else {
                            deferred.reject(result.message);
                        }
                    }).error(function (reason) {
                        deferred.reject(reason);
                    });

                    return deferred.promise;
                },
            };
        }])
        .factory('singlePromiseWapper', ['$q', function ($q) {
            /**
             * [description]
             * @param  {Function}  [first arg is a function whitch return a promise]
             * @return {[function]} [is a function which return a promise]
             */
            return function () {
                var isProcessing = false;
                // default args
                var args = Array.prototype.slice.call(arguments);
                var func = args.shift();
                return function () {
                    var deferred = $q.defer();

                    if (isProcessing) {
                        console.log('isProcessing...');
                        deferred.reject('请求处理中，请勿重复操作！');
                        return deferred.promise;
                    }

                    isProcessing = true;
                    func.apply(null, args.concat(Array.prototype.slice.call(arguments))).then(function (result) {
                        isProcessing = false;
                        deferred.resolve(result);
                    }, function (reason) {
                        isProcessing = false;
                        deferred.reject(reason);
                    });

                    return deferred.promise;
                };
            };
        }])
        .factory('singleHttpFactory', ['httpRequestWapper', 'singlePromiseWapper', function (httpRequestWapper, singlePromiseWapper) {
            return {
                /**
                 * description:
                 * get a function which is prohibited duplicate request.
                 *
                 * usage:
                 * var getNetService = singleHttpFactory.get(url);
                 * getNetService();
                 *
                 * var postNetService = singleHttpFactory.post(url);
                 * postNetService(args);
                 */
                get: function (url) {
                    return singlePromiseWapper(httpRequestWapper.get, url);
                },
                post: function (url) {
                    return singlePromiseWapper(httpRequestWapper.post, url);
                }
            };
        }])
        //refer to: services/grid
        .factory('selectedKeyService', function () {
            function getSelected(selectedKeys) {
                var ids = [];
                for (var sKey in selectedKeys) {
                    if (selectedKeys[sKey])
                        ids.push(sKey);
                }
                return ids;
            }

            return {
                first: function (selectedKeys) {
                    var ids = getSelected(selectedKeys);
                    return ids.length > 0 ? ids[0] : -1;
                },
                all: function (selectedKeys) {
                    return getSelected(selectedKeys);
                }
            };
        })
        //refer to: components/searchbox
        .factory('btnService', function () {
            function setStatus(btns, name, status) {
                var res = _.where(btns, {
                    name: name
                });
                _.each(res, function (btn) {
                    btn.disable = status;
                });
            }

            return {
                disable: function (btns, name) {
                    setStatus(btns, name, true);
                },
                enable: function (btns, name) {
                    setStatus(btns, name, false);
                },
                getItem: function (btns, name) {
                    var res = _.where(btns, {
                        name: name
                    });
                    return res.length > 0 ? res[0] : null;
                }
            };
        })
        .factory('dynamicDirectiveService', ['$compile', '$rootScope', function ($compile, $rootScope) {

            return {
                init: function (options) {

                    if (!options.template && !options.templateUrl) throw 'missing params: template';

                    var currentContainer = angular.element('<div></div>');

                    // insert template
                    if (options.template) {
                        currentContainer.append(options.template);
                    } else if (options.templateUrl) {
                        currentContainer.attr('ng-include', '"' + options.templateUrl + '"');
                    }

                    $compile(currentContainer)(options.scope || $rootScope.$new());
                    $(document.body).append(currentContainer);

                    return this;
                },
                destroy: function () {

                }
            }
        }])
        .factory('singleThreadedNetService', [function () {
            return function (fn) {
                var inProgress = false;
                return function () {
                    if (inProgress) {
                        return;
                    }
                    inProgress = true;
                    var result = fn.apply(null, arguments);
                    //check if is a promise
                    if (result && angular.isFunction(result.then))
                        result.then(function () {
                            inProgress = false;
                        }, function () {
                            inProgress = false;
                        });
                    else
                        inProgress = false;
                }
            }
        }])
        //公用数组操作--shaobo.wang
        .factory('arrayOperation', [function () {
            var operationFun = {};
            //验证数组是否包含某个元素，true包含，false不包含，indexOf函数不兼容低版本IE--shaobo.wang
            //arr:数值数组,val:值
            operationFun.arrayContains = function (arr, val) {
                if (arr instanceof Array) {
                    return arr.indexOf(val) > -1;
                } else {
                    throw {
                        name: 'TypeError',
                        message: 'arr is not a Array!'
                    }
                }
            }

            //根据值移除数组中的对应元素，若不存在，返回原数组--shaobo.wang  备注：针对对象数组，引用类型的值时，适用性并不广，CRM1.5已取消使用
            //arr:数组,val:值
            //operationFun.arrayRemoveVal = function (arr, val) {
            //    if (arr instanceof Array) {
            //        var idx = arr.indexOf(val);
            //        if (idx > -1) {
            //            arr.splice(idx, 1);
            //        }
            //        return arr;
            //    } else {
            //        throw {
            //            name: 'TypeError',
            //            message: 'arr is not a Array!'
            //        }
            //    }
            //}

            //判断对象数组中是否包含某个值，包含则返回值所在的对象，不包含则返回null--shaobo.wang
            //arr:数组,key:需要匹配的键,val:值
            operationFun.getObjByKey = function (arr, key, val) {
                if (arr instanceof Array) {
                    var obj = null;
                    for (var i in arr) {
                        if (arr[i][key] === val) {
                            obj = arr[i];
                            break;
                        }
                    }
                    return obj;
                } else {
                    throw {
                        name: 'TypeError',
                        message: 'arr is not a Array!'
                    }
                }
            }

            //判断对象数组中是否包含某些值，包含则返回值所在的对象数组，不包含则返回空数组--shaobo.wang
            //arr:对象数组,key:需要匹配的键,arrVal:值数组
            operationFun.getObjArrByKey = function (arr, key, arrVal) {
                if (arr instanceof Array && arrVal instanceof Array) {
                    var objArr = [];
                    for (var a in arrVal) {
                        for (var i in arr) {
                            if (arr[i][key] === arrVal[a]) {
                                objArr.push(arr[i]);
                                break;
                            }
                        }
                    }
                    return objArr;
                } else {
                    throw {
                        name: 'TypeError',
                        message: 'arr or arrVal is not a Array!'
                    }
                }
            }
            //判断对象数组中是否包含某些值，包含则返回值所在的对象数组，不包含则返回空数组(弱匹配‘==’)--weijie.cao
            operationFun.getObjArrByArr = function (arr, key, arrVal) {
                if (arr instanceof Array && arrVal instanceof Array) {
                    var objArr = [];
                    for (var a in arrVal) {
                        for (var i in arr) {
                            if (arr[i][key] == arrVal[a]) {
                                objArr.push(arr[i]);
                                break;
                            }
                        }
                    }
                    return objArr;
                } else {
                    throw {
                        name: 'TypeError',
                        message: 'arr or arrVal is not a Array!'
                    }
                }
            }

            //取对象数组中某个键下的值集合，返回一个数组,没有返回空数组--shaobo.wang  备注：适用性并不广,原生map方法就支持，CRM1.5已取消使用
            //arr:数组,key:需要匹配的键
            //operationFun.getArrByKey = function (arr, key) {
            //    if (arr instanceof Array) {
            //        var array = arr.map(function (v) {
            //            return v[key];
            //        });
            //        return array;
            //    } else {
            //        throw {
            //            name: 'TypeError',
            //            message: 'arr is not a Array!'
            //        }
            //    }
            //}

            return operationFun;
        }])
        //公用js时间操作--shaobo.wang
        .factory('dateOperation', [function () {
            return {
                //日期加减操作函数，忽略时分秒，返回时间戳 --shaobo.wang
                //date参数是要进行加减的日期，days参数是要加减的天数，如果往前算就传入负数，往后算就传入正数
                addDay: function (date, days) {
                    var d = date.constructor.name === 'Date' ? date : new Date(date);
                    d.setDate(d.getDate() + days);
                    var m = d.getMonth() + 1,                                 //原生Api里面getMonth返回的是0-11，故+1
                        ymd = d.getFullYear() + '-' + m + '-' + d.getDate();  //忽略时分秒
                    return new Date(ymd).getTime();
                },
                //月份加减操作函数，忽略时分秒，返回时间戳 --shaobo.wang
                //date参数是要进行加减的日期，month参数是要加减的月份，如果往前算就传入负数，往后算就传入正数
                addMonth: function (date, month) {
                    var d = date.constructor.name === 'Date' ? date : new Date(date);
                    d.setMonth(d.getMonth() + month);
                    var m = d.getMonth() + 1,                                 //原生Api里面getMonth返回的是0-11，故+1
                        ymd = d.getFullYear() + '-' + m + '-' + d.getDate();  //忽略时分秒
                    return new Date(ymd).getTime();
                },
                //获取两个日期相差的天数 --binhao
                deteDiffer: function (date1, date2) {
                    return Math.abs(new Date(date1) - new Date(date2)) / 24 / 60 / 60 / 1000;
                }
            };
        }]);
});
