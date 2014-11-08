'use strict';

angular.module('roblaytonComApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }, {
      'title': 'Blog',
      'link': 'http://blog.roblayton.com'
    }, {
      'title': 'Github',
      'link': 'https://github.com/roblayton'
    }, {
      'title': 'LinkedIn',
      'link': 'http://www.linkedin.com/in/roblayton'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
