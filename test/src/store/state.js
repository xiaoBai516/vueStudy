/*
state:是数据
组件中可以直接使用this.$store.state直接获取状态
*/
export default {
    // count.vue案例的变量
    count:10,
    requestData:'',//请求接口的参数
      // Muke 账号 课程的案例
    userInfo: "",//用户账号信息
    userStatus: "", //用户等级  0 -> 普通 1 -> vip 2-> 高级vip
    vipLevel: "",//vip用户的数据
}
