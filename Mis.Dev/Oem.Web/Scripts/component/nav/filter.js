/**
 * Created by CaiFeng on 2015/3/3 0003.
 */

'use strict';

define(['angular'], function (angular) {
    angular.module('components.nav.filter', [])
        .filter('hello', ['version', function (version) {
            return function (text) {
                return "hello" +version;
            };
        }]);
});