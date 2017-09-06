/**
 *      create by   xiaofeng.yao
 *      time        2017.08.07
 *      组件名：     启尚-弹窗树
 *
 *
 *      调用方法：<qs-alert-tree
 *                  ng-model="modelArr"             <------------    最终接收数据的model        必须
 *                  qs-callback="treecallback"      <------------    确定选择后的回掉           可选
 *                  qs-url="qsurl"                  <------------    传入的数据url              可选
 *                  qs-treeinit="treeinit"          <------------    组件加载完事件             可选
 *                  qs-data="alertData"             <------------    传入的数据源               可选
 *                  qs-disabled="qsdisabled"        <------------    传入的是否禁用             可选   接收 boolean
 *              ></qs-alert-tree>
 *
 *      // 模拟URL
 *                 $scope.qsurl = '/data/provinces.json';
 *
 *      // 保存回调事件
 *                 $scope.treecallback =  fucntion(data){
 *                      console.log(data)
 *                 }
 *
 *
 *      // 模拟页面请求完传递数据给组件
 *                 $http.get('data/provinces.json').then(function (response) {
 *                      //获取到的数组对象
 *                      $scope.alertData = response.data;
 *                      console.log($scope.alertData)
 *                 });
 *
 *
 *
 *      // 案例：控制是否显示国,显示弹窗     ----- 这段要写在 controller
 *              $scope.treeinit = function(data){
 *                console.log(angular.element('.10'))
 *                var oneArr = ['.10','.20'];
 *
 *                angular.forEach(oneArr,function(itemA,indexA){
 *
 *                  angular.element(itemA).find('.qsAlertTree__listPanel__pppp__item__div__checkbox').bind('click',function(e){
 *
 *                    var oneScope = $scope;
 *
 *                    if(angular.element(itemA).scope().country.isChecked){
 *                      SweetAlert.treeAlert({
 *                        title:'您点击了整个国家',
 *                        text:'请确认是否有必要全选整个国家！'
 *                      },function(){
 *
 *                        oneScope.$apply(function(){
 *                          angular.element(itemA).scope().country.isChecked = false;
 *                          // 清空子集
 *                          clearListAllSelected(angular.element(itemA).scope().country.children)
 *                        })
 *
 *                        SweetAlert.close()
 *
 *                      })
 *                    }
 *                  });
 *                })
 *              };
 *
 *   //      功能：清除所有list选中效果,清除数据
 *   //       params: list(列表数组)
 *
 *   function clearListAllSelected(list){
 *       angular.forEach(list,function(item,index){
 *           item.isSelected = false;
 *           item.isActive = false;
 *           item.isChecked = false;
 *           if(item.children && item.children.length>0){
 *               clearListAllSelected(item.children)
 *            }
 *        });
 *   }
 *
 */

