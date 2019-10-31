<template>
    <div>
        <h1>vuex:{{count}}</h1>
        <p>{{count}}是{{isOdd}}</p>
        <div><button @click="decrement">减少-</button></div>
        <div><button @click="increment">增加+</button></div>
        <div><button @click="clickOdd">只能偶数增加+</button></div>
        <div><button @click="clickAsync">异步操作间隔1秒之后增加+</button></div>
        <div><button @click="asyncFn">异步操作间增加+</button></div>
    </div>
</template>
<script>
    import {
        mapGetters,
        mapState,
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
            }
        },
        computed: {
            ...mapGetters([
                "count",
                "isOdd",
                "requestData"
            ])
        },
        watch: {
            requestData: function(newVal, oldVal) {
                console.log('newVal',newVal)
            }
        },
        methods: {
            ...mapActions([
                "increment",
                "decrement",
                "clickAsync",
                "clickOdd",
                "requestPromise",
                "callbackFn"
            ]),
            asyncFn(){
                console.log('点击')
                let param = {
                    // appopenid: "oYpo44xBPLnkuzEEV1x3D5JdtLq4"
                    name:'cedric'
                }
                //1.Promise 回调
                // this.requestPromise(param).then(res => {
                //     console.log('Promise ->res:',res)
                // })
               // 2.callback 回调
               this.callbackFn({
                   	params: param,
                   	callback: (res) => {
                   		console.log('callback-》res:',res)
                   	}
               })
               
            }
        }
    }
</script>
<!-- 
 1.获取请求后的值，通过mapGetters
vue 组件：
computed: {
    ...mapGetters([
        "requestData"
    ])
},
//这边就可以监听到值
watch: {
    requestData: function(newVal, oldVal) {
        console.log('newVal',newVal)
    }
},
2. 通过回调函数 resolve(payload)获取
action:
requestPromise({commit}, params){
    return new Promise((resolve, reject) => {
        request.getPatiDetailByAppFn(payload => {
            commit(types.REPROMISE, payload);
            resolve(payload)
        }, params);
    })
},
vue 组件：
 this.requestPromise(param) .then(res => {
    console.log('res',res)
}) 
3.通过回调callback 获取
action:
callbackFn({commit}, param){
    request.getPatiDetailByAppFn(payload => {
        commit(types.REPROMISE, payload);
        param.callback(payload);
    }, param.params);
},
vue 组件：
this.callbackFn({
    params: param,
    callback: (res) => {
        console.log('callback-》res:',res)
    }
}) -->