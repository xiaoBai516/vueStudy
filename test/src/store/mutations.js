/*
mutations:状态改变操作方法。是vuex修改state的唯一推荐方法，
*/
import * as types from './mutations_types';
export default {
    // count.vue案例的变量 count
    [types.INCREMENT](state){
        state.count++;//对state进行操作
    },
    [types.DECREMENT](state){
        state.count--;
    },
    [types.REPROMISE](state, payload){
        state.requestData = payload
    },
    // Muke 账号 课程的案例
    [types.LOGIN](state, payload) {
        state.userInfo = payload
    },
    [types.SETMEMBERINFO](state, payload) {
        state.userStatus = payload.userStatus
        state.vipLevel = payload.vipLevel
    },
}
