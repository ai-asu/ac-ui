## Tabs 标签页

### 基础用法

注：目前ac-tabs的v-model，ac-tab-pane的name都必传，todo

::: demo

```html

<template>
  <ac-tabs v-model="activeName" @tab-click="handleClick">
    <ac-tab-pane label="人员统计" name="first">人员统计</ac-tab-pane>
    <ac-tab-pane label="隔离酒店" name="second">隔离酒店</ac-tab-pane>
    <ac-tab-pane label="出境统计" name="third">出境统计</ac-tab-pane>
  </ac-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: "second"
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
```

:::

### Tabs Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值|
| ------ | ------ | ------ | ------ | ------ |
| v-model | 绑定值，选中选项卡的 name | string | — | 第一个选项卡的 name |

### Tabs Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| tab-click | tab 被选中时触发 | 被选中的标签 tab 实例 |

### Tab-pane Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| label | 选项卡标题 | string | — | — |
| name | 与选项卡绑定值 value 对应的标识符，表示选项卡别名 | string | — | — |