import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
 //    {
	// 	path: '/',
	// 	name: 'home',
	// 	component: Home
	// },
     // *** 本地数据获取*/
    {
        path: "/localData",
        name: "localData",
        component: () => import("../views/localData/index.vue")
    },
    // *** vuex 的案例 开始/
    {
        path: "/count",
        name: "count",
        component: () => import("../views/vuex-dome/count.vue")
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/vuex-dome/login.vue")
    },
    {
        path: "/",
        name: "index",
        component: () => import("../views/vuex-dome/index.vue")
    },
    {
        path: "/userCenter",
        name: "userCenter",
        component: () => import("../views/vuex-dome/userCenter.vue")
    },
    {
        path: "/course/:id",
        name: "course",
        component: () => import("../views/vuex-dome/course.vue")
    }
    // *** vuex 的案例 结束/

]

const router = new VueRouter({
	routes
})

export default router
