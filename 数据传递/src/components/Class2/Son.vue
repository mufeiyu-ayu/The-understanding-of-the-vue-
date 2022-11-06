<template>
    <div>
        <h1>孙子继承孩子的资产：{{ money }}</h1>
        <button @click="useMoney">用钱</button>
    </div>
</template>

<script>
export default {
    name: 'Child',
    props: {
        money: Number
    },
    methods: {
        useMoney() {
            this.$eventDispatch('useMoney', 100)
        }
    }
}
</script>

<style></style>
