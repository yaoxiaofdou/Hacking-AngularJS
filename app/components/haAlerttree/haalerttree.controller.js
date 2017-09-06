define([
    'app',
    '../../js/directive/qsAlertTree/qsalerttree.js'
], function(app) {
    'use strict';
    app.controller("haalerttree.controller",["$scope",function($scope){
        
        $scope.qsurl = '/data/provinces.json';
        $scope.modelArr = [100402];

        $scope.treecallback = function(data){
            console.log(data)
        }

    }])
});