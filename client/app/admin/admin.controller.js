'use strict';

(function() {

  class AdminController {
    constructor(User) {
      // Use the User $resource to fetch all users
      this.users = User.query();
    }

    delete(user) {
      user.$remove();
      this.users.splice(this.users.indexOf(user), 1);
    }

    create(form){
      this.users.push({ name: form.role.$$lastCommittedViewValue,
                        email: form.email.$$lastCommittedViewValue
      });

    }
  }

  angular.module('newCustomCrmApp.admin')
    .controller('AdminController', AdminController);
})();
