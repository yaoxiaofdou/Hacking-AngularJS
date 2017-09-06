/**
 *      create by xiaofeng.yao
 *      time 2017.06.12
 *      组件名：块删除input框
 *      功能描述: 本组件可以实现"块"删除input里的内容
 *      例如： input value的内容为  one,two,three,four
 *            用户再当前input 框适用删除键就会根据用户的鼠标focus位置，来删除当前的那个内容，例如我要删除three,只要鼠标focus
 *            在three左右的两个逗号之内，点击删除键就会删除掉three,键盘的其他键位已经全部屏蔽。
 *
 *         <input type="text"
 *                qs-block-delete-input
 *                ng-model="vm.qsData" />         //  ng-model 传入的数据源，也是最终获取的数据源，提交表单时获取这个model
 *
 *      数据源案例 ： vm.qsData = [
 *                      { id:1024001, name:'zhangsan'},
 *                      { id:1024002, name:'lisi' },
 *                      { id:1024003, name:'wangwu'},
 *                  ];
 *
 **/
define([
    'app',
], function (app) {
    angular.module('qsBlockDeleteInput', [])
        .directive('qsBlockDeleteInput',['$parse',function($parse) {
            return {
                templateUrl:'js/directive/qsBlockDeleteInput/qsBlockDeleteInput.html',
                restrict:'EA',
                replace:true,
                transclude:true,
                scope: {
                    'ngModel':'='
                },
                link: function(scope, element, attrs) {

                    // 保存input框里的字符串
                    scope.blockDeleteInputDisp = '';

                    // 保存对应的index下标
                    scope.strIndex = '';
                    scope.idIndex = '';

                    // 监听当前传入的值，理论上要判断是否是值是否不同
                    scope.$watch('ngModel', function(newVal, oldVal) {
                        setInputTXT(newVal);
                    });

                    // 通过获取到的传输值，设置input内容框的数据
                    // 功能得实现因该是：1.根据操作去修改id，然后在根据id去修改input显示的文字。
                    function setInputTXT(txtobj){
                        // 先清空
                        scope.blockDeleteInputDisp = '';
                        // 再遍历添加字符串
                        angular.forEach(txtobj,function(item,index){
                            // 对应的名字拼接成字符串，这边可以修改，最终的显示因该是根据id来设置页面显示的内容
                            scope.blockDeleteInputDisp += item.name+',';
                        });
                        //console.log(scope.blockDeleteInputDisp)
                    }

                    // 清空
                    scope.clearInputValue = function(){
                        //console.log(scope.$parent);
                        // 清空input
                        scope.blockDeleteInputDisp = '';
                        // 清空ngmodel
                        scope.ngModel = [];
                        //console.log(scope.blockDeleteInputDisp)
                    };

                    //单行文本框
                    function getPositionForInput(ctrl){
                        var CaretPos = 0;
                        if (document.selection) { // IE Support
                            ctrl.focus();
                            var Sel = document.selection.createRange();
                            Sel.moveStart('character', -ctrl.value.length);
                            CaretPos = Sel.text.length;
                        }else if(ctrl.selectionStart || ctrl.selectionStart == '0'){// Firefox support
                            CaretPos = ctrl.selectionStart;
                        }
                        return (CaretPos);
                    }

                    // 设置光标位置函数
                    function setCursorPosition(ctrl, pos){
                        if(ctrl.setSelectionRange){
                            ctrl.focus();
                            ctrl.setSelectionRange(pos,pos);
                        }else if (ctrl.createTextRange) {
                            var range = ctrl.createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', pos);
                            range.moveStart('character', pos);
                            range.select();
                        }
                    }

                    // 获取当前input框里，光标的位置
                    function getTxt1CursorPosition(){
                        var oTxt1 = document.getElementById("qs-blockDeleteInput");
                        var cursurPosition=-1;
                        var index = ''; // 保存当前的位置
                        if(oTxt1.value){
                            if(oTxt1.selectionStart){//非IE浏览器
                                cursurPosition= oTxt1.selectionStart;
                            }else{//IE
                                var range = document.selection.createRange();
                                range.moveStart("character",-oTxt1.value.length);
                                cursurPosition=range.text.length;
                            }
                            index = cursurPosition;
                        }else{
                            console.log('value为空')
                        }
                        return index
                    }

                    // 屏蔽键
                    scope.clearDeleteEvent = function(){
                        var k=window.event.keyCode;

                        if(k == 8){
                            window.event.keyCode=0;
                            window.event.returnValue=false;
                            // 删除事件
                            keyDeleteFun();

                            return false;
                        }else{
                            // 屏蔽所有的按键
                            window.event.keyCode=0;
                            window.event.returnValue=false;
                            return false;
                        }

                    };

                    // 删除事件
                    function keyDeleteFun(){
                        //console.log('我现在点击了删除了')
                        var Cursor = getTxt1CursorPosition();
                        //console.log('鼠标位置位于',Cursor);

                        var str = scope.blockDeleteInputDisp;

                        // 删除对应的数据，会返回一个新的数据字符串
                        scope.blockDeleteInputDisp = keyDeleteSubObj.delete(Cursor,str);

                    }

                    /**
                     *   点击删除的对应操作
                     *   delete最终返回一个删除块后的新字符串
                     *
                     **/
                    var keyDeleteSubObj = {
                        delete:function(Cursor,str){
                            // 获取左边最后一个逗号的坐标
                            var str_left = keyDeleteSubObj.strLeftFun(str.substr(0,Cursor));
                            // 获取右边最后一个逗号的坐标
                            var str_right = keyDeleteSubObj.strRightFun(Cursor,str.substr(Cursor));
                            // 在ngModel中删除对象数据
                            keyDeleteSubObj.deleteModelArr(str.substr(str_left+1,str.indexOf(',')+1));
                            // 获取删除后的左边字符串
                            var str1 = str.substr(0,str_left);
                            // 获取删除后的右边字符串
                            var str2 = str.substr(str_right);

                            // 最后拼接删除后的字符串,返回,并且校验现在的字符串格式
                            var str3 = keyDeleteSubObj.changeIfStr(str1 + str2);

                            return str3
                        },
                        deleteModelArr:function(obj){
                            var name = obj;
                            if(obj.search(/,/i) != -1){
                                name = obj.substr(0,obj.search(/,/i));
                            }
                            // 在ngModel中删除对象数据
                            angular.forEach(scope.ngModel,function(item,index){
                                if(item.name == name){
                                    scope.ngModel.splice(index, 1);
                                }
                            });
                        },
                        strLeftFun:function(strleft){
                            // 对光标左边的字符串进行赛选,返回最后一个逗号的坐标
                            var lastindex = strleft.lastIndexOf(',');

                            return lastindex;
                        },
                        strRightFun:function(index,strright){
                            // 对光标右边的字符串进行赛选,返回首个逗号的坐标
                            var firstindex = index + strright.indexOf(',');

                            return firstindex;
                        },
                        changeIfStr:function(str){
                            // 作用：判断新的字符串是否需要格式化一下，去除多余的逗号。
                            var newStr = '';

                            // 第一种判断：解决第一位是逗号
                            if(str.indexOf(',') == 0){
                                str = str.substr(1);
                                //console.log(str)
                            }

                            // 第二种判断：最后就剩一个逗号，则清空字符串
                            if(str.length == 1){
                                str = '';
                            }

                            newStr = str;

                            return newStr

                        }
                    }

                }
            }
        }]);
});
