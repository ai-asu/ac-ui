## Radar 雷达图

基于echarts开发的组件，官网配置项手册：<a :href="$echartsUrl" :target="$echartsUrl">{{$echartsUrl}}</a>

### 基础用法

:::demo `max` 必传参数

```html

<template>
  <ac-radar-chart id="radar1" :options="options" class="demo-chart" />
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    setup() {
      return {
        options: {
          backgroundColor: '#0B1C25',
          radar: {
            indicator: [
              { text: "数据1" },
              { text: "数据2" },
              { text: "数据3" },
              { text: "数据4" },
              { text: "数据5" }
            ],
            max: 2000
          },
          series: [{
            data: [{
              value: [1186,505,301,902,600]
            }]
          }]
        }
      }
    }
  })
</script>

<style>
  .demo-chart {
    height: 300px;
    background-color: #081113;
  }
</style>
```

:::

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| id | 雷达图ID | string | — | — |
| options | 配置项，参数与echarts官方一致 | object | — | — |

### Attributes radar

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| max | 雷达图最大值 | number | — | — |
