<template>
    <div class="home">
        <validate />
      <!--  <directive title="指令模块" /> -->
    </div>
</template>

<script>
    import validate from '@/components/validate.vue'
    import directive from '@/components/directive.vue'
    export default {
        name: 'home',
        components: {
            validate,
            directive
        }
    }
</script>
