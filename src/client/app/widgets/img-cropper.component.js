(function () {
  'use strict';

  angular
    .module('app.widgets')
    .component('imgCropper', {
      templateUrl: 'app/widgets/img-cropper.html',
      controller: imgCropperController,
      controllerAs: 'vm',
      require: {
        ngModelCtrl: '?ngModel',
      }, // get a hold of NgModelController
      bindings: {
        aspectRatio: '<',       // 裁剪的长宽比 (number)
        showPreview: '<',       // 是否显示预览 (true / false)
      }
    });

  /* @ngInject */
  function imgCropperController($log) {
    var vm = this;
    vm.files = {};
    vm.filesSelected = filesSelected;
    vm.croppedCanvas = null;        // 裁剪结果 数据结构见：https://github.com/fengyuanchen/cropperjs#getcroppedcanvasoptions

    var $image = angular.element('#img-cropper-image');
    var cropperInited = false;
    var ngModelCtrl = null;

    vm.$onInit = function () {
      $log.info('ccw-file-input: init');

      // Note that the required controllers will not be available during the instantiation of the controller,
      // but they are guaranteed to be available just before the $onInit method is executed!
      ngModelCtrl = vm.ngModelCtrl;
    }

    vm.$onDestroy =  function () {
      $log.info('ccw-file-input: destroy');
      cropperDestroy();
    };

    ////////////////////////////////

    function getCropperParams() {
      var params = {
        preview: 'div#img-cropper-preview',
        ready: function () {
          setCroppedResult();
        },
        cropend: function () {
          setCroppedResult();
        },
      };

      if (vm.aspectRatio) {
        params.aspectRatio = vm.aspectRatio;
      }

      return params;
    }

    function setCroppedResult() {
      var croppedCanvas = $image.cropper('getCroppedCanvas', {}); // 裁剪结果 数据结构见：https://github.com/fengyuanchen/cropperjs#getcroppedcanvasoptions
      var file = vm.files ? vm.files[0] : null;

      // modelValue to viewValue
      if (ngModelCtrl) {
        ngModelCtrl.$setViewValue({
          croppedCanvas: croppedCanvas,
          file: file,
        });
      }
    }

    function cropperCreate(url) {
      if (!cropperInited) {
        cropperInited = true;
        $image.attr('src', url);
        $image.cropper(getCropperParams());
      } else {
        $image.cropper('replace', url);
      }
    }

    function cropperDestroy() {
      if (cropperInited) {
        $image.cropper('destroy');
        cropperInited = false;
      }
    }

    function isImageFile(file) {
      if (file.type) {
        return /^image\/\w+$/.test(file.type);
      } else {
        return /\.(jpg|jpeg|png|gif)$/.test(file);
      }
    }

    function filesSelected() {
      var files = vm.files;
      var file;
      var dataUrl;
      var reader  = new FileReader();

      if (files && files.length > 0) {

        var file = files[0];
        if (isImageFile(file)) {

          reader.addEventListener("load", function () {
            dataUrl = reader.result;
            cropperCreate(dataUrl);
          }, false);

          reader.readAsDataURL(file);
        }
      }

    }
  }

}());
