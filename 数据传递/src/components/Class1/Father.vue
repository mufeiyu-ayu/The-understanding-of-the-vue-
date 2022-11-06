<template>
    <div>
        <h2>父亲资产:{{ value }}</h2>
        <button @click="earnMoney">赚钱</button>
        <button @click="invest">投资</button>
    </div>
</template>

<script>
export default {
    name: 'Father',
    data() {
        return {}
    },
    props: {
        value: Number
    },
    methods: {
        earnMoney() {
            this.$emit('earnMoney', 100)
        },
        invest() {
            // this.$emit('invest', 1000)
            // this.$emit('update:value', 1000)
            this.$emit('input', 1000)
        }
    }
}
</script>

<style></style>
