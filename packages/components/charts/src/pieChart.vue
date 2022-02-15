<template>
  <div class="ac-chart" :id="id"></div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import usePieChart from './usePieChart'
import useCharts from './useCharts'
import {ChartsPropsType, PieChartType} from "./types";
import {_ECOption} from "./echarts";

export default defineComponent({
  name: "AcPieChart",
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String as PropType<PieChartType>,
      default: 'basic',
      validator: (val: string) => {
        return [
          'basic',
          'divide',
          'waterPolo'
        ].includes(val)
      }
    },
    options: Object
  },
  setup(props) {
    const barOptions = usePieChart(props as ChartsPropsType)
    useCharts(props as ChartsPropsType, barOptions as _ECOption, 'pie')
  }
})
</script>