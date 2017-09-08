/*************************************
*    create by xiaofeng.yao
*    email 871213171@qq.com
*    time 2017.09.06
*    component haTable
*************************************/
define([
    'app',
    '../../js/directive/haTable/haTable.js'
], function(app) {
    'use strict';
    
    app.controller("haTable.controller",["$scope",function($scope){
        
        $scope.checkbox = true;
        $scope.edit = true;

        $scope.listHeader = [
            [
                { name: '产品编码', key: 'id' },
                { name: '产品名称', key: 'name' },
                { name: '产品价格', key: 'price' },
                { name: '产源地', key: 'address' },
                { name: '生产商', key: 'user' }
            ],[
                { name: '产品编码', key: 'id' },
                { name: '产品名称', key: 'name' },
                { name: '产品价格', key: 'price' },
                { name: '产源地', key: 'address' },
                { name: '进口商', key: 'import' },
                { name: '生产商', key: 'user' }
            ],[
                { name: '产品编码', key: 'id' },
                { name: '产品名称', key: 'name' },
                { name: '总数', key: 'sum' },
                { name: '产品价格', key: 'price' },
                { name: '产源地', key: 'address' },
                { name: '进口商', key: 'import' },
                { name: '生产商', key: 'user' }
            ],[
                { name: '产品编码', key: 'id' },
                { name: '产品名称', key: 'name' },
                { name: '总数', key: 'sum' },
                { name: '产品价格', key: 'price' },
                { name: '产源地', key: 'address' },
                { name: '进口商', key: 'import' },
                { name: '生产商', key: 'user' }
            ],
            
        ];

        $scope.listData = [
            {
                id: 10001,
                name: '珍珠',
                price: 999,
                address: '福建龙岩',
                user: 'lisi',
                children:[
                    {
                        id: 1000101,
                        name: '珍珠01',
                        price: 99901,
                        address: '福建龙岩',
                        import:'java',
                        user: 'ccc',
                        children:[
                            {
                                id: 100010101,
                                name: '端午节',
                                price: 666,
                                address: '福建龙岩',
                                import:'13',
                                sum:99,
                                user: 'dddd',
                                children:[
                                    {
                                        id: 10001010101,
                                        name: '端午节',
                                        price: 666,
                                        address: '福建龙岩',
                                        import:'13',
                                        sum:99,
                                        user: 'dddd',
                                    }
                                ]
                            },{
                                id: 100010102,
                                name: '情人节',
                                price: 999,
                                address: '福建厦门',
                                import:'超人',
                                sum:65534,
                                user: 'ppp',
                            }
                        ]
                    },{
                        id: 1000102,
                        name: '珍珠02',
                        price: 99902,
                        address: '福建龙岩',
                        import:'js',
                        user: 'ss',
                    }
                ]
            }, {
                id: 10002,
                name: '海马',
                price: 1992,
                address: [{
                        id:100029901,
                        name:'福建厦门'
                    },{
                        id:100029902,
                        name:'福建龙岩'
                    },{
                        id:100029903,
                        name:'福建泉州'
                    }],
                user: 'chenwu'
            }
        ];

        $scope.listmodel = [];


    }])

});