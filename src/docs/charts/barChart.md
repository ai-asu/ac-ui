## Bar 柱状图

基于echarts开发的组件，官网配置项手册：<a :href="$echartsUrl" :target="$echartsUrl">{{$echartsUrl}}</a>

### 基础用法

:::demo

```html

<template>
  <ac-bar-chart id="bar1" :options="options" class="demo-chart" />
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
            data: ['数据1', '数据2', '数据3', '数据4', '数据5']
          }],
          series: [{
            data: [11210, 14263, 23519, 6024, 32540]
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

### 横向柱状图

:::demo 可以使用 `direction` 属性来定义图形方向，可选值： `vertical` 、 `horizontal`

```html

<template>
  <ac-bar-chart id="bar2" :options="options" direction="horizontal" class="demo-chart" />
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    setup() {
      return {
        options: {
          tooltip: {
            formatter: (params) => {
              return params[0].axisValue + '：' + params[0].data.toLocaleString('en-US') + '人';
            }
          },
          grid: {
            left: 10,
            top: 10,
            bottom: 10,
            right: 50,
            containLabel: true
          },
          yAxis: [{
            data: ['数据6', '数据7', '数据8', '数据9', '数据10']
          }],
          series: [{
            data: [11210, 14263, 23519, 6024, 32540]
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

### 组合柱状图

:::demo

```html

<template>
  <ac-bar-chart id="bar3" :options="options1" class="demo-chart" />
  <ac-bar-chart id="bar4" :options="options2" class="demo-chart" />
  <div style="clear: both;"></div>
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    setup() {
      return {
        options1: {
          legend: {
            show: false
          },
          tooltip: {
            formatter: (params) => {
              let html = params[0].axisValue + '<br/>'
              params.forEach(item => {
                html += item.seriesName + '：' + item.value.toLocaleString('en-US') + ' 人' + '<br>'
              })
              return html
            }
          },
          xAxis: [{
            data: ['数据1', '数据2', '数据3', '数据4', '数据5']
          }],
          series: [{
            name: '类1',
            barWidth: 20,
            data: [11210, 14263, 23519, 6024, 32540],
            normalColor: ['#3194F7', 'transparent'],
            emphasisColor: ['#499BFF', 'transparent']
          },{
            name: '类2',
            barWidth: 12,
            data: [11201, 14613, 13519, 1604, 31240],
            normalColor: ['#4466F4', 'transparent'],
            emphasisColor: ['#499BFF', 'transparent']
          }]
        },
        options2: {
          grid: {
            top: 30
          },
          tooltip: {
            formatter: (params) => {
              let html = params[0].axisValue + '<br/>'
              params.forEach(item => {
                html += item.seriesName + '：' + item.value.toLocaleString('en-US') + ' 人' + '<br>'
              })
              return html
            }
          },
          xAxis: [{
            data: ['数据1', '数据2', '数据3', '数据4', '数据5']
          }],
          series: [{
            name: '类1',
            barWidth: 20,
            data: [11210, 14263, 23519, 6024, 32540],
            normalColor: ['#3194F7', 'transparent'],
            emphasisColor: ['#499BFF', 'transparent']
          },{
            name: '类2',
            barWidth: 20,
            data: [11210, 14263, 23519, 6024, 32540],
            itemStyle: {
              color: 'red'
            }
          },{
            name: '类3',
            barWidth: 20,
            data: [11210, 14263, 23519, 6024, 32540],
            normalColor: ['#229FE2'],
            emphasisColor: ['#499BFF']
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
  #bar3,
  #bar4 {
    width: 50%;
    float: left;
  }
</style>
```

:::

### 分隔柱状图

:::demo 传递参数 `type="divide"`，需传递参数 `backgroundColor`

```html

<template>
  <ac-bar-chart id="bar5" type="divide" :options="options" class="demo-chart" />
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    setup() {
      return {
        options: {
          backgroundColor: '#3C5064',
          tooltip: {
            formatter: (params) => {
              return params[0].axisValue + '：' + params[0].data.toLocaleString('en-US') + '人'
            }
          },
          xAxis: [{
            data: ['数据1', '数据2', '数据3', '数据4', '数据5'],
            axisLine: {
              show: false
            }
          }],
          yAxis: [{
            axisLine: {
              show: false
            }
          }],
          series: [{
            barWidth: 20,
            data: [11210, 14263, 23519, 6024, 32540],
            normalColor: ['#4BC6C1', '#458DE6']
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

### 堆叠柱状图

:::demo 传递参数 `type="stack"`，分隔柱状图可与堆叠柱状图同时出现，只需传递参数 `backgroundColor`

```html

<template>
  <ac-bar-chart id="bar6" type="stack" :options="options1" class="demo-chart" />
  <ac-bar-chart id="bar7" type="stack" :options="options2" class="demo-chart" />
  <div style="clear: both"></div>
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    setup() {
      return {
        options1: {
          grid: {
            top: 30
          },
          tooltip: {
            formatter: (params) => {
              let html = params[0].name + '<br/>'
              params.forEach(item => {
                html += item.seriesName + '：' + item.value.toLocaleString('en-US') + ' 人' + '<br>'
              })
              return html
            }
          },
          xAxis: [{
            data: ['数据1', '数据2', '数据3'],
            axisLine: {
              show: false
            }
          }],
          yAxis: [{
            axisLine: {
              show: false
            }
          }],
          series: [{
            name: '类1',
            barWidth: 20,
            data: [1940, 2767, 1940],
            normalColor: ['#2E81E5'],
          },{
            name: '类2',
            barWidth: 20,
            data: [100, 271, 300],
            normalColor: ['#4BC6C1'],
          },{
            name: '类3',
            barWidth: 20,
            data: [160, 1000, 160],
            normalColor: ['#6E8BEC'],
          }]
        },
        options2: {
          backgroundColor: '#3C5064',
          grid: {
            top: 30
          },
          tooltip: {
            formatter: (params) => {
              let html = params[0].name + '<br/>'
              params.forEach(item => {
                html += item.seriesName + '：' + item.value.toLocaleString('en-US') + ' 人' + '<br>'
              })
              return html
            }
          },
          xAxis: [{
            data: ['数据1', '数据2', '数据3'],
            axisLine: {
              show: false
            }
          }],
          yAxis: [{
            axisLine: {
              show: false
            }
          }],
          series: [{
            name: '类1',
            barWidth: 20,
            data: [1940, 2767, 1940],
            normalColor: ['#2E81E5'],
          },{
            name: '类2',
            barWidth: 20,
            data: [100, 271, 300],
            normalColor: ['#4BC6C1'],
          },{
            name: '类3',
            barWidth: 20,
            data: [160, 1000, 160],
            normalColor: ['#6E8BEC'],
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
  #bar6,
  #bar7 {
    width: 50%;
    float: left;
  }

</style>
```

:::

### 立体柱状图

:::demo 传递参数 `type="customSquare"`，立体柱状图实际上是由三个图层组合而成，需传递参数 `colors: { left: ['#00D5FF', '#995CFF'], right: ['#45E0FF', '#AD7EFF'], top: ['#A9F1FF'] }`

```html

<template>
  <ac-bar-chart id="bar8" type="customSquare" :options="options" class="demo-chart" />
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
            data: ['数据1', '数据2', '数据3', '数据4', '数据5']
          }],
          series: [{
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

### 圆柱柱状图

:::demo 传递参数 `type="cylinder"`， 可传递 `bottomImage` 参数展示底部图片

```html

<template>
  <ac-bar-chart id="bar9" type="cylinder" :options="options1" class="demo-chart" />
  <ac-bar-chart id="bar10" type="cylinder" :options="options2" class="demo-chart" />
  <div style="clear: both"></div>
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    setup() {
      const options1 = {
        tooltip: {
          formatter: (params) => {
            return params[0].axisValue + '：' + params[0].data.toLocaleString('en-US') + '人'
          }
        },
        xAxis: [{
          data: ['数据1', '数据2', '数据3', '数据4', '数据5']
        }],
        series: [{
          barWidth: 20,
          data: [11210, 14263, 23519, 6024, 32540],
          normalColor: ['#00D5FF', '#995CFF'],
          emphasisColor: ['#45E0FF', '#AD7EFF']
        }]
      }

      return {
        options1,
        options2: {
          ...options1,
          xAxis: [{
            axisLabel: {
              margin: 50,
              fontSize: 14,
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.45)',
            },
            axisLine: {
              show: false
            },
            data: ['数据1', '数据2', '数据3', '数据4', '数据5']
          }],
          yAxis: [{
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            }
          }],
          series: [{
            ...options1.series[0],
            bottomImage: {
              path: "image://http://111.230.91.199:6002/data/charts/base.png",
              size: 50
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
  #bar9,
  #bar10 {
    width: 50%;
    float: left;
  }
</style>
```

:::

### 进度柱状图

:::demo 传递参数 `type="progress"`， 需额外传递 `total` 参数总数，可传递 `totalColor` 参数自定义总数颜色

```html

<template>
  <ac-bar-chart id="bar11" type="progress" :options="options1" class="demo-chart" />
  <ac-bar-chart id="bar12" type="progress" direction="horizontal" :options="options2" class="demo-chart" />
  <div style="clear: both"></div>
</template>

<script>
  import {defineComponent} from 'vue'

  export default defineComponent({
    setup() {
      const options = {
        tooltip: {
          formatter: (params) => {
            return params[0].axisValue + '：' + params[0].data.toLocaleString('en-US') + '人'
          }
        },
        xAxis: [{
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          }
        }],
        yAxis: [{
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          }
        }],
        series: [{
          barWidth: 8,
          data: [20900, 28950, 11300, 19800, 19050],
          total: 100000,
          normalColor: ['#624DFF', '#21CDFF']
        }]
      }
      return {
        options1: options,
        options2: {
          ...options,
          series: [{
            ...options.series[0],
            label: {
              show: true,
              position: 'top'
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
  #bar11,
  #bar12 {
    width: 50%;
    float: left;
  }
</style>
```

:::

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| id | 柱状图ID | string | — | — |
| type | 柱状图类型 | string | basic / divide / stack / customSquare / cylinder / progress | — |
| direction | 柱状图方向 | string | vertical / horizontal | — |
| options | 配置项，参数与echarts官方一致 | object | — | — |

### Attributes series

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| normalColor(series-itemStyle-color的简化参数，若不满足需求则按官方文档自行配置) | 柱子默认颜色(数组长度为1时是纯色，长度为2时是渐变色) | array | — | ['#3194F7', 'transparent'] |
| emphasisColor(series-emphasis-itemStyle-color的简化参数，若不满足需求则按官方文档自行配置) | 柱子高亮颜色(数组长度为1时是纯色，长度为2时是渐变色) | array | — | ['#4466F4', 'transparent'] |
| bottomImage | 仅在 `type="cylinder"` 有效，展示底部图片，参数包含path路径、size大小 | object | — | — |
| total | 仅在 `type="progress"` 有效，进度条总数 | object | — | — |
| totalColor | 仅在 `type="progress"` 有效，自定义进度条总数颜色 | object | — | — |