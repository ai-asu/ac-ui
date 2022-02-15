<template>
  <div class="ac-chart" :id="id"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useRadarChart from './useRadarChart'
import useCharts from './useCharts'
import {ChartsPropsType} from "./types";
import {_ECOption} from "./echarts";

export default defineComponent({
  name: "AcRadarChart",
  props: {
    id: {
      type: String,
      required: true
    },
    options: Object
  },
  setup(props) {
    const radarOptions = useRadarChart(props as ChartsPropsType)
    useCharts(props as ChartsPropsType, radarOptions as _ECOption, 'radar')
  }
})
</script>