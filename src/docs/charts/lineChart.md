## Line 折线图

基于echarts开发的组件，官网配置项手册：<a :href="$echartsUrl" :target="$echartsUrl">{{$echartsUrl}}</a>

### 基础用法

:::demo

```html

<template>
  <ac-line-chart id="line1" :options="options" class="demo-chart"/>
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    setup() {
      return {
        options: {
          tooltip: {
            formatter: (params) => {
              return params[0].axisValue + '：' + params[0].data.toLocaleString('en-US') + '人'
            }
          },
          xAxis: [{
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }],
          series: [{
            data: [150, 230, 224, 218, 135, 147, 260]
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

### 平滑曲线

:::demo `smooth` 是否平滑曲线显示；boundaryGap 坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样

```html

<template>
  <ac-line-chart id="line2" :options="options" class="demo-chart"/>
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    setup() {
      return {
        options: {
          tooltip: {
            formatter: (params) => {
              return params[0].axisValue + '：' + params[0].data.toLocaleString('en-US') + '人'
            }
          },
          xAxis: [{
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }],
          series: [{
            smooth: true,
            data: [150, 230, 224, 218, 135, 147, 260],
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

### 基础面积图

:::demo areaStyle 区域填充样式，设置后显示成区域面积图

```html

<template>
  <ac-line-chart id="line3" :options="options" class="demo-chart"/>
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    setup() {
      return {
        options: {
          tooltip: {
            formatter: (params) => {
              return params[0].axisValue + '：' + params[0].data.toLocaleString('en-US') + '人'
            }
          },
          xAxis: [{
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }],
          series: [{
            data: [150, 230, 224, 218, 135, 147, 260],
            areaStyle: {}
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

### 折线图堆叠

:::demo `stack` 设置堆叠

```html

<template>
  <ac-line-chart id="line4" :options="options" class="demo-chart"/>
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    setup() {
      return {
        options: {
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '直接访问',
              type: 'line',
              stack: '总量',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
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

### 堆叠面积图

:::demo

```html

<template>
  <ac-line-chart id="line5" :options="options" class="demo-chart"/>
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    setup() {
      return {
        options: {
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '直接访问',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              label: {
                show: true,
                position: 'top'
              },
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [820, 932, 901, 934, 1290, 1330, 1320]
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

### 渐变堆叠面积图

:::demo

```html

<template>
  <ac-line-chart id="line6" :options="options" class="demo-chart"/>
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    setup() {
      return {
        options: {
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [
            {
              name: 'Line 1',
              type: 'line',
              stack: '总量',
              smooth: true,
              lineStyle: {
                width: 0
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(128, 255, 165)'
                  }, {
                    offset: 1, color: 'rgba(1, 191, 236)'
                  }],
                  global: false
                }
              },
              emphasis: {
                focus: 'series'
              },
              data: [140, 232, 101, 264, 90, 340, 250]
            },
            {
              name: 'Line 2',
              type: 'line',
              stack: '总量',
              smooth: true,
              lineStyle: {
                width: 0
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(0, 221, 255)'
                  }, {
                    offset: 1, color: 'rgba(77, 119, 255)'
                  }],
                  global: false
                }
              },
              emphasis: {
                focus: 'series'
              },
              data: [120, 282, 111, 234, 220, 340, 310]
            },
            {
              name: 'Line 3',
              type: 'line',
              stack: '总量',
              smooth: true,
              lineStyle: {
                width: 0
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(55, 162, 255)'
                  }, {
                    offset: 1, color: 'rgba(116, 21, 219)'
                  }],
                  global: false
                }
              },
              emphasis: {
                focus: 'series'
              },
              data: [320, 132, 201, 334, 190, 130, 220]
            },
            {
              name: 'Line 4',
              type: 'line',
              stack: '总量',
              smooth: true,
              lineStyle: {
                width: 0
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,

                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(255, 0, 135)'
                  }, {
                    offset: 1, color: 'rgba(135, 0, 157)'
                  }],
                  global: false
                }
              },
              emphasis: {
                focus: 'series'
              },
              data: [220, 402, 231, 134, 190, 230, 120]
            },
            {
              name: 'Line 5',
              type: 'line',
              stack: '总量',
              smooth: true,
              lineStyle: {
                width: 0
              },
              showSymbol: false,
              label: {
                show: true,
                position: 'top'
              },
              areaStyle: {
                opacity: 0.8,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(255, 191, 0)'
                  }, {
                    offset: 1, color: 'rgba(224, 62, 76)'
                  }],
                  global: false
                }
              },
              emphasis: {
                focus: 'series'
              },
              data: [220, 302, 181, 234, 210, 290, 150]
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

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| id | 折线图ID | string | — | — |
| options | 配置项，参数与echarts官方一致 | object | — | — |