import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css' // 使用 CSS
//自定义指令
import directives from '@/directive/index';

//1.请求data文件下的test.json文件
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
//3.封装请求方法
Vue.prototype.$apiFn = {asyncJson};

Vue.use(iView)
Vue.config.productionTip = false
directives.init(Vue)

//登录拦截
// router.beforeEach((to, from, next) => {
//     console.log('state',store.state)
//     if (store.state.userInfo || to.path === "/login") {
//         next()
//     } else {
//         next({
//             path: "/login"
//         })
//     }
// })
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
