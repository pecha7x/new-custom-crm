'use strict';

class AdminController {
  constructor(User, $http, Modal, AdminUser) {
    this.users = User.query();
    this.$http = $http;

    this.delete = Modal.confirm.delete(user => {
      this.users.splice(this.users.indexOf(user), 1);
      AdminUser.delete(user._id);
    });

    this.create = function(form, user) {
      if (form.$valid) {
        this.errors ={};
        AdminUser.create(form, this.users, this.errors, user);
      }
    };
  }
}

angular.module('newCustomCrmApp.admin')
  .controller('AdminController', AdminController);
