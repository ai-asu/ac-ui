## Title 标签页

### 基础用法

::: demo

```html

<template>
  <ac-title title="深圳湾入境人员概览"/>
</template>

```

:::

### 不同大小

::: demo

```html

<template>
  <ac-title title="深圳湾入境人员概览" size="medium"/>
  <ac-title title="深圳湾入境人员概览" size="small"/>
  <ac-title title="深圳湾入境人员概览" size="mini"/>
</template>

```

:::

### 分割线

::: demo

```html

<template>
  <ac-title title="深圳湾入境人员概览" showSpacer/>
</template>

```

:::

### 背景

::: demo

```html

<template>
  <ac-title
    title="深圳湾入境人员概览"
    showSpacer
    background="linear-gradient(90deg, rgba(0, 213, 255, 0.6), transparent)"
  />
</template>

```

:::

### 可前置或后置元素

::: demo

```html

<ac-title
  showSpacer
  title="深圳湾入境人员概览"
  prefix-icon="ac-icon-5G"
  suffixLabel="已审核：25,698人"
  background="linear-gradient(90deg, rgba(0, 213, 255, 0.6), transparent)"
/>
<ac-title title="深圳湾入境人员概览">
  <template #prefix>
    <i class="ac-icon-5G"></i>
  </template>
  <template #suffix>
    已审核：<span style="color: red">25,698</span>人
  </template>
</ac-title>

```

:::

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| title | 标题内容 | string | — | — |
| size | 标题大小 | string | medium | small | mini | — |
| prefix-icon | 标题头部图标 | string | — | — |
| suffix-label | 标题尾部内容 | string | — | — |
| background | 标题背景 | string | — | — |
| showSpacer | 是否显示标题分割线 | boolean | — | false |

### Slots

| name | 说明 |
| ------ | ------ |
| prefix | 标题头部内容 |
| suffix | 标题尾部内容 |