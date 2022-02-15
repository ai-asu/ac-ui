## Switch 开关

### 基础用法

::: demo

```html

<template>
  <ac-switch v-model="value"></ac-switch>
</template>
<script>
  export default {
    data() {
      return {
        value: true
      };
    }
  }
</script>
```

:::

### 文字描述

::: demo

```html

<template>
  <ac-switch v-model="value" activeText="开" inactiveText="关"></ac-switch>
</template>
<script>
  export default {
    data() {
      return {
        value: true
      };
    }
  }
</script>
```

:::

### 不同大小

::: demo

```html

<template>
  <ac-switch v-model="value" size="medium"></ac-switch>
  <ac-switch v-model="value" size="small"></ac-switch>
</template>
<script>
  export default {
    data() {
      return {
        value: true
      };
    }
  }
</script>
```

:::

### 禁用状态

::: demo

```html

<template>
  <ac-switch v-model="value" disabled></ac-switch>
  <ac-switch v-model="value1" disabled></ac-switch>
</template>
<script>
  export default {
    data() {
      return {
        value: true,
        value1: false
      };
    }
  }
</script>
```

:::

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| v-model | 绑定值 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| active-text | switch 打开时的文字描述 | string | — | — |
| inactive-text | switch 关闭时的文字描述 | string | — | — |
| size | switch 的尺寸 | string | medium | small | — |

### Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| change | switch 状态发生变化时的回调函数 | 新状态的值 |