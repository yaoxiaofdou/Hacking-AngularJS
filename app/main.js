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
        'ngload': 'asset/angularAMD/ngload.min',
    },
    shim: {
        'angular': {
            'exports': 'angular',
            'deps': ['']
        },
        'angularAMD': ['angular'],
        'ngload': ['angularAMD'],
        'angular-ui-router': ['angular']
    },
    deps: ['app']
});