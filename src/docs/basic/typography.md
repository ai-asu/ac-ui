## Typography 字体

默认使用PingFang字体

### 字体

:::demo直接通过设置类名为 `ac-fontFamily-name` 来使用即可。

```html

<ul class="demo-typography">
  <li>
    <label>PingFang SC</label>
    <div class="ac-fontFamily-normal">ac-fontFamily-normal</div>
    <div class="ac-fontFamily-medium">ac-fontFamily-medium</div>
    <div class="ac-fontFamily-bold">ac-fontFamily-bold</div>
    <div class="ac-fontFamily-PingFangLight">ac-fontFamily-PingFangLight</div>
    <div class="ac-fontFamily-PingFangHeavy">ac-fontFamily-PingFangHeavy</div>
    <div class="ac-fontFamily-PingFangExtraLight">ac-fontFamily-PingFangExtraLight</div>
  </li>
  <li>
    <label>Arial</label>
    <div class="ac-fontFamily-ArialRegular">ac-fontFamily-ArialRegular</div>
    <div class="ac-fontFamily-ArialBold">ac-fontFamily-ArialBold</div>
    <div class="ac-fontFamily-ArialItalic">ac-fontFamily-ArialItalic</div>
    <div class="ac-fontFamily-ArialBoldItalic">ac-fontFamily-ArialBoldItalic</div>
    <div class="ac-fontFamily-ArialBlack">ac-fontFamily-ArialBlack</div>
  </li>
  <li>
    <label>Din</label>
    <div class="ac-fontFamily-DINLight">ac-fontFamily-DINLight</div>
    <div class="ac-fontFamily-DINMedium">ac-fontFamily-DINMedium</div>
    <div class="ac-fontFamily-DINBold">ac-fontFamily-DINBold</div>
    <div class="ac-fontFamily-DINBlack">ac-fontFamily-DINBlack</div>
    <div class="ac-fontFamily-DINCondLight">ac-fontFamily-DINCondLight</div>
    <div class="ac-fontFamily-DINCondRegular">ac-fontFamily-DINCondRegular</div>
    <div class="ac-fontFamily-DINCondMedium">ac-fontFamily-DINCondMedium</div>
  </li>
  <li>
    <label>Segoeui</label>
    <div class="ac-fontFamily-SegoeuiRegular">ac-fontFamily-SegoeuiRegular</div>
    <div class="ac-fontFamily-SegoeuiBold">ac-fontFamily-SegoeuiBold</div>
    <div class="ac-fontFamily-SegoeuiLight">ac-fontFamily-SegoeuiLight</div>
    <div class="ac-fontFamily-SegoeuiSemibold">ac-fontFamily-SegoeuiSemibold</div>
  </li>
</ul>

<style>
  ul.demo-typography {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      div {
        line-height: 22px;
      }
    }
  }
</style>
```

:::

### 字号

| 字号示例      | 字号        | 行高        | 适用范围      |
|--------- |---------|---------|--------- |
| 字号样式 | 18px ac-fontSize-medium  | 24px | 用于独立模块的大标题及面包屑 |
| 字号样式 | 16px ac-fontSize-normal  | 22px | 适用于全部正文内容字号；或小标题； |
| 字号样式 | 14px ac-fontSize-small   | 18px | 适用于注释、说明文字、图表刻度文字等； |
