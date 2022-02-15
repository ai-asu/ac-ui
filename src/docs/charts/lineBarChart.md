## LineBarChart 组合图表

目前只支持折线+柱状

基于echarts开发的组件，官网配置项手册：<a :href="$echartsUrl" :target="$echartsUrl">{{$echartsUrl}}</a>

### 使用用法

组合图表 `series-type` 参数不能省略，柱状图类型与 BarChart一致

:::demo 传递参数 `barType` 与 折线组合

```html

<template>
  <ac-line-bar-chart id="line-bar" barType="customSquare" :options="options" class="demo-chart" />
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    setup() {
      return {
        options: {
          xAxis: [{
            data: ['数据1', '数据2', '数据3', '数据4', '数据5']
          }],
          series: [{
            type: 'line',
            data: [11210, 14263, 23519, 6024, 32540]
          },{
            type: 'bar',
            barWidth: 20,
            data: [11210, 14263, 23519, 6024, 32540],
            colors: {
              left: ['#00D5FF', '#995CFF'],
              right: ['#45E0FF', '#AD7EFF'],
              top: ['#A9F1FF'],
            }
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
| id | 组合图ID | string | — | — |
| barType | 柱状图类型（与 BarChart 柱状图一致） | string | basic / divide / stack / customSquare / cylinder / progress | — |
| direction | 组合图方向 | string | vertical / horizontal | — |
| options | 配置项，参数与echarts官方一致 | object | — | — |

### Attributes series

与 BarChart 柱状图一致