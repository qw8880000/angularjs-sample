describe('Testing ccw-accordion directive:', function () {

  var getCompiledElement, 
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

  }));

  it('when create:', function () {
    expect(function () {
      getCompiledElement('<div ccw-accordion></div>');
    }).not.toThrow();
  });

  it('testing controller:', function () {

    var template = '<div ccw-accordion close-others="true"></div>';
    var element = getCompiledElement(template);
    var controller = element.controller('ccwAccordion'); // Get controller from directive name.

    // initialed
    expect(controller).toBeDefined();
    expect(controller.isCloseOthers).toBe(true);
    expect(controller.items.length).toBe(0);

    // test addItem function
    var item = {isOpen: true};
    controller.addItem(item);
    expect(controller.items.length).toBe(1);

    // test removeItem function
    controller.removeItem(item);
    expect(controller.items.length).toBe(0);

    // test closeOthers function
    var item1 = {isOpen: true};
    var item2 = {isOpen: true};
    var item3 = {isOpen: true};
    controller.addItem(item1);
    controller.addItem(item2);
    controller.addItem(item3);

    controller.closeOthers(item3);
    expect(item1.isOpen).toBe(false);
    expect(item2.isOpen).toBe(false);
  });
});
