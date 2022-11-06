<template>
    <div>
        <h1>八八八继承爷爷的资产:{{ money }}</h1>
        <Child :money="money" @notice="notice" />
    </div>
</template>

<script>
import Child from './Child.vue'
export default {
    name: 'Father',
    props: {
        money: Number
    },
    components: {
        Child
    },
    methods: {
        notice() {
            console.log('孩子:用钱了')
        }
    }
}
</script>

<style></style>
