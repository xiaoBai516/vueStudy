# vuex: store文件 vuex-dome

# 静态请求及underscore使用 ：view/localData/index.vue

# 过滤器filter ：view/filter/index.vue

     <template>
          <div>
               <ul class="listSty" v-for="item in listata">
                    <li key="item.id">姓名：<span>{{item.name}}</span>,性别：<span>{{item.sex | sexType}}</span>,出生日期：<span>{{item.datatime | formatDate}}</span></li>
               </ul>
          </div>
     </template>

     <script>
          import Formatter from "@/utils/formatter";
          export default {
               name: "audit",
               data() {
                    return {
                         listata:[
                              {"id":1,"datatime":"2012010310:10:12","name":"小高","sex":"1"},
                              {"id":2,"datatime":"2015010310:10:12","name":"小美","sex":"2"},
                              {"id":3,"datatime":"2019010310:10:12","name":"小米","sex":"0"}
                         ]
                    };
               },
               filters: {
                    ...Formatter,
                    formatDate (val) {
                         if(val =='') 
                         return;
                         const year = val.substring(0,4);
                         const month = val.substring(4,6);
                         const day = val.substring(6,8);
                         const time = val.substring(8,18);
                         return `${year}-${month}-${day} ${time}`;
                    }
               },
               c
          };
     </script>

# 登录拦截 axios:[](https://github.com/superman66/vue-axios-github)

* 拦截器

     1. 创建axios实例
          const instance = axios.create({
               timeout: 1000 * 12
          });
          
     2. 设置post请求头
          instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      
     3.http request 拦截器
     
     /**
     * 请求拦截器
     * 每次请求前，如果存在token则在请求头中携带token
     */
    
     instance.interceptors.request.use(
          config => {
               // 登录流程控制中，根据本地是否存在token判断用户的登录情况
               // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
               // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
               // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
               const token = store.state.token || localStorage.getItem('token');
               token && (config.headers.Authorization = token);
               return config;
          },
          error => Promise.error(error)
     )

     4.http response 拦截器
    
     instance.interceptors.response.use(
          // 请求成功
          res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
          // 请求失败
          error => {
               const {
                    response
               } = error;
               if (response) {
                    // 请求已发出，但是不在2xx的范围
                    errorHandle(response.status, response.data.message);
                    return Promise.reject(response);
               } else {
                    // 处理断网的情况
                    // eg:请求超时或断网时，更新state的network状态
                    // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
                    // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
                    // store.commit('changeNetwork', false);
               }
          }
     );

     /**
      * 跳转登录页
      * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
      */
     const toLogin = () => {
          router.replace({
               path: '/login',
               query: {
                    redirect: router.currentRoute.fullPath
               }
          });
     }
     
     /**
      * 请求失败后的错误统一处理
      * @param {Number} status 请求失败的状态码
      */
     const errorHandle = (status, other) => {
          // 状态码判断
          switch (status) {
               // 401: 未登录状态，跳转登录页
               case 401:
                    toLogin();
                    break;
                    // 403 token过期
                    // 清除token并跳转登录页
               case 403:
                    tip('登录过期，请重新登录');
                    localStorage.removeItem('token');
                    // store.commit('loginSuccess', null);
                    setTimeout(() => {
                         toLogin();
                    }, 1000);
                    break;
                    // 404请求不存在
               case 404:
                    tip('请求的资源不存在');
                    break;
               default:
                    console.log(other);
          }
     }

* 路由拦截

//登录拦截
     router.beforeEach((to, from, next) => {
          console.log('state', store.state)
          if (store.state.userInfo || to.path === "/login") {
               next()
          } else {
               next({
                    path: "/login"
               })
          }
     })


## 代码规范注意点

# 规范 ：[前端各类规范集合](https://github.com/ecomfe/spec)

* 使用对象代替 if 及 switch

在很多情况下，我们经常会遇到循环判断执行赋值操作的场景，一般我们都会使用 if 及 switch 的条件判断，如果符合则执行赋值，不符合则进入下个判断，比如：

     let name = 'lisi';
     let age = 18;

     if (name === 'zhangsan') {
     age = 21;
     } else if (name === 'lisi') {
     age = 18;
     } else if (name === 'wangwu') {
     age = 12;
     }

     // 或者
     switch(name) {
     case 'zhangsan':
          age = 21;
          break
     case 'lisi':
          age = 18;
          break
     case 'wangwu':
          age = 12;
          break
     }

     这样的写法不仅冗余，而且代码执行效率不高，我们可以使用对象的形式简写：

     let name = 'lisi';
     let obj = {
     zhangsan: 21,
     lisi: 18,
     wangwu: 12
     };

     let age = obj[name] || 18;

* 使用 Array.from 快速生成数组

一般我们生成一个有规律的数组会使用循环插入的方法，比如使用时间选择插件时，我们可能需要将小时数存放在数组中：

     let hours = [];

     for (let i = 0; i < 24; i++) {
     hours.push(i + '时');
     }

     如果使用 Array.from 我们可以简写为：

     let hours = Array.from({ length: 24 }, (value, index) => index + '时');

