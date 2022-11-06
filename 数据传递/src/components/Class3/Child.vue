<template>
	<h1>姓名:{{ this.$attrs.name }}</h1>
</template>

<script>
export default {
	name: "Child",

	mounted() {
		console.log(this)
		this.$listeners.notice()
	},
}
</script>

<style></style>
