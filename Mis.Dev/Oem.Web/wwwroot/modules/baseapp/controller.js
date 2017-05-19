"use strict";

define(["angular"], function () {
    return angular.module("BaseApp.controllers", [])
        .controller("BaseAppController", [
            "$scope", function ($scope) {
                console.log("基类控制器");
            }
        ]);
});
