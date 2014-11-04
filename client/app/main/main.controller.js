'use strict';

angular.module('roblaytonComApp')
.controller('MainCtrl', function ($scope, $http, socket, Auth) {
    $scope.newSkill = '';
    $scope.newCategory = '';
    $scope.skillStatus = {};

    $http.get('/api/skills').success(function(skills) {
        $scope.skills = skills;
        socket.syncUpdates('skill', $scope.skills);

        buildSkillStatus();
    });

    function buildSkillStatus() {
        // Hacky as shit
        for (var i = 0, len = $scope.skills.length; i < len; i++) {
            $scope.skillStatus[$scope.skills[i]._id] = {
                isopen: false,
    category: $scope.skills[i].category
            };
        }
    };

    $http.get('/api/categories').success(function(categories) {
        $scope.categories = categories;
        socket.syncUpdates('category', $scope.categories);
    });

    $scope.$on('$destroy', function() {
        socket.unsyncUpdates('skill');
    });

    $scope.deleteSkill = function(skill) {
        $http.delete('/api/skills/' + skill._id);
    };

    $scope.addSkill = function() {
        $http.post('/api/skills', { name: $scope.newSkillName, proficiency: $scope.newProficiency, category: $scope.selectedCategory._id }).success(function(data, status, headers, config) {

            $http.get('/api/skills').success(function(skills) {
                $scope.skills = skills;
                socket.syncUpdates('skill', $scope.skills);

                buildSkillStatus();
            });
        });
        $scope.newSkill = '';

        buildSkillStatus();
    };

    $scope.updateSkill = function(skill) {
        console.log('Updating skill: ' + skill.category._id);
        $http.put('/api/skills/' + skill._id, {name: skill.name, proficiency: skill.proficiency, category: $scope.skillStatus[skill._id].category._id});
    };

    $scope.addCategory = function() {
        $http.post('/api/categories', { name: $scope.newCatName, type: 'skill'});
        $scope.newCategory = '';
    };

    $scope.deleteCategory = function(category) {
        $http.delete('/api/categories/' + category._id);
    };

    $scope.updateCategory = function(category) {
        console.log('Updating category: ' + category._id + ':' + category.name);
        $http.put('/api/categories/' + category._id, {name: category.name});
    };

    $scope.isLoggedIn = function() {
        return Auth.isLoggedIn();
    };

    // Dropdown menu
    $scope.status = {
        isopen: false
    };

    $scope.setCategory = function(category) {
        $scope.selectedCategory = category;
    };

    $scope.setSkillCategory = function(skill, category) {
        $scope.skillStatus[skill._id].category = category;
    };
});
