/*************************************
*    create by xiaofeng.yao
*    email 871213171@qq.com
*    time 2017.09.05
*    component nav
*    path /Users/apple/angular/Hacking-AngularJS/app/components/nav/nav.controller.js
*************************************/
define([
    'app',
], function (app) {
    angular.module('haNav', [])
        .directive('haNav', ['$http',function ($http) {
            return {
                templateUrl: 'js/directive/nav/nav.html',
                restrict: 'EA',
                replace: true,
                transclude: true,
                scope: {
                    'haData':'=',      //  数据源 可以接收
                },
                link: function(scope, element, attrs){

                    scope.handleChangeNav = function(nav){
                        clearClass(scope.haData);
                        nav.isActive = true;
                    }

                    // 清除样式
                    function clearClass(arr){
                        angular.forEach(arr,function(item,index){
                            item.isActive = false;
                        })
                    }
                    
                }
            }
        }])

        let add = (...num)=>{
            let sum = 0;
            var count = (arr) => {
                arr.forEach((item,index)=>{ 
                    sum += item;
                })
                return sum;
            }
            count(num);
            var allsum = function(...num2){
                count(num2)
                return allsum
            }

            allsum.valueOf = function(){
                return sum
            }

            return allsum

        }
        
        console.log(add(1,2,2)(3)(3))



});