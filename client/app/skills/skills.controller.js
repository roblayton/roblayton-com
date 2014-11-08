'use strict';

angular.module('roblaytonComApp')
  .controller('SkillsCtrl', function ($scope, $http, socket, Auth) {

    // ===================================
    // Making sure the user is logged in
    // ===================================
    $scope.isLoggedIn = function() {
        return Auth.isLoggedIn();
    };

    // ===================================
    // Getting disciplines and skills
    // ===================================
    $http.get('/api/disciplines').success(function(disciplines) {
        $scope.disciplines = disciplines;
        socket.syncUpdates('discipline', $scope.disciplines);
    });

    $http.get('/api/skills').success(function(skills) {
        $scope.skills = skills;
        socket.syncUpdates('skill', $scope.skills);
    });

    // ===================================
    // Creates
    // ===================================
    $scope.addSkill = function() {
        $http.post('/api/skills', { name: $scope.newSkillName, proficiency: $scope.newProficiency});
    };

    $scope.addDiscipline = function() {
        $http.post('/api/disciplines', { name: $scope.newDisciplineName, type: $scope.newDisciplineType, info: $scope.newDisciplineInfo});
    };

    // ===================================
    // Deletes
    // ===================================
    $scope.deleteDiscipline = function(discipline) {
        $http.delete('/api/disciplines/' + discipline._id).success(function() {
            $http.get('/api/disciplines').success(function(disciplines) {
                $scope.disciplines = disciplines;
                socket.syncUpdates('discipline', $scope.disciplines);
            });
        });
    };

    $scope.deleteSkill = function(skill) {
        $http.delete('/api/skills/' + skill._id).success(function() {
            $http.get('/api/disciplines').success(function(disciplines) {
                $scope.disciplines = disciplines;
                socket.syncUpdates('discipline', $scope.disciplines);
            });
        });
    };

    // ===================================
    // Updates
    // ===================================
    $scope.updateDiscipline = function(discipline) {
        $http.put('/api/disciplines/' + discipline._id, {name: discipline.name, type: discipline.type, info: discipline.info}).success(function() {
            $http.get('/api/disciplines').success(function(disciplines) {
                $scope.disciplines = disciplines;
                socket.syncUpdates('discipline', $scope.disciplines);
            });
        });
    };

    $scope.attachSkill = function(discipline, skill) {
        $http.put('/api/disciplines/' + discipline._id + '/attach/' + skill._id).success(function(disciplines) {
        $scope.disciplines = disciplines;
        socket.syncUpdates('discipline', $scope.disciplines);
      });
    };

    $scope.detachSkill = function(discipline, skill) {
        $http.put('/api/disciplines/' + discipline._id + '/detach/' + skill._id).success(function(disciplines) {
        $scope.disciplines = disciplines;
        socket.syncUpdates('discipline', $scope.disciplines);
     });
    };

    $scope.updateSkill = function(skill) {
        $http.put('/api/skills/' + skill._id, {name: skill.name, proficiency: skill.proficiency}).success(function() {
            $http.get('/api/disciplines').success(function(disciplines) {
                $scope.disciplines = disciplines;
                socket.syncUpdates('discipline', $scope.disciplines);
            });
        });
    };

    // Accordion
    

  });
