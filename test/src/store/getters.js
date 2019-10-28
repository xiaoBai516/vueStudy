/*
getters:state对象读取方法,(页面需要的数据是这里传递出去)。
图中没有单独列出该模块，应该被包含在render中，组件通过该方法this.$store.getters.userName 直接读取全局state对象
而不需要去触发mutation函数
*/
export default {
    // count.vue案例的变量 count
    count(state){
        return state.count
    },
    isOdd(state){
        return state.count % 2 ==0?'偶数':'奇数'
    },
    requestData(state){
        return state.requestData
    },
    // Muke 账号 课程的案例
    memberInfo(state) {
        switch (state.userStatus) {
            case 0:
                return "普通会员"
            case 1:
                return "vip会员"
            case 2:
                return `高级V${state.vipLevel}会员`
            default:
                return "普通会员"
        }
    },
}
