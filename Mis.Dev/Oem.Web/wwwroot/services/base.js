/**
 * Created by Han Xinwei on 2015/3/17.
 */

define(["angular"],
    function(angular) {
        return angular.module("services.base", [])
            .service("baseService",
            [
                function() {
                    var service = {};
                    return service;
                }
            ]);
    });