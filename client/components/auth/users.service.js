'use strict';

(function() {

    function AdminUserService($http) {
		return {
			delete: function (id) {
				return $http.delete('/api/users/' + id);
			},

			create: function(form, users){
				var userParams = {
					name: form.name.$$lastCommittedViewValue,
					email: form.email.$$lastCommittedViewValue,
					password: form.password.$$lastCommittedViewValue
				};
				if (form.$valid) {
					return $http.post('/api/users', {
							name: userParams.name,
							email: userParams.email,
							password: userParams.password
						})
						.then(() => {
							users.push({name: userParams.name, email: userParams.email});

							return true;
						})
						.catch(err => {
							err = err.data;
							this.errors = {};
							if (err.name) {
								angular.forEach(err.fields, field => {
									form[field].$setValidity('mongoose', false);
									this.errors[field] = err.message;
								});
							}

							return false;
						});
				}
			},

			clearCreateForm: function(form, model){
				form.$setPristine();
				form.$setUntouched();
				for(var i in model) { model[i] = ""}
			}
		};
	}

	angular.module('newCustomCrmApp.admin')
    	.factory('AdminUser', AdminUserService);
})();
