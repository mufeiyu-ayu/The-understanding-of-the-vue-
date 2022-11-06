<template>
    <div>
        <h1>家庭资产:{{ value }}</h1>
        <!-- <Father
      :fatherM="fatherM"
      @earnMoney="earnMoney"
      @update="value=>this.fatherM=value"
     /> -->
        <!-- <Father :fatherM="fatherM" @earnMoney="earnMoney" :value.sync="fatherM" /> -->
        <Father @earnMoney="earnMoney" v-model="value" />
        <Child :childM="childM" @getMoney="getMoney" />
    </div>
</template>

<script>
import Father from './Father.vue'
import Child from './Child.vue'
export default {
    name: 'Mother',
    data() {
        return {
            fatherM: 3000,
            childM: 0,
            value: 3000
        }
    },
    components: {
        Father,
        Child
    },
    methods: {
        earnMoney(num) {
            this.value += num
        },
        getMoney(num) {
            this.value -= num
            this.childM += num
        }
    }
}
</script>

<style></style>
