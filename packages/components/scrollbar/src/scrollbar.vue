<template>
  <div ref="scrollbar" class="ac-scrollbar">
    <div
      ref="wrap"
      :class="[
        wrapClass,
        'ac-scrollbar__wrap',
        native ? '' : 'ac-scrollbar__wrap--hidden-default',
      ]"
      :style="style"
      @scroll="handleScroll"
    >
      <component
        :is="tag"
        ref="resize"
        :class="['ac-scrollbar__view', viewClass]"
        :style="viewStyle"
      >
        <slot></slot>
      </component>
    </div>
    <template v-if="!native">
      <bar :move="moveX" :size="sizeWidth" :barSize="barSize" :barClass="barClass" />
      <bar vertical :move="moveY" :size="sizeHeight" :barSize="barSize" :barClass="barClass" />
    </template>
  </div>
</template>
<script lang="ts">
import { addResizeListener, removeResizeListener, ResizableElement } from '../../../utils/resize-event'
import { toObject } from '../../../utils/util'
import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, provide, ref } from 'vue'
import Bar from './bar.vue'

export default defineComponent({
  name: 'AcScrollbar',
  components: { Bar },
  props: {
    native: {
      type: Boolean,
      default: false,
    },
    barClass: {
      type: [String, Array],
      default: '',
    },
    wrapStyle: {
      type: [String, Array],
      default: '',
    },
    wrapClass: {
      type: [String, Array],
      default: '',
    },
    viewClass: {
      type: [String, Array],
      default: '',
    },
    viewStyle: {
      type: [String, Array],
      default: '',
    },
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: {
      type: String,
      default: 'div',
    },
  },
  setup(props) {
    const sizeWidth = ref('0')
    const sizeHeight = ref('0')
    const barSize = ref(6)
    const moveX = ref(0)
    const moveY = ref(0)
    const scrollbar = ref<null | HTMLElement>(null)
    const wrap = ref<null | HTMLElement>(null)
    const resize = ref<null | ResizableElement>(null)

    provide('scrollbar', scrollbar)
    provide('scrollbar-wrap', wrap)

    const handleScroll = () => {
      if (!props.native && wrap.value) {
        moveY.value = (wrap.value.scrollTop * 100) / wrap.value.clientHeight
        moveX.value = (wrap.value.scrollLeft * 100) / wrap.value.clientWidth
      }
    }

    const update = () => {
      if (!wrap.value) return

      const heightPercentage = (wrap.value.clientHeight * 100) / wrap.value.scrollHeight
      const widthPercentage = (wrap.value.clientWidth * 100) / wrap.value.scrollWidth

      sizeHeight.value = heightPercentage < 100 ? heightPercentage + '%' : ''
      sizeWidth.value = widthPercentage < 100 ? widthPercentage + '%' : ''
      barSize.value = wrap.value.clientWidth >= 800 ? 6 : 4
    }

    const style = computed(() => {
      if (Array.isArray(props.wrapStyle)) {
        return toObject(props.wrapStyle)
      }
      return props.wrapStyle
    })

    onMounted(() => {
      if (props.native) return
      nextTick(update)
      if (!props.noresize) {
        addResizeListener((resize.value as ResizableElement), update)
        addEventListener('resize', update)
      }
    })

    onBeforeUnmount(() => {
      if (props.native) return
      if (!props.noresize) {
        removeResizeListener((resize.value as ResizableElement), update)
        removeEventListener('resize', update)
      }
    })

    return {
      moveX,
      moveY,
      sizeWidth,
      sizeHeight,
      barSize,
      style,
      scrollbar,
      wrap,
      resize,
      update,
      handleScroll,
    }
  },
})
</script>
