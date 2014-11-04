'use strict';

angular.module('roblaytonComApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('skills', {
        url: '/skills',
        templateUrl: 'app/skills/skills.html',
        controller: 'SkillsCtrl'
      });
  });