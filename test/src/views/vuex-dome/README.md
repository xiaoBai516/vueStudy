Vuex持久化存储之vuex-persist
    Vuex 解决了多视图之间的数据共享问题。但是运用过程中又带来了一个新的问题是，Vuex 的状态存储并不能持久化。也就是说当你存储在 Vuex 中的 store 里的数据，只要一刷新页面，数据就丢失了。

    引入vuex-persist 插件，它就是为 Vuex 持久化存储而生的一个插件。不需要你手动存取 storage ，而是直接将状态保存至 cookie 或者 localStorage 中。具体用法如下：
    
安装：

    npm install --save vuex-persist 

引入：

import VuexPersistence from 'vuex-persist'

先创建一个对象并进行配置：

    const vuexLocal = new VuexPersistence({
        storage: window.localStorage
    })


引入进vuex插件：

    const store = new Vuex.Store({
        state: { ... },
        mutations: { ... },
        actions: { ... },
        plugins: [vuexLocal.plugin]
    }) 