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
    this.page = 0;
    this.classes =[];

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

    this.prevPage = function (n) {
      this.classes[this.page] = '';
      if(n == 0){
        this.currentPage = n;
        this.page = n;
        this.classes[n] = 'active';
      } else {
        this.currentPage = n-1;
        this.page = n-1;
        this.classes[n-1] = 'active';
      }
    }

    this.setPage = function (n) {
      this.classes[this.page] = '';
      this.page = n;
      this.currentPage = n;
      this.classes[n] = 'active';
    }
    this.nextPage = function (n) {
      this.classes[this.page]='';
      if(this.ItemsByPage.length-1 == n) {
        this.currentPage = n;
        this.page = n;
        this.classes[n] = 'active';
      } else {
        this.currentPage = n+1;
        this.page = n+1;
        this.classes[n+1] = 'active';
      }
    }

    this.items = function(){
      this.ItemsByPage = filteredList.paged(this.users, pageSize);
      return this.ItemsByPage.length+1;
    }

    this.pagination = function() {
      this.ItemsByPage = filteredList.paged(this.users, pageSize);
    }

    this.range = function (total) {
      var ret = [];
      for (var i = 0; i < total; i++) {
        if (i != 0 ) {
          ret.push(i);
        }
      }
      return ret;
    }
  }
}

angular.module('newCustomCrmApp.admin')
  .controller('AdminController', AdminController);
