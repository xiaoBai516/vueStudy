<template>
	<div class="home">
		<directive  title="指令模块"/>
	</div>
</template>

<script>
	import directive from '@/components/directive.vue'

	export default {
		name: 'home',
		components: {
			directive
		}
	}
</script>
