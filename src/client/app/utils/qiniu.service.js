(function () {
'use strict';

  angular
    .module('app.utils')
    .factory('qiniu', qiniu);

  /* @ngInject */
  function qiniu($window, $log, dataService, md5) {
    var qiniuSdk;
    var qiniuToken = {};

    var service = {
      init: init,
      generateKey: generateKey,
      upload: upload
    };
    return service;

    ////////////////

    function init() {
      if (!$window.qiniu) {
        $log.error('未找到七牛sdk');
        return;
      }

      // qiniu sdk
      qiniuSdk = $window.qiniu;
      // 获取token
      dataService.QiniuUploadToken.get({}, function (response) {
        if (response && response.result) {
          qiniuToken.uptoken = response.result.uptoken;
          qiniuToken.bucketName = response.result.bucketName;
          qiniuToken.domain = response.result.domainHttp;
          // qiniuToken.domainHttps = response.result.domainHttps;
          // qiniuToken.storagezone = response.result.storagezone;
          // qiniuToken.securityStoragezone = response.result.securityStoragezone;
        }
      });
    }

    function upload(file, key, nextCallback, errorCallback, completeCallback) {
      var observable;
      var subscription;
      var token = qiniuToken.uptoken;
      var config = {
        retryCount: 2,
        //region: qiniu.region.z2
      };
      var subObject = {
        next: function (res) {
          if (angular.isFunction(nextCallback)) {
            nextCallback(res);
          }
        },
        error: function (res) {
          if (angular.isFunction(errorCallback)) {
            $log.warn('上传qiniu失败');
            errorCallback(res);
          }
        },
        complete: function (res) {
          if (angular.isFunction(completeCallback)) {
            res.url = qiniuToken.domain + res.key;
            completeCallback(res);
          }
        }
      }

      // 调用sdk上传接口获得相应的observable，控制上传和暂停
      observable = qiniuSdk.upload(file, key, token, {}, config);
      subscription = observable.subscribe(subObject);

      return {
        stop: function () {
          observable.subscribe(subObject);   // 上传取消
        },
        start: function () {
          subscription.unsubscribe();   // 上传开始
        }
      };
    }

    function generateKey(prepand, fileName) {
      var time = new Date().getTime();
      return prepand + '/' + md5.generate32(fileName + time);
    }

  }
}());
