describe('Testing ccw-accordion-item directive:', function () {

  var getCompiledElement, 
    clickElement,
    $compile,
    $scope;

  // load the module, which contains the directive
  beforeEach(angular.mock.module('ccwAccordion'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $scope = _$rootScope_.$new();

    getCompiledElement = function (template){
      // Compile a piece of HTML containing the directive
      var element = $compile(template)($scope);
      // fire all the watches
      $scope.$digest();
      return element;
    };
    
    clickElement = function (element) {
      element.triggerHandler('click');
      // $scope.$digest();     // force the watcher to run by calling $digest
    }

  }));

  describe('testing template:', function () {

    it('should work and not throw any error:', function () {
      var template = '<div ccw-accordion> \
        <div ccw-accordion-item></div> \
        </div>';

      expect(function () {
        getCompiledElement(template);
      }).not.toThrow();
    });
  });

  describe('testing scope:', function () {
    it('test default scope:', function () {
      var template = '<div ccw-accordion> \
            <div ccw-accordion-item></div> \
        </div>';

      var element = getCompiledElement(template);
      var itemScope = element.find('[ccw-accordion-item]').isolateScope();

      expect(itemScope.itemFocusClass).toBe('');
      expect(itemScope.itemOpenClass).toBe('');
      expect(itemScope.panelOpenClass).toBe('');
      expect(itemScope.isOpen).toBe(false);
      expect(itemScope.isDisabled).toBe(false);
    });

    it('test custom scope:', function () {
      var template = '<div ccw-accordion> \
            <div ccw-accordion-item is-open="true" is-disabled="true" item-focus-class="test1" item-open-class="test2" panel-open-class="test3"> \
            </div> \
        </div>';

      var element = getCompiledElement(template);
      var itemScope = element.find('[ccw-accordion-item]').isolateScope();

      expect(itemScope.itemFocusClass).toBe('test1');
      expect(itemScope.itemOpenClass).toBe('test2');
      expect(itemScope.panelOpenClass).toBe('test3');
      expect(itemScope.isOpen).toBe(true);
      expect(itemScope.isDisabled).toBe(true);
    });
  });

  describe('testing link:', function () {

    it('when created, should add ccw-accordion-item to ccw-accordion:', function () {
      var template = '<div ccw-accordion> \
        <div ccw-accordion-item></div> \
        <div ccw-accordion-item></div> \
        </div>';
      var element = getCompiledElement(template);
      var controller = element.controller('ccwAccordion'); // Get controller from directive name.
      expect(controller.items.length).toBe(2);
    });

    it('when ccw-accordion attr close-others=false:', function () {
      var template = '<div ccw-accordion close-others="false"> \
          <div ccw-accordion-item is-open="false"> \
            <div ccw-accordion-toggle></div> \
            <div ccw-accordion-panel></div> \
          </div> \
          <div ccw-accordion-item is-open="false"> \
            <div ccw-accordion-toggle></div> \
            <div ccw-accordion-panel></div> \
          </div> \
        </div>';
      var element = getCompiledElement(template);
      var itemElements = element.find('[ccw-accordion-item]');
      var toggleElements = element.find('[ccw-accordion-toggle]');
      var panelElements = element.find('[ccw-accordion-panel]');
      var scope1 = angular.element(itemElements[0]).isolateScope();
      var scope2 = angular.element(itemElements[1]).isolateScope();
      
      expect(scope1).toBeDefined();
      expect(scope2).toBeDefined();
      
      // 初始状态
      expect(scope1.isOpen).toBe(false);
      expect(scope2.isOpen).toBe(false);

      // 点击ccw-accordion-toggle后
      clickElement(angular.element(toggleElements[0]));
      expect(scope1.isOpen).toBe(true);
      expect(scope2.isOpen).toBe(false);

      // 再次点击
      clickElement(angular.element(toggleElements[0]));
      expect(scope1.isOpen).toBe(false);
      expect(scope2.isOpen).toBe(false);
    });

    it('when ccw-accordion attr close-others=true:', function () {
      var template = '<div ccw-accordion close-others="true"> \
          <div ccw-accordion-item is-open="false"> \
            <div ccw-accordion-toggle></div> \
            <div ccw-accordion-panel></div> \
          </div> \
          <div ccw-accordion-item is-open="false"> \
            <div ccw-accordion-toggle></div> \
            <div ccw-accordion-panel></div> \
          </div> \
        </div>';
      var element = getCompiledElement(template);
      var itemElements = element.find('[ccw-accordion-item]');
      var toggleElements = element.find('[ccw-accordion-toggle]');
      var panelElements = element.find('[ccw-accordion-panel]');
      var scope1 = angular.element(itemElements[0]).isolateScope();
      var scope2 = angular.element(itemElements[1]).isolateScope();
      
      expect(scope1).toBeDefined();
      expect(scope2).toBeDefined();
      
      // 初始状态
      expect(scope1.isOpen).toBe(false);
      expect(scope2.isOpen).toBe(false);

      // 点击ccw-accordion-toggle后
      clickElement(angular.element(toggleElements[0]));
      expect(scope1.isOpen).toBe(true);
      expect(scope2.isOpen).toBe(false);

      clickElement(angular.element(toggleElements[1]));
      expect(scope1.isOpen).toBe(false);
      expect(scope2.isOpen).toBe(true);
    });

    it('when ccw-accordion-item attr isDisabled=true', function () {
      var template = '<div ccw-accordion close-others="true"> \
          <div ccw-accordion-item is-disabled="true"> \
            <div ccw-accordion-toggle></div> \
            <div ccw-accordion-panel></div> \
          </div> \
          <div ccw-accordion-item is-open="false"> \
            <div ccw-accordion-toggle></div> \
            <div ccw-accordion-panel></div> \
          </div> \
        </div>';
      var element = getCompiledElement(template);
      var itemElements = element.find('[ccw-accordion-item]');
      var toggleElements = element.find('[ccw-accordion-toggle]');
      var panelElements = element.find('[ccw-accordion-panel]');
      var scope1 = angular.element(itemElements[0]).isolateScope();
      var scope2 = angular.element(itemElements[1]).isolateScope();
      
      expect(scope1.isOpen).toBe(false);
      expect(scope2.isOpen).toBe(false);

      // 点击ccw-accordion-toggle后
      clickElement(angular.element(toggleElements[0]));
      expect(scope1.isOpen).toBe(false);
      expect(scope2.isOpen).toBe(false);

      clickElement(angular.element(toggleElements[1]));
      expect(scope1.isOpen).toBe(false);
      expect(scope2.isOpen).toBe(true);
    });

    it('ccw-accordion-toggle clicked, should toggle panelOpenClass to ccw-accordion-panel and toggle itemOpenClass to ccw-accordion-item:', function () {
      var template = '<div ccw-accordion> \
        <div ccw-accordion-item panel-open-class="panel-open" item-open-class="item-open"> \
          <div ccw-accordion-toggle></div> \
          <div ccw-accordion-panel></div> \
          <div ccw-accordion-panel></div> \
          <div ccw-accordion-panel></div> \
        </div> \
        </div>';
      var element = getCompiledElement(template);
      var itemElements = element.find('[ccw-accordion-item]');
      var toggleElement = element.find('[ccw-accordion-toggle]');
      var panelElements = element.find('[ccw-accordion-panel]');
      
      clickElement(toggleElement);
      expect(itemElements.hasClass('item-open')).toBe(true);
      expect(panelElements.hasClass('panel-open')).toBe(true);

      clickElement(toggleElement);
      expect(itemElements.hasClass('item-open')).toBe(false);
      expect(panelElements.hasClass('panel-open')).toBe(false);
    });

    it('ccw-accordion-toggle clicked, should add itemFocusClass to ccw-accordion-item:', function () {
      var template = '<div ccw-accordion> \
          <div ccw-accordion-item item-focus-class="item-focus"> \
            <div ccw-accordion-toggle></div> \
          </div> \
          <div ccw-accordion-item item-focus-class="item-focus"> \
            <div ccw-accordion-toggle></div> \
          </div> \
        </div>';
      var element = getCompiledElement(template);
      var itemElements = element.find('[ccw-accordion-item]');
      var toggleElements = element.find('[ccw-accordion-toggle]');
      
      expect(itemElements.hasClass('item-focus')).toBe(false);

      clickElement(angular.element(toggleElements[0]));
      expect(angular.element(itemElements[0]).hasClass('item-focus')).toBe(true);
      expect(angular.element(itemElements[1]).hasClass('item-focus')).toBe(false);

      clickElement(angular.element(toggleElements[0]));
      expect(angular.element(itemElements[0]).hasClass('item-focus')).toBe(true);
      expect(angular.element(itemElements[1]).hasClass('item-focus')).toBe(false);

      clickElement(angular.element(toggleElements[1]));
      expect(angular.element(itemElements[0]).hasClass('item-focus')).toBe(false);
      expect(angular.element(itemElements[1]).hasClass('item-focus')).toBe(true);

      clickElement(angular.element(toggleElements[1]));
      expect(angular.element(itemElements[0]).hasClass('item-focus')).toBe(false);
      expect(angular.element(itemElements[1]).hasClass('item-focus')).toBe(true);
    });

  });

});
