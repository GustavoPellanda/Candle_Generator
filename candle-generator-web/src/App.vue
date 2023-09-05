<template>
    <Header></Header>
    <CandleStickChart />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import CandleStickChart from './components/CandleStickChart.vue';
import Header from './components/Header.vue';

@Options({
  components: {
    Header,
    CandleStickChart
  }
})
export default class App extends Vue {}
</script>

<style>
</style>
