## PictorialBarChart 象形柱图

基于echarts开发的组件，官网配置项手册：<a :href="$echartsUrl" :target="$echartsUrl">{{$echartsUrl}}</a>

### 基础用法

:::demo 传递参数 `symbol` 自定义图形，详细见官网

```html

<template>
  <ac-pictorial-bar-chart id="pictorialBar" :options="options" class="demo-chart" />
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    setup() {
      return {
        options: {
          xAxis: [{
            data: ['驯鹿', '火箭', '飞机', '高铁', '轮船', '汽车', '跑步', '步行']
          }],
          series: [{
            data: [123, 60, 25, 18, 12, 9, 2, 1],
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
| id | 象形柱图ID | string | — | — |
| options | 配置项，参数与echarts官方一致 | object | — | — |
