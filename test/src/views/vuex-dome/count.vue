<template>
    <div>
        <h1>vuex:{{count}}</h1>
        <p>{{count}}是{{isOdd}}</p>
        <div><button @click="decrement">减少-</button></div>
        <div><button @click="increment">增加+</button></div>
        <div><button @click="clickOdd">只能偶数增加+</button></div>
        <div><button @click="clickAsync">异步操作间隔1秒之后增加+</button></div>
    </div>
</template>
<script>
    import {
        mapGetters,
        mapState,
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
            }
        },
        computed: {
            ...mapGetters([
                "count",
                "isOdd"
            ])
        },
        methods: {
            ...mapActions([
                "increment",
                "decrement",
                "clickAsync",
                "clickOdd"
            ])
        }
    }
</script>
