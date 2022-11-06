<template>
    <div>
        <h1>孩子继承爸爸的资产：{{ money }}</h1>
        <Son :money="money" @notice="notice" />
    </div>
</template>

<script>
import Son from './Son.vue'
export default {
    name: 'Child',
    props: {
        money: Number
    },
    components: {
        Son
    },
    methods: {
        notice() {
            console.log('孙子：我用钱了')
        }
    }
}
</script>

<style></style>
