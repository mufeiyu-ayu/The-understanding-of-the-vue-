<template>
	<div>
		<Father
			:name="name"
			:age="age"
			:hobby="hobby"
			:home="home"
			@notice="notice"
		/>
	</div>
</template>

<script>
import Father from "./Father.vue"
export default {
	name: "GrandPa",
	components: {
		Father,
	},
	data() {
		return {
			name: "小野",
			age: 22,
			hobby: "Travel",
			home: "北京",
		}
	},
	methods: {
		notice() {
			console.log("儿子回家吃饭了")
		},
	},
}
</script>

<style></style>
