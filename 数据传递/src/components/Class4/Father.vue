<template>
	<div class="father">
		<Child />
	</div>
</template>

<script>
import Child from './Child.vue'
export default {
	name: 'Father',
	inject: ['grandpa'],
	components: {
		Child,
	},
	data() {
		return {
			name: '大爷',
			age: 34,
			hobby: 'coding',
		}
	},
	mounted() {
		console.log(this.grandpa)
	},
	methods: {
		call() {
			console.log('爸爸我在呢')
		},
	},
}
</script>

<style></style>
