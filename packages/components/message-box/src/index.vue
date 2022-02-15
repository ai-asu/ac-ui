<template>
  <transition name="fade-in-linear" @after-leave="$emit('vanish')">
    <div
      v-show="visible"
      class="ac-overlay is-message-box"
      :style="{ 'z-index': zIndex }"
      @click.self="handleWrapperClick"
    >
      <div
        ref="root"
        :class="[
          'ac-message-box',
          customClass,
          { 'ac-message-box--center': center },
        ]"
      >
        <div
          v-if="title !== null && title !== undefined"
          class="ac-message-box__header"
        >
          <div class="ac-message-box__title">
            <span>{{ title }}</span>
          </div>
          <button
            v-if="showClose"
            type="button"
            class="ac-message-box__headerbtn"
            aria-label="Close"
            @click="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
            @keydown.enter="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
          >
            <i class="ac-message-box__close ac-icon-close"></i>
          </button>
        </div>
        <div class="ac-message-box__content">
          <div class="ac-message-box__container">
            <div v-if="hasMessage" class="ac-message-box__message">
              <slot>
                <p v-if="!useHTMLString">{{ message }}</p>
                <p v-else v-html="message"></p>
              </slot>
            </div>
          </div>
        </div>
        <div class="ac-message-box__btns">
          <ac-button
            v-if="showCancelButton"
            :class="[cancelButtonClass]"
            @click="handleAction('cancel')"
            @keydown.enter="handleAction('cancel')"
          >
            {{ cancelButtonText }}
          </ac-button>
          <ac-button
            v-if="showConfirmButton"
            ref="confirmRef"
            :class="[confirmButtonClass]"
            @click="handleAction('confirm')"
            @keydown.enter="handleAction('confirm')"
          >
            {{ confirmButtonText }}
          </ac-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  ComponentPublicInstance,
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted, PropType,
  reactive,
  ref,
  toRefs,
  watch
} from 'vue'
import {Action, BeforeClose, Callback, MessageBoxState} from "./message-box.type";
import {nextZIndex, off, on} from "../../../utils/util";
import AcButton from '../../button/'

export default defineComponent({
  name: "AcMessageBox",
  components: {
    AcButton
  },
  props: {
    title:  {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    useHTMLString: Boolean,
    customClass: {
      type: String,
      default: ''
    },
    callback: Function as PropType<Callback>,
    showClose: {
      type: Boolean,
      default: true,
    },
    beforeClose: Function as PropType<BeforeClose>,
    distinguishCancelAndClose: Boolean,
    showCancelButton: Boolean,
    showConfirmButton: {
      type: Boolean,
      default: true,
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    cancelButtonClass: {
      type: String,
      default: ''
    },
    confirmButtonClass: {
      type: String,
      default: ''
    },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },
    closeOnHashChange: {
      type: Boolean,
      default: true,
    },
    center: Boolean
  },
  emits: ['vanish', 'action'],
  setup(props, { emit }) {
    const visible = ref(false)
    const zIndex = ref(nextZIndex())
    const action = ref('')
    const state = reactive<MessageBoxState>({
      beforeClose: props.beforeClose,
      callback: props.callback,
      cancelButtonText: props.cancelButtonText,
      cancelButtonClass: props.cancelButtonClass,
      confirmButtonText: props.confirmButtonText,
      confirmButtonClass: props.confirmButtonClass,
      customClass: props.customClass,
      useHTMLString: props.useHTMLString,
      distinguishCancelAndClose: props.distinguishCancelAndClose,
      message: props.message,
      showCancelButton: props.showCancelButton,
      showConfirmButton: props.showConfirmButton,
      title: props.title,
      action: '' as Action,
      zIndex: nextZIndex()
    })

    const hasMessage = computed(() => !!props.message)
    const confirmRef = ref<ComponentPublicInstance | null>(null)

    watch(() => visible.value, val => {
      zIndex.value = nextZIndex()
    })

    onMounted(async () => {
      await nextTick()
      if (props.closeOnHashChange) {
        on(window, 'hashchange', doClose)
      }
      if (props.closeOnPressEscape) {
        on(document, 'keydown', handleKeydown)
      }
    })

    onBeforeUnmount(() => {
      if (props.closeOnHashChange) {
        off(window, 'hashchange', doClose)
      }
      if (props.closeOnPressEscape) {
        off(document, 'keydown', handleKeydown)
      }
    })

    const handleKeydown = ((e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        e.stopPropagation()
        handleClose()
      }
    }) as (e: Event) => void

    function doClose() {
      if (!visible.value) return
      visible.value = false
      nextTick(() => {
        emit('action', action.value)
      })
    }

    const handleWrapperClick = () => {
      if (props.closeOnClickModal) {
        handleAction(props.distinguishCancelAndClose ? 'close' : 'cancel')
      }
    }

    const handleAction = (val: Action) => {
      action.value = val

      if (props.beforeClose) {
        props.beforeClose?.(val, state, doClose)
      } else {
        doClose()
      }
    }

    const handleClose = () => {
      handleAction('close')
    }

    return {
      ...toRefs(state),
      zIndex,
      visible,
      hasMessage,
      confirmRef,
      doClose,
      handleClose,
      handleWrapperClick,
      handleAction,
    }
  }
})
</script>