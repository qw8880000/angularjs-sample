(function () {
'use strict';

  angular
    .module('app.utils')
    .factory('imgUpload', imgUpload);

  /* @ngInject */
  function imgUpload(qiniu, $q) {
    var service = {
      upload: upload
    };
    return service;

    ////////////////

    function upload(canvas, prepand, fileName, successCallback, errorCallback) {
      var deferred = $q.defer();
      var key = qiniu.generateKey(prepand, fileName);

      // 上传图片到七牛
      if (canvas) {
        canvas.toBlob(function (blob) {
          qiniu.upload(blob, key, null, function (res) {
            if (angular.isFunction(errorCallback)) {
              errorCallback(res);
            }
            deferred.reject(res);
          }, function (res) {
            if (angular.isFunction(successCallback)) {
              successCallback(res);
            }
            deferred.resolve(res);
          });
        });
      } else {
        deferred.reject('canvas is undefined');
      }

      return deferred.promise;
    }

  }
}());
