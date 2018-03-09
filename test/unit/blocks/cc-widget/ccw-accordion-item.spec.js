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

      expect(itemScope.togglePanelClass).toBe('panel-open');
      expect(itemScope.isOpen).toBe(false);
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

    it('ccw-accordion-toggle clicked, should add class to ccw-accordion-panel:', function () {
      var template = '<div ccw-accordion> \
        <div ccw-accordion-item> \
          <div ccw-accordion-toggle></div> \
          <div ccw-accordion-panel></div> \
        </div> \
        </div>';
      var element = getCompiledElement(template);
      var toggleElement = element.find('[ccw-accordion-toggle]');
      var panelElement = element.find('[ccw-accordion-panel]');
      
      clickElement(toggleElement);
      expect(panelElement.hasClass('panel-open')).toBe(true);

      clickElement(toggleElement);
      expect(panelElement.hasClass('panel-open')).toBe(false);
    });

    it('ccw-accordion-toggle clicked, should close others', function () {
      var template = '<div ccw-accordion> \
          <div ccw-accordion-item> \
            <div ccw-accordion-toggle></div> \
            <div ccw-accordion-panel></div> \
          </div> \
          <div ccw-accordion-item> \
            <div ccw-accordion-toggle></div> \
            <div ccw-accordion-panel></div> \
          </div> \
        </div>';
      var element = getCompiledElement(template);
      var toggleElements = element.find('[ccw-accordion-toggle]');
      var panelElements = element.find('[ccw-accordion-panel]');
      
      expect(angular.element(panelElements[0]).hasClass('panel-open')).toBe(false);
      expect(angular.element(panelElements[1]).hasClass('panel-open')).toBe(false);

      clickElement(angular.element(toggleElements[0]));
      expect(angular.element(panelElements[0]).hasClass('panel-open')).toBe(true);
      expect(angular.element(panelElements[1]).hasClass('panel-open')).toBe(false);

      clickElement(angular.element(toggleElements[1]));
      expect(angular.element(panelElements[0]).hasClass('panel-open')).toBe(false);
      expect(angular.element(panelElements[1]).hasClass('panel-open')).toBe(true);
    });

  });

});