* 使用 computed 代替 watch

很多时候页面会出现 watch 的滥用而导致一系列问题的产生，而通常更好的办法是使用 computed 属性，首先需要区别它们有什么区别：

     watch：当监测的属性变化时会自动执行对应的回调函数

     computed：计算的属性只有在它的相关依赖发生改变时才会重新求值

其实它们在功能上还是有所区别的，但是有时候可以实现同样的效果，而 computed 会更胜一筹，比如：

     <template>
     <div>
          <input type="text" v-model="firstName">
          <input type="text" v-model="lastName">
          <span>{{ fullName }}</span>
          <span>{{ fullName2 }}</span>
     </div>
     </template>

     <script>
     export default {
     data() {
          reurn {
               firstName: '',
               lastName: '',
               fullName2: ''
          }
     },
     
     // 使用 computed
     computed: {
          fullName() {
               return this.firstName + ' ' + this.lastName
          }
     },
     
     // 使用 watch
     watch: {
          firstName: function(newVal, oldVal) {
               this.fullName2 = newVal + ' ' + this.lastName;
          },
          lastName: function(newVal, oldVal) {
               this.fullName2 = this.firstName + ' ' + newVal;
          },
     }
     }
     </script>

上方我们通过对比可以看到，在处理多数据联动的情况下，使用 computed 会更加合理一点。



computed 监测的是依赖值，依赖值不变的情况下其会直接读取缓存进行复用，变化的情况下才会重新计算；而 watch 监测的是属性值， 只要属性值发生变化，其都会触发执行回调函数来执行一系列操作。

* 统一管理缓存变量

在项目中或多或少会使用浏览器缓存，比如 sessionStorage 和 localStorage，当一个项目中存在很多这样的缓存存取情况的时候就会变得难以维护和管理，因为其就像全局变量一样散落在项目的各个地方，这时候我们应该将这些变量统一管理起来，放到一个或多个文件中去，比如：

     /* types.js */

     export const USER_NAME = 'userName';
     export const TOKEN = 'token';

     在需要存取的时候，直接引用：

     import { USER_NAME, TOKEN } from '../types.js'

     sessionStorage[USER_NAME] = '张三';
     localStorage[TOKEN] = 'xxx';

使用这种方法的好处在于一旦我们需要修改变量名，直接修改管理文件中的值即可，无需修改使用它的页面，同时这也可以避免命名冲突等问题的出现，这类似于 vuex 中 mutations 变量的管理。

* 使用 setTimeout 代替 setInterval

一般情况下我们在项目里不建议使用 setInterval，因为其会存在代码的执行间隔比预期小以及 “丢帧” 的现象，原因在于其本身的实现逻辑。很多人会认为 setInterval 中第二个时间参数的作用是经过该毫秒数执行回调方法，其实不然，其真正的作用是经过该毫秒数将回调方法放置到队列中去，但是如果队列中存在正在执行的方法，其会等待之前的方法完毕再执行，如果存在还未执行的代码实例，其不会插入到队列中去，也就产生了 “丢帧”。

而 setTimeout 并不会出现这样的现象，因为每一次调用都会产生了一个新定时器，同时在前一个定时器代码执行完之前，不会向队列插入新的定时器代码。

     // 该定时器实际会在 3s 后立即触发下一次回调
     setInterval(() => {
     // 执行完这里的代码需要 2s
     }, 1000);

     // 使用 setTimeout 改写，4秒后触发下一次回调
     let doSometing = () => {
     // 执行完这里的代码需要 2s
     
     setTimeout(doSometing, 1000);
     }

     doSometing();


* 不要使用 for in 循环来遍历数组

大家应该都知道 for in 循环是用于遍历对象的，但它可以用来遍历数组吗？答案是可以的，因为数组在某种意义上也是对象，但是如果用其遍历数组会存在一些隐患：其会遍历数组原型链上的属性。

     let arr = [1, 2];

     for (let key in arr) {
     console.log(arr[key]); // 会正常打印 1, 2
     }

     // 但是如果在 Array 原型链上添加一个方法
     Array.prototype.test = function() {};

     for (let key in arr) {
     console.log(arr[key]); // 此时会打印 1, 2, ƒ () {}
     }

因为我们不能保证项目代码中不会对数组原型链进行操作，也不能保证引入的第三方库不对其进行操作，所以不要使用 for in 循环来遍历数组。


# 学会编写可复用性模块

* 减少重复的代码

通过将 data.obj.items 的值赋值给变量 values 来实现了复用，此时修改 items 为 lists 的话我们只需修改一处地方即可，不管是维护成本还是代码可读性上，复用的优势都显而易见。

     let person = [];

     for (let i = 0; i < data.obj.items.length; i++) {
          person.push({
               name: data.obj.items[i].name,
               age: data.obj.items[i].age
          });
     }

     改成：

     let person = [];
     let values = data.obj.items;

     for (let i = 0; i < values.length; i++) {
     person.push({
          name: values[i].name,
          age: values[i].age
     });
     }

