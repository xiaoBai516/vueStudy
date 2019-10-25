/*
mutations:状态改变操作方法。是vuex修改state的唯一推荐方法，
*/
export default {
    // count.vue案例的变量 count
    increment(state){
        state.count++;//对state进行操作
    },
    decrement(state){
        state.count--;
    },
    // Muke 账号 课程的案例
    login(state, v) {
        state.userInfo = v
    },
    setMemberInfo(state, v) {
        state.userStatus = v.userStatus
        state.vipLevel = v.vipLevel
    },
}
