<template>
  <div class="ac-chart" :id="id"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import usePictorialBarChart from './usePictorialBarChart'
import useCharts from './useCharts'
import {ChartsPropsType} from "./types";
import {_ECOption} from "./echarts";

export default defineComponent({
  name: "AcPictorialBarChart",
  props: {
    id: {
      type: String,
      required: true
    },
    options: Object
  },
  setup(props) {
    const pictorialBarOptions = usePictorialBarChart(props as ChartsPropsType)
    useCharts(props as ChartsPropsType, pictorialBarOptions as _ECOption, 'pictorialBar')
  }
})
</script>