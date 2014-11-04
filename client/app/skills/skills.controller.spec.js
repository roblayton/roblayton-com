'use strict';

describe('Controller: SkillsCtrl', function () {

  // load the controller's module
  beforeEach(module('roblaytonComApp'));

  var SkillsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SkillsCtrl = $controller('SkillsCtrl', {
      $scope: scope
    });
  }));

});
