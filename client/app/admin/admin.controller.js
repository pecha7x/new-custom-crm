'use strict';

class AdminController {
  constructor(User, $http) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    this.$http = $http;
  }

  delete(user) {
  //  user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
    this.$http.delete('/api/users/'+user._id, user.role, {user});
  }

  create(form){
    this.submitted = true;
    
    if (form.$valid) {
      this.$http.post('/api/users', {
        name: form.name.$$lastCommittedViewValue,
        email: form.email.$$lastCommittedViewValue,
        password: form.password.$$lastCommittedViewValue
      })
      .then(() => {
          // Account created, redirect to home
          this.users.push({ name: form.name.$$lastCommittedViewValue,
                            email: form.email.$$lastCommittedViewValue
          });
      })
      .catch(err => {
          err = err.data;
          this.errors = {};

          // Update validity of form fields that match the sequelize errors
          if (err.name) {
            angular.forEach(err.fields, field => {
              form[field].$setValidity('mongoose', false);
              this.errors[field] = err.message;
            });
          }
      });
    }
  }

}

angular.module('newCustomCrmApp.admin')
  .controller('AdminController', AdminController);
