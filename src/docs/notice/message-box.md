## MessageBox 弹框
模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。

### 基本用法

:::demo

```html
<template>
  <ac-button @click="open1">点击打开 Message Box</ac-button>
  <ac-button @click="open2">点击打开 Message Box 使用VNode</ac-button>
</template>

<script>
  import { h } from 'vue'
  export default {
    methods: {
      open1() {
        this.$msgbox({
          title: '弹窗标题',
          message: '弹窗消息',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        })
      },
      open2() {
        this.$msgbox({
          title: '弹窗标题',
          message: h('p', null, [
            h('span', null, '内容可以是 '),
            h('i', { style: 'color: teal' }, 'VNode')
          ]),
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        })
      },
    }
  }
</script>
```
:::

### 自定义

:::demo 直接调用`$msgbox`方法，使用了`showCancelButton`字段，用于显示取消按钮。另外可使用`cancelButtonClass`为其添加自定义样式，使用`cancelButtonText`来自定义按钮文本（Confirm 按钮也具有相同的字段，在文末的字段说明中有完整的字段列表）。此例还使用了`beforeClose`属性，它的值是一个方法，会在 MessageBox 的实例关闭前被调用，同时暂停实例的关闭。它有三个参数：`action`、实例本身和`done`方法。使用它能够在关闭前对实例进行一些操作；此时若需要关闭实例，可以调用`done`方法（若在`beforeClose`中没有调用`done`，则实例不会关闭）。

```html
<template>
  <ac-button @click="open">点击打开 Message Box</ac-button>
</template>

<script>
  import { h } from 'vue';

  export default {
    methods: {
      open() {
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '内容可以是 '),
            h('i', { style: 'color: teal' }, 'VNode')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        });
      }
    }
  }
</script>
```
:::

### 使用 HTML 片段

`message` 属性支持传入 HTML 片段。

:::demo 将`useHTMLString`属性设置为 true，`message` 就会被当作 HTML 片段处理。

```html
<template>
  <ac-button @click="open">点击打开 Message Box</ac-button>
</template>

<script>
  export default {
    methods: {
      open() {
        this.$msgbox({
          title: 'HTML 片段',
          message: '<strong>这是 <i style="color: red">HTML</i> 片段</strong>',
          useHTMLString: true,
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    }
  }
</script>
```
:::

:::warning
`message` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。因此在 `useHTMLString` 打开的情况下，请确保 `message` 的内容是可信的，**永远不要**将用户提交的内容赋值给 `message` 属性。
:::

### 区分取消与关闭

有些场景下，点击取消按钮与点击关闭按钮有着不同的含义。

:::demo 默认情况下，当用户触发取消（点击取消按钮）和触发关闭（点击关闭按钮或遮罩层、按下 ESC 键）时，Promise 的 reject 回调和`callback`回调的参数均为 'cancel'。如果将`distinguishCancelAndClose`属性设置为 true，则上述两种行为的参数分别为 'cancel' 和 'close'。

```html
<template>
  <ac-button @click="open">点击打开 Message Box</ac-button>
</template>

<script>
  export default {
    methods: {
      open() {
        this.$msgbox({
          title: '确认信息',
          message: '检测到未保存的内容，是否在离开页面前保存修改？',
          distinguishCancelAndClose: true,
          confirmButtonText: '保存',
          cancelButtonText: '放弃修改',
          showCancelButton: true
        })
          .then(() => {
            this.$message({
              type: 'info',
              message: '保存修改'
            });
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                ? '放弃保存并离开页面'
                : '停留在当前页面'
            })
          });
      }
    }
  }
</script>
```
:::

### 居中布局
内容支持居中布局

:::demo 将 `center` 设置为 `true` 即可开启居中布局

```html
<template>
  <ac-button @click="open">点击打开 Message Box</ac-button>
</template>

<script>
  export default {
    methods: {
      open() {
        this.$msgbox({
          title: '提示',
          message: '此操作将永久删除该文件, 是否继续?',
          cancelButtonText: '取消',
          showCancelButton: true,
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>
```
:::

### 单独引用

如果单独引入 `MessageBox`：

```javascript
import { AcMessageBox } from 'ac-ui';
```

### Options

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | MessageBox 标题 | string | — | — |
| message | MessageBox 消息正文内容 | string / VNode | — | — |
| useHTMLString | 是否将 message 属性作为 HTML 片段处理 | boolean | — | false |
| customClass | MessageBox 的自定义类名 | string | — | — |
| callback | 若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调 | function(action, instance)，action 的值为'confirm', 'cancel'或'close', instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法 | — | — |
| showClose | MessageBox 是否显示右上角关闭按钮 | boolean | — | true |
| beforeClose | MessageBox 关闭前的回调，会暂停实例的关闭 | function(action, instance, done)，action 的值为'confirm', 'cancel'或'close'；instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法；done 用于关闭 MessageBox 实例 | — | — |
| distinguishCancelAndClose | 是否将取消（点击取消按钮）与关闭（点击关闭按钮或遮罩层、按下 ESC 键）进行区分 | boolean | — | false |
| showCancelButton | 是否显示取消按钮 | boolean | — | false |
| showConfirmButton | 是否显示确定按钮 | boolean | — | true |
| cancelButtonText | 取消按钮的文本内容 | string | — | 取消 |
| confirmButtonText | 确定按钮的文本内容 | string | — | 确定 |
| cancelButtonClass | 取消按钮的自定义类名 | string | — | — |
| confirmButtonClass | 确定按钮的自定义类名 | string | — | — |
| closeOnClickModal | 是否可通过点击遮罩关闭 MessageBox | boolean | — | true |
| closeOnPressEscape | 是否可通过按下 ESC 键关闭 MessageBox | boolean | — | true |
| closeOnHashChange | 是否在 hashchange 时关闭 MessageBox | boolean | — | true |
| center | 是否居中布局 | boolean | — | false |
