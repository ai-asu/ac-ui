## Checkbox 复选框

### 基础用法

基础的按钮用法。

:::demo

```html

<template>
  <ac-checkbox v-model="checked">备选项</ac-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        checked: true
      };
    }
  }
</script>
```

:::

### 禁用状态

单选框不可用的状态。

:::demo

```html

<template>
  <ac-checkbox v-model="checked1" disabled>备选项</ac-checkbox>
  <ac-checkbox v-model="checked2" disabled>备选项</ac-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        checked1: false,
        checked2: true
      };
    }
  }
</script>
```

:::

### 多选框组

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

:::demo

```html

<template>
  <ac-checkbox-group v-model="checkList">
    <ac-checkbox label="复选框 A"></ac-checkbox>
    <ac-checkbox label="复选框 B"></ac-checkbox>
    <ac-checkbox label="复选框 C"></ac-checkbox>
    <ac-checkbox label="禁用" disabled></ac-checkbox>
    <ac-checkbox label="选中且禁用" disabled></ac-checkbox>
  </ac-checkbox-group>
</template>
<script>
  export default {
    data() {
      return {
        checkList: ["选中且禁用", "复选框 A"]
      };
    }
  }
</script>
```

:::

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| v-model | 绑定值 | string / number / boolean | — | — |
| label | 选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效） | string / number / boolean | — | — |
| true-label | 选中时的值 | string / number | — | — |
| false-label | 没有选中时的值 | string / number | — | — |
| disabled | 是否禁用 | boolean | — | false |
| checked | 当前是否勾选 | boolean | — | false |

### Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| change | 当绑定值变化时触发的事件 | 更新后的值 |

### Checkbox-group Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| v-model | 绑定值 | string / number / boolean | — | — |
| disabled | 是否禁用 | boolean | — | false |

### Checkbox-group Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| change | 当绑定值变化时触发的事件 | 更新后的值 |
