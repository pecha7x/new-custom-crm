'use strict';

class MainController {

  constructor($http, Auth) {
    this.$http = $http;
    this.awesomeThings = [];
    this.isAdmin = Auth.isAdmin;
  }

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
      });
  }

  addThing(user, pass) {
    if (this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
    this.awesomeThings.splice(this.awesomeThings.indexOf(thing), 1);
  }
}

angular.module('newCustomCrmApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });