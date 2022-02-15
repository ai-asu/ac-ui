## Table 表格

### 基础用法

::: demo

```html

<template>
  <ac-table :columns="columns" :data="list"/>
</template>
<script>
  export default {
    data() {
      return {
        columns: [
          {
            label: "姓名",
            key: "name"
          },
          {
            label: "手机号码",
            key: "phone",
          },
          {
            label: "收件地址",
            key: "address",
          },
        ],
        list: [
          {
            name: "二毛",
            phone: "17877963157",
            address: "深圳市南山区西丽街道航天微电机大厦A座5层"
          },
          {
            name: "路飞",
            phone: "0755-86990277",
            address: "深圳市南山区粤海街道腾讯大厦"
          },
          {
            name: "山治",
            phone: "15877583348",
            address: "深圳市南山区粤海街道软件产业基地4B栋9层"
          },
        ]
      };
    }
  }
</script>
```

:::

### 显示序号

::: demo

```html

<template>
  <ac-table :columns="columns" :data="list" showIndex />
</template>
<script>
  export default {
    data() {
      return {
        columns: [
          {
            label: "姓名",
            key: "name"
          },
          {
            label: "手机号码",
            key: "phone",
          },
          {
            label: "收件地址",
            key: "address",
            ellipsis: true
          },
        ],
        list: [
          {
            name: "二毛",
            phone: "17877963157",
            address: "深圳市南山区西丽街道航天微电机大厦A座5层"
          },
          {
            name: "路飞",
            phone: "0755-86990277",
            address: "深圳市南山区粤海街道腾讯大厦"
          },
          {
            name: "山治",
            phone: "15877583348",
            address: "深圳市南山区粤海街道软件产业基地4B栋9层"
          },
        ]
      };
    }
  }
</script>
```

:::

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| data | 数据来源 | array | — | — |
| columns | 表格列的配置描述 | array | — | — |
| show-index | 是否显示序号 | boolean | — | false |
| empty-text | 空数据时显示的文本内容，也可以通过 #empty 设置 | String | — | 暂无数据

### column

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| align | 设置列内容的对齐方式 | string | left | right | center | left |
| ellipsis | 超过宽度将自动省略 | boolean | — | false |
| label | 列头显示文字 | string | — | — |
| key | data对象对应的key | string | — | — |