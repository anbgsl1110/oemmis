'use strict';
define(["angular"], function (angular) {
    return angular.module('CommonFilter', [])
        .filter('elseValue',
            function () {
                //当值为null或者不存在时显示另一个值
                return function (value, elseValue) {
                    if (value) return value;
                    else return elseValue;
                };
            })
        .filter('limit',
            function () {
                var strReg = /[^\x21-\x7e]/g;
                //截取字符串
                //超过长度的情况，取小于指定长度的最多字符串，再加...
                return function (str, num) {
                    if (!num)
                        return str;

                    if (!angular.isString(str))
                        return str;

                    var replacedStr = str.replace(strReg, "**");
                    if (replacedStr.length > num) {
                        var strLen = str.length;
                        var tmpI = Math.floor(num / 2) - 1;
                        var tmpLength = str.substr(0, tmpI).replace(strReg, "**").length;
                        for (; tmpI < strLen; tmpI++) {
                            tmpLength += str.substr(tmpI, 1).replace(strReg, "**").length;
                            if (tmpLength >= num)
                                return str.substr(0, tmpI) + "...";
                        }
                    } else {
                        return str;
                    }
                };
            })
        .filter('parseJsonDate',
            function () {
                //解析服务端返回的json格式的日期到date类型的对象
                return function (dateStr) {
                    var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
                    var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;
                    var date;
                    if (typeof dateStr === 'string') {
                        var a = reISO.exec(dateStr);
                        if (a)
                            date = new Date(dateStr);
                        a = reMsAjax.exec(dateStr);
                        if (a) {
                            var b = a[1].split(/[-+,.]/);
                            date = new Date(b[0] ? +b[0] : 0 - +b[1]);
                        }
                    }
                    return date;
                };
            })
        .filter('formatJsonDate',
        [
            '$filter', function ($filter) {
                // 将服务端返回的json格式的日期格式化成日期字符串
                // formatStr使用ng的格式化字符串标准
                return function (dateStr, formatStr) {
                    var date = $filter('parseJsonDate')(dateStr);
                    var datestr = $filter('date')(date, formatStr);
                    if (datestr && datestr.substring(0, 10) == "0001/01/01") {
                        return "";
                    } else {
                        return $filter('date')(date, formatStr);
                    }
                };
            }
        ])
        .filter('formatJsonDate2',
        [
            '$filter', function ($filter) {
                // 将服务端返回的json格式的日期格式化成日期字符串
                // formatStr使用ng的格式化字符串标准
                return function (dateStr, formatStr) {
                    if (dateStr && dateStr.indexOf("Date") < 0) {
                        return dateStr;
                    }
                    if (dateStr == "" || dateStr == null) {
                        return dateStr;
                    }
                    var date = $filter('parseJsonDate')(dateStr);
                    return $filter('date')(date, formatStr);
                };
            }
        ])
        .filter('ifTrue',
            function () {
                //当condition为true时返回值
                return function (value, condition) {
                    if (condition) return value;
                    else return "";
                };
            })
        .filter('secondToTime',
            function () {
                //当condition为true时返回值
                return function (input) {
                    if (input == -1) {
                        return "";
                    }
                    var hh, mm, ss;
                    //得到小时
                    hh = input / 3600 | 0;
                    input = parseInt(input) - hh * 3600;
                    if (parseInt(hh) < 10) {
                        hh = "0" + hh;
                    }
                    //得到分
                    mm = input / 60 | 0;
                    //得到秒
                    ss = parseInt(input) - mm * 60;
                    if (parseInt(mm) < 10) {
                        mm = "0" + mm;
                    }
                    if (ss < 10) {
                        ss = "0" + ss;
                    }
                    return hh + ":" + mm + ":" + ss;
                };
            })
        .filter('secondToTime2',
            function () {
                //当condition为true时返回值
                return function (input) {
                    if (input == -1) {
                        return "";
                    }
                    if (input <= 0) {
                        return "无限时";
                    }
                    var hh, mm, ss;
                    //得到小时
                    hh = input / 3600 | 0;
                    input = parseInt(input) - hh * 3600;
                    if (parseInt(hh) < 10) {
                        hh = "0" + hh;
                    }
                    //得到分
                    mm = input / 60 | 0;
                    //得到秒
                    ss = parseInt(input) - mm * 60;
                    if (parseInt(mm) < 10) {
                        mm = "0" + mm;
                    }
                    if (ss < 10) {
                        ss = "0" + ss;
                    }
                    return hh + ":" + mm + ":" + ss;
                };
            })
        .filter('mapValue',
            function () {
                return function (key, dict) {
                    if (!dict || !dict.hasOwnProperty(key))
                        return "";
                    else
                        return dict[key];
                };
            })
        .filter('top',
            function () {
                return function (list, num) {
                    var res = [];
                    for (var i = 0, length = list.length; i < length && i < num; i++) {
                        res.push(list[i]);
                    };
                    return res;
                };
            })
        //判断手机号的正则，true是--shaobo.wang
        .filter('checkMobilephoneNumber',
            function () {
                return function (val) {
                    var reg = /^(\+)?(0|86|17951)?(\s)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[579])[0-9]{8}$/;
                    return reg.test(val);
                }
            })
        //判断正实数的正则，true是--shaobo.wang
        .filter('checkNumber',
            function () {
                return function (val) {
                    var reg = /^\d+\.?\d*$/;
                    return reg.test(val);
                }
            })
        //判断正整数的正则，true是--shaobo.wang 
        .filter('checkNumber1',
            function () {
                return function (val) {
                    var reg = /^\d+$/;
                    return reg.test(val);
                }
            })
        //判断金额类型的正则，保留小数点后两位小数，支持0.00格式 --shaobo.wang
        .filter('moneyReg',
            function () {
                return function (val) {
                    var reg = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
                    return reg.test(val);
                }
            })
        //将日期格式转换为指定格式--shaobo.wang
        .filter('formatDate',
        [
            '$filter', function ($filter) {
                return function (val, formatStr) {
                    var date = new Date(val);
                    date = Date.parse(date);
                    return $filter('date')(date, formatStr);
                }
            }
        ])
        //将超过两位小数的数字精确到小数点后两位--shaobo.wang
        .filter('floatNumber2',
            function () {
                return function (num) {
                    return Math.round(num * 100) / 100;
                }
            })
        //字符串转为数字，失败返回原字符串--shaobo.wang
        .filter('strToNumber',
            function () {
                return function (str) {
                    var num = Number(str);
                    if (isNaN(num)) {
                        return str;
                    } else {
                        return num;
                    }
                }
            })
        //营销工具类别筛选器--shaobo.wang
        .filter('parseChannelType',
            function () {
                return function (str) {
                    if (typeof str == 'number') {
                        return ["未关联", "入学测试", "校宝秀", "直播课"][str];
                    } else {
                        return str;
                    }
                }
            })
        //状态标识位--shaobo.wang
        .filter('parseState',
            function () {
                return function (bool) {
                    return bool ? '可用' : '禁用';
                }
            })
        //状态标识位--shaobo.wang
        .filter('parseState1',
            function () {
                return function (bool) {
                    return bool ? '有' : '无';
                }
            })
        //状态标识位--shaobo.wang
        .filter('parseState2',
            function () {
                return function (bool) {
                    return bool === "1" ? '上架' : '下架';
                }
            })
        //测试类型枚举--shaobo.wang
        .filter('enumPaperType',
            function () {
                return function (paperType) {
                    if (paperType == '101') {
                        return '自主';
                    } else if (paperType == '501') {
                        return '雅思';
                    } else if (paperType == '1001') {
                        return '托福';
                    } else if (paperType == '1601') {
                        return '新SAT';
                    } else {
                        return paperType;
                    }
                }
            })
        //获取最近天数
        .filter('recentDay',
            function () {
                //格式化时间
                var GetDateStr = function (AddDayCount) {
                    var dd = new Date();
                    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
                    var y = dd.getFullYear();
                    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
                    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
                    return y + "-" + m + "-" + d;
                }
                return function (limit) {
                    var dateArray = [];
                    for (var i = 1 - limit; i <= 0; i++) {
                        dateArray.push(GetDateStr(i))
                    }
                    return dateArray;
                }
            })
        //获取某个月的天数
        .filter('getDaysInOneMonth',
            function () {
                return function (date) {
                    var dataArray = [];
                    var dateTime = date.split("-");
                    var month = parseInt(dateTime[1], 10);
                    var d = new Date(dateTime[0], month, 0);
                    // return d.getDate();
                    for (var i = 1, l = d.getDate() ; i <= l; i++) {
                        if (i < 10) {
                            dataArray.push(dateTime[0] + "-" + dateTime[1] + "-0" + i)
                        } else {
                            dataArray.push(dateTime[0] + "-" + dateTime[1] + "-" + i)
                        }
                    }
                    return dataArray;
                }
            })
        //某个数保留小数， x 表示输入值， y表示保留小数点位数,z表示保留方式，1上舍入，2四舍五入，3下舍入,否则按四舍五入
        .filter('changeTwoDecimal_f',
            function () {
                return function (x, y, z) {
                    var f_x = parseFloat(x);
                    if (isNaN(f_x)) {
                        return 0;
                    }
                    var p_y = Math.pow(10, y);
                    var f_x;
                    if (z == 1) {
                        f_x = Math.ceil(x * p_y) / p_y;
                    } else if (z == 2) {
                        f_x = Math.round(x * p_y) / p_y;
                    } else if (z == 3) {
                        f_x = Math.floor(x * p_y) / p_y;
                    } else {
                        Math.round(x * p_y) / p_y;
                    }
                    var f_x = Math.round(x * p_y) / p_y;
                    var s_x = f_x.toString();
                    var pos_decimal = s_x.indexOf('.');
                    if (pos_decimal < 0) {
                        pos_decimal = s_x.length;
                        s_x += '.';
                    }
                    while (s_x.length <= pos_decimal + y) {
                        s_x += '0';
                    }
                    return s_x;
                }
            })
        //保留n位小数
        .filter('toFixed',
            function () {
                return function ($filter, fixedNum) {
                    if ($filter == null || $filter === "") return "";
                    return parseFloat($filter).toFixed(fixedNum);
                }
            })
        //对日期进行加减运算
        .filter("addDays",
            function () {
                return function ($filter, addDays) {
                    var d = new Date($filter);
                    d.setDate(d.getDate() + addDays);
                    return d.toLocaleDateString() || "";
                }
            })
        //对字符串进行按序替换
        .filter("formatString",
            function () {
                return function ($filter, args) {
                    var result = $filter, reg;
                    if (arguments.length > 0) {
                        if (arguments.length == 2 && typeof (args) == "object") {
                            for (var key in args) {
                                if (args[key] != undefined) {
                                    reg = new RegExp("({" + key + "})", "g");
                                    result = result.replace(reg, "【" + args[key] + "】");
                                }
                            }
                        } else {
                            for (var i = 0; i < arguments.length; i++) {
                                if (typeof arguments[i] == "function") {
                                    return arguments[i];
                                }
                                if (arguments[i] != undefined) {
                                    reg = new RegExp("({)" + i + "(})", "g");
                                    result = result.replace(reg, arguments[i]);
                                }
                            }
                        }
                    }
                    return result;
                }
            })
        //获取直播状态
        .filter('liveState',
            function () {
                return function (filter, sTime, eTime) {
                    filter = new Date().getTime() + window.dateDiff;
                    if (!sTime) return false;
                    var tempStime = +sTime.match(/(\d+)/g)[0], tempEtime = +eTime.match(/(\d+)/g)[0];
                    if (tempStime - filter > 900000) {
                        return "未开始";
                    } else if (filter - tempEtime > 900000) {
                        return "已结束";
                    } else {
                        return "直播中";
                    }
                }
            })
        //将空格换为html标签
        .filter('lineBreak',
            function () {
                return function (val) {
                    return ((val.replace(/<(.+?)>/gi, "&lt;$1&gt;")).replace(/ /gi, "&nbsp;")).replace(/\n/gi, "<br>");
                }
            })
        //秒转观看直播时间长度
        .filter('secondToWatchLiveTime',
            function () {
                return function (input) {
                    if (input == null || input <= 0) {
                        return "0 秒";
                    }
                    var hh = input / 3600 | 0;
                    input = parseInt(input) - hh * 3600;
                    var mm = input / 60 | 0;
                    var ss = parseInt(input) - mm * 60;
                    return ((hh > 0) ? (hh + " 小时 ") : "") + ((mm > 0) ? (mm + " 分钟 ") : "") + ((ss > 0) ? (ss + " 秒") : "");
                };
            })
        //将时间当天时间合并为一个时间区间
        .filter('mergeDate', ['$filter',
            function ($filter) {
                return function (filter, sTime, eTime) {
                    var sTimeStamp = +sTime.match(/(\d+)/g)[0], eTimeStamp = +eTime.match(/(\d+)/g)[0], s = new Date(sTimeStamp), e = new Date(eTimeStamp);
                    return $filter('date')(s, 'yyyy/MM/dd HH:mm') + '-' + $filter('date')(e, 'HH:mm');
                };
            }])
        //根据文件后缀名匹配文件格式       （0,表示word，1表示wps，2表示图片，3表示pdf）
        .filter('fileFormatJudge',
            function () {
                return function (input) {
                    if (!input) {
                        return -1;
                    }
                    if (input.substr(input.lastIndexOf('.')).toLowerCase() == '.doc'||input.substr(input.lastIndexOf('.')).toLowerCase() == '.docx') {
                        return 0;
                    }else if(input.substr(input.lastIndexOf('.')).toLowerCase() == '.wps'){
                        return 1;
                    }else if(input.substr(input.lastIndexOf('.')).toLowerCase() == '.bmp'||input.substr(input.lastIndexOf('.')).toLowerCase() == '.jpg'||
                            input.substr(input.lastIndexOf('.')).toLowerCase() == '.jpeg'||input.substr(input.lastIndexOf('.')).toLowerCase() == '.png'){
                        return 2;
                    }else if (input.substr(input.lastIndexOf('.')).toLowerCase() == '.pdf') {
                        return 3;
                    }
                };
            });

});
