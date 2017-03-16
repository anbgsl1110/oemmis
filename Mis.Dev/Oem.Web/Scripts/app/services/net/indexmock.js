
define(["angular", "angularMock", "services/random"], function () {
    return angular.module("services.net.indexmock", ["services.random"])
        .factory("indexMockService", ["$timeout", "$q", "randomService", function ($timeout, $q, randomService) {
            function getReserves() {
                var d = $q.defer();
                $timeout(function () {
                    var dataArray = ["7-10点", "10-13点", "13-15点", "15-18点", "18-21点"];
                    var methodArray = ["电话", "上门"];
                    var nameArray = ["张三", "李四", "王五"];
                    var reserves = [];
                    for (var i = 0, l = 12; i < l; i++) {
                        var date = dataArray[randomService.getRandomInt(0, 4)];
                        var method = methodArray[randomService.getRandomInt(0, 1)];
                        var name = nameArray[randomService.getRandomInt(0, 2)];
                        reserves.push({ id: i, date: date, method: method, name: name });
                    }
                    d.resolve(reserves);
                }, 1000);
                return d.promise;
            }
            function getMessages() {
                var d = $q.defer();
                $timeout(function () {
                    var dataArray = ["7-10点", "10-13点", "13-15点", "15-18点", "18-21点"];
                    var methodArray = ["电话", "上门"];
                    var nameArray = ["张三", "李四", "王五"];
                    var messages = [];
                    for (var i = 0, l = 12; i < l; i++) {
                        var date = dataArray[randomService.getRandomInt(0, 4)];
                        var method = methodArray[randomService.getRandomInt(0, 1)];
                        var name = nameArray[randomService.getRandomInt(0, 2)];
                        messages.push({ id: i, date: date, method: method, name: name });
                    }
                    d.resolve(messages);
                }, 1000);
                return d.promise;
            }
            function getTasks() {
                var d = $q.defer();
                $timeout(function () {
                    var dataArray = ["7-10点", "10-13点", "13-15点", "15-18点", "18-21点"];
                    var methodArray = ["电话", "上门"];
                    var nameArray = ["张三", "李四", "王五"];
                    var tasks = [];
                    for (var i = 0, l = 12; i < l; i++) {
                        var date = dataArray[randomService.getRandomInt(0, 4)];
                        var method = methodArray[randomService.getRandomInt(0, 1)];
                        var name = nameArray[randomService.getRandomInt(0, 2)];
                        tasks.push({ id: i, date: date, method: method, name: name });
                    }
                    d.resolve(tasks);
                }, 1000);
                return d.promise;
            }

            function getPartSchools() {
                var d = $q.defer();
                $timeout(function () {
                    var dataArray = ["全部校区", "西湖校区", "下沙校区", "滨江校区", "拱墅校区", "城西校区"];
                    var schoolList = [];
                    for (var i = 0, l = 5; i < 5; i++) {
                        schoolList.push({ id: i, schoolName: dataArray[i] });
                    }
                    d.resolve(schoolList);
                }, 1000);
                return d.promise;
            }

            function getFunnelData(partName, schoolName) {
                var d = $q.defer();
                $timeout(function () {
                    var allArray = [3800, 4500, 2900, 4500, 3450, 1876, 3245, 4553];
                    var singleArray = [1200, 345, 235, 566, 767, 565, 353, 123, 453]
                    var funnelData = [];
                    funnelData.push({
                        all: allArray[randomService.getRandomInt(0, 7)],
                        follow: singleArray[randomService.getRandomInt(0, 8)],
                        effect: singleArray[randomService.getRandomInt(0, 8)],
                        visit: singleArray[randomService.getRandomInt(0, 8)],
                        signing: singleArray[randomService.getRandomInt(0, 8)]
                    });
                    d.resolve(funnelData);
                }, 1000);
                return d.promise;
            }

            //格式化时间
            function GetDateStr(AddDayCount) {
                var dd = new Date();
                dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期 
                var y = dd.getFullYear();
                var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
                var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
                return y + "-" + m + "-" + d;
            }
            function getDateArray(limit){
                var dateArray = [];
                for (i = 1-limit;i<limit;i++){
                    dateArray.push(GetDateStr(i))
                }
                return dateArray;
            }
            function getMultipleData(filter, partName, schoolName) {
                var d = $q.defer();
                //0,1,2，分别表示最近 7天，15天，30天 或者传入年月
                if (filter == 0) {
                    $timeout(function () {
                        var multiple = [];
                        var dateArray = getDateArray(7);
                        var calibration = 0;
                        var clueNumberArray = [700, 500, 900, 500, 450, 876, 245];
                        var saleArray = [12000, 345000, 235000, 560600, 767000, 565000, 3530000]
                        var avageArray = [600,465,747,345,456,676,876,];
                        multiple.push({
                            calibration:calibration,
                            dateArray:dateArray,
                            clueNumberArray: clueNumberArray,
                            saleArray: saleArray,
                            avageArray: avageArray,
                        });
                        d.resolve(multiple);
                    }, 1000);
                } else if (filter == 1) {
                    $timeout(function () {
                        var multiple = [];
                        var calibration = 3;
                        var dateArray = getDateArray(15);
                        var clueNumberArray = [500, 450, 876, 245, 600, 465, 747, 345, 456, 676, 876, 500, 450, 876, 245];
                        var saleArray = [235000, 560600, 767000, 565000, 353000, 564049, 543345, 345345, 353455, 576567, 456545, 434342, 234234,
                                        453454, 767766, 897898, ]
                        var avageArray = [900, 500, 876, 245, 600, 465, 900, 450, 876, 245, 600, 465, 245, 600, 465 ];
                        multiple.push({
                            calibration: calibration,
                            dateArray: dateArray,
                            clueNumberArray: clueNumberArray,
                            saleArray: saleArray,
                            avageArray: avageArray,
                        });
                        d.resolve(multiple);
                    }, 1000);
                } else if (filter == 2) {
                    $timeout(function () {
                        var multiple = [];
                        var calibration = 5;
                        var dateArray = getDateArray(30);
                        var clueNumberArray = [700, 500, 900, 500, 450, 876, 245, 600, 465, 747, 345, 456, 676, 876, 500, 450, 876, 245, 600, 465, 900, 500, 450, 876, 245, 600, 465, 747, 345, 456, ];
                        var saleArray = [12000, 345000, 235000, 560600, 767000, 565000, 353000, 564049, 543345, 345345, 353455, 576567, 456545, 434342, 234234,
                                        453454, 767766, 897898, 435345, 353454, 345352, 887878, 346456, 687867, 456457, 765757, 567888, 853453, 345364, 345345, ]
                        var avageArray = [600, 465, 747, 345, 456, 676, 876, 500, 900, 500, 876, 245, 600, 465, 900, 450, 876, 245, 600, 465, 245, 600, 465, 747, 345, 245, 600, 465, 747, 345 ];
                        multiple.push({
                            calibration: calibration,
                            dateArray: dateArray,
                            clueNumberArray: clueNumberArray,
                            saleArray: saleArray,
                            avageArray: avageArray,
                        });
                        d.resolve(multiple);
                    }, 1000);
                } else {
                    $timeout(function () {
                        var multiple = [];
                        var dateArray = getDateArray(7);
                        var clueNumberArray = [700, 500, 900, 500, 450, 876, 245];
                        var saleArray = [12000, 345000, 235000, 560600, 767000, 565000, 3530000]
                        var avageArray = [600, 465, 747, 345, 456, 676, 876, ];
                        multiple.push({
                            calibration: calibration,
                            dateArray: dateArray,
                            clueNumberArray: clueNumberArray,
                            saleArray: saleArray,
                            avageArray: avageArray,
                        });
                        d.resolve(multiple);
                    }, 1000);
                }
                return d.promise;

            }
            return {
                getReserves: getReserves,
                getMessages: getMessages,
                getTasks: getTasks,
                getPartSchools: getPartSchools,
                getFunnelData: getFunnelData,
                getMultipleData: getMultipleData
            }
            //return {
            //    getMessages: getMessages
            //}
            //return {
            //    getTasks: getTasks
            //}
        }]);
})