import Vue from "vue"
import Vuex from "vuex"
import state from "./state"
import mutations from "./mutations"
import getters from "./getters"
import actions from "./actions"

Vue.use(Vuex)//Vue把除了自身之外的模块都作为插件看待了

//调试的时候 会打印出来日志 输出vuex 里面的每个状态的值
import createLogger from 'vuex/dist/logger'
//调试工具
const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})

export default store