* 封装成一个函数

除了使用变量的赋值缓存使用来解决数据的重复读取外，我们在开发过程中重复性更多的也许是功能点的重复，比如：

     <tempalte>
     <div>
          <input type="text" v-model="str1">
          <input type="text" v-model="str2">
          <div>{{ str1.slice(1).toUpperCase() }}</div>
          <div>{{ str2.slice(1).toUpperCase() }}</div>
     </div>
     </template>

上述代码的重复功能点在于截取输入框中第二个字符开始到最后的值并把它们转化成大写字母，像这样很简单的操作虽然重复使用也不会出现太大的问题，但是如果是代码量较多的操作呢？重复书写相同功能的代码是一种不经过大脑思考的行为，我们需要对其进行优化，这里我们可以把功能点封装成一个函数：

     export default {
     methods: {
          sliceUpperCase(val) {
               return val.slice(1).toUpperCase()
          }
     }
     }

     如此我们只要在用到该方法的地方调用即可，将值传入其中并返回新值。当然像在双花括号插值和 v-bind 表达式中重复的功能点我们可以封装成过滤器比较合适：

     // 单文件组件注册过滤器
     filters: {
     sliceUpperCase(val) {
          return val.slice(1).toUpperCase()
     }
     }

     // 全局注册过滤器
     Vue.filter('sliceUpperCase', function (val) {
     return val.slice(1).toUpperCase()
     })

     然后在 html 中使用“管道”符进行过滤：

     <div>{{ str1 | toUpperCase }}</div>
     <div>{{ str2 | toUpperCase }}</div>

* 封装成一个插件 [Vue 插件编写与实战](https://mp.weixin.qq.com/s/Aqgh7Dkialhm9v8U0wBuqg)

Vue 提供给了我们一个 install 方法来编写插件，使用该方法中的第一个 Vue 构造器参数可以为项目添加全局方法、资源、选项等

     /* toast.js */
     import ToastComponent from './toast.vue' // 引入组件

     let $vm

     export default {    
     install(Vue, options) {
          
          // 判断实例是否存在
          if (!$vm) {            
               const ToastPlugin = Vue.extend(ToastComponent); // 创建一个“扩展实例构造器”
               
               // 创建 $vm 实例
               $vm = new ToastPlugin({                
                    el: document.createElement('div')  // 声明挂载元素          
               });            
               
               document.body.appendChild($vm.$el); // 把 toast 组件的 DOM 添加到 body 里
          } 
          
          // 给 toast 设置自定义文案和时间
          let toast = (text, duration) => {
               $vm.text = text;
               $vm.duration = duration;
               
               // 在指定 duration 之后让 toast 消失
               setTimeout(() => {
                    $vm.isShow = false;  
               }, $vm.duration);
          }
          
          // 判断 Vue.$toast 是否存在
          if (!Vue.$toast) {            
               Vue.$toast = toast;        
          }        
          
          Vue.prototype.$toast = Vue.$toast; // 全局添加 $toast 事件
     }
     }



     成功编写完插件的 JS 脚本后，我们在入口文件中需要通过 Vue.use() 来注册一下该插件：

     import Toast from '@/widgets/toast/toast.js'

     Vue.use(Toast); // 注册 Toast

     最后我们在需要调用它的地方直接传入配置项使用即可，比如：

     this.$toast('Hello World', 2000);

## 数据驱动

做数据是改变了，但是页面并没有因此重新渲染，这是为什么呢？

由于 Vue 检测不到数组变动，因此页面便无法重绘。同样 Vue 也不能检测对象属性的添加或删除，需要使用 Vue.set(object, key, value) 方法来实现。

      // 设置数组值
     setPuzzle(index, num) {
          let curNum = this.puzzles[index]
          
          this.$set(this.puzzles, index + num, curNum)
          this.$set(this.puzzles, index, '')
     },

## Vue API 盲点解析



## 问题点

* 一些 npm 包名为什么要用 @ 开头?

新的包名规则对于包的命名方式进行了一些修改，为的是更好的防御「误植」攻击，同时帮助包开发者们挑选出更加合适的包名。

如果因为你起的包名与现有的包名太相近而被阻止发布这个包，那么找到一个独一无二包名最简单方法就是使用你的作用域。你可以使用@+你的 npm 用户名加在包名前面将包划到你的 npm 账户作用域下。

如@xiaomajia/xxx-xxxx

## webpack 在 CLI 3 中的应用 

https://blog.csdn.net/guozhangqiang/article/details/87197870

## 滤器(filter)的使用
 https://blog.csdn.net/badmoonc/article/details/81485803
 
 <!-- 在双花括号中 -->
{{ userInfo.sex | formatDate }}
import Formatter from "@/utils/initialData";
filters: {
	...Formatter
},
const formatter = {
    // 性别1、男 2、女 9、未说明性别
    sex: (val) => {
        let result = "";
        switch (val) {
            case 1:
                result = "男";
                break;
            case 2:
                result = "女";
                break;
            case 9:
                result = "未知";
                break;
        }
        return result;
    }
}

export default formatter
