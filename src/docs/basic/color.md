## Color 色彩

### 使用方法

直接通过设置类名为 `ac-color-colorName` 或者 `ac-bgColor-colorName` 来使用即可。例如：

:::demo
```html
<div class="ac-color-teal-6">ac-bgColor-teal-6</div>
<div class="ac-bgColor ac-bgColor-red-4"></div>

<style>
  .ac-bgColor {
    width: 60px;
    height: 30px;
    margin-top: 20px;
  }
</style>
```
:::

### 颜色集合

<ul class="demo-color" v-for="v in $color" :key="`color_${v.name}`">
  <li class="name">
    <div>{{v.name}}</div>
  </li>
  <li v-for="(color, index) in v.list" :key="index">
    <div :class="`ac-bgColor-${v.code}-${index+1}`"></div>
    <p>{{color}}</p>
  </li>
</ul>