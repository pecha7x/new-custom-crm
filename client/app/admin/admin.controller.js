'use strict';

class AdminController {
  constructor(User, $http, Modal, AdminUser, $filter, filteredList) {
    this.searchUsers = User.query();
    this.users = User.query();
    this.$http = $http;
    this.filter = $filter('orderBy');
    this.filtered = filteredList;
    this.column = null;
    this.iconName = null;
    this.currentPage = 0;
    var pageSize = 3;
    this.searchText = '';

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

    this.sort = function (event) {
      this.column = event.originalEvent.path[0].id;
      if(this.column){
        this.reverse = !this.reverse;
        this.users = this.filter(this.users, this.column, this.reverse);
        this.iconName = 'glyphicon glyphicon-chevron-' + (this.reverse ? 'up' : 'down');
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
      this.currentPage = this.ItemsByPage.length-1;
    }

    this.allPages = function(){
      this.ItemsByPage = filteredList.paged(this.users, pageSize);
      return this.ItemsByPage.length+1;
    }

    this.pagination = function() {
      this.ItemsByPage = filteredList.paged(this.users, pageSize);
    }

    this.search = function(){
      console.log(this.users);
      this.users = (this.searchText) ? filteredList.searched(this.searchUsers, this.searchText): User.query();
      console.log(this.users);

      this.setPage(0);
      this.pagination();

    }


    this.range = function (total) {
      var ret = [];
      for (var i = 1; i < total; i++) {
          ret.push(i);
      }
      return ret;
    }
  }
}

angular.module('newCustomCrmApp.admin')
  .controller('AdminController', AdminController);
