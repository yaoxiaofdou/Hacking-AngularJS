/*************************************
*    create by xiaofeng.yao
*    email 871213171@qq.com
*    time 2017.08.17
*    description 主路由文件
*    path /Users/apple/angular/angularjs-template-AMD/app/js/router/main.router.js
*************************************/
define([
    'angular',
    'angularAMD',

    // 主页
    '../../components/home/home.router'

  ], function (angular, angularAMD) {
  
    var registerRoutes = function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');
        /**
         *  路由配置
         */
        $stateProvider
            // 容器页
            .state("index", angularAMD.route({
                url: "/index",
                templateUrl: "components/wrapper.html",
                controllerUrl: "components/wrapper.controller.js",
                controller:'wrapperController'
            }))
            // 登录页
            .state("index.login", angularAMD.route({
                url: "/login",
                templateUrl: "components/login/login.html",
                controllerUrl: "components/login/login.controller.js",
                controller:'loginController'
            }))
            // 主页
            .state("index.home", angularAMD.route({
                url: "/home",
                templateUrl: "components/home/home.html",
                controllerUrl: "components/home/home.controller.js",
                controller:'homeController'
            }))
    };
  
    return registerRoutes;
  });
  