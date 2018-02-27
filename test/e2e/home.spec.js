describe('Test home page:', function () {

  browser.get('http://localhost:3000');

  it('Test title:', function () {
    expect(browser.getTitle()).toEqual('angular.js sample');
  });

});
