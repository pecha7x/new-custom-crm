'use strict';

class AdminController {
  constructor(User, $http, Modal, AdminUser, $filter, filteredList) {
    this.users = User.query();
    this.$http = $http;
    this.filter = $filter('orderBy');
    this.filtered = filteredList;
    this.Header = ['', ''];
    this.currentPage = 0;
    var pageSize = 3;

    this.delete = Modal.confirm.delete(user => {
      this.users.splice(this.users.indexOf(user), 1);
      AdminUser.delete(user._id);
    });

    this.create = function (form, user) {
      if (form.$valid) {
        this.errors = {};
        AdminUser.create(form, this.users, this.errors, user);
      }
    };

    this.sort = function (sortBy) {
      var iconName;
      this.reverse = !this.reverse;
      this.column = sortBy;
      this.users = this.filter(this.users, this.column, this.reverse);
      if (this.reverse) {
        iconName = 'glyphicon glyphicon-chevron-up';
      } else {
        iconName = 'glyphicon glyphicon-chevron-down';
      }
      if (sortBy === 'name') {

        this.Header[0] = iconName;
      } else {
        this.Header[1] = iconName;
      }
      this.pagination();
    }

    this.firstPage = function () {
      this.currentPage = 0;
    }

    this.setPage = function (n) {
      this.currentPage = n;
    }
    this.lastPage = function () {
      this.currentPage = this.ItemsByPage.length - 1;
    }

    this.items = function(){
      this.ItemsByPage = filteredList.paged(this.users, pageSize);
      return this.ItemsByPage.length;
    }

    this.pagination = function() {
      this.ItemsByPage = filteredList.paged(this.users, pageSize);
    }

    this.range = function (total) {
      var ret = [];
      for (var i = 0; i < total; i++) {
        if (i != 0 && i != total - 1) {
          ret.push(i);
        }
      }
      return ret;
    }
  }
}

angular.module('newCustomCrmApp.admin')
  .controller('AdminController', AdminController);
