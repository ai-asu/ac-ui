## Button 按钮

常用的操作按钮

### 基础用法

基础的按钮用法。

:::demo 使用`default`、`handle`、`special`、`image`、`text`属性来定义 Button 的样式。

```html

<ac-button>普通按钮</ac-button>
<ac-button type="handle">辅助按钮</ac-button>
<ac-button type="special">切角按钮</ac-button>
<ac-button type="image" icon="ac-icon-message">背景按钮</ac-button>
<ac-button type="text">文字按钮</ac-button>
```

:::

### 禁用状态

按钮不可用状态。

:::demo 你可以使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值。

```html

<ac-button disabled>普通按钮</ac-button>
<ac-button disabled type="handle">辅助按钮</ac-button>
<ac-button disabled type="special">切角按钮</ac-button>
<ac-button disabled type="image">背景按钮</ac-button>
<ac-button disabled type="text">文字按钮</ac-button>
```

:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 类型   | string    |   default / handle / special / image / text |     —    |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| icon  | 图标类名 | string   |  —  |  —  |