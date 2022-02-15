<template>
  <transition name="ac-scrollbar-fade">
    <div
      v-show="visible"
      ref="instance"
      :class="['ac-scrollbar__bar', 'is-' + bar.key, barClass]"
      @mousedown="clickTrackHandler"
      :style="barStyle"
    >
      <div
        ref="thumb"
        class="ac-scrollbar__thumb"
        :style="thumbStyle"
        @mousedown="clickThumbHandler"
      ></div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onBeforeUnmount, onMounted, ref, Ref } from 'vue'
import { off, on } from '../../../utils/util'
import { BAR_MAP, renderThumbStyle } from './util'
import {ElementEvent, ObjectIndex} from "../../../types";

interface Obj {
  width?: string
  height?: string
}

export default defineComponent({
  name: 'Bar',
  props: {
    vertical: Boolean,
    size: String,
    move: Number,
    barSize: Number,
    barClass: {
      type: [String, Array],
      default: '',
    }
  },
  setup: function (props) {
    const instance: Ref<HTMLElement | null> = ref<HTMLElement | null>(null)
    const thumb: Ref<HTMLElement | null | ObjectIndex<any>> = ref<HTMLElement | null>(null)

    const scrollbar = inject('scrollbar', {} as Ref<HTMLElement>)
    const wrap = inject('scrollbar-wrap', {} as Ref<HTMLElement> | ObjectIndex<any>)
    const bar = computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal'])
    const barStore: Ref<ObjectIndex<any>> = ref({})
    const cursorDown = ref(false)
    const visible = ref(false)

    // todo: 以下参数的具体类型不确定，使用as断言，待优化
    const clickThumbHandler = (e: ObjectIndex<any>) => {
      // prevent click event of middle and right button
      e.stopPropagation()
      if (e.ctrlKey || [1, 2].includes(e.button)) {
        return
      }
      startDrag(e)

      const currentTarget = e.currentTarget

      barStore.value[bar.value.axis] = (currentTarget[bar.value.offset] -
          (e[bar.value.client] - currentTarget.getBoundingClientRect()[bar.value.direction]))
    }

    const clickTrackHandler = (e: ElementEvent<HTMLDivElement, MouseEvent>) => {
      const offset = Math.abs(((e.target as HTMLDivElement).getBoundingClientRect() as ObjectIndex<any>)[bar.value.direction] - (e as ObjectIndex<any>)[bar.value.client])
      const thumbHalf: number = ((thumb.value as ObjectIndex<any>)[bar.value.offset] / 2)
      const thumbPositionPercentage = ((offset - thumbHalf) * 100 / (instance.value as ObjectIndex<any>)[bar.value.offset])

      wrap.value[bar.value.scroll] = (thumbPositionPercentage * wrap.value[bar.value.scrollSize] / 100)
    }

    const startDrag = (e: ObjectIndex<any>) => {
      e.stopImmediatePropagation()
      cursorDown.value = true
      on(document, 'mousemove', mouseMoveDocumentHandler)
      on(document, 'mouseup', mouseUpDocumentHandler)
      document.onselectstart = () => false
    }

    const mouseMoveDocumentHandler = (e: Event) => {
      if (cursorDown.value === false) return
      const prevPage = barStore.value[bar.value.axis]

      if (!prevPage) return

      const offset = (((instance.value as ObjectIndex<any>).getBoundingClientRect()[bar.value.direction] - (e as ObjectIndex<any>)[bar.value.client]) * -1)
      const thumbClickPosition: number = ((thumb.value as ObjectIndex<any>)[bar.value.offset] - prevPage)
      const thumbPositionPercentage: number = ((offset - thumbClickPosition) * 100 / (instance.value as ObjectIndex<any>)[bar.value.offset])
      wrap.value[bar.value.scroll] = (thumbPositionPercentage * wrap.value[bar.value.scrollSize] / 100)
    }

    const mouseUpDocumentHandler = () => {
      cursorDown.value = false
      barStore.value[bar.value.axis] = 0
      off(document, 'mousemove', mouseMoveDocumentHandler)
      document.onselectstart = () => false
    }

    const thumbStyle = computed(() => renderThumbStyle({
      size: props.size || '',
      move: props.move || 0,
      bar: bar.value,
    }))

    const barStyle = computed(() => {
      const style: Obj = {}

      if (props.vertical) {
        style.width = props.barSize + 'px'
      } else {
        style.height = props.barSize + 'px'
      }

      return style
    })

    const showBar = () => {
      visible.value = !!props.size
    }

    const hideBar = () => {
      visible.value = false
    }

    onMounted(() => {
      on(scrollbar.value, 'mousemove', showBar)
      on(scrollbar.value, 'mouseleave', hideBar)
    })

    onBeforeUnmount(() => {
      off(document, 'mouseup', mouseUpDocumentHandler)
      off(scrollbar.value, 'mousemove', showBar)
      off(scrollbar.value, 'mouseleave', hideBar)
    })

    return {
      instance,
      thumb,
      bar,
      clickTrackHandler,
      clickThumbHandler,
      barStyle,
      thumbStyle,
      visible,
    }
  },
})

</script>
