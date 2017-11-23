export class MainController {

  constructor ($timeout, webDevTec) {
    'ngInject';
    this.cities = ['Agra', 'Ahmedabad', 'Banglore', 'Chennai', 'Delhi', 'Guwahati', 'Mumbai'];
    this.activate(webDevTec);
    this.query = {};
    this.filteredFlights = [];
    this.minValue = 0;
    this.maxValue = 20000;
    this.query.passengerCount = 1;
    this.query.rangeSelector = 10000;
    this.currentTab = 1;
  }

  activate(webDevTec) {
    this.getWebDevTec(webDevTec);
  }

  getWebDevTec(webDevTec) {
    this.flights = webDevTec.getTec();

    angular.forEach(this.flights, (flight) => {
      console.log(flight);
    });
  }
  
  fireSearchQuery(queryForm) {
    let date = this.getFormattedDate(this.query.startDate);
    
    let validated = {status: undefined, resaon: undefined}
    validated = this.checkValidate(queryForm);
    if (validated.status) {
      this.resultFlights = _.filter( this.flights, {source: this.query.source,destination: this.query.destination, date: date});
      this.filteredFlights = angular.copy(this.resultFlights);
      if(this.currentTab == 2) {
        let returnDate = this.getFormattedDate(this.query.returnDate);
        this.returnFlights = _.filter( this.flights, {source: this.query.destination,destination: this.query.source, date: returnDate});
        this.returnFilteredFlights = angular.copy(this.returnFlights);
      }
      this.errorMessage = undefined;
    } else {
      this.resetResult();
      this.errorMessage = validated.reason;
    }
  }

  inputChanged() {
    this.resetResult();
  }

  resetResult() {
    this.filteredFlights = [];
    this.returnFilteredFlights = [];
    this.errorMessage = 'Run search again';    
  }

  exchangePorts() {
    let swap = this.query.source;
    this.query.source = this.query.destination;
    this.query.destination = swap;

    this.resetResult();    
  }

  getFormattedDate(unformattedDate) {
    let dd = unformattedDate.getDate();
    let mm = unformattedDate.getMonth() + 1;
    let yy = unformattedDate.getFullYear();
    let date =  dd+'/'+mm+'/'+yy;
    return date;
  }

  checkValidate() {
    let validation = {status: undefined, reason: undefined};
    validation.status = true;

    if (this.query.source === this.query.destination) {
      validation.status = false;
      //queryForm.destination.setError('same', true);
      validation.reason = 'source and destination in a journey cannot be same';        
      return validation;
    }
    if (this.currentTab == 2) {
      // return journey case
      if (this.query.startDate > this.query.returnDate) {
        console.log('here');
        validation.status = false;
        validation.reason = 'Start date cannot be chosen to be after returning date';
      }
      return validation;
    }
    return validation;    
  }

  resetQueryResults() {
    this.filteredFlights = angular.copy(_.filter(this.resultFlights, (flight) => {
      return flight.price < parseInt(this.query.rangeSelector, 10);
    }));

    this.returnFilteredFlights = angular.copy(_.filter(this.returnFlights, (flight) => {
      return flight.price < parseInt(this.query.rangeSelector, 10);
    }));
  }
}
