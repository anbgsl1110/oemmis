'use strict';
define(['angular', 'jquery'], function (angular, $) {
    angular.module('Components.common', [])
        .directive('gintPagescroll', ['$timeout',
            function ($timeout) {
                return {
                    restrict: 'A',
                    link: function (scope, iElement, attrs) {
                        iElement.scroll(function (e) {
                            if (iElement.scrollTop() + iElement.innerHeight() >= iElement[0].scrollHeight) {
                                scope.$emit('gintLoadPageScrollData');
                            }
                        });
                    }
                };
            }
        ]);
});
