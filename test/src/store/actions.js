
/*
action：操作行为处理模块。负责处理vue 组件接受到所有交互行为。包含同步/异步操作，支持多个同名方法，按照注册的顺序依次触发。
    向后台api请求的操作就在这个模块中进行，包括触发其他action以及提交mutation的操作。该模块提供了，promise的封装，以支持action的链式触发
*通过commit提交
    commit：状态改变提交方法。对mutations进行提交，是唯一能执行mutation的方法
    *dispatch：操作行触发方法，是唯一能执行action的方法
    *action不能直接操作state，只能提交给mutations 进行操作
*/


import { resolve } from "any-promise"
export default {
    // count.vue案例的变量 count
    increment({commit}){
        commit("increment");//提交给 mutations 里面操作
    },
    decrement({commit}){
        commit("decrement");
    },
    clickOdd({commit,state}){
        if(state.count % 2 ==0){
            commit("increment");
        }
    },
    clickAsync({commit}){
        return new Promise((resolve, reject) => {
            // mock api 交互
            setTimeout(() => {
                commit("increment");
            },1000)
        })
    },
    // Muke 账号 课程的案例
    buyVip({ commit }, e) {
        return new Promise((resolve, reject) => {
            // mock api 交互
            setTimeout(() => {
                // 修改本地state
                commit("setMemberInfo", {
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
                    commit("setMemberInfo", {
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
