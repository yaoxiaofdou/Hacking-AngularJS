define([
    'app',
], function (app) {

    angular.module('haTable', [])

    .directive('haTable',['$filter',function($filter){
        return {
            templateUrl: 'js/directive/haTable/haTable.html',
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                'qsDisabled':'=?',  //  是否禁用 可选
                'qsData':'=?',      //  数据源 可以接收
                'qsHeader':'=',     //  列表组件的头部，    必须传
                'qsCheckbox':'=?',  //  是否开启复选框      可选
                'qsEdit':'=?',      //  是否开启编辑        可选
                'qsCallback':'=?',  //  保存回调
                'qsModel': '='      //  必须传
            },
            link:function(scope,attr,element,){
                qsListController(scope,attr,element,$filter)
            } 

        }
    }])

    .directive('haTableItem',function(){
        return {
            templateUrl: 'js/directive/haTable/haTableitem.html',
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                'qsDisabled':'=?',    //  是否禁用 可选
                'qsCheckbox':'=?',    //  是否开启复选框     可选
                'qsAllcheckbox':'=?', //  
                'qsHeaderIndex':'=?', //  列表组件头部索引    可选
                'qsEdit':'=?',        //  是否开启编辑       可选
                'qsData':'=',         //  数据源 可以接收
                'qsModel': '='        //  必须传
            },
            link: qsListItemController

        }
    })

    /*
    *   数据控制：数据源 header and data 都接收一串二维数组，每一维度的数据都依次叠加.
    *
    *
    */
    var headerData = [];    // header data


    /*
    *    qsList 控制器
    *    @param scope attr element
    *
    **/
    function qsListController(scope,attr,element,$filter){

        // 数据赋值
        headerData = scope.qsHeader;

        scope.checkedModel = false;

        // console.log($filter('filter')(scope.qsData,'10002'))


    }


    /*
     *    qsList 控制器
     *    @param scope attr element
     *
     **/
    function qsListItemController(scope,attr,element){
        // 获取当前表格头部数据
        scope.qsHeader = headerData[scope.qsHeaderIndex];
        // 造子表格头部索引
        scope.qsHeaderListIndex = scope.qsHeaderIndex + 1;


        /*
        *   单列数据选中
        */
        scope.handleCheckedLi = function(e,bool){

            if(e.children && e.children.length > 0){
                setJsonValueAll(e.children,'isCheckbox',bool);
            }

        }

        /*
        *   全选操作
        */
        scope.handleAllChecked = function(bool,list){

            setJsonValueAll(list,'isCheckbox',bool);

        }



    }

    /**
     *
     *      功能：抽取json树中指定的节点数据(id)(单)
     *      @params: data (数据源)
     *      @params: name (标示)
     *
     **/
    function getJsonValue(data,name){
        var vald = null;
        var valdSwitch = false;
        // 第一层先单独抽
        for(var inde in data){
            if(data[inde]['id'] == name){
                vald = data[inde];
                valdSwitch = true;
            }
        }
        // 第一层没抽到再继续里层
        if(!valdSwitch){
            for(var key in data){
                valloop(data[key],name)
            }
            function valloop(arr,name){
                if(arr.children && arr.children.length > 0){
                    for(var i=0;i<arr.children.length;i++){
                        if(arr.children[i].id == name){
                            vald =  arr.children[i]
                        }
                        valloop(arr.children[i],name)
                    }
                }
            }
        }

        return vald
    }

    /**
     *
     *      功能：设定json树中指定的节点指定数据(群)
     *      @params: data (数据源)
     *      @params: name (指定数据)
     *      @params: bool (状态)
     *
     **/
    function setJsonValueAll(data,name,bool){
        for(var key in data){
            valloop(data[key],name,bool)
        }
        function valloop(arr,name,bool){
            // 最后一层   这边直接设置需要全json加入的数据
            arr[name] = bool;
            if(arr.children && arr.children.length > 0){
                for(var i=0;i<arr.children.length;i++){
                    valloop(arr.children[i],name,bool)
                }
            }
        }
    }


});