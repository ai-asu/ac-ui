<template>
  <div class="ac-chart" :id="id"></div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import useLineBarChart from './useLineBarChart'
import useCharts from './useCharts'
import {BarChartType, ChartsPropsType, DirectionType} from "./types";
import {_ECOption} from "./echarts";


export default defineComponent({
  name: "AcLineBarChart",
  props: {
    id: {
      type: String,
      required: true
    },
    barType: {
      type: String as PropType<BarChartType>,
      default: 'basic',
      validator: (val: string) => {
        return [
          'basic',
          'divide',
          'stack',
          'customSquare',
          'cylinder',
          'progress'
        ].includes(val)
      }
    },
    direction: {
      type: String as PropType<DirectionType>,
      default: 'vertical',
      validator: (val: string) => {
        return [
          'vertical',
          'horizontal',
        ].includes(val)
      }
    },
    options: Object
  },
  setup(props) {
    const lineBarOptions = useLineBarChart(props as ChartsPropsType)
    useCharts(props as ChartsPropsType, lineBarOptions as _ECOption, 'line-bar')
  }
})
</script>