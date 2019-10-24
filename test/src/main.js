import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css' // 使用 CSS
//自定义指令
import directives from '@/directive/index';
Vue.use(iView)
Vue.config.productionTip = false
directives.init(Vue)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
