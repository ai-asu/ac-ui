<template>
  <div class="ac-chart" :id="id"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useLineChart from "./useLineChart";
import useCharts from "./useCharts";
import {ChartsPropsType} from "./types";
import {_ECOption} from "./echarts";

export default defineComponent({
  name: "AcLineChart",
  props: {
    id: {
      type: String,
      required: true
    },
    options: Object
  },
  setup(props) {
    const lineOptions = useLineChart(props as ChartsPropsType)
    useCharts(props as ChartsPropsType, lineOptions as _ECOption, 'line')
  }
})
</script>