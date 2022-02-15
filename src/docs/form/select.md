## Select 选择器

### 基础用法

:::demo

```html

<template>
  <ac-select v-model="value">
    <ac-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </ac-select>
</template>
<script>
  export default {
    data() {
      return {
        value: '',
        options: [
          {
            label: "Breaking",
            value: "b"
          },
          {
            label: "Jazz",
            value: "j"
          },
          {
            label: "Popppin",
            value: "p"
          },
          {
            label: "Locking",
            value: "l"
          }
        ],
      };
    }
  }
</script>
```

:::

### Border BackgroundColor

:::demo

```html

<template>
  <ac-select v-model="value" border>
    <ac-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </ac-select>
  <ac-select v-model="value" background-color="#064C5A">
    <ac-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </ac-select>
</template>
<script>
  export default {
    data() {
      return {
        value: '',
        options: [
          {
            label: "Breaking",
            value: "b"
          },
          {
            label: "Jazz",
            value: "j"
          },
          {
            label: "Popppin",
            value: "p"
          },
          {
            label: "Locking",
            value: "l"
          }
        ],
      };
    }
  }
</script>
```

:::

### 尺寸

:::demo

```html

<template>
  <ac-select v-model="value" border size="small">
    <ac-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </ac-select>
  <ac-select v-model="value" border>
    <ac-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </ac-select>
</template>
<script>
  export default {
    data() {
      return {
        value: '',
        options: [
          {
            label: "Breaking",
            value: "b"
          },
          {
            label: "Jazz",
            value: "j"
          },
          {
            label: "Popppin",
            value: "p"
          },
          {
            label: "Locking",
            value: "l"
          }
        ],
      };
    }
  }
</script>
```

:::

### 禁用状态

:::demo

```html

<template>
  <ac-select v-model="value" disabled>
    <ac-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </ac-select>
  <ac-select v-model="value">
    <ac-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      disabled
    />
  </ac-select>
</template>
<script>
  export default {
    data() {
      return {
        value: '',
        options: [
          {
            label: "Breaking",
            value: "b"
          },
          {
            label: "Jazz",
            value: "j"
          },
          {
            label: "Popppin",
            value: "p"
          },
          {
            label: "Locking",
            value: "l"
          }
        ],
      };
    }
  }
</script>
```

:::

### Select Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| v-model | 绑定值 | string / number | — | — |
| disabled | 是否禁用 | boolean | — | false |
| size | 尺寸 | string | small | medium | — |
| border | 是否有边框 | boolean | — | false |
| background-color | 背景色 | string | — | transparent |

### Select Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| change | 选中值发生变化时触发 | 目前的选中值 |

### Option Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| label | 选项的标签，若不设置则默认与 value 相同 | string / number | — | — |
| value | 选项的值 | string | number | — | — |
| disabled | 是否禁用该选项 | boolean | — | false |