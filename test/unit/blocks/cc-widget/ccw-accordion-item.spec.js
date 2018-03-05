describe('Testing ccw-accordion-item directive:', function () {

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

  describe('testing require:', function () {

    it('should fail if ccw-accordion is not the parent of ccw-accordion-item:', function () {
      expect(function () {
        getCompiledElement('<div ccw-accordion-item></div>');
      }).toThrow();
    });

    it('should work if ccw-accordion is the parent of ccw-accordion-item:', function () {
      var template = '<div ccw-accordion> \
        <div ccw-accordion-item></div> \
        </div>';

      expect(function () {
        getCompiledElement(template);
      }).not.toThrow();
    });
  });

  describe('testing link:', function () {
    it('ha', function () {
      var template = '<div ccw-accordion> \
        <div ccw-accordion-item> \
          <div ccw-accordion-toggle></div> \
        </div> \
        </div>';
      var element = getCompiledElement(template);
      console.log(element.find('[ccw-accordion-toggle]'));
    });
  });

});
