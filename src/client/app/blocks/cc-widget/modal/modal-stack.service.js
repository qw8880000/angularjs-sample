(function () {
'use strict';

  angular
    .module('ccwModal')
    .factory('modalStack', modalStack);

  /* @ngInject */
  function modalStack(stackMap,
    $compile,
    $document) {

    var openedWindows = stackMap.createNew();

    var service = {
      open: open,
      close: close,
      dismiss: dismiss,
      getTop: getTop,
    };
    return service;

    ////////////////

    function open(modalInstance, modal) {

      var body = $document.find('body').eq(0);

      //
      // compile template and append to <body> element
      var modalDomEl = $compile(modal.template)(modal.scope);
      body.append(modalDomEl);

      //
      // add class to <body>
      body.addClass(modal.bodyClass);

      openedWindows.add(modalInstance, {
        deferred: modal.deferred,
        modalScope: modal.scope,
        modalDom: modalDomEl,
        bodyClass: modal.bodyClass,
      });
    }

    function close(modalInstance, result) {
      var modalWindow = openedWindows.get(modalInstance);
      if (modalWindow) {
        modalWindow.value.deferred.resolve(result);
        removeModalWindow(modalInstance);
      }
    };

    function dismiss(modalInstance, reason) {
      var modalWindow = openedWindows.get(modalInstance);
      if (modalWindow) {
        modalWindow.value.deferred.reject(reason);
        removeModalWindow(modalInstance);
      }
    };

    function getTop() {
      return openedWindows.top();
    }

    function removeModalWindow(modalInstance) {

      var body = $document.find('body').eq(0);
      var modalWindow = openedWindows.get(modalInstance).value;


      // clean up the stack
      openedWindows.remove(modalInstance);

      // remove class that append to <body>
      if (openedWindows.length() === 0) {
        body.removeClass(modalWindow.bodyClass);
      }

      // remove window DOM element
      modalWindow.modalDom.remove();
      
      // destroy scope
      modalWindow.modalScope.$destroy();
    }

  }
}());
