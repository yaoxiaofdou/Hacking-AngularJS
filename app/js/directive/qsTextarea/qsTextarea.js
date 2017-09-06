/**
 *      create by xiaofeng.yao
 *      time 2017.06.26
 *      组件名：qs富文本框
 *
 *      功能描述: 封装好的富文本输入框。
 *
 *      页面引用组件：
 *          controller头部引入：'js/directive/qsTextarea/qsTextarea'
 *          html引入：
 *         <qs-textarea
 *                  ng-model="loadObjimg"   // ng-model 传入的数据源，也是最终获取的数据源，提交表单时获取这个model
 *                  require="textTest"      // 是否开启空值检测   接收boolean ,true 开启，false关闭
 *                  config="options"        // 对富文本框的配置信息
 *                  placeholder=""          // 接收一个默认信息显示
 *         ></qs-textarea>
 *
 *      注：如果没有传入配置，则默认开启富文本的全部功能按钮。
 *      options =  {
 *           height: 300,
 *           toolbar: [
 *               ['edit',['undo','redo']],
 *               ['headline', ['style']],
 *               ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
 *               ['fontface', ['fontname']],
 *               ['textsize', ['fontsize']],
 *               ['fontclr', ['color']],
 *               ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
 *               ['height', ['height']],
 *               ['table', ['table']],
 *               ['insert', ['link','picture','video','hr']],
 *               ['view', ['fullscreen', 'codeview']],
 *               ['help', ['help']]
 *           ]
 *       };
 *
 *      注：
 *          本插件调用图片后会直接把图片上传到启尚图片服务器，之后在获取显示url。
 *
 *          // 启尚图片服务器  上传地址
 *                   http://220.160.111.78:59459/file/upload/fileupload.do
 *
 *          // 启尚图片服务器  引用地址
 *                  http://220.160.111.78:59459/file/download/downloadFile.do?filePath=/ISSActive/iss_ActiveDetail/1.jpg
 *
 **/

define([
    'app',
    'summernote',
    'angularSummernote'
], function (app) {
    angular.module('qsTextarea', [])
    .directive('qsTextarea', ['$parse', function ($parse) {
        return {
            templateUrl: 'js/directive/qsTextarea/qsTextarea.html',
            //template:function(){
            //    var template = '<div class="qsTextarea">'+
            //        '<!-- 富文本编辑器 -->'+
            //        '<summernote on-image-upload="imageUpload(files)" ng-model="ngModel" config="config" focus>'+
            //        '<!--<span style="font-weight: bold;">This is initial text.</span>-->'+
            //        '</summernote>'+
            //        '<!--'+
            //        '    详细使用介绍地址：'+
            //        '    https://github.com/summernote/angular-summernote#demo'+
            //        '-->'+
            //    '</div>';
            //
            //    return template
            //},
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                'ngModel': '=',
                'require':'=?',
                'config': '=?',
                'placeholder':'=?'
            },
            controller:function($scope, $element){

                // 默认配置
                if(!$scope.config){
                    $scope.config = {
                        height: 300,
                        toolbar: [
                            ['edit',['undo','redo']],
                            ['headline', ['style']],
                            ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                            ['fontface', ['fontname']],
                            ['textsize', ['fontsize']],
                            ['fontclr', ['color']],
                            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                            ['height', ['height']],
                            ['table', ['table']],
                            ['insert', ['link','picture','video','hr']],
                        ]
                    };
                }

                // 防止有传对象，没传toolbar,除非有传toolbar,否则一律设置成这段配置。
                if(!$scope.config.toolbar){
                    $scope.config = {
                        height: $scope.config.height || 300,
                        toolbar: [
                            ['edit',['undo','redo']],
                            ['headline', ['style']],
                            ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                            ['fontface', ['fontname']],
                            ['textsize', ['fontsize']],
                            ['fontclr', ['color']],
                            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                            ['height', ['height']],
                            ['table', ['table']],
                            ['insert', ['link','picture','video','hr']],
                        ]
                    };
                }
                console.log($scope.config)

            },
            link: function (scope, element, attrs) {

                // 确定是否require， 可以确定是否开启表单验证.
                scope.requireChange = false;
                var unbindWatcher = function(){};
                scope.$watch('require',function(newV,oldV){
                    // console.log(newV);
                    if(scope.require){
                        unbindWatcher = scope.$watch('ngModel',function(newVal,oldVal){
                            if(newVal == ''){
                                // console.log('true',newVal);
                                scope.requireChange = true;
                            }else{
                                // console.log('false',newVal);
                                scope.requireChange = false;
                            }
                        })
                    }else{
                        unbindWatcher();
                        scope.requireChange = false;
                    }
                });


                // 图片上传方法
                scope.imageUpload = function (files) {

                    // 启尚图片服务器地址
                    var url = 'http://220.160.111.78:59459/file/upload/fileupload.do';

                    // http://220.160.111.78:59459/file/download/downloadFile.do?filePath=/ISSActive/iss_ActiveDetail/1.jpg

                    // 多文件上传
                    angular.forEach(files, function (item, index) {
                        saveImg(item, url)
                    });

                };

                function saveImg(img, url) {
                    var data = new FormData();
                    data.append("file", img);
                    data.append("fileSource", "ISSActive");
                    data.append("saveDirectory", "/iss_ActiveDetail");

                    $.ajax({
                        data: data,
                        type: "POST",
                        url: url,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            console.log(data)
                            var imgurl = 'http://220.160.111.78:59459/file/download/downloadFile.do' + '?filePath=/' + data.result[0].fileSource + data.result[0].filePath + '/' + data.result[0].fileName;
                            // editor$.insertImage(scope.editable,imgurl);
                            // scope.editor.summernote('insertImage', imgurl, data.result[0].fileName);
                            scope.editor.summernote('editor.insertImage', imgurl);
                        },
                        error: function () {
                            alert('上传失败')
                        }
                    })
                }

            }
        }
    }])
});