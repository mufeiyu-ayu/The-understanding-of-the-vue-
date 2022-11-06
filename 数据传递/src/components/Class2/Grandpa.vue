<template>
    <div>
        <h1>爷爷的资产:{{ money }}</h1>
        <Father :money="money" @useMoney="useMoney" />
    </div>
</template>

<script>
import Father from './Father.vue'
export default {
    name: 'GrandPa',
    data() {
        return {
            money: 10000
        }
    },
    components: {
        Father
    },
    methods: {
        useMoney(num) {
            this.money -= num
            this.$eventBrodcast('notice', 11)
        }
    }
}
</script>

<style></style>
