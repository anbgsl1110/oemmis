'use strict';
define([
    'angular',
    'services/dialogService'
], function (angular) {
    angular.module('Components.HighChart.Services', ['Dialog.services'])
        .service('pieChartModel', function () {
            this.getConfig = function (normalPercentage, normalPercentageTitle) {

                var config = {
                    chart: {
                        backgroundColor: null,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: true,
                        width: 200,
                        height: 200
                    },
                    title: {
                        text: normalPercentage + '<span style="font-size:13pt">%</span><br/><span style="font-size:12pt">' + normalPercentageTitle + '</span>',
                        //align: 'center',
                        verticalAlign: 'middle',
                        //useHTML: true,
                        y: 0,
                        style: {
                            "color": "#333333",
                            "fontSize": "30pt",
                            "fontFamily": "helvetica light,Microsoft YaHei"
                        }
                    },
                    tooltip: {
                        pointFormat: '<b>{point.percentage:.1f}%</b>',
                        enabled: false
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: false,
                            cursor: 'pointer',
                            innerSize: '90%',
                            dataLabels: {
                                enabled: false,
                                color: '#000000',
                                connectorColor: '#000000',
                                format: '{point.percentage:.1f} %'
                            },
                            states: {
                                hover: {
                                    enabled: false
                                }
                            }
                        }
                    },
                    colors: ['#7cb5ec', '#f2e9e8'],
                    series: [{
                        type: 'pie',
                        name: 'Browser share',
                        data: [
                            ['正常', normalPercentage],
                            ['非正常', 100 - normalPercentage]
                        ]
                    }]
                };

                return angular.copy(config);
            };
        })
        .service('areaChartModel', function () {

            var fakeTitle = '学员进度正常率';
            var fakeCategories = ['2015.01.01', '2015.01.02', '2015.01.03', '2015.01.04', '2015.01.05',
                '2015.01.06', '2015.01.07', '2015.01.08', '2015.01.09', '2015.01.10'
            ];

            var fakeSeries = [{
                name: '全部学员',
                data: [50, 50, 50, 50, 50, 52, 50, 50, 50, 50]
            }, {
                name: '进度正常学员',
                data: [40, 35, 36, 37, 27, 37, 47, 45, 43, 42]
            }];

            this.getConfig = function (titleParam, categoriesParam, seriesParam) {

                titleParam = (titleParam == undefined) ? fakeTitle : titleParam;
                categoriesParam = (categoriesParam == undefined) ? fakeCategories : categoriesParam;
                seriesParam = (seriesParam == undefined) ? fakeSeries : seriesParam;

                //控制x轴显示间隔(最多显示6个)
                var interval = Math.ceil((categoriesParam.length - 1) / 5);

                var config = {
                    chart: {
                        backgroundColor: null,
                        type: 'area',
                        width: 450,
                        height: 250
                    },
                    title: {
                        text: titleParam
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        categories: categoriesParam,
                        tickmarkPlacement: 'on',
                        tickInterval: interval,
                        tickLength: 0,
                        title: {
                            text: '',
                            enabled: true
                        }
                    },
                    yAxis: {
                        title: {
                            text: '学员人数',
                            enabled: false
                        },
                        labels: {
                            formatter: function () {
                                return this.value + '人';
                            }
                        },
                        allowDecimals: false
                    },
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        borderWidth: 0,
                        borderRadius: 6,
                        pointFormat: '{series.name}：<b>{point.y:,.0f}</b><br/>',
                        shared: true,
                        //style: { "color": "#EEEAE7", "fontFamily": "Helvetica Neue" }
                        style: {
                            "color": "#EEEAE7"
                        }
                    },
                    colors: ['#cccccc', '#54a3f0'],
                    plotOptions: {
                        area: {
                            marker: {
                                enabled: false,
                                symbol: 'circle',
                                radius: 2,
                                states: {
                                    hover: {
                                        enabled: true
                                    }
                                }
                            }
                        }
                    },
                    series: seriesParam
                };

                return angular.copy(config);
            };
        })
        .service('lineChartModel', function () {

            var fakeTitle = '历史分数分布图';
            var fakeCategories = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
            var fakeSeries = [{
                name: 'Tokyo',
                data: [2, 4, 9, 5, 6, 20, 25, 20, 27, 10]
            }];

            this.getConfig = function (titleParam, categoriesParam, seriesParam) {

                titleParam = (titleParam == undefined) ? fakeTitle : titleParam;
                categoriesParam = (categoriesParam == undefined) ? fakeCategories : categoriesParam;
                seriesParam = (seriesParam == undefined) ? fakeSeries : seriesParam;

                //控制x轴显示间隔(最多显示6个)
                var interval = Math.ceil((categoriesParam.length - 1) / 5);

                var config = {
                    chart: {
                        backgroundColor: null,
                        type: 'line',
                        width: 450,
                        height: 250
                    },
                    title: {
                        text: titleParam
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        categories: categoriesParam,
                        tickInterval: interval,
                        tickLength: 0,
                        title: {
                            text: '',
                            enabled: true
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: '学员数（人）',
                            enabled: false
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }],
                        labels: {
                            formatter: function () {
                                return this.value + '个';
                            }
                        },
                        allowDecimals: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        borderWidth: 0,
                        borderRadius: 6,
                        pointFormat: '{series.name}：<b>{point.y:,.0f}</b><br/>',
                        shared: true,
                        style: {
                            "color": "#EEEAE7"
                        }
                    },
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    colors: ['#54a3f0'],
                    series: seriesParam
                };

                return angular.copy(config);
            };
        })
        .service('dateTransform', function () {
            this.addYear = function (date, number) {
                var newDate = angular.copy(date);
                newDate.setFullYear(date.getFullYear() + number);
                return newDate;
            };

            this.addMonth = function (date, number) {
                var newDate = angular.copy(date);
                newDate.setMonth(date.getMonth() + number);
                return newDate;
            };

            this.addWeek = function (date, number) {
                var newDate = angular.copy(date);
                newDate.setDate(date.getDate() + number * 7);
                return newDate;
            };

            this.addDay = function (date, number) {
                var newDate = angular.copy(date);
                newDate.setDate(date.getDate() + number);
                return newDate;
            };
        })
        .service('dateValidator', ['dateTransform', '$window', 'gintDialog', function (dateTransform, $window, gintDialog) {
            this.isValid = function (startDateStr, endDateStr) {

                if(!startDateStr){
                    gintDialog.error('起始时间不能为空！');
                    return false;
                }

                if(!endDateStr){
                    gintDialog.error('截至时间不能为空！');
                    return false;
                }

                var startDate = new Date(startDateStr);
                var endDate = new Date(endDateStr);

                if (startDate > endDate) {
                    gintDialog.error('起始时间不得晚于结束时间！');
                    return false;
                }

                if (dateTransform.addMonth(startDate, 3) <= endDate) {
                    gintDialog.error('查询区间不得超过3个月！');
                    return false;
                }

                return true;
            };
        }])
        .service('uiModel', function () {
            var uiModel = {
                employee: {
                    status: 1,
                    currentNormalCount: 42,
                    currentTotalCount: 50,
                    categories: ['2015.01.01', '2015.01.02', '2015.01.03', '2015.01.04', '2015.01.05',
                        '2015.01.06', '2015.01.07', '2015.01.08', '2015.01.09', '2015.01.10'
                    ],
                    series: [{
                        name: '全部学员',
                        data: [50, 50, 50, 50, 50, 52, 50, 50, 50, 50]
                    }, {
                        name: '进度正常学员',
                        data: [40, 35, 36, 37, 27, 37, 47, 45, 43, 42]
                    }]
                },
                student: {
                    status: 1,
                    currentNormalCount: 42,
                    currentTotalCount: 50,
                    categories: ['2015.01.01', '2015.01.02', '2015.01.03', '2015.01.04', '2015.01.05',
                        '2015.01.06', '2015.01.07', '2015.01.08', '2015.01.09', '2015.01.10'
                    ],
                    series: [{
                        name: '全部学员',
                        data: [50, 50, 50, 50, 50, 52, 50, 50, 50, 50]
                    }, {
                        name: '进度正常学员',
                        data: [40, 35, 36, 37, 27, 37, 47, 45, 43, 42]
                    }]
                },
                correct: {
                    status: 1,
                    currentNormalCount: 42,
                    currentTotalCount: 50,
                    categories: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
                    series: [{
                        name: '批改',
                        data: [2, 4, 9, 5, 6, 20, 25, 20, 27, 10]
                    }]
                }
            };

            this.getModel = function () {
                return angular.copy(uiModel);
            };
        });
});
