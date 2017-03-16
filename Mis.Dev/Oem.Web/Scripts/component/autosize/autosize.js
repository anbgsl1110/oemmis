"use strict";
/**
* author :小潘
* time: 2015年5月8日 16:27:02
* description: 自动增高指令 使用方式：在textarea上增加autosize属性
*/


define(['angular', 'autosize'], function (angular,autosize) {
    angular.module('Components.autosize', [])
        .directive("autosize", 
            function () {
                return {
                    restrict: 'A',
                    scope: {},
                    link: function ($scope, iElement, iAttr) {
                        autosize(iElement[0]);
                    }
                };
            }
        );
});