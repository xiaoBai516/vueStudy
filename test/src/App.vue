<template>
    <div id="app">
          <router-link to="/"></router-link> 
        <router-view />
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
<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
