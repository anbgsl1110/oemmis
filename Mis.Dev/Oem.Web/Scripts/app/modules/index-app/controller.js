"use strict";



define(["angular", "services/net/index", "components/fullcalendar/calendar", "commonDirective", "services/net/common"], function (angular) {
    return angular.module("IndexApp.controllers", ["services.net.index", "ui.calendar", "CommonDirective", 'services.net.common', 'service.currentUser' ])
        .controller("IndexAppController", [
            "$scope", "$rootScope", "indexService", "$filter", 'commonNetService', 'currentUserService', '$location', 'rolesService',
            function ($scope, $rootScope, indexService, $filter, commonNetService, currentUserService, $location, rolesService) {
              
                $scope.showOptions = false;
                $scope.showOptions2 = false;
                $scope.showOptions3 = false;
                $scope.showSchoolOptions = false;
                $scope.showSchoolOptions2 = false;
                $scope.showSchoolOptions3 = false;
                $scope.currentSelectedMonth = '按月选择';
              
                //时间显示坐标
                $scope.SelectedIndex = 2;
                //是否显示目标
                $scope.hasGoal = false;
                //var d = new Date();
                //$scope.dateNow = $filter("formatJsonDate")("/Date(" + d.valueOf() + ")/", "yyyy-MM-dd hh:mm:ss");
                ////获取最近天数数组， 日期格式 yyyy-mm-dd
                //$scope.dateTest = $filter("recentDay")(7);
                ////获取指定月天数数组，日期格式 yyyy-mm-dd
                //$scope.dateTest1 = $filter("getDaysInOneMonth")("2016-02");
                //保留小数
                //$scope.dataNow = $filter("changeTwoDecimal_f")(3.9082334, 10, 2);
                //console.log("获得小数位" + $scope.dataNow);
                //得到当天 0:00:00
                function dateStart() {
                    var date = new Date();
                    var month = date.getMonth() + 1;
                    return date.getFullYear() + "-" + month + "-" + date.getDate() + " " + "00:00:00"
                }
                //得到下一天 
                function GetDateStr(AddDayCount) {
                    var dd = new Date();
                    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期 
                    var y = dd.getFullYear();
                    var m = dd.getMonth() + 1;//获取当前月份的日期 
                    var d = dd.getDate();
                    return y + "-" + m + "-" + d +" "+ "00:00:00";
                }
                $scope.loadList = function () {
                    $scope.SelectedItems = [{ id: 0, name: "个人" }, { id: 1, name: "下属" }];
                    $scope.currentSelectedItem = $scope.SelectedItems[0];
                    $scope.currentSelectedItem2 = $scope.SelectedItems[0];
                    $scope.currentSelectedItem3 = $scope.SelectedItems[0];
                    $scope.currentUser = $scope.currentUser.userId;
                    var req_todayFullowUp = {
                        Filter: {
                            UserId: $scope.currentUser,
                            BeginTime: dateStart(),
                            EndTime: dateStart()
                        },
                        Order: {
                            filed: 'NextFollowUpAt',
                            asc: true
                        },
                        Page: {
                            //分页
                            pageSize: 5,
                            pageIndex: 1
                        }
                    }
                    var req_message = {
                        Filter: {
                            UserId: $scope.currentUser,
                            BeginDate: null,
                            EndDate: null,
                            IsIgnore: false
                        },
                        Order: {
                            filed: 'CreatedAt',
                            asc: false
                        },
                        Page: {
                            //分页
                            pageSize: 5,
                            pageIndex: 1

                        }
                    }
                    var req_task = {
                        Filter: {
                            UserId: $scope.currentUser,
                            BeginDate: dateStart(),
                            EndDate: null,
                        },
                        Order: {
                            filed: 'Datetime',
                            asc: true, 
                        },
                        Page: {
                            //分页
                            pageSize: 5,
                            pageIndex: 1

                        }
                    }
                    var req_goal = {
                        UserId: $scope.currentUser
                    }
                    //预约
                    indexService.getReserves(5).then(function (result) {
                        $scope.reservesCount = result.data.data.totalCount;
                        $scope.reserves = result.data.data.list;
                    });
                    //跟进
                    indexService.getTodayFullowUp(req_todayFullowUp).then(function (result) {
                        $scope.fullowUpCount = result.data.data.totalCount;
                        $scope.fullowUp = result.data.data.list;
                    });
                    //消息
                    indexService.getMessages(req_message).then(function (result) {
                        $scope.messages = [];
                        $scope.messagesCount = result.data.data.totalCount;
                        $scope.messages = result.data.data.notices;
                    });
                    //任务
                    indexService.getTasks(req_task).then(function (result) {
                        $scope.tasksCount = result.data.data.totalCount;
                        $scope.tasks = result.data.data.missions;
                    });
                    //目标
                    indexService.getTarget(req_goal).then(function (result) {
                        $scope.allClues = result.data.data.signs;
                        $scope.allSales= result.data.data.sales;
                        $scope.currentClues = result.data.data.currentSigns;
                        $scope.currentSales= result.data.data.currentSales;
                        $scope.percentClues = $scope.currentClues / $scope.allClues * 100;
                        $scope.percentSales = $scope.currentSales / $scope.allSales * 100;
                        if (!$scope.percentClues) {
                            $scope.percentClues = 0;
                        } else if (!$scope.percentSales) {
                            $scope.percentSales = 0;
                        }
                        if ($scope.allClues > 0 || $scope.allSales > 0) {
                            $scope.hasGoal = true;
                        }
                        $scope.percentClues = $filter("changeTwoDecimal_f")($scope.percentClues, 2, 2);
                        $scope.percentSales = $filter("changeTwoDecimal_f")($scope.percentSales, 2, 2);
                        //$scope.allClues == 0 ? $scope.percentClues = '0.00' : $scope.percentClues = parseFloat($scope.percentClues.toFixed(2));
                        //$scope.allSales == 0 ? $scope.percentSales = '0.00' : $scope.percentSales= parseFloat($scope.percentSales.toFixed(2));
                    })
                    //所在校区
                    commonNetService.getSchoolArea().then(function (result) {
                        $scope.schoolList = [];
                        $scope.schoolList = result.data.data.list;
                        $scope.schoolList.unshift({ id: 0, name: "全部校区" });
                        $scope.currentSelectedSchool = result.data.data.list[0];
                        $scope.currentSelectedSchool2 = result.data.data.list[0];
                        $scope.currentSelectedSchool3 = result.data.data.list[0];
                    });
                }
                
                //消息忽略
                //$scope.selectedIgnore = function (id) {
                //    if (id != -1) {
                //        $scope.selectedIgnoreIds = [];
                //        $scope.selectedIgnoreIdspush(id);
                //    }
                //    if (id.length !== 0) {
                //        gintDialog.confirm('提醒', '确认忽略？')
                //            .then(function (result) {
                //                indexService.IgnoreMessages($scope.selectedIgnoreIds).success(function (result) {
                //                    $scope.queryData($scope.pageIdx);
                //                    if (result.status == 1) {
                //                        gintDialog.success('操作成功！');
                //                    } else {
                //                        gintDialog.error(result.message);
                //                    }
                //                });
                //            });
                //    }
                //}
               
                
                //更多
                $scope.openMessage = function (index) {
                    var newwindow = window.open("");
                    newwindow.location.href = "#/index/message/" + index + "/";
                    //window.open("#/index/message/" + index + "/");
                }
                
                ///
                ///下拉点击事件
                ///

                //销售漏斗
                $scope.switchShowOptions = function () {
                    $scope.showOptions = !$scope.showOptions;
                }
                $scope.changeSelected = function (index) {
                    $scope.showOptions = false;
                    $scope.currentSelectedItem = $scope.SelectedItems[index];
                    $scope.funnelDataUi($scope.currentSelectedItem.id, $scope.currentSelectedSchool.id);
                }
                $scope.switchShowSchoolOptions = function () {
                    $scope.showSchoolOptions = !$scope.showSchoolOptions;
                }
                $scope.changeSelectedSchool = function (index) {
                    $scope.showSchoolOptions = false;
                    $scope.currentSelectedSchool = $scope.schoolList[index];
                    $scope.funnelDataUi($scope.currentSelectedItem.id, $scope.currentSelectedSchool.id);
                }

                //销售统计
                $scope.switchShowOptions2 = function () {
                    $scope.showOptions2 = !$scope.showOptions2;
                }
                $scope.changeSelected2 = function (index) {
                    $scope.showOptions2 = false;
                    $scope.currentSelectedItem2 = $scope.SelectedItems[index];
                    $scope.multipleDataUi($scope.SelectedIndex, $scope.currentSelectedItem2.id, $scope.currentSelectedSchool2.id);
                }
                $scope.switchShowSchoolOptions2 = function () {
                    $scope.showSchoolOptions2 = !$scope.showSchoolOptions2;
                }
                $scope.changeSelectedSchool2 = function (index) {
                    $scope.showSchoolOptions2 = false;
                    $scope.currentSelectedSchool2 = $scope.schoolList[index];
                    $scope.multipleDataUi($scope.SelectedIndex, $scope.currentSelectedItem2.id, $scope.currentSelectedSchool2.id);
                }

                //渠道分布
                $scope.switchShowOptions3 = function () {
                    $scope.showOptions3 = !$scope.showOptions3;
                }
                $scope.changeSelected3 = function (index) {
                    $scope.showOptions3 = false;
                    $scope.currentSelectedItem3 = $scope.SelectedItems[index];
                    $scope.donutDataUi($scope.currentSelectedItem3.id, $scope.currentSelectedSchool3.id);
                }
                $scope.switchShowSchoolOptions3 = function () {
                    $scope.showSchoolOptions3 = !$scope.showSchoolOptions3;
                }
                $scope.changeSelectedSchool3 = function (index) {
                    $scope.showSchoolOptions3 = false;
                    $scope.currentSelectedSchool3 = $scope.schoolList[index];
                    $scope.donutDataUi($scope.currentSelectedItem3.id, $scope.currentSelectedSchool3.id);
                }
                //销售统计点击事件
                $scope.selectSale = function (index) {
                    $scope.SelectedIndex = index;
                    if (index == 3) {
                        WdatePicker({
                            el: $("#selectMonthDiv")[0],
                            dateFmt: "yyyy-MM",
                            isShowClear: false,
                            isShowToday: false,
                            maxDate:'%y-%M',
                            onpicked: function () {
                                $scope.selectTime = $(this).html();
                                console.log($scope.currentSelectedMonth + "-" + $scope.selectTime)
                                $scope.multipleDataUi($scope.SelectedIndex, $scope.currentSelectedItem2.id, $scope.currentSelectedSchool2.id);
                            }
                        });
                    } else {
                        $("#selectMonthDiv").html("按月选择");
                        $scope.multipleDataUi($scope.SelectedIndex, $scope.currentSelectedItem2.id, $scope.currentSelectedSchool2.id);
                    }
                  
                }
            
                //漏斗图数据渲染
                $scope.funnelDataUi = function (partId, schoolId) {
                    var req = {
                        UserId: $scope.currentUser,
                        SchoolId: schoolId,
                        ViewType: partId,
                    };
 
                    indexService.getFunnelData(req).then(function (result) {
                       // 漏斗图无数据
                        if (result.data.data.totalClues == 0) {
                            $scope.funnelIsNoData = true;
                        }
                        $scope.funnel_allSell = result.data.data.totalClues;
                        $scope.funnel_followSell = result.data.data.followClues;
                        $scope.funnel_effectSell = result.data.data.validClues;
                        $scope.funnel_visitSell = result.data.data.visitClues;
                        $scope.funnel_signingSell = result.data.data.signClues;
                        $scope.funnelXData = [
                          { color: '#6c7f9c', name: '线索总数', data: $scope.funnel_allSell },
                          { color: '#ff9b0c', name: '有效线索', data: $scope.funnel_effectSell },
                          { color: '#72d07b', name: '跟进线索', data: $scope.funnel_followSell },
                          { color: '#60b9f1', name: '到访线索', data: $scope.funnel_visitSell },
                          { color: '#667fec', name: '签约线索', data: $scope.funnel_signingSell }
                        ]
                        $scope.funnelUiData();
                    });
                }

                //销售统计数据渲染
                $scope.multipleDataUi = function (filter, partName, schoolName) {
                    var BeginDate, EndDate;
                    if (filter == 0) {
                        $scope.calibration = 2;
                        $scope.dateArray = $filter("recentDay")(7);
                        BeginDate = $filter("recentDay")(7)[0];
                        EndDate = $filter("recentDay")(7)[6]
                    } else if (filter == 1) {
                        $scope.calibration = 3;
                        $scope.dateArray = $filter("recentDay")(15);
                        BeginDate = $filter("recentDay")(15)[0];
                        EndDate = $filter("recentDay")(15)[14]
                    } else if (filter == 2) {
                        $scope.calibration = 6;
                        $scope.dateArray = $filter("recentDay")(30);
                        BeginDate = $filter("recentDay")(30)[0];
                        EndDate = $filter("recentDay")(30)[29]
                    } else {
                        $scope.calibration = 6;
                        $scope.dateArray = $filter("getDaysInOneMonth")($scope.selectTime);
                        var dateArrayLength = $filter("getDaysInOneMonth")($scope.selectTime).length;
                        BeginDate = $filter("getDaysInOneMonth")($scope.selectTime)[0];
                        EndDate = $filter("getDaysInOneMonth")($scope.selectTime)[dateArrayLength - 1]
                    }
                    var request = {
                        BeginTime: BeginDate,
                        EndTime: EndDate,
                        DateType: filter + 1,
                        UserId: $scope.currentUser,
                        SchoolId: schoolName,
                        ViewType: partName,
                    };
                    indexService.getMultipleData(request).then(function (result) {
                        var clues = result.data.data.statisticsData.clues;
                        var cluevalues = [];
                        var sales = result.data.data.statisticsData.sales;
                        var salesvalues = [];
                        var averages = result.data.data.statisticsData.averages;
                        var averagesvalues = [];
                        for (var i = 0, l = clues.length; i < l; i++) {
                            cluevalues.push(clues[i].clue);
                            averagesvalues.push(averages[i].average);
                            //乘1000然后再除1000000是为了避免Js浮点运算bug
                            salesvalues.push((sales[i].sale*1000)/(1000*1000));
                        }
                        $scope.clueNumberArray = cluevalues; //result.data.StatisticsData.Clues;
                        $scope.saleArray = salesvalues; //result.data.StatisticsData.Sales;
                        $scope.avageArray = averagesvalues; //result.data.StatisticsData.Averages;
                        $scope.multipleUiData();
                    });
                }
                //饼图数据渲染
                $scope.donutDataUi = function (partName, schoolName) {
                    var request = {
                        UserId: $scope.currentUser,
                        SchoolId: schoolName,
                        ViewType: partName,
                    };
                    indexService.getDonutData(request).then(function (result) {
                        $scope.pointFormat = "共计：{point.y}";
                        $scope.pointFormat2 = "共计：{point.y}";
                        $scope.pointFormat3 = "共计：{point.y}";

                        //设置渲染颜色
                        Highcharts.setOptions({
                            colors: ['#6c7f9c', '#ff9b0c', '#72d07b', '#60b9f1', '#667fec', '#ae79e5', '#e876c4', '#c95f46', '#64dbda', '#f2d23d']
                        });
                        ////有效线索数据
                        $scope.validChannelCount = result.data.data.validChannel.totalCount;
                        $scope.validChanneldata = [];
                        $scope.validChanneldataHTML = [];
                        if ($scope.validChannelCount > 0) {
                            var j = 0;
                            for (var i = 0, l = result.data.data.validChannel.statistics.length; i < l; i++) {
                                //判断百分比后取小数是否为0
                                var fixedIsNAN = parseFloat((
                                        result.data.data.validChannel.statistics[i].count /
                                            $scope.validChannelCount *
                                            100)
                                    .toFixed(2));
                                if (fixedIsNAN > 0) {
                                    if (result.data.data.validChannel.statistics[i].count > 0) {
                                        $scope.validChanneldata.push({
                                            name: result.data.data.validChannel.statistics[i].name,
                                            y: parseFloat((result.data.data.validChannel.statistics[i].count / $scope.validChannelCount * 100).toFixed(2)),
                                            color: Highcharts.getOptions().colors[j]
                                        });
                                        j += 1;
                                        if (j > 9) {
                                            j = 0;
                                        }
                                    }
                                } 
                            }
                            $scope.validChanneldataHTML = $scope.validChanneldata;
                        } else {
                            $scope.validChanneldata.push({
                                name: "渠道有效线索",
                                y: 1,
                                color: '#ebebeb'
                            });
                            $scope.pointFormat = '无数据';
                            $scope.validChannelCount = '<span style=" font-size: 18px;color:#aaaaaa">无数据</span>';
                        }
                        ////签约线索数据
                        $scope.signChannelCount = result.data.data.signChannel.totalCount;
                        $scope.signChanneldata = [];
                        if ($scope.signChannelCount > 0) {
                            for (var i = 0, l = result.data.data.signChannel.statistics.length; i < l; i++) {
                                var fixedIsNAN = parseFloat((
                                        result.data.data.signChannel.statistics[i]
                                            .count /
                                            $scope.signChannelCount *
                                            100)
                                    .toFixed(2));
                                if (fixedIsNAN>0) {
                                    if (result.data.data.signChannel.statistics[i].count > 0) {
                                        var currentColor;
                                        $scope.validChanneldataHTML.forEach(function(item, index) {
                                            if (result.data.data.signChannel.statistics[i].name == item.name) {
                                                currentColor = item.color;
                                            }
                                        });
                                        $scope.signChanneldata.push({
                                            name: result.data.data.signChannel.statistics[i].name,
                                            y:  parseFloat((result.data.data.signChannel.statistics[i].count /$scope.signChannelCount *100).toFixed(2)),
                                            color: currentColor
                                        });
                                    }
                                }
                                
                            }

                        } else {
                            $scope.signChanneldata.push({
                                name: "渠道签约线索",
                                y: 1,
                                color: '#ebebeb'
                            });
                            $scope.pointFormat2 = '无数据';
                            $scope.signChannelCount = '<span style=" font-size: 18px;color:#aaaaaa">无数据</span>';

                        }

                        $scope.signChanneldataHTML = $scope.signChanneldata;
                        ////销售额
                        $scope.salesChannelCount = result.data.data.salesChannel.totalAmount;
                        $scope.salesChanneldata = [];
                        if ($scope.salesChannelCount > 0) {
                            for (var i = 0, l = result.data.data.salesChannel.statistics.length; i < l; i++) {
                                var fixedIsNAN = parseFloat((result.data.data.salesChannel.statistics[i].amount /
                                    $scope.salesChannelCount *
                                    100).toFixed(2));
                                if (fixedIsNAN > 0) {
                                    if (result.data.data.salesChannel.statistics[i].amount > 0) {
                                        var currentColor;
                                        $scope.validChanneldataHTML.forEach(function(item, index) {
                                            if (result.data.data.salesChannel.statistics[i].name == item.name) {
                                                currentColor = item.color;
                                            }
                                        });
                                        $scope.salesChanneldata.push({
                                            name: result.data.data.salesChannel.statistics[i].name,
                                            y: parseFloat((result.data.data.salesChannel.statistics[i].amount /
                                                $scope.salesChannelCount *
                                                100).toFixed(2)),
                                            color: currentColor
                                        });
                                    }
                                }
                            }

                        } else {
                            $scope.salesChanneldata.push({
                                name: "渠道签约金额",
                                y: 1,
                                color: '#ebebeb'
                            });
                            $scope.pointFormat3 = '无数据';
                            $scope.salesChannelCount = '<span style=" font-size: 18px;color:#aaaaaa">无数据</span>';

                        }
                        $scope.donutUiData();
                        $scope.donutUiData2();
                        $scope.donutUiData3();
                    })

                }
                var chart;

                //漏斗图
                $scope.funnelUiData = function () {

                    //设置渲染颜色
                    Highcharts.setOptions({
                        colors: ['#6c7f9c', '#ff9b0c', '#72d07b', '#60b9f1', '#667fec']
                    });
                    chart = new Highcharts.Chart({
                        chart: {
                            type: 'funnel',
                            marginLeft: 20,
                            height: 320,
                            width: 600,
                            renderTo: 'container',
                            //plotBackgroundColor: null,
                            //plotBorderWidth: null,
                            //plotShadow: false
                        },
                        title: {
                            text: '',
                            x: -50
                        },
                        plotOptions: {
                            series: {
                                dataLabels: {
                                    // distance: 2,
                                    enabled: true,
                                    format: '<b style="font-size: 12px; color: #444; font-family: Microsoft Yahei,Helvetica Neue,Helvetica,Arial,sans-serif; font-weight: normal;">{point.name}</b> ' +
                                            '<span style="font-size: 12px; color: #444;font-family: Microsoft Yahei,Helvetica Neue,Helvetica,Arial,sans-serif; font-weight: normal;">({point.y:,.0f})</span>',
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                                    softConnector: true,
                                    useHTML: true,
                                    //  allowOverlap: true,
                                    rotation: 0, //倾斜度
                                },
                                neckWidth: '30%',
                                neckHeight: '25%',
                                //-- Other available options
                                // height: pixels or percent
                                // width: pixels or percent
                            },
                        },
                        legend: {
                            enabled: true,
                        },
                        series: [{
                            name: '<span style="font-size: 12px; color: #444; font-family: Microsoft Yahei,Helvetica Neue,Helvetica,Arial,sans-serif; font-weight: normal;">共计</span>',
                            data: [
                                ['<span style="font-size: 12px; color: #444; font-family: Microsoft Yahei,Helvetica Neue,Helvetica,Arial,sans-serif; font-weight: normal;">线索总数</span>', $scope.funnel_allSell],
                                ['<span style="font-size: 12px; color: #444; font-family: Microsoft Yahei,Helvetica Neue,Helvetica,Arial,sans-serif; font-weight: normal;">有效线索</span>', $scope.funnel_effectSell],
                                ['<span style="font-size: 12px; color: #444; font-family: Microsoft Yahei,Helvetica Neue,Helvetica,Arial,sans-serif; font-weight: normal;">跟进线索</span>', $scope.funnel_followSell],
                                ['<span style="font-size: 12px; color: #444; font-family: Microsoft Yahei,Helvetica Neue,Helvetica,Arial,sans-serif; font-weight: normal;">到访线索</span>', $scope.funnel_visitSell],
                                ['<span style="font-size: 12px; color: #444; font-family: Microsoft Yahei,Helvetica Neue,Helvetica,Arial,sans-serif; font-weight: normal;">签约线索</span>', $scope.funnel_signingSell]
                            ]
                        }]
                    });

                }
                //销售统计渲染配置 
                $scope.multipleUiData = function () {
                    Highcharts.setOptions({
                        colors: ['#93d98a', '#8085e9', '#f7a35c']
                    })
                    chart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'container2',
                            zoomType: 'xy',
                            panning: false
                        },
                        title: {
                            text: '&nbsp',
                            useHTML:true

                        },
                        xAxis: [{
                            tickInterval: $scope.calibration,
                            categories: $scope.dateArray
                        }],
                        yAxis: [
                        { // Secondary yAxis
                            gridLineWidth: 1,
                            tickWidth: 1,
                            title: {
                                text: '<span style="font-size: 12px; color: #444; font-family: Microsoft Yahei,Helvetica Neue,Helvetica,Arial,sans-serif;">签约数</span>',
                                align: 'high',
                                offset: 0,
                                rotation: 0,
                                y: -15,
                                x:-10,
                                useHTML:true
                                //style: {
                                //    color: Highcharts.getOptions().colors[0]
                                //}
                            },
                            allowDecimals: false,
                            labels: {
                                format: '{value}',
                                x: -25,
                                style: {
                                    "color": "#444",
                                    "fontSize": "11px",
                                    "fontFamily": 'font-family: Microsoft Yahei,Helvetica Neue,Helvetica,Arial,sans-serif'
                                }
                            }
                        },
                        { // Tertiary yAxis
                            gridLineWidth: 0,
                            title: {
                                text: '<span style="font-size: 12px; color: #444; font-family: Microsoft Yahei,Helvetica Neue,Helvetica,Arial,sans-serif;">销售额(千)</span>',
                                align: 'high',
                                offset: 0,
                                rotation: 0,
                                y: -15,
                                useHTML:true
                                //style: {
                                //    color: Highcharts.getOptions().colors[1]
                                //}
                            },
                            labels: {
                                format: '{value}',
                                style: {
                                    "color": "#444",
                                    "fontSize": "12px",
                                    "fontFamily": 'font-family: Microsoft Yahei,Helvetica Neue,Helvetica,Arial,sans-serif'
                                }
                            },
                            opposite: true
                        }
                        ],
                        tooltip: {
                            shared: true
                        },
                       
                        series: [{
                            name: '<span style="font-size: 12px; color: #444;font-family: Microsoft Yahei,Helvetica Neue,Helvetica,Arial,sans-serif; font-weight: normal;">签约数</span>',
                            type: 'column',
                            yAxis: 0,
                            useHTML:true,
                            data: $scope.clueNumberArray,
                            tooltip: {
                                valueSuffix: ' '
                            }
                        }, {
                            name: '<span style="font-size: 12px; color: #444; font-family: Microsoft Yahei,Helvetica Neue,Helvetica,Arial,sans-serif; font-weight: normal;">销售额(千)</span>',
                            type: 'line',
                            yAxis: 1,
                            useHTML: true,
                            fontWeight: 'normal',
                            data: $scope.saleArray,
                            tooltip: {
                                valueSuffix: ' '
                            }
                        }
                        ]
                    });

                }

                //渠道有效线索渲染配置
                $scope.donutUiData = function () {
                    
                    chart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'container3',
                            type: 'pie',
                            plotShadow: true
                        },
                        title: {
                            text: '<span style="font-size: 24px; color: #444; font-family: Microsoft Yahei,Helvetica Neue,Helvetica,Arial,sans-serif;">' + $scope.validChannelCount + '</span> ',
                            verticalAlign: 'middle',
                            y: -4,
                            useHTML: true,

                        },
                        yAxis: {
                            title: {
                                text: 'Total percent market share'
                            }
                        },
                        plotOptions: {
                            pie: {
                                shadow: false,
                                center: ['50%', '50%']
                            }
                        },
                        tooltip: {
                            valueSuffix: '%'
                        },
                        series: [ {
                            name: '<span style="font-size: 12px; color: #444; font-family: Microsoft Yahei,Helvetica Neue,Helvetica,Arial,sans-serif;">共计</span>',
                            data: $scope.validChanneldata,
                            size: '100%',
                            innerSize: '64%',
                            tooltip: {
                                pointFormat: $scope.pointFormat
                            },
                            dataLabels: {
                                distance:-2,
                                formatter: function () {
                                    // display only if larger than 1
                                  //  return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                                }
                            }
                        }]
                    });

                }
                //渠道签约线索渲染配置
                $scope.donutUiData2 = function () {
                    chart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'container4',
                            type: 'pie',
                            plotShadow: true
                        },
                        title: {
                            text: '<span style="font-size: 24px; color: #444;font-family: Microsoft Yahei,Helvetica Neue,Helvetica,Arial,sans-serif;">' + $scope.signChannelCount + '</span> ',
                            verticalAlign: 'middle',
                            y: -4,
                            useHTML: true,
                        },
                        yAxis: {
                            title: {
                                text: ''
                            }
                        },
                        plotOptions: {
                            pie: {
                                shadow: false,
                                center: ['50%', '50%']
                            }
                        },
                        tooltip: {
                            valueSuffix: '%'
                        },
                        series: [{
                            name: '<span style="font-size: 12px; color: #444;font-family: Microsoft Yahei,Helvetica Neue,Helvetica,Arial,sans-serif;">共计</span>',
                            data: $scope.signChanneldata,
                            size: '100%',
                            innerSize: '64%',
                            tooltip: {
                                pointFormat: $scope.pointFormat2
                            },
                            dataLabels: {
                                distance: -2,
                                formatter: function () {
                                    // display only if larger than 1
                                   // return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                                }
                            }
                        }]
                    });

                }

                //渠道销售额渲染配置
                $scope.donutUiData3 = function () {
                    chart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'container5',
                            type: 'pie',
                            plotShadow: true
                        },
                        title: {
                            text: '<span style="font-size: 24px; color: #444;  width:80%; font-family: Microsoft Yahei,Helvetica Neue,Helvetica,Arial,sans-serif;">' + $scope.salesChannelCount + '</span> ',
                            verticalAlign: 'middle',
                            y: -4,
                            useHTML: true, 
                        },
                        yAxis: {
                            title: {
                                text: ''
                            }
                        },
                        plotOptions: {
                            pie: {
                                shadow: false,
                                center: ['50%', '50%']
                            }
                        },
                        tooltip: {
                            valueSuffix: '%'
                        },
                        series: [{
                            name: '<span style="font-size: 12px; color: #444;font-family: Microsoft Yahei,Helvetica Neue,Helvetica,Arial,sans-serif;">共计</span>',
                            data: $scope.salesChanneldata,
                            size: '100%',
                            innerSize: '64%',
                            tooltip: {
                                pointFormat: $scope.pointFormat3
                            },
                            dataLabels: {
                                distance: -2,
                                formatter: function () {
                                    // display only if larger than 1
                                   // return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                                }
                            }
                        }]
                    });

                }
                var init = function () {
                    $scope.loadList();
                    $scope.funnelDataUi(0, 0);
                    $scope.multipleDataUi(2, 0, 0);
                    $scope.donutDataUi(0, 0);
                };
                init();
                $scope.openState = 0;             //判断跳转后tab位置
                $scope.reserveDetail = function (clueId) {
                    if (currentUserService.hasPermission([rolesService.crm_线索], false)) {
                        $scope.openState = 1;
                        var newWindow = window.open("");
                        newWindow.location.href = $location.absUrl().replace('index', 'clue/detail') + "/" + clueId;
                    }
                }
                $scope.followUpDetail = function (clueId) {
                    if (currentUserService.hasPermission([rolesService.crm_线索], false)) {
                        $scope.openState = 2;
                        var newWindow = window.open("");
                        newWindow.location.href = $location.absUrl().replace('index', 'clue/detail') + "/" + clueId;
                    }
                }
            }
        ]);
});