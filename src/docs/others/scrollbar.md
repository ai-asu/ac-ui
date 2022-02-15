## Scrollbar 滚动条

### 基础用法

::: demo

```html

<ac-scrollbar
    color="red"
    wrap-class="list"
    wrap-style="color: red;height: 200px;"
    view-style="font-weight: bold;"
    view-class="view-box"
    :bar-class="['customBar','view-box']"
>
    <div v-for="(value,index) in 50" :key="index">
      {{value}}
    </div>
</ac-scrollbar>
```

:::

### Scrollbar Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| bar-class | 滚动条自定义样式类 | string / Array | — | — |
| wrap-style | 包裹层自定义样式 | string / Array | — | — |
| wrap-class | 包裹层自定义样式类 | string / Array | — | — |
| view-style | 滚动部分自定义样式 | string / Array | — | — |
| view-style | 滚动部分自定义样式类 | string / Array | — | — |
| tag | 生成的标签类型 | string | — | div |
| native | true则不会启用自定义的滚动条 | boolean | — | false |
| noresize | 如果 container 尺寸不会发生变化，最好设置它可以优化性能 | boolean | — | false |