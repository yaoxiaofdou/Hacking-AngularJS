define([
    'app',
    '../../js/directive/qsBlockDeleteInput/qsBlockDeleteInput.js'
], function(app) {
    'use strict';
    app.controller("hablockinput.controller",["$scope",function($scope){
        
        $scope.qsData = [
            { id:1024001, name:'zhangsan'},
            { id:1024002, name:'lisi' },
            { id:1024003, name:'wangwu'},
            { id:1024004, name:'zhouchang'},
        ];

        $scope.modelData = function(){
            $scope.qsData = [
                { id:1024001, name:'zhangsan'},
                { id:1024002, name:'lisi' },
                { id:1024003, name:'wangwu'},
                { id:1024004, name:'zhouchang'},
            ];
        }

    }])
});