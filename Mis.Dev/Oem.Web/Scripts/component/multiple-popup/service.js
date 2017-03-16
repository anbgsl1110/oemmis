"use strict";

define([
    'angular'
], function (angular) {
    return angular.module("Components.multiplePopup.services", [])
        .service('multiplePopupService', ['$compile', function ($compile) {
            var html = "<multiple-popup is-show='true' data='selectedList' options='multipleOptions' cancle-action='cancleCallback(data)' confirm-action='confirmCallback(data)'></multiple-popup>";
            return {
                get: function (scope) {
                    var ele = $compile(html)(scope);
                    $(document.body).append(ele);
                }
            };
        }]);
});
