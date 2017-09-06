/*************************************
*    create by xiaofeng.yao
*    email 871213171@qq.com
*    path /Users/apple/angular/angularjs-template-AMD/app/components/wrapper.controller.js
*************************************/
define([
    'app',
    '../js/directive/nav/nav.js'
], function (app) {
    'use strict';
    app.controller('wrapperController', ['$scope','$http',function ($scope,$http) {
    
        $http.get("/data/menu.json").then(function(res){
            $scope.haNavData = res.data;
        })


    }])
});