define([
    'app',
], function (app) {
    angular.module('qsAlertTree', [])
        .directive('qsAlertTree', ['$http',function ($http) {
            return {
                templateUrl: 'js/directive/qsAlertTree/qsalerttree.html',
                restrict: 'EA',
                replace: true,
                transclude: true,
                scope: {
                    'qsDisabled':'=?',  //  是否禁用 可选
                    'qsUrl':'=?',       //  数据获取路径
                    'qsData':'=?',      //  数据源 可以接收
                    'qsCallback':'=?',  //  保存回调
                    'qsTreeinit':'=?',  //  组件加载完事件
                    'ngModel': '='      //  必须传
                },
                link: function(scope, element, attrs){

                    qsAlertTree(scope, element, attrs ,$http)

                }

            }
        }])
        .directive('qsAlertTreeitem', [function () {
            return {
                templateUrl: 'js/directive/qsAlertTree/qsalerttreeitem.html',
                restrict: 'EA',
                replace: true,
                transclude: true,
                scope: {
                    'qsData':'=?',   //  数据源 可以接收
                    'qsModel': '=',   //  必须传
                    'level':'=?'
                },
                link: qsAlertTreeitem,
            }
        }]);

    // 保存当前层级的变量
    var level = 1;
    var qsAlertData = [];
    /*
     *   qsAlertTree controller
     *   这段就是控制整个组件容器的controller
     *
     **/
    function qsAlertTree(scope, element, attrs, $http) {

        // 控制弹窗树显示隐藏开关
        scope.dialogSwitch = false;

        // 临时存储数据
        scope.selectSetting = {
            country:[]
        };

        scope.provincesData = [];

        init();

        // 初始化
        function init(){

            // 判断有qsUrl 则发起http请求
            if(scope.qsUrl){
                $http.get(scope.qsUrl).then(function (response) {
                    defaultInit(response.data)
                });
            }

            // 判断有qsData
            if(scope.qsData && scope.qsData.length >0){
                defaultInit(scope.qsData)
            }

            // 设置数据
            function defaultInit(response){
                // 获取到的数组对象
                scope.provincesData.country = response;
                qsAlertData = scope.provincesData.country;

                // 组件加载完事件
                if(scope.qsTreeinit){
                    var timerInit = setTimeout(function(){
                        scope.qsTreeinit(scope.provincesData.country);
                    },100);
                }

                // 初始化赋值
                if(scope.ngModel.length > 0){

                    var saffTrue = true;

                    // 传入的是数组
                    if(scope.ngModel[0] && typeof scope.ngModel[0] == 'number'){
                        // 初始化赋值 实现
                        angular.forEach(scope.ngModel,function(item,index){
                            // 获取当前地区
                            var tCity = getJsonValue(scope.provincesData.country,item);
                            // 自身选中
                            tCity['isChecked'] = true;
                            // 子集选中
                            setJsonValueAll(tCity.children,'isChecked',saffTrue);
                            // 父级设置半选状态
                            setJsonValueParentId(scope.provincesData.country,'isActive',tCity,saffTrue,'before');
                        });
                    }
                    // 传入的是数组对象
                    if(scope.ngModel[0] && typeof scope.ngModel[0] == 'object'){
                        // 初始化赋值 实现
                        angular.forEach(scope.ngModel,function(item,index){
                            // 获取当前地区
                            var tCity = getJsonValue(scope.provincesData.country,item.id);
                            // 自身选中
                            tCity['isChecked'] = true;
                            // 子集选中
                            setJsonValueAll(tCity.children,'isChecked',saffTrue);
                            // 父级设置半选状态
                            setJsonValueParentId(scope.provincesData.country,'isActive',tCity,saffTrue,'before');
                        });
                    }
                }
            }


        }

        /**
         *   控制弹窗树显示隐藏开关
         *   执行：每次显示都重新获取数据
         **/
        scope.qsAlertTreeHandleShow = function(){
            scope.dialogSwitch =! scope.dialogSwitch;
            // 切换后重置
            level = 1;
            // 判断有没有传入数据，有则不重置数据
            if(scope.dialogSwitch){
                // console.log('重新初始化')
                init();
            }
        };

        /*
         *   保存按钮事件
         *   执行：保存 qsAlertTree 选中的选项 （市）
         *   逻辑：返回保存数据,关闭 qsAlertTree
         **/
        scope.saveqsAlertTree = function(){
            // 返回保存数据
            // 搞出第一级的获取数据
            angular.forEach(scope.provincesData.country,function(ite,ind){
                if(ite.isChecked){
                    uploadArr.push(ite);
                }
            });
            // 继续去搞后几级的数据
            angular.forEach(scope.provincesData.country,function(ite,ind){
                // console.log(qsAlertData);
                filterUploadData(ite);
            });
            // 过滤掉数组里的对象，只留下id
            scope.ngModel = uploadArr;

            // 保存回调
            if(scope.qsCallback){
                scope.qsCallback(scope.ngModel);
            }

            console.log('提交的数据:',scope.ngModel);
            // 清空选中
            uploadArr = [];

            // 清空数组model
            clearListAllSelected(scope.provincesData.country);

            // 关闭 qsAlertTree
            scope.dialogSwitch = false;
        };

        /*
         *   关闭按钮事件
         *   执行：关闭 qsAlertTree
         *   逻辑：关闭不保存数据
         **/
        scope.closeqsAlertTree = function(){
            // 清空选中
            // clearListAllSelected(scope.provincesData.country);
            // 关闭 qsAlertTree
            scope.dialogSwitch = false;
        }

    }

    /*
     *   qsAlertTreeitem controller
     *   这段将会被重复调用，知道组件渲染完成。
     *
     **/
    function qsAlertTreeitem(scope, element, attrs) {

        // 往HTML节点中推入等级数据
        scope.isLevel = level;

        level++;

        // 切换
        scope.handleSetCountry = function(e,item,list){

            // 清除选中效果,item着色
            clearListSelected(list,item);

            // 列表数据切换
            scope.provincesData = item.children;

            // 当前用户点击的层级
            var lev = angular.element(e.currentTarget).attr('data-isLevel');

            // 这里加定时器的原因：
            // dom的操作比监听操作更快
            var levelTimer = setTimeout(function(){
                // 控制动画
                if(lev==1){
                    angular.element('.qsAlertTree__listPanel__pppp__itemPanle').addClass('dialogSum--two');
                    angular.element('.qsAlertTree__listPanel__pppp__itemPanle').removeClass('dialogSum--three dialogSum--four');
                }else if(lev==2){
                    angular.element('.qsAlertTree__listPanel__pppp__itemPanle').addClass('dialogSum--three');
                    angular.element('.qsAlertTree__listPanel__pppp__itemPanle').removeClass('dialogSum--two dialogSum--four');
                }else if(lev==3){
                    angular.element('.qsAlertTree__listPanel__pppp__itemPanle').addClass('dialogSum--four');
                    angular.element('.qsAlertTree__listPanel__pppp__itemPanle').removeClass('dialogSum--two dialogSum--three');
                }
                // console.log(angular.element('.qsAlertTree__listPanel__pppp__itemPanle'));
                // 清除定时器
                clearInterval(levelTimer);
            },10)
        };

        // checkbox 选中事件
        scope.handleItemChecked = function(item,dataArr){
            // console.log('选中事件',item)
            var itemTrue = true;
            var itemFalse = false;

            // 如果是取消选中，就让他的父节点失去焦点
            if(!item.isChecked){

                // 子集去除选中
                setJsonValueAll(item.children,'isChecked',itemFalse);

                // 判断有没有必要去除父级的半选状态
                var sole_i = 0;

                for(var i in dataArr){
                    // console.log('260',dataArr[i]);
                    if(dataArr[i].isChecked){
                        sole_i++;
                    }
                }

                // 功能：设定json树中父节点状态(群)  这边设置是威力解决取消选择后，上级的一些选中状态的去除
                setgetJson(item,itemFalse);

                if(sole_i == 0){
                    // 父级取消半选状态
                    setJsonValueParentId(qsAlertData,'isActive',item,itemFalse,'after');
                }

                // 取消选择后，去除不必要的半选状态
                item['isActive'] = false;
                clearListAllSelected(item.children)

            }else{

                setAllCheckbox(item,dataArr);

                function setAllCheckbox(ited,sold_arr){
                    // console.log(sold_arr)
                    // 判断当前是否已经全选了，全选的话把父节点给选上。
                    var achek = 0;
                    angular.forEach(sold_arr,function(aitem,aindex){
                        if(aitem.isChecked){
                            achek++;
                        }
                    });
                    if(achek == sold_arr.length){

                        if(ited['fdParent']){
                            var ited_item = getJsonValue(qsAlertData,ited['fdParent']);
                            ited_item['isChecked'] = true;
                            ited_item['isActive'] = false;

                            if(ited_item['fdParent']){
                                var ited_fdParentArr = getJsonValue(qsAlertData,ited_item['fdParent']);
                                setAllCheckbox(ited_item,ited_fdParentArr['children']);
                            }

                        }

                    }

                }

                // 这里要判断，但凡有一个选中，父级的isActive选中效果都不能取消
                setFatherSelectedColor(item,dataArr,itemTrue);
                //  去除所有的isActive状态or加上所有的isActive状态
                //  先过滤一次第一层
                angular.forEach(qsAlertData,function(ite,ind){
                    if(ite.id == item.fdParent){
                        ite.isActive = itemTrue;
                    }
                });
                //  点击父级，选中or取消选中所有子集。去除所有的isActive状态or加上所有的isActive状态
                //  过滤二层及二层以下
                itemCheckedTrue(item,itemTrue);
            }
        }
    }

    /**
     *      功能：清除list选中效果,当前item着色
     *      params: list(列表数组) item(着色对象)
     *
     **/
    function clearListSelected(list,item){
        angular.forEach(list,function(ite,ind){
            ite.isSelected = false;
        });
        item.isSelected = true;
    }

    /**
     *      功能：父级着色
     *      params: obj(当前点击对象)
     **/
    function setFatherSelectedColor(obj,dataArr,bool){
        // 这里先对当前点击的列进行遍历，看看是否有全部选中
        var listSwitch = 0;
        angular.forEach(dataArr,function(obj,uid){
            if(obj.isChecked){
                listSwitch++;
            }
        });
        if(bool){

            domSetIsActive(obj)

        }else{
            // 取消选中
            if(obj.fdParent !== null){
                if(listSwitch == 0){
                    angular.element('.'+obj.fdParent).scope().country.isActive = false;
                }else{
                    angular.element('.'+obj.fdParent).scope().country.isActive = true;
                }
            }
        }
    }

    /**
     *      功能：配合父级着色使用，作用是把父节点设置状态
     **/
    function domSetIsActive(obj){
        if(obj.fdParent !== null){
            if(angular.element('.'+obj.fdParent).scope().country !== undefined){

                angular.element('.'+obj.fdParent).scope().country.isActive = true;

                domSetIsActive(angular.element('.'+obj.fdParent).scope().country)

            }else{
                angular.element('.'+obj.id).scope().country.isActive = true;
                return false
            }
        }
    }

    /**
     *      功能：清除所有list选中效果,清除数据
     *      params: list(列表数组)
     **/
    function clearListAllSelected(list){
        angular.forEach(list,function(item,index){
            item.isSelected = false;
            item.isActive = false;
            item.isChecked = false;
            if(item.children && item.children.length>0){
                clearListAllSelected(item.children)
            }
        });
        uploadArr = [];
    }

    /**
     *
     *      功能：根据选中的项，去寻找他的所有children子节点，选中or取消选中
     *      params: obj(需要便利的数组)
     *
     **/
    function itemCheckedTrue(obj,bool){
        if(obj.children && obj.children.length > 0){
            for(var i=0;i<obj.children.length;i++){
                obj.children[i].isChecked = bool;
                itemCheckedTrue(obj.children[i],bool)
            }
        }else{
            return false
        }
    }

    /**
     *
     *      功能：父节点取消选中
     *      params: obj(对比的对象) arr(数据数组)
     *
     **/
    function itemFatherCheckedFalse(obj,arr,itemBool){
        // 这里代表从二级开始都是一种类型，都存在fdParent
        if(arr.children && arr.children.length > 0){
            for(var i=0;i<arr.children.length;i++){
                if(arr.children[i].id == obj.fdParent){
                    arr.children[i].isChecked = itemBool;
                }
                itemFatherCheckedFalse(obj,arr.children[i],itemBool)
            }
        }else{
            return false
        }
    }

    /**
     *      功能：判断对象数组中有没有某个特定对象
     *      返回：boolean
     **/
    function filterUploadArrObject(obj,arr){
        var ssli = false;
        angular.forEach(arr,function(li,li_i){
            if(li.id==obj.id){
                ssli=true;
            }
        });
        return ssli
    }

    /**
     *      功能：过滤出提交的数据
     *
     **/
    var uploadArr = [];     // 存储提交的数据
    function filterUploadData(ite){
        // 逻辑是：判断有没有下一级，并且下一级中有选中的项
        // 这里要做个单独判断，如果第二级都全选中，那么传送国
        if(ite.children && ite.children.length > 0){
            // 计数器
            var itemIndex = 0;
            angular.forEach(ite.children,function(item,index){
                if(item.isChecked){
                    itemIndex++;
                }
                // 判断有没有必要重新去计算
                filterUploadData(item);
            });

            /*
             *   这边要进行一个检测，如果当前ite.children的所有子项都被选中的话，
             *   就提交当前ite.children对象，不提交里面的子集。
             **/
            if(itemIndex !== ite.children.length){
                angular.forEach(ite.children,function(item,index){
                    if(item.isChecked){
                        uploadArr.push(item)
                    }
                });
            }
        }
    }

    /**
     *      功能：数组检测重
     *
     **/
    function arrClear(obj,arr){
        var isgh = true;
        angular.forEach(arr,function(item,index){
            if(item==obj){
                isgh = false;
            }
        });
        return isgh
    }

    /**
     *      功能：判断下一级有没有选中的项
     *
     **/
    function handleChangeItemTrue(arry){
        var arrSwitch = false;
        if(arry.isChecked){
            arrSwitch = true;
        }
        return arrSwitch
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
     *      功能：设定json树中指定的节点指定数据(fdParent)(单)
     *      @params: data (数据源)
     *      @params: name (指定数据)
     *      @params: obj  (需要寻找父亲的节点)
     *      @params: bool (状态)
     *      @params: direction (当前方向，如果数据是从前向后找就是before,反之则是after)
     *
     **/
    function setJsonValueParentId(data,name,obj,bool,direction){

        var timeo = 0;
        var reloid = null;
        var relSwitch = false;

        // 第一层
        for(var inde in data){
            if(data[inde]['id'] == obj['fdParent'] || data[inde]['id'] == obj['id']){
                data[inde][name] = bool;
                relSwitch = true;
            }
        }
        if(!relSwitch){

            getCityFdParent(obj);  // 1004 obj
        }

        // 递归方法
        function getCityFdParent(item){

            timeo++;

            for(var key in data){
                if(data[key]['id'] == item['fdParent']){
                    // 这边就到顶了 --- 国
                    reloid = data[key]['id'];
                }else{
                    valloop(data[key])
                }
            }
            // 往里找
            function valloop(arr){
                if(arr.children && arr.children.length > 0){
                    for(var i=0;i<arr.children.length;i++){
                        if(arr.children[i]['id'] == item['fdParent']){   // 10 。。1006被跳过
                            // console.log(arr.children[i])
                            arr.children[i][name] = bool;
                            reloid = arr.children[i]['id'];         // 这边获取的是当前那个等于前一个fdParent的id
                        }
                        valloop(arr.children[i]);
                    }
                }
            }
            // 递归判断有没有父级
            if(getJsonValue(data,reloid)['fdParent'] !== null){
                getCityFdParent(getJsonValue(data,reloid)); //  1003
            }else{
                // direction 的作用是区分当前是否赋值
                // 取消前要先判断当前的子集里有没有选中或者半选的，有就不能取消
                if(direction == 'before'){
                    getJsonValue(data,reloid)[name] = bool;
                }else if(direction == 'after'){
                    var reloid_switch = false;
                    angular.forEach(getJsonValue(data,reloid)['children'],function(item,index){
                        if(item['isActive'] || item['isChecked']){
                            reloid_switch = true;
                        }
                    });
                    // 有一个选中都不能取消父级状态
                    if(!reloid_switch){
                        getJsonValue(data,reloid)[name] = bool;
                    }
                }else{
                    console.log('参数无效：没有接收到有用的direction参数！')
                }

            }
        }
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

    /**
     *
     *      功能：设定json树中父节点状态(群)
     *      @params: kobj (数据源)
     *
     **/
    function setgetJson(kobj,bool){
        if(kobj['fdParent']){
            var parent_NodeData = getJsonValue(qsAlertData,kobj['fdParent']);
            parent_NodeData['isChecked'] = bool;
            parent_NodeData['isActive'] = true;
            if(parent_NodeData['fdParent']){
                setgetJson(parent_NodeData)
            }else{
                // console.log(parent_NodeData)
                // 这里设定时器是错开angular监听执行没有递归快,不然会错开时间，数据上有一些不可描述的错误.
                // 判断子集中有没有选中或者半选的状态，有就不去除他的半选状态，否就去除
                var parent_targetTimer = setTimeout(function(){
                    var it_i = false;
                    angular.forEach(parent_NodeData['children'],function(item,index){
                        if(item['isActive'] || item['isChecked']){
                            // console.log(item)
                            it_i = true;
                        }
                    });
                    if(!it_i){
                        // console.log('1')
                        parent_NodeData['isActive'] = false;
                    }else{
                        // console.log('2')
                        // console.log('setgetJson 数据',parent_NodeData)
                        parent_NodeData['isActive'] = true;
                    }
                },20)
            }
        }
    }

});