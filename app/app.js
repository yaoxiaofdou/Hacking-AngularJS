/*************************************
*    create by xiaofeng.yao
*    email 871213171@qq.com
*    time 2017.08.17
*************************************/

define([
    'common',
    'js/router/main.router',
    'config'
  ], function (angularAMD,registerRoutes,app) {
  
    app.constant("project", {"projectName" : "angularJs-AMD-demo"});
    // app.config(function (RestangularProvider, project) {
    //   // RestangularProvider.setBaseUrl('http://localhost:3001');
    //   // RestangularProvider.setBaseUrl('http://localhost:8080/qishon-iss-web/rest/');
    //   // RestangularProvider.setBaseUrl('http://1.1.20.9:3000/api');
    //   RestangularProvider.setBaseUrl(window.location.protocol + '//' + window.location.host + '/'+project.projectName+'/');
    // });
  
    // 加载条设置
    // app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    //   cfpLoadingBarProvider.includeSpinner = true;
    // }]);
  
    /**
     * 路由配置
     * 根路由： components/wrapper.router.js
     */
    app.config(['$stateProvider', '$urlRouterProvider', registerRoutes]);
  
    /**
     * 解决 angular 1.6.1 与 ui router 默认的# 变为 #！的bug
     */
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
  
    return angularAMD.bootstrap(app);
  });
  