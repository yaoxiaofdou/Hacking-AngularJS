/*************************************
*    create by xiaofeng.yao
*    email 871213171@qq.com
*    component hablockinput > router
*************************************/
define([
    'angularAMD',
    'config'
], function (angularAMD, app) {
    app.provider('hatableRouter', function ($stateProvider) {
        this.$get = function () {

            var service, 
                CURRENT_PATH = 'components/haTable/';

            service = {
                'setRouter': function () {
                    $stateProvider
                        .state('index.haTable', angularAMD.route({
                            'url': '/haTable',
                            'templateUrl': CURRENT_PATH + 'haTable.html',
                            'controllerUrl': CURRENT_PATH + 'haTable.controller.js',
                            'controller': 'haTable.controller'
                        }))
                }
            }

            return service;
        };
    }).run(function (hatableRouter) {
        hatableRouter.setRouter();
    });
});