/*************************************
*    create by xiaofeng.yao
*    email 871213171@qq.com
*    time 2017.08.16
*    description requireJS 路由与依赖关系配置
*    path /Users/apple/angular/angularjs-template-AMD/app/main.js
*************************************/

require.config({
    // baseUrl: "", // 默认文件路径
    paths: {
        'angular': './asset/angular/angular.min',
        'angular-ui-router': './asset/angular-ui-router/release/angular-ui-router.min', // 0.4.2 --0.3.2有bug
        'angularAMD': './asset/angularAMD/angularAMD.min',// 0.2.1
        'ngload': './asset/angularAMD/ngload.min',
        'ngAnimate': './asset/angular-animate/angular-animate.min',  // 1.6.1
        'ui-bootstrap': './asset/angular-bootstrap/ui-bootstrap-tpls.min', // 2.4.0
        'angular-loading-bar': './asset/angular-loading-bar/build/loading-bar.min', // 0.9.0
        'jquery': 'asset/jquery/dist/jquery.2.2.4.min', // jq 2.2.4
    },
    shim: {
        'angular': {
            'exports': 'angular',
            'deps': ['']
        },
        'jquery': {'exports': 'jquery'},
        'angularAMD': ['angular'],
        'angular-ui-router': ['angular'],
        'ngload': ['angularAMD'],
        'ngAnimate': ['angular'],
        'ui-bootstrap': ['angular', 'ngAnimate'],
        'angular-loading-bar': ['angular'],
    },
    deps: ['app']
});