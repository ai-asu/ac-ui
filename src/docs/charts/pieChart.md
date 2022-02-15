## Pie 饼图

基于echarts开发的组件，官网配置项手册：<a :href="$echartsUrl" :target="$echartsUrl">{{$echartsUrl}}</a>

### 基础用法

:::demo

```html

<template>
  <ac-pie-chart id="pie1" :options="options" class="demo-chart" />
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    setup() {
      return {
        options: {
          series: [
            {
              data: [
                {value: 1048, name: '搜索引擎'},
                {value: 735, name: '直接访问'},
                {value: 580, name: '邮件营销'},
                {value: 484, name: '联盟广告'},
                {value: 300, name: '视频广告'}
              ]
            }
          ]
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

### 环形饼图

:::demo 通过设置 `radius` 实现环形图，详细见官网

```html

<template>
  <ac-pie-chart id="pie2" :options="options" class="demo-chart" />
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    setup() {
      return {
        options: {
          series: [
            {
              radius: ['35%', '50%'],
              data: [
                {value: 1048, name: '搜索引擎'},
                {value: 735, name: '直接访问'},
                {value: 580, name: '邮件营销'},
                {value: 484, name: '联盟广告'},
                {value: 300, name: '视频广告'}
              ],
              colors: [['#3056B5', '#5781EC'], ['#406BF4', '#0AC4FD'], ['#2287AC', '#53D5E7'], ['#148B6E', '#79F3E6'], ['#53D5E7', '#148B6E']],
            }
          ]
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

### 南丁格尔玫瑰图

:::demo 通过设置 `roseType = true` 实现南丁格尔玫瑰图，详细见官网

```html

<template>
  <ac-pie-chart id="pie3" :options="options" class="demo-chart" />
  <ac-pie-chart id="pie4" :options="options1" class="demo-chart" />
  <div style="clear: both"></div>
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    setup() {
      return {
        options: {
          series: [
            {
              radius: ['35%', '50%'],
              roseType: true,
              data: [
                {value: 1048, name: '搜索引擎'},
                {value: 735, name: '直接访问'},
                {value: 580, name: '邮件营销'},
                {value: 484, name: '联盟广告'},
                {value: 300, name: '视频广告'}
              ],
              colors: [['#3056B5', '#5781EC'], ['#406BF4', '#0AC4FD'], ['#2287AC', '#53D5E7'], ['#148B6E', '#79F3E6'], ['#53D5E7', '#148B6E']],
            }
          ]
        },
        options1: {
          series: [
            {
              roseType: true,
              data: [
                {value: 1048, name: '搜索引擎'},
                {value: 735, name: '直接访问'},
                {value: 580, name: '邮件营销'},
                {value: 484, name: '联盟广告'},
                {value: 300, name: '视频广告'}
              ],
            }
          ]
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
  #pie3,
  #pie4 {
    width: 50%;
    float: left;
  }
</style>
```

:::

### 分割饼图

:::demo 传递参数 `type="divide"`

```html

<template>
  <ac-pie-chart id="pie5" type="divide" :options="options" class="demo-chart" />
  <ac-pie-chart id="pie6" type="divide" :options="options1" class="demo-chart" />
  <div style="clear: both"></div>
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    setup() {
      return {
        options: {
          series: [
            {
              radius: ['35%', '50%'],
              data: [
                {value: 1048, name: '搜索引擎'},
                {value: 735, name: '直接访问'},
                {value: 580, name: '邮件营销'},
                {value: 484, name: '联盟广告'},
                {value: 300, name: '视频广告'}
              ]
            }
          ]
        },
        options1: {
          series: [
            {
              data: [
                {value: 1048, name: '搜索引擎'},
                {value: 735, name: '直接访问'},
                {value: 580, name: '邮件营销'},
                {value: 484, name: '联盟广告'},
                {value: 300, name: '视频广告'}
              ],
              colors: [['#3056B5', '#5781EC'], ['#406BF4', '#0AC4FD'], ['#2287AC', '#53D5E7'], ['#148B6E', '#79F3E6'], ['#53D5E7', '#148B6E']],
            }
          ]
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
  #pie5,
  #pie6 {
    width: 50%;
    float: left;
  }
</style>
```

:::

### 水球图

:::demo 传递参数 `type="waterPolo"`

```html

<template>
  <ac-pie-chart id="pie7" type="waterPolo" :options="options" class="demo-chart" />
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    setup() {
      return {
        options: {
          series: [{
            data: [{ value: 0.6 }]
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
| id | 饼图ID | string | — | — |
| type | 饼图类型 | string | basic / divide | — |
| options | 配置项，参数与echarts官方一致 | object | — | — |

### Attributes series

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| colors | series-data-itemStyle-color的简化参数，若不满足需求则按官方文档自行配置 | 二维array | — | — |
