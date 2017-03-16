"use strict";
/**
 * author :LTD
 * time: 2016年07月06日 11:05:28
 * description: 基类控制器
 */

define(["angular"], function () {
    return angular.module("BaseApp.controllers", [])
        .controller("BaseAppController", [
            "$scope", function ($scope) {
                //console.log("base")   //不要问我为什么注释了，每次console看到很不爽啊，我强迫症
            }
        ]);
});
