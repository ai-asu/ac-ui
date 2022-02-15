<template>
  <div class="ac-chart" :id="id"></div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import useBarChart from './useBarChart'
import useCharts from './useCharts'
import {BarChartType, ChartsPropsType, DirectionType} from "./types";
import {_ECOption} from "./echarts";

export default defineComponent({
  name: "AcBarChart",
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
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
    const barOptions = useBarChart(props as ChartsPropsType)
    useCharts(props as ChartsPropsType, barOptions as _ECOption, 'bar')
  }
})
</script>