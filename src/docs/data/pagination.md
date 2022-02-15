## Pagination 分页

### 基础用法

设置layout，表示需要显示的内容，用逗号分隔，布局元素会依次显示。prev表示上一页，next为下一页，pager表示页码列表，除此以外还提供了jumper和total，size和特殊的布局符号right，right后的元素会靠右显示，jumper表示跳页元素，total表示总条目数，size用于设置每页显示的页码数量。

::: demo

```html

<div>
  页数较少时的效果
  <ac-pagination
    layout="prev, pager, next"
    :total="50">
  </ac-pagination>
</div>
<div>
  大于 7 页时的效果
  <ac-pagination
    layout="prev, pager, next"
    :total="1000">
  </ac-pagination>
</div>
```

:::

### 设置最大页码按钮数

默认情况下，当总页数超过 7 页时，Pagination 会折叠多余的页码按钮。通过pager-count属性可以设置最大页码按钮数

::: demo

```html

<ac-pagination
  :page-size="20"
  :pager-count="11"
  layout="prev, pager, next"
  :total="1000">
</ac-pagination>
```

:::

### 附加功能

在空间有限的情况下，可以使用简单的小型分页。

::: demo

```html

<template>
  <div>
    <span>显示总数</span>
    <ac-pagination
      @current-change="handleCurrentChange"
      v-model:currentPage="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000">
    </ac-pagination>
  </div>
  <div>
    <span>调整每页显示200条数</span>
    <ac-pagination
      @current-change="handleCurrentChange"
      v-model:currentPage="currentPage2"
      :page-size="200"
      layout="prev, pager, next"
      :total="1000">
    </ac-pagination>
  </div>
  <div>
    <span>直接前往</span>
    <ac-pagination
      @current-change="handleCurrentChange"
      v-model:currentPage="currentPage3"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </ac-pagination>
  </div>
  <div>
    <span>完整功能</span>
    <ac-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-size="100"
      layout="total, prev, pager, next, jumper"
      :total="400">
    </ac-pagination>
  </div>
</template>
<script>
  import {defineComponent, ref} from 'vue'

  export default defineComponent({
    setup() {
      return {
        currentPage1: ref(5),
        currentPage2: ref(5),
        currentPage3: ref(5),
        currentPage4: ref(4),
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        }
      }
    }
  })
</script>
```

:::

### 当只有一页时隐藏分页

通过设置 hide-on-single-page 属性来隐藏分页。
:::demo

```html

<template>
  <ac-switch v-model="value"></ac-switch>
  <ac-pagination
    :hide-on-single-page="value"
    :total="5"
    layout="prev, pager, next">
  </ac-pagination>
</template>
<script>
  export default {
    data() {
      return {
        value: false
      }
    }
  }
</script>
```

:::

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| page-size | 每页显示条目个数 | number | — | 10 |
| total | 总条目数 | number | — | — |
| page-count | 总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能 | number | — | — |
| current-page | 当前页数 | number | — | 1 |
| layout | 组件布局，子组件名用逗号分隔 | string | prev, pager, next, jumper, total, right | 'prev, pager, next, jumper, total, right' |
| prev-text | 替代图标显示的上一页文字 | string | — | — |
| next-text | 替代图标显示的下一页文字 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| hide-on-single-page | 只有一页时是否隐藏 | boolean | — | false |

### Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| size-change | pageSize 改变时会触发 | 每页条数 |
| current-change | currentPage 改变时会触发 | 当前页 |
| prev-click | 用户点击上一页按钮改变当前页后触发 | 当前页 |      
| next-click | 用户点击下一页按钮改变当前页后触发 | 当前页 |