'use strict';

describe('The main view', function () {
  var page;

  beforeEach(function () {
    browser.get('/index.html');
    page = require('./main.po');
  });

  it('should list more than 5 flights', function () {
    expect(this.flights.count()).toBeGreaterThan(5);
  });

});
