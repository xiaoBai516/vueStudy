export default {
	init(app){
		this.dicts(app);
	},
	/**
	 * @description 输入法控件
	 * @params      如下配置
	 * @return      {[type]}                 [description]
	 */ 
	dicts(app){
		let _this = this;
        //初始化触发input 事件
        app.directive('focus',{
            bind: function(el, binding, vnode){
                // 指令第一次绑定到元素时调用，做绑定的准备工作
                // 比如添加事件监听器，或是其他只需要执行一次的复杂操作  
                console.log('binding',binding)
            },
            inserted: function(el){
                // 被绑定标签的父节点加入 DOM 时立即触发
                console.log('触发',el)
                el.focus();
            },
            update: function (el, binding, vnode) {      
                // 根据获得的新值执行对应的更新
                // 对于初始值也会调用一次
            },
            componentUpdated: function(){
            // 指令所在组件的 VNode 及其子 VNode 全部更新后调用，一般使用 update 即可
            },
            unbind: function(){
            // 做清理操作
            // 比如移除bind时绑定的事件监听器
            }
        })
        //文字样式的修改
        app.directive('style',{
            bind: function(el, binding, vnode){
                el.innerHTML = binding.value
            },
            inserted:function(el){
                console.log('text:',el)
                el.style.background = 'red';
                el.style.color = '#fff';
            }
        })
	}
};
/*  属性
el: 指令所绑定的元素，可以用来直接操作DOM 。

binding: 一个对象，包含以下属性：

name: 指令名，不包括 v- 前缀。

value: 指令的绑定值， 例如： v-directive="1 + 1"，value 的值是 2。

oldValue: 指令绑定的前一个值,仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。

expression: 绑定值的字符串形式。 例如 v-directive="1 + 1" ， expression 的值是 "1 + 1"。

arg: 传给指令的参数。例如 v-directive:foo, arg 的值是 "foo"。

modifiers: 一个包含修饰符的对象。 例如： v-directive.foo.bar, 修饰符对象 modifiers 的值是 { foo: true, bar: true }。

vnode: Vue 编译生成的虚拟节点。

oldVnode: 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

tips: 这些属性是只读的，不要修改它们。你也可以给指令对象附加自定义的属性，但是注意不要覆盖已有的内部属性
*/