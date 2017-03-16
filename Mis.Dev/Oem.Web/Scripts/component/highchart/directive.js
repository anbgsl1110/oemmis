"use strict";

define([
    'angular',
    'highcharts',
    'components/highchart/service',
    'datePicker',
    'commonDirective'
], function (angular) {
    angular.module("Components.highchart", ['Components.HighChart.Services', 'CommonDirective'])
        .directive("highchartSection", [
            '$http', '$window', '$timeout', '$q', '$filter', 'pieChartModel', 'areaChartModel', 'lineChartModel', 'dateTransform', 'dateValidator',
            function ($http, $window, $timeout, $q, $filter, pieChartModel, areaChartModel, lineChartModel, dateTransform, dateValidator) {

                return {
                    restrict: 'EA',
                    scope: {
                        userId: '@',
                        noDataAction: '&'
                    },
                    templateUrl: 'components/highchart/template.html',
                    link: function ($scope, iElement, iAttr) {

                        var dateFormat = 'yyyy/MM/dd';
                        var now = new Date();

                        //$scope.userId = 98;
                        $scope.currentIndex = 1;
                        $scope.maxDate = $filter('date')(dateTransform.addDay(now, -1), dateFormat);

                        var initStartDate = $filter('date')(dateTransform.addDay(now, -7), dateFormat);
                        var initEndDate = $filter('date')(dateTransform.addDay(now, -1), dateFormat);


                        $scope.employeeStartDate = initStartDate;
                        $scope.employeeEndDate = initEndDate;

                        $scope.studentStartDate = initStartDate;
                        $scope.studentEndDate = initEndDate;

                        $scope.correctStartDate = initStartDate;
                        $scope.correctEndDate = initEndDate;

                        $scope.uiModel = {};
                        $scope.tabs = [];

                        var loadEmployeeChart = function () {
                            var percentage = calcPercentage($scope.uiModel.employee.currentNormalCount, $scope.uiModel.employee.currentTotalCount);

                            $('#employeeRate').highcharts(pieChartModel.getConfig(percentage,"跟进正常率"));
                            $('#employeeHistory').highcharts(areaChartModel.getConfig('', $scope.uiModel.employee.categories, $scope.uiModel.employee.series));
                        };

                        var loadStudentChart = function () {
                            var percentage = calcPercentage($scope.uiModel.student.currentNormalCount, $scope.uiModel.student.currentTotalCount);

                            $('#studentRate').highcharts(pieChartModel.getConfig(percentage, "进度正常率"));
                            $('#studentHistory').highcharts(areaChartModel.getConfig('', $scope.uiModel.student.categories, $scope.uiModel.student.series));
                        };

                        var loadCorrentChart = function () {
                            var percentage = calcPercentage($scope.uiModel.correct.currentNormalCount, $scope.uiModel.correct.currentTotalCount);

                            $('#correctRate').highcharts(pieChartModel.getConfig(percentage, "批改完成率"));
                            $('#correctHistory').highcharts(lineChartModel.getConfig('', $scope.uiModel.correct.categories, $scope.uiModel.correct.series));
                        };

                        var calcPercentage = function (normalCount, totalCount) {
                            if (!totalCount) {
                                return 0;
                            }
                            return Math.round(normalCount * 100 / totalCount);
                        };


                        $scope.tabChange = function (index) {
                            if (index == $scope.currentIndex) {
                                return;
                            }
                            $scope.currentIndex = index;

                            if (index == 1) {
                                loadEmployeeChart();
                            } else if (index == 2) {
                                loadStudentChart();
                            } else if (index == 3) {
                                loadCorrentChart();
                            }
                        };

                        $scope.loadAll = function () {
                            var requestParam = {
                                type: ['1', '2', '3'],
                                userId: parseInt($scope.userId),
                                startDate: initStartDate,
                                endDate: initEndDate
                            };

                            $http.post("/StatisticsService/GetEmployeeStatistics", requestParam)
                                .success(function (result) {
                                    if (result.status == 1) {
                                        $timeout(function () {
                                            $scope.uiModel = {
                                                employee: {},
                                                student: {},
                                                correct: {}
                                            };

                                            //employee
                                            $scope.uiModel.employee.status = result.data.employee.status;
                                            $scope.uiModel.employee.currentNormalCount = result.data.employee.currentNormalCount;
                                            $scope.uiModel.employee.currentTotalCount = result.data.employee.currentTotalCount;
                                            $scope.uiModel.employee.categories = result.data.employee.categories;
                                            $scope.uiModel.employee.series = result.data.employee.series;
                                            $scope.uiModel.employee.isNoData = result.data.employee.categories.length == 0;

                                            //student
                                            $scope.uiModel.student.status = result.data.student.status;
                                            $scope.uiModel.student.currentNormalCount = result.data.student.currentNormalCount;
                                            $scope.uiModel.student.currentTotalCount = result.data.student.currentTotalCount;
                                            $scope.uiModel.student.categories = result.data.student.categories;
                                            $scope.uiModel.student.series = result.data.student.series;
                                            $scope.uiModel.student.isNoData = result.data.student.categories.length == 0;

                                            //correct
                                            $scope.uiModel.correct.status = result.data.correct.status;
                                            $scope.uiModel.correct.currentNormalCount = result.data.correct.currentNormalCount;
                                            $scope.uiModel.correct.currentTotalCount = result.data.correct.currentTotalCount;
                                            $scope.uiModel.correct.categories = result.data.correct.categories;
                                            $scope.uiModel.correct.series = result.data.correct.series;
                                            $scope.uiModel.correct.isNoData = result.data.correct.categories.length == 0;

                                            $scope.tabs = [];
                                            if ($scope.uiModel.employee.status == 1) {
                                                $scope.tabs.push({
                                                    index: 1,
                                                    title: '下属'
                                                });
                                            }

                                            if ($scope.uiModel.student.status == 1) {
                                                $scope.tabs.push({
                                                    index: 2,
                                                    title: '学员'
                                                });
                                            }

                                            if ($scope.uiModel.correct.status == 1) {
                                                $scope.tabs.push({
                                                    index: 3,
                                                    title: '批改'
                                                });
                                            }


                                            if ($scope.tabs.length != 0) {
                                                $scope.currentIndex = $scope.tabs[0].index;
                                                loadEmployeeChart();
                                                loadStudentChart();
                                                loadCorrentChart();
                                            } else {
                                                $scope.noDataAction();
                                            }
                                        });
                                    }
                                });
                        };


                        $scope.loadEmployeeData = function (startDate, endDate) {
                            var requestParam = {
                                type: ['1'],
                                userId: $scope.userId,
                                startDate: startDate,
                                endDate: endDate
                            };

                            $http.post("/StatisticsService/GetEmployeeStatistics", requestParam)
                                .success(function (result) {
                                    if (result.status == 1) {
                                        $timeout(function () {

                                            //employee
                                            $scope.uiModel.employee.categories = result.data.employee.categories;
                                            $scope.uiModel.employee.series = result.data.employee.series;
                                            $scope.uiModel.employee.isNoData = result.data.employee.categories.length == 0;

                                            $('#employeeHistory').highcharts(areaChartModel.getConfig('', $scope.uiModel.employee.categories, $scope.uiModel.employee.series));
                                        });
                                    } else {
                                        //TODO show error message
                                    }
                                });
                        };

                        $scope.loadStudentData = function (startDate, endDate) {
                            var requestParam = {
                                type: ['2'],
                                userId: $scope.userId,
                                startDate: startDate,
                                endDate: endDate
                            };


                            $http.post("/StatisticsService/GetEmployeeStatistics", requestParam)
                                .success(function (result) {
                                    if (result.status == 1) {
                                        $timeout(function () {

                                            //student
                                            $scope.uiModel.student.categories = result.data.student.categories;
                                            $scope.uiModel.student.series = result.data.student.series;
                                            $scope.uiModel.student.isNoData = result.data.student.categories.length == 0;

                                            $('#studentHistory').highcharts(areaChartModel.getConfig('', $scope.uiModel.student.categories, $scope.uiModel.student.series));
                                        });
                                    } else {
                                        //TODO show error message
                                    }
                                });
                        };

                        $scope.loadCorrectData = function (startDate, endDate) {
                            var requestParam = {
                                type: ['3'],
                                userId: $scope.userId,
                                startDate: startDate,
                                endDate: endDate
                            };


                            $http.post("/StatisticsService/GetEmployeeStatistics", requestParam)
                                .success(function (result) {
                                    if (result.status == 1) {
                                        $timeout(function () {

                                            //correct
                                            $scope.uiModel.correct.categories = result.data.correct.categories;
                                            $scope.uiModel.correct.series = result.data.correct.series;
                                            $scope.uiModel.correct.isNoData = result.data.correct.categories.length == 0;

                                            $('#correctHistory').highcharts(lineChartModel.getConfig('', $scope.uiModel.correct.categories, $scope.uiModel.correct.series));
                                        });
                                    } else {
                                        //TODO show error message
                                    }
                                });
                        };

                        $scope.dateChange = function (oldDate, newDate, type, validStartDate, validEndDate) {
                            var defer = $q.defer();
                            var result = '';

                            switch (type) {
                                case 'employee':
                                    {
                                        if (dateValidator.isValid(validStartDate, validEndDate)) {
                                            $scope.loadEmployeeData(validStartDate, validEndDate);
                                            result = newDate;
                                        } else {
                                            result = oldDate;
                                        }
                                        break;
                                    }
                                case 'student':
                                    {
                                        if (dateValidator.isValid(validStartDate, validEndDate)) {
                                            $scope.loadStudentData(validStartDate, validEndDate);
                                            result = newDate;
                                        } else {
                                            result = oldDate;
                                        }
                                        break;
                                    }
                                case 'correct':
                                    {
                                        if (dateValidator.isValid(validStartDate, validEndDate)) {
                                            $scope.loadCorrectData(validStartDate, validEndDate);
                                            result = newDate;
                                        } else {
                                            result = oldDate;
                                        }
                                        break;
                                    }
                                default:
                            }

                            defer.resolve(result);
                            return defer.promise;
                        };

                        var init = function () {
                            $scope.loadAll();
                        }();
                    }
                };
            }
        ]);
});
