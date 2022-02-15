### Input 输入框

### 基础用法

:::demo

```html

<template>
  <ac-input v-model="input" placeholder="请输入内容"/>
</template>
<script>
  export default {
    data() {
      return {
        input: ""
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
  <ac-input v-model="input" placeholder="请输入内容" disabled/>
</template>
<script>
  export default {
    data() {
      return {
        input: ""
      };
    }
  }
</script>
```

:::

### 可清空

:::demo

```html

<template>
  <ac-input v-model="input" placeholder="请输入内容" clearable/>
</template>
<script>
  export default {
    data() {
      return {
        input: ""
      };
    }
  }
</script>
```

:::

### 带 icon 的输入框

带有图标标记输入类型
:::demo

```html

<template>
  <div class="demo-input-suffix">
    属性方式：
    <ac-input
      placeholder="请选择日期"
      suffix-icon="ac-icon-riqi"
      v-model="input1">
    </ac-input>
    <ac-input
      placeholder="请输入内容"
      prefix-icon="ac-icon-search"
      v-model="input2">
    </ac-input>
  </div>
  <div class="demo-input-suffix">
    slot 方式：
    <ac-input
      placeholder="请选择日期"
      v-model="input3">
      <template #suffix>
        <i class="ac-input__icon ac-icon-riqi"></i>
      </template>
    </ac-input>
    <ac-input
      placeholder="请输入内容"
      v-model="input4">
      <template #prefix>
        <i class="ac-input__icon ac-icon-search"></i>
      </template>
    </ac-input>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        input1: "",
        input2: "",
        input3: "",
        input4: ""
      };
    }
  }
</script>
<style lang="scss">
  .demo-input-suffix {
    color: #fff;
    &:first-child {
      margin-bottom: 20px;
    }
    .ac-input {
      margin-right: 20px;
    }
  }
</style>
```

:::

### 输入长度限制

:::demo

```html

<template>
  <ac-input
    v-model="input"
    placeholder="请输入内容"
    :maxLength="10"
    show-word-limit
  />
</template>
<script>
  export default {
    data() {
      return {
        input: ""
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
| type | 类型 | string | text 和其他 原生 input 的 type 值，textarea除外 | text |
| maxLength | 最大输入长度 | string / number | — | — |
| show-word-limit | 是否显示输入字数统计，只在 type = "text" 时有效 | boolean | — | false |
| placeholder | 输入框占位文本 | string | — | — |
| clearable | 是否可清空 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| prefix-icon | 输入框头部图标 | string | — | — |
| suffix-icon | 输入框尾部图标 | string | — | — |
| readonly | 原生属性，是否只读 | boolean | — | false |

### Slots

| name | 说明 |
| ------ | ------ |
| prefix | 输入框头部内容，只对 type="text" 有效 |
| suffix | 输入框尾部内容，只对 type="text" 有效 |

### Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| blur | 在 Input 失去焦点时触发 | (event: Event) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
| change | 仅在输入框失去焦点或用户按下回车时触发 | (value: string / number) |
| input | 在 Input 值改变时触发 | (value: string / number) |
| clear |    在点击由 clearable 属性生成的清空按钮时触发 | — |

### Methods

| 方法名 | 说明 |
| ------ | ------ |
| focus | 使 input 获取焦点 | — |
| blur | 使 input 失去焦点 | — |
| select | 选中 input 中的文字 | — |
