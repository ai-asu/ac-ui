import 'default-passive-events'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import CodeH from '@/components/code-h.vue'
import DemoBlock from '@/components/demo-block.vue'
import RightNav from '@/components/right-nav.vue'

// AC-UI组件
import ACUi from '../packages/index'
import '../theme/src/index.scss'
// 高亮
import 'highlight.js/styles/github.css'

import '@/assets/scss/base.scss'

import icon from '@/json/icon.config.json'
import color from '@/json/color.config.json'

import 'default-passive-events'

import 'default-passive-events'

const app = createApp(App)

app.config.globalProperties.$icon = icon
app.config.globalProperties.$color = color
app.config.globalProperties.$echartsUrl = 'https://echarts.apache.org/zh/option.html'

app.component('CodeH', CodeH)
app.component('DemoBlock', DemoBlock)
app.component('RightNav', RightNav)

app.use(ACUi)
app.use(store)
app.use(router)

app.mount('#app')