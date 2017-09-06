/**
 *      create by xiaofeng.yao
 *      time 2017.07.05
 *      组件名：启尚时间选择器
 *      功能描述: 本组件可以获取 年月日 时分秒
 *
 *          页面引用：
 *              <qs-datetimepicker ng-model="date" option="options"></qs-datetimepicker>
 *
 *          //  ng-model 传入的数据源，也是最终获取的数据源，提交表单时获取这个model
 *
 *          options = {
 *              format:'',
 *          }
 *
 *          //  option 的默认配置
 *          options = {
 *              format : 'YYYY-MM-DD HH:mm:ss',
 *              minDate: new Date(),
 *              maxDate: new Date()
 *          }
 *
 *          demo1 (传入默认参数):
 *                      $scope.date = '2017-07-13 10:33';
 *                 传入的月份要是双位，单位数月份补 0
 *
 *          demo2 (仅获取 年 月 日):
 *                      $scope.options = {
 *                          format : 'YYYY-MM-DD'
 *                      };
 *
 *          demo3 (获取 年 月 日 时 分):
 *                      $scope.options = {
 *                          format : 'YYYY-MM-DD HH:mm:ss'
 *                      };
 *
 *
 **/
angular.module('qsDatetimepicker',[]);
angular.module('qsDatetimepicker').directive('qsDatetimepicker',['$parse',function($parse) {
    return {
        templateUrl:'js/directive/qsDateTimePicker/qsDatetimepicker.html',
        restrict:'EA',
        replace:true,
        transclude:true,
        scope: {
            'qsModel':'=ngModel',
            'qsOptions':'=option'
        },
        link: function(scope, element, attrs) {

            // 设置默认配置参数
            scope.qsOptions ? scope.options = scope.qsOptions : scope.options = {
                format:'YYYY-MM-DD HH:mm',
                showClear: true    // 显示删除按钮
            };

            // 加载判断有没有传入默认值，执行默认设置。
            setDefalutDate(scope.options.format);

            scope.timer = scope.qsModel || '';

            /**
             *  监听当前改变的时间
             **/
            scope.$watch('date', function(newV, oldV) {
                if (newV !== oldV) {
                    scope.qsModel = settingTimer(newV);
                }
            });

            // 父级传递过来的进行监听
            scope.$parent.$watch(attrs.ngModel,function(newV, oldV){
                if (newV !== oldV) {
                    if(newV==''){
                        scope.date = undefined;
                    }else{
                        scope.date = newV;
                    }
                    // console.log(scope.date)
                }
            });

            // 加载判断有没有传入默认值，执行默认设置。
            function setDefalutDate(format){
                if(format == 'YYYY-MM-DD'){
                    element.datetimepicker({
                        format: 'YYYY-MM-DD',
                        defaultDate: scope.qsModel
                    });
                }else{
                    element.datetimepicker({
                        format: 'YYYY-MM-DD HH:mm:ss',
                        defaultDate: scope.qsModel
                    });
                }
            }

            // 格式化获取的时间
            function settingTimer(date){
                // date没有数据则返回
                if(!date){
                    return false
                }
                // console.log(date.format('YYYY-MM-DD HH:mm'))
                // 仅显示 年 月 日
                if (scope.options.format === 'YYYY-MM-DD') {
                    return date.format('YYYY-MM-DD')
                } else if (scope.options.format === 'YYYY-MM-DD HH:mm:ss') {
                    return date.format('YYYY-MM-DD HH:mm:ss')
                } else{
                    // 仅显示 年 月 日 时 分 秒
                    return date.format('YYYY-MM-DD HH:mm')+':00'
                }
            }

            // 禁止输入文本
            scope.disabledSetTxt = function(){
                window.event.keyCode=0;
                window.event.returnValue=false;
                return false;
            }

        }
    }
}]);
