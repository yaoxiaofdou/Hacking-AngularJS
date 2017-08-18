/*************************************
*    create by xiaofeng.yao
*    email 871213171@qq.com
*    time 
*    description 
*    component home > router
*    path /Users/apple/angular/angularjs-template-AMD/app/components/home/home.router.js
*************************************/
define([
    'angularAMD',
    'config'
], function (angularAMD, app) {
    app.provider('homeRouter', function ($stateProvider) {
        this.$get = function () {

            var service, 
                CURRENT_PATH = 'components/home/module/';

            service = {
                'setRouter': function () {
                    $stateProvider
                        .state('index.home.demo1', angularAMD.route({
                            'url': '/demo1',
                            'templateUrl': CURRENT_PATH + 'demo1/demo1.html',
                            'controllerUrl': CURRENT_PATH + 'demo1/demo1.controller.js',
                            'controller': 'demo1.controller'
                        }))
                        .state('index.home.demo2', angularAMD.route({
                            'url': '/demo2',
                            'templateUrl': CURRENT_PATH + 'demo2/demo2.html',
                            'controllerUrl': CURRENT_PATH + 'demo2/demo2.controller.js',
                            'controller': 'demo2.controller'
                        }))
                }
            }

            return service;
        };
    }).run(function (homeRouter) {
        homeRouter.setRouter();
    });
});