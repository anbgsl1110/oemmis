
requirejs.config({
    paths: {
       
        'jquery': "libs/jquery/dist/jquery.min",
        'sortable': "libs/jquery/dist/jquery-ui-sortable-1.11.2.min",
        'angular': "libs/angular/angular.min",
        'angularMock': 'libs/angular-mocks/angular-mocks',
        "angularResource": "libs/angular-resource/angular-resource.min",
        "uiRouter": "libs/angular-ui-router/release/angular-ui-router.min",
        "highcharts-ng": "libs/highcharts-ng/dist/highcharts-ng",
        "highcharts": "libs/highcharts/highcharts",
        "funnel": "libs/highcharts/modules/funnel",
        "underscore": "libs/underscore/underscore",
        'ngDialog': "libs/ngDialog/js/ngDialog",
        "cropper": "libs/cropper/dist/cropper",
        'app': "modules/baseapp/app",
        'fullCalendar': "libs/fullcalendar/fullcalendar.min",
        'moment': "libs/fullcalendar/lib/moment.min.old",
        'newMoment': "libs/fullcalendar/lib/moment.min",
        'fullCalendarLang': "libs/fullcalendar/lang-all",
        'fullCalendarCustom': "libs/fullcalendar/fullcalendar-custom",
        'datePicker': "libs/My97DatePicker/WdatePicker",
        'commonDirective': "directives/common",
        'jqueryUI': "libs/fullcalendar/lib/jquery-ui-1.11.2.min",
        'nicescroll': "libs/jquery-nicescroll/jquery.nicescroll.min",
        'autosize': "libs/autosize/autosize.min",
        'angularElastic': "libs/angular-elastic/elastic",
        'angularFileUpload': "libs/angular-upload/angular-file-upload.min",
        'zeroClipboard': "libs/wordscopy/ZeroClipboard",
        'ngClip': "libs/ngClip/ng-clip.min"
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
                        $.get("/api/LiveClassService/getTimeDvalue",
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
