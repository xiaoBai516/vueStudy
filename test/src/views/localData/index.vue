<template>
    <div>
        <h1>获取本地数据</h1>
    </div>
</template>
<script>
    import {
        mapGetters,
        mapState,
        mapActions
    } from 'vuex'
    import _Qs from 'underscore'
    export default {
        data() {
            return {
                userInfo:{},
                noticelList:[]
            }
        },
        created() {
            this.loadData();
        },
        methods: {
           /**
             * 请求静态数据只是为了代码不那么乱
             * 分次请求未作整合
             */
            async loadData() {
                this.userInfo = await this.$apiFn.asyncJson('userInfo');
                this.noticelList = await this.$apiFn.asyncJson('noticelList');
                
                /*下面 underscore 的案例*/
                /*
                1.each
                */
                 // 遍历数组 (可获取三个参数element, index, list)
                var data = [{"id":"1",'name':"夏雨"},{"id":"2",'name':"球雨"},{"id":"3",'name':"春雨"}];
                _Qs.each(data,function(element, index, list) { 
                    //三个参数都是可选,位置固定,element是数组值,index是值在数组位置,list是整个数组
                    // console.log(element);    //打印出{"id":"1",'name':"夏雨"}
                    // console.log(index);        //打印出0 1 2 索引
                    // console.log(list);        //打印出数组
                });
                
                // 遍历对象 (可获取三个参数 value,key,list)
                var data2 = {
                    name1: "lili"
                };
                _Qs.each(data2,function(value,key,list) {   
                    //注意第一个是value,第二个是key,位置固定,但参数可以缺少
                    // console.log(value);   //打印出lili
                    // console.log(key);    //打印出name1
                    // console.log(list);  //打印出{name1: "lili"}
                });
               
                // 标准格式  _.each(list, iteratee, [context]) ,其中[context]是迭代器的上下文，也就是迭代器中this的指向
                var obj = {name: "hello"};  
                _Qs.each([1, 2, 3], function (i) { 
                    // console.log(this.name + ":" + i); 
                }, obj); 
                
                 /*
                2.each
                */
                var dataMap = [{"id":"1",'name':"夏雨","value":1},{"id":"2",'name':"球雨","value":2},{"id":"3",'name':"春雨","value":4}];
                var result =  _Qs.map(dataMap,function(element, index, list) { 
                    //三个参数都是可选,位置固定,element是数组值,index是值在数组位置,list是整个数组
                    // console.log(element);    //打印出{"id":"1",'name':"夏雨"}
                    // console.log(index);        //打印出0 1 2 索引
                    // console.log(list);        //打印出数组
                    element.value =  element.value+1;
                    return element;

                });
                console.log(result,dataMap,'map案例')
                //打印出来  [{"id":"1",'name':"夏雨","value":2},{"id":"2",'name':"球雨","value":3},{"id":"3",'name':"春雨","value":5}]   [{"id":"1",'name':"夏雨","value":2},{"id":"2",'name':"球雨","value":3},{"id":"3",'name':"春雨","value":5}]   map案例
                // 遍历对象 (可获取三个参数 value,key,list)
                var data2Map = {
                    name1: "lili"
                };
                _Qs.map(data2Map,function(value,key,list) {   
                    //注意第一个是value,第二个是key,位置固定,但参数可以缺少
                    // console.log(value);   //打印出lili
                    // console.log(key);    //打印出name1
                    // console.log(list);  //打印出{name1: "lili"}
                });
                            
                // 标准格式  _.each(list, iteratee, [context]) ,其中[context]是迭代器的上下文，也就是迭代器中this的指向
                var objMap = {name: "hello"};  
                _Qs.map([1, 2, 3], function (i) { 
                    // console.log(this.name + ":" + i); 
                }, objMap); 
                
                /*
                3.find  在list中逐项查找，返回第一个通过, 如果找到匹配的元素，函数将立即返回，不会遍历整个list。如果没有则将返回undefined
                */
                
                var dataFind2 = [1,2,3,4,5,6];
                var aa2 =_Qs.find(dataFind2 ,function(num) {
                    console.log(num % 2)
                    return num % 2 == 0;
                });
                // console.log("数据类型是"+typeof aa2+";返回值是"+aa2);  //打印结果是:数据类型是number;返回值是2
                
                /*
                4.filter 遍历list中的每个值，返回所有通过predicate真值检测的元素值
                */
                var datafilter =[1,2,3,4,5,6];
                var bb=_Qs.filter(datafilter,function(num) {
                    return num % 2 == 0;
                });
                // console.log("数据类型是"+typeof bb+";返回值是"+bb); //打印结果是:数据类型是object;返回值是2,4,6
                
                /*
                
                过滤数组集合
                let solders=[
                  {"id":"1","name":"小吴"},
                  {"id":"2","name":"小时"},
                  {"id":"3","name":"翔子"}
               ]
               let  result = _Qs.filter(solders,function(res) {
                     return res.id != 1;
                });
                console.log(result)//[ {"id":"2","name":"小时"},{"id":"3","name":"翔子"}]
                5.findWhere   在list中逐项查找，返回第一个通过,如果没有则将返回undefined
                */
                var dataMapfindWhere = [{"id":"1",'name':"夏雨","sex":"21"},{"id":"2",'name':"球雨","sex":"22"},{"id":"3",'name':"春雨","sex":"21"}];
                var result = _Qs.findWhere(dataMapfindWhere,{"sex":"21"});
                console.log(result)//{id: "1", name: "夏雨", sex: "21"}
                
                /*
                6.where   遍历list中的每个值，返回所有通过的值
                */
                var dataMapWhere = [{"id":"1",'name':"夏雨","sex":"21"},{"id":"2",'name':"球雨","sex":"22"},{"id":"3",'name':"春雨","sex":"21"}];
                var result2 = _Qs.where(dataMapWhere,{"sex":"21"});
                console.log(result2)// [{"id":"1",'name':"夏雨","sex":"21"},{"id":"3",'name':"春雨","sex":"21"}]
                /*
                7.filter 遍历list中的每个值，返回所有通过predicate真值检测的元素值
                */
                var datareject =[1,2,3,4,5,6];
                var reject =_Qs.reject(datareject,function(num) {
                    return num % 2 == 0;
                });
                console.log("reject",reject)// [1, 3, 5]
                
                /*
                8.every如果list中的所有元素都通过predicate的真值检测就返回true,只要有一个不通过，则返回false
                */
                var dataevery =[1,2,4,6];
                var every =_Qs.every(dataevery,function(num) {
                    return num % 2 == 0;
                });
                console.log("every",every)//false
                
                /*
                9.some:如果有一个通过则返回true,一旦找到了符合条件的元素, 就直接中断对list的遍历
                */
                var dataevery =[1,2,4,6];
                var some =_Qs.some(dataevery,function(num) {
                    return num % 2 == 0;
                });
                console.log("some",some)// true
            },
        }
    }
