describe('controllers', () => {
  let vm;

  beforeEach(angular.mock.module('flightSearch'));

  beforeEach(inject(($controller, webDevTec, toastr) => {
    spyOn(webDevTec, 'getTec').and.returnValue([{}, {}, {}, {}, {}]);
    spyOn(toastr, 'info').and.callThrough();

    vm = $controller('MainController');
  }));
  
  xit('should show a Toastr info and stop animation when invoke showToastr()', inject(toastr => {
    vm.showToastr();
    expect(toastr.info).toHaveBeenCalled();
    expect(vm.classAnimation).toEqual('');
  }));

  xit('should define more than 5 awesome things', () => {
    expect(angular.isArray(vm.awesomeThings)).toBeTruthy();
    expect(vm.awesomeThings.length === 5).toBeTruthy();
  });
});
