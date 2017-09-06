/*************************************
*    create by xiaofeng.yao
*    email 871213171@qq.com
*    component hablockinput > router
*************************************/
define([
    'angularAMD',
    'config'
], function (angularAMD, app) {
    app.provider('blkinputRouter', function ($stateProvider) {
        this.$get = function () {

            var service, 
                CURRENT_PATH = 'components/haBlockinput/';

            service = {
                'setRouter': function () {
                    $stateProvider
                        .state('index.haBlockinput', angularAMD.route({
                            'url': '/haBlockinput',
                            'templateUrl': CURRENT_PATH + 'hablockinput.html',
                            'controllerUrl': CURRENT_PATH + 'hablockinput.controller.js',
                            'controller': 'hablockinput.controller'
                        }))
                }
            }

            return service;
        };
    }).run(function (blkinputRouter) {
        blkinputRouter.setRouter();
    });
});