</script>
<!-- 
 1.在src 文件下创建dataJson.js
 const userInfo = {
 	status: 1,
 	data: {
 		id: 1,
 		mobile: 18888888888,
 		nickname: 'Leo yo',
 		portrait: 'http://img.61ef.cn/news/201409/28/2014092805595807.jpg'
 	},
 	msg: '提示'
 }
 const noticelList = [{
 		title: "关于交易手续费优惠政策的通知1",
 		id:"1"
 	},
 	{
 		title: "关于交易手续费优惠政策的通知2",
 		id:"2"
 	},
 	{
 		title: "关于交易手续费优惠政策的通知3",
 		id:"3"
 	}
 ]
 
 export default {
 	noticelList,
 	userInfo
 }
 
 2.在main.js入口文件
 
 //请求data文件下的test.json文件
 import dataJson from './dataJson' //测试用数据
 
 //模拟本地异地请求数据
 const asyncJson = type=>{
 	//模拟异步请求数据
 	return new Promise(resolve=>{
 		setTimeout(()=>{
 			resolve(dataJson[type]);
 		}, 500)
 	})
 }
 //封装请求方法
 Vue.prototype.$apiFn = {asyncJson};
 
 3.在组件页面
 
 export default {
     data() {
         return {
             userInfo:{},
             noticelList:[]
         }
     },
     created() {
         this.loadData();
     },
     methods: {
        /**
          * 请求静态数据只是为了代码不那么乱
          * 分次请求未作整合
          */
         async loadData() {
             this.userInfo = await this.$apiFn.asyncJson('userInfo');
             this.noticelList = await this.$apiFn.asyncJson('noticelList');
             console.log('用户数据',this.userInfo )
             console.log('数据',this.noticelList )
         },
     }
 }
}) -->
