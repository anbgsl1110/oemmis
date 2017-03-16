/**
 * Created by Han Xinwei on 2015/3/26.
 */

define(["angular"], function () {
    return angular.module("services.random", [])
        .factory("randomService", ["$window", function ($window) {
            function getRandomInt(min, max) {
                return $window.Math.round($window.Math.random() * ( max - min )) + min;
            }

            return {
                getRandomInt: getRandomInt
            }
        }]);
});