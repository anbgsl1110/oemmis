
requirejs.config({
    paths: {
       
        'jquery': "lib/jquery/dist/jquery.min",
        'sortable': "lib/jquery/dist/jquery-ui-sortable-1.11.2.min",
        'angular': "lib/angular/angular.min",
        'angularMock': 'lib/angular-mocks/angular-mocks',
        "angularResource": "lib/angular-resource/angular-resource.min",
        "uiRouter": "lib/angular-ui-router/release/angular-ui-router.min",
        "highcharts-ng": "lib/highcharts-ng/dist/highcharts-ng",
        "highcharts": "lib/highcharts/highcharts",
        "funnel": "lib/highcharts/modules/funnel",
        "underscore": "lib/underscore/underscore",
        'ngDialog': "lib/ngDialog/js/ngDialog",
        "cropper": "lib/cropper/dist/cropper",
        'app': "modules/baseapp/app",
        'fullCalendar': "lib/fullcalendar/fullcalendar.min",
        'moment': "lib/fullcalendar/lib/moment.min.old",
        'newMoment': "lib/fullcalendar/lib/moment.min",
        'fullCalendarLang': "lib/fullcalendar/lang-all",
        'fullCalendarCustom': "lib/fullcalendar/fullcalendar-custom",
        'datePicker': "lib/My97DatePicker/WdatePicker",
        'commonDirective': "directives/common",
        'jqueryUI': "lib/fullcalendar/lib/jquery-ui-1.11.2.min",
        'nicescroll': "lib/jquery-nicescroll/jquery.nicescroll.min",
        'autosize': "lib/autosize/autosize.min",
        'angularElastic': "lib/angular-elastic/elastic",
        'angularFileUpload': "lib/angular-upload/angular-file-upload.min",
        'zeroClipboard': "lib/wordscopy/ZeroClipboard",
        'ngClip': "lib/ngClip/ng-clip.min"
    },
    shim: {
        angular: {
            'deps': ["jquery"],
            'exports': "angular"
        },
        angularMock: {
            'deps': ['angular'],
            'exports': 'angularMock'
        },
        angularResource: {
            'deps': ["angular"],
            'exports': "angularResource"
        },
        uiRouter: ["angular"],
        highcharts: ["jquery"],
        funnel: ["highcharts"],
        cropper: ["jquery"],
        "highcharts-ng": ["angular", "highcharts"],
        underscore: {
            'exports': "_"
        },
        datePicker: {
            init: function () {
                //hack第一次点击无效果，因为第一次点击才去下载一些东西
                WdatePicker({});
                $dp.hide();
            }
        },
        commonDirective: ['angular', 'sortable', 'datePicker'],
        jqueryUI: ["jquery"],
        fullCalendar: ["jqueryUI", "moment"],
        fullCalendarCustom: ["fullCalendar"],
        fullCalendarLang: ["fullCalendarCustom"],
        angularElastic: ["angular"],
        angularFileUpload: ["angular"],
        zeroClipboard: ["angular"],
        ngClip: ["zeroClipboard"]

    }
});

require([
    "app"
], function () {
    angular.element(document).ready(function () {
        //angular.bootstrap(document, ["BaseApp"]);
        var currentUser;
        $("body").niceScroll({
            cursorcolor: "rgba(0,0,0,0.3)",
            cursorwidth: "10px"
        });
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?c555cf20d924035b4d329df9e6bacd78";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);

        $.get('/api/HomeApi', function (result) {
            currentUser = result.data;
            var temp = angular.module("BaseApp");
            temp.run([
                '$rootScope', '$state', '$stateParams', 'currentUserService',
                function($rootScope, $state, $stateParams, currentUserService) {
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                    $rootScope.currentUser = currentUser;
                    currentUserService.setCurrentUser(currentUser);
                    //在全局作用域上添加一个本地时间与服务器时间的差值 by binhao
                    if (!window.dateDiff) {
                        $.get("/api/TimeDvalueApi",
                            {
                                clientTime: new Date().getTime()
                            },
                            function(data) {
                                window.dateDiff = data.data;
                            });
                    }
                }
            ]);
            angular.bootstrap(document, ["BaseApp"]);
        });
        
        
    });
});
