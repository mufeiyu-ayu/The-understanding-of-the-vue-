<template></template>

<script>
export default {
	inject: ['grandpa'],
	name: 'Child',
	mounted() {
		console.log(this.grandpa)
	},
}
</script>

<style></style>
