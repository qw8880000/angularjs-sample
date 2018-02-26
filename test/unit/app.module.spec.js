describe('Testing app module:', function () {
  'use strict';

  var module = angular.module('app');

  it('if app module is exist', function () {
    expect(module.name).toBe('app');
  });
  it('test dependencies', function () {
    expect(module.requires).toContain('ngResource');
    expect(module.requires).toContain('ngAnimate');
  });

});
