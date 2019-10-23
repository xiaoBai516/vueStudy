<template>
    <div class="cnt">
        <h1 v-style="title"></h1>
        <p>指令是告诉计算机从事某一特殊运算的代码。如：数据传送指令、算术运算指令、位运算指令、程序流程控制指令、串操作指令、处理器控制指令。除了默认设置的核心指令( v-model 和 v-show ),Vue 也允许注册自定义指令。</p>
        <div>
            <h2>Vue 内置指令 </h2>
            <p> 1. 内置指令的使用 </p>
            <p>v-if:根据其后表达式的 bool 值进行判断是否渲染该元素 </p>
            <p>v-show:其后表达式的 bool 值为 false 时，对渲染的出标签添加display：none;的样式 </p>
            <p>v-else:紧跟着v-if或者v-show一起使用 </p>
            <p>v-for:v-for的用法 person in people ,前者是后者的元素，类似于数组的用法 </p>
            <p>v-bind:(:):用于响应地更新 html 特性 </p>
            <p>v-on:(@):用于监听指定元素的 DOM 事件 </p>
            <p> v-once:一次性插入文本，随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。 </p>
            <p>v-html:输出 "{{title}}"内包含 html 代码的数据 </p>
            <p>tips: 不能使用 v-html 来复合局部模板，因为 Vue 不是基于字符串的模板引擎，反之，对于用户界面(UI)，组件更适合作为可重用和可组合的基本单位。另外，只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值，避免xss攻击。</p>
        </div>
        <div> 
            <h2>{{names}}</h2>
            <input type="text" value="" v-focus class="dist" />
            <h1></h1>
        </div>
        <div>
            <p>总结回顾</p>
            <p>通过以上 Vue 指令的学习，以及诸多 demo 的实现，我们便可清晰的认识 Vue 指令了，并且能逐一解答我们最开始内心的疑虑了：</p>

            <p>Vue 指令就是以 “v-” 开头，作用于 DOM ，为 DOM 添加特殊行为的一种指令。</p>
           <p> 自定义指令则是对 Vue 指令的一种有效的补充和扩展，不仅可用于定义任何的 DOM 操作，并且是可复用的。</p>
            <p>Vue 指令使用大部分是和组件结合着使用，从而增强组件的功能。甚至部分 Vue 指令能够直接安装卸载组件，例如v-if。</p>
            <p>Vue 自定义指令最重要的是我们对 bind inserted update componentUpdated unbind五个钩子函数的理解，以及对钩子函数中el binding（属性值） vnode oldVnode四个参数的使用，只要这些内容能够熟练使用，我们便可以自己去定义适合各种开发场景的 Vue 指令了。</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'diretive',
        data(){
            return {
                'names':'小案例'
            }
        },
        components: {},
        props: {
           title: String
        },
    }
</script>
