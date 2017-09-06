/*************************************
*    create by xiaofeng.yao
*    email 871213171@qq.com
*    component haalerttree > router
*************************************/
define([
    'angularAMD',
    'config'
], function (angularAMD, app) {
    app.provider('adstreeRouter', function ($stateProvider) {
        this.$get = function () {

            var service, 
                CURRENT_PATH = 'components/haAlerttree/';

            service = {
                'setRouter': function () {
                    $stateProvider
                        .state('index.haAlerttree', angularAMD.route({
                            'url': '/haAlerttree',
                            'templateUrl': CURRENT_PATH + 'haalerttree.html',
                            'controllerUrl': CURRENT_PATH + 'haalerttree.controller.js',
                            'controller': 'haalerttree.controller'
                        }))
                }
            }

            return service;
        };
    }).run(function (adstreeRouter) {
        adstreeRouter.setRouter();
    });
});