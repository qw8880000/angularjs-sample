(function () {
'use strict';

  angular
    .module('app.utils')
    .factory('datetime', datetime);

  /* @ngInject */
  function datetime() {
    var service = {
      getSecondTime: getSecondTime,
      formatDateTime: formatDateTime
    };
    return service;

    ////////////////

    //
    // getSecondTime 方法的返回值一个数值，表示从1970年1月1日0时0分0秒（UTC，即协调世界时）距离该日期对象所代表时间的秒数
    //
    function getSecondTime(dateTime) {
      return Date.parse(dateTime) / 1000;
    }

    //
    // 原项目使用到的格式：1970-01-01T08:00:00.000+0800
    //
    function formatDateTime(dateTime) {
      var date = new Date(Date.parse(dateTime));
      var hours = date.getHours();
      hours = hours < 10 ? '0' + hours : hours;
      var minutes = date.getMinutes();
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var seconds = date.getSeconds();
      seconds = seconds < 10 ? '0' + seconds : seconds;
      var milliSeconds = date.getMilliseconds();
      milliSeconds = milliSeconds < 10 ? '00' + milliSeconds : milliSeconds;
      milliSeconds = milliSeconds.length == 2 ? '0' + milliSeconds : milliSeconds;

      var strTime = hours + ':' + minutes + ':' + seconds + '.' + milliSeconds + '+0800';

      var month = (date.getMonth() + 1);
      month = month < 10 ? '0' + month : month;

      return date.getFullYear() + "-" + month + "-" + date.getDate() + "T" + strTime;
    }
  }
}());
