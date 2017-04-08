"use strict";
/**
* author :小潘
* time: 2015年1月6日 13:38:44
* description: 重写部分fullcalendar函数
*/

//if (!$.fullCalendar) {
//
//    //刷新页面 执行3次
//    location.hash = location.hash ? parseInt(location.hash.slice(1, 2)) + 1 : 1;
//    if (parseInt(location.hash.slice(1, 2)) < 4) {
//        location.reload(true);
//    }
//
//    console.log("fullcalendar没有正确引用");
//}


//重写compareSegs方法，事件排序，强制通过事件id排序 by 沈海良
$.fullCalendar.compareSegs = function(seg1, seg2) {
    return seg1.event.id - seg2.event.id;
};