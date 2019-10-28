
/*
action：操作行为处理模块。负责处理vue 组件接受到所有交互行为。包含同步/异步操作，支持多个同名方法，按照注册的顺序依次触发。
    向后台api请求的操作就在这个模块中进行，包括触发其他action以及提交mutation的操作。该模块提供了，promise的封装，以支持action的链式触发
*通过commit提交
    commit：状态改变提交方法。对mutations进行提交，是唯一能执行mutation的方法
    *dispatch：操作行触发方法，是唯一能执行action的方法
    *action不能直接操作state，只能提交给mutations 进行操作
*/

import * as request from '../api/request';//接口
import * as types from './mutations_types';
import { resolve } from "any-promise"
export default {
    // count.vue案例的变量 count
    increment({commit}){
        commit(types.INCREMENT);//提交给 mutations 里面操作
    },
    decrement({commit}){
        commit(types.DECREMENT);
    },
    clickOdd({commit,state}){
        if(state.count % 2 ==0){
            commit(types.INCREMENT);
        }
    },
    clickAsync({commit}){
        return new Promise((resolve, reject) => {
            // mock api 交互
            setTimeout(() => {
                commit(types.INCREMENT);
            },1000)
        })
    },
    requestPromise({commit}, params){
       //1.Promise 回调
        return new Promise((resolve, reject) => {
            request.getPatiDetailByAppFn(payload => {
                console.log('请求',payload)
                commit(types.REPROMISE, payload);
                resolve(payload)
            }, params);
        })
    },
    callbackFn({commit}, param){
        request.getPatiDetailByAppFn(payload => {
            console.log('请求',payload)
            commit(types.REPROMISE, payload);
            param.callback(payload);
        }, param.params);
    },
    // Muke 账号 课程的案例
    buyVip({ commit }, e) {
        return new Promise((resolve, reject) => {
            // mock api 交互
            setTimeout(() => {
                // 修改本地state
                commit([types.SETMEMBERINFO], {
                    userStatus: e.userStatus,
                    vipLevel: e.vipLevel
                })
                resolve("购买成功")
            }, 1000)
        })
    },
    getFreeVip({ commit, state }) {
        // mock api 交互
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (state.userStatus === 0) {
                    commit([types.SETMEMBERINFO], {
                        userStatus: 1,
                        vipLevel: 0
                    })
                    resolve("分享成功，您已获得一个月的高级vip会员")
                } else {
                    resolve("分享成功")
                }
            }, 1000)
        })
    },
}

/*
补充：
Promise是一个构造函数。并且传入两个参数：resolve，reject，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。
作用：简单来讲，就是能把原来的回调写法分离出来，在异步操作执行完后，用链式调用的方式执行回调函数。

*/