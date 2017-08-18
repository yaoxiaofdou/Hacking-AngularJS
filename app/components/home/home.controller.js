define([
    'app'
], function(app) {
    'use strict';
    app.controller('homeController',['$scope',function($scope){
       
        $scope.home = '这是home页面';

    }])

});