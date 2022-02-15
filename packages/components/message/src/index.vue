<template>
  <transition
    name="ac-message-fade"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible"
      :id="id"
      :class="[
        'ac-message',
        type && !iconClass ? `ac-message--${type}` : '',
        center && 'is-center',
        showClose && 'is-closable',
        customClass,
        position
      ]"
      :style="customStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <i
        v-if="type || iconClass"
        :class="[typeClass, iconClass]"
      />
      <slot>
        <p v-if="!useHTMLString" class="ac-message__content">{{ message }}</p>
        <p v-else class="ac-message__content" v-html="message"></p>
      </slot>
      <div
        v-if="showClose"
        class="ac-message__closeBtn ac-icon-close"
        @click.stop="close"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, PropType, ref} from 'vue'
import {ObjectIndex} from "../../../types";
import {MessageType, MessageVM, Position} from "./message.type";

const TypeMap: ObjectIndex<string> = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}

export default defineComponent({
  name: "AcMessage",
  props: {
    id: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'info'
    },
    message: [String, Object] as PropType<string | MessageVM>,
    customClass: String,
    iconClass: String,
    center: {
      type: Boolean,
      default: false
    },
    useHTMLString: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 3000
    },
    onClose: Function as PropType<() => void>,
    showClose: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Number,
      default: 20
    },
    position: {
      type: String as PropType<Position>,
      default: 'top'
    },
    zIndex: {
      type: Number,
      default: 0
    }
  },
  emits: ['destroy'],
  setup(props) {
    const typeClass = computed(() => {
      const type = props.type
      return type && TypeMap[type]
        ? `ac-message__icon ac-icon-${TypeMap[type]}`
        : ''
    })
    const customStyle = computed(() => {
      switch (props.position) {
        case "bottom":
          return {
            bottom: `${props.offset}px`,
            top: 'auto',
            zIndex: props.zIndex,
          }
        case "top":
        default:
          return {
            top: `${props.offset}px`,
            bottom: 'auto',
            zIndex: props.zIndex,
          }
      }
    })

    const visible = ref(false)
    let timer: ReturnType<typeof setTimeout> | null = null

    function startTimer() {
      if (props.duration > 0) {
        timer = setTimeout(() => {
          if (visible.value) {
            close()
          }
        }, props.duration)
      }
    }

    function clearTimer() {
      timer && clearTimeout(timer)
      timer = null
    }

    function close() {
      visible.value = false
    }

    onMounted(() => {
      startTimer()
      visible.value = true
    })

    return {
      typeClass,
      customStyle,
      visible,
      close,
      startTimer,
      clearTimer
    }
  }
})
</script>