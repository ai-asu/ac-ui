## Radio 单选框

### 基础用法

::: demo

```html

<template>
  <ac-radio v-model="radio" label="1">备选项</ac-radio>
  <ac-radio v-model="radio" label="2">备选项</ac-radio>
</template>
<script>
  export default {
    data() {
      return {
        radio: "1"
      };
    }
  }
</script>
```

:::

### 禁用状态 单选框不可用的状态。

::: demo

```html

<template>
  <ac-radio v-model="radio" label="禁用">备选项</ac-radio>
  <ac-radio v-model="radio" label="选中且禁用">备选项</ac-radio>
</template>
<script>
  export default {
    data() {
      return {
        radio: "选中且禁用"
      };
    }
  }
</script>
```

:::

### 单选框组 适用于在多个互斥的选项中选择的场景

::: demo

```html

<template>
  <ac-radioGroup v-model="radio">
    <ac-radio :label="3">备选项</ac-radio>
    <ac-radio :label="6">备选项</ac-radio>
    <ac-radio :label="9">备选项</ac-radio>
  </ac-radioGroup>
</template>
<script>
  export default {
    data() {
      return {
        radio: 3
      };
    }
  }
</script>
```

:::

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| v-model  | 绑定值  | string | number | boolean  | —  | — |
| label  | Radio 的 value  | string | number | boolean  | —  | — | 
| disabled  | 是否禁用  | boolean  | —  | false | 

### Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| change  | 绑定值变化时触发的事件  | 选中的 Radio label 值 | 

### Radio-group Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| v-model  | 绑定值  | string | number | boolean  | —  | — | 
| disabled  | 是否禁用  | boolean  | —  | false | 

### Radio-group Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| change  | 绑定值变化时触发的事件  | 选中的 Radio label 值 |