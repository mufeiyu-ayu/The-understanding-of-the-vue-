<template>
    <div>
        <Child v-bind="$attrs" v-on="$listeners" />
    </div>
</template>

<script>
import Child from './Child.vue'
export default {
    name: 'Father',
    components: {
        Child
    },
    mounted() {
        console.log(this)
    }
}
</script>

<style></style>
