'use strict';

class AdminController {
  constructor(User, $http, Modal, AdminUser) {
    this.users = User.query();
    this.$http = $http;

    this.delete = Modal.confirm.delete(user => {
      this.users.splice(this.users.indexOf(user), 1);
      AdminUser.delete(user._id);
    });

    this.create = function(form) {
      AdminUser.create(form, this.users);
      //this.users = {};
      //console.log(this.users);
      //form.$setPristine();
      //console.log(form);
    };


  }

}

angular.module('newCustomCrmApp.admin')
  .controller('AdminController', AdminController);