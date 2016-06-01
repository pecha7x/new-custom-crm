'use strict';

(function() {

	function AdminUserService($http) {

		return {
			delete: function (id) {
				return $http.delete('/api/users/' + id);
			},

			create: function(form, users, errors, user){
				var userParams = {
					name: form.name.$$lastCommittedViewValue,
					email: form.email.$$lastCommittedViewValue,
					password: form.password.$$lastCommittedViewValue
				};

				return $http.post('/api/users/new_user', {
					name: userParams.name,
					email: userParams.email,
					password: userParams.password
				})
				.then(() => {
					users.push({name: userParams.name, email: userParams.email});
					this.clearCreateForm(form, user);
				})
				.catch(err => {
					err = err.data;
					console.log(err);
					if (err.name) {
						angular.forEach(err.fields, field => {
							form[field].$setValidity('mongoose', false);
							errors[field] = err.message;
						});
					}
				});
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
