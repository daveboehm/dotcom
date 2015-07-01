var app = angular.module('app', ['ngRoute', 'ngAnimate'] );

// ROUTES
// Define templates and controllers for each route/page.
// @@todo: places route functionality in a routes.js file
app.config(function($routeProvider) {
	$routeProvider

		// Home page
		.when('/', {
			templateUrl: 'html/about.html',
			// controller: 'homeController'
		})

		// Resume page
		.when('/resume', {
			templateUrl: 'html/resume.html',
			// controller: 'resumeController'
		})

		// Contact page
		.when('/contact', {
			templateUrl: 'html/contact.html',
			controller: 'contactController'
		})

		// Fallback page
		.otherwise({ redirectTo: '/' });

// ============================================================================
});

// CONTROLLERS

// Display current year in footer
app.controller('currentYearController', function($scope) {
	$scope.date = new Date();
});

app.controller('contactController', function ($scope, $http) {
	$scope.user = {};
	$scope.submitted = false;
	$scope.success = false;
	$scope.error = false;

	$scope.errors = {
		required: 'This field is required',
		format: 'Invalid format'
	}

	var param = function(data) {
		var returnString = '';
		for (d in data) {
			if (data.hasOwnProperty(d)) {
				returnString += d + '=' + data[d] + '&';
			}
		}
		return returnString.slice(0, returnString.length - 1);
	};
	$scope.submitform = function() {
		$http({
			method: 'POST',
			url: '/php/process.php',
			data: param($scope.user),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).success(function(data) {
			if (!data.success) {
				$scope.submitted = true;
				$scope.error = true;
			} else {
				$scope.submitted = true;
				$scope.success = true;
			}
		});
	};
});

app.controller('activeNavController', function($scope, $location) {
	$scope.activeNav = function(route) {
		return route === $location.path();
	}
});