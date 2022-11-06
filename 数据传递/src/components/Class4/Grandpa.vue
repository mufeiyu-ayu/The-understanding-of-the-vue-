<template>
	<div class="grandPa">
		、
		<!-- 
           ref dom节点  dom对象
           ref 组件  组件实例
         -->
		<Father ref="father" />
	</div>
</template>

<script>
import Father from './Father.vue'
export default {
	provide() {
		// 提供
		return {
			grandpa: this.$data, // 讲实例作为grandpa传递出去
		}
	},
	name: 'GrandPa',
	components: {
		Father,
	},
	data() {
		return {
			name: '小野',
			age: 22,
			hobby: 'Travel',
			home: '北京',
		}
	},
	mounted() {
		console.log(this.$refs.father.name)
		this.$refs.father.call()
	},
	methods: {
		notice() {
			console.log('儿子回家吃饭了')
		},
	},
}
</script>

<style></style>
