<template>
  <div
    :class="[
      'ac-input',
      {
        'is-disabled': disabled,
        'is-exceed': inputExceed,
        'ac-input--prefix': $slots.prefix || prefixIcon,
        'ac-input--suffix': $slots.suffix || suffixIcon || clearable
      },
      $attrs.class
    ]"
    :style="$attrs.style"
  >
    <input
      ref="input"
      class="ac-input__inner"
      :type="type"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :maxlength="maxLength"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    >
    <!-- 前置内容 -->
    <span v-if="$slots.prefix || prefixIcon" class="ac-input__prefix">
      <slot name="prefix"></slot>
      <i
        v-if="prefixIcon"
        :class="['ac-input__icon', prefixIcon]"
      />
    </span>
    <!-- 后置内容 -->
    <span v-if="getSuffixVisible()" class="ac-input__suffix">
      <span class="ac-input__suffix-inner">
        <template v-if="!showClear || !isWordLimitVisible">
          <slot name="suffix"></slot>
          <i v-if="suffixIcon" :class="['ac-input__icon', suffixIcon]"></i>
        </template>
        <i
          v-if="showClear"
          class="ac-input__icon ac-icon-close ac-input__clear"
          @mousedown.prevent
          @click="clear"
        ></i>
        <span v-if="isWordLimitVisible" class="ac-input__count">
          <span class="ac-input__count-inner">
            {{ textLength }}/{{ maxLength }}
          </span>
        </span>
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, computed, watch, onMounted, onUpdated, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { UPDATE_MODEL_EVENT } from '../../../utils/constants'
import {ElementEvent, ObjectIndex} from "../../../types";
const PENDANT_MAP: ObjectIndex<string> = {
  suffix: 'append',
  prefix: 'prepend',
}

export default defineComponent({
  name: "AcInput",
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
    },
    form: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    maxLength: {
      type: [String, Number],
      default: ''
    },
    showWordLimit: {
      type: Boolean,
      default: false,
    },
    suffixIcon: {
      type: String,
      default: '',
    },
    prefixIcon: {
      type: String,
      default: '',
    }
  },
  emits: [UPDATE_MODEL_EVENT, 'input', 'change', 'focus', 'blur', 'clear'],
  setup(props, ctx) {
    const instance = getCurrentInstance() as ComponentInternalInstance
    const input = ref<HTMLInputElement | null>(null)
    const textarea = ref (null)
    const focused = ref(false)
    const isComposing = ref(false)

    const input$ = computed(() => input.value)
    const nativeInputValue = computed(() => (props.modelValue === null || props.modelValue === undefined) ? '' : String(props.modelValue))
    const showClear = computed(() => {
      return props.clearable &&
        !props.disabled &&
        !props.readonly &&
        nativeInputValue.value &&
        focused.value
    })
    const isWordLimitVisible = computed(() => {
      return props.showWordLimit &&
        props.maxLength &&
        (props.type === 'text' || props.type === 'textarea') &&
        !props.disabled &&
        !props.readonly
    })
    const textLength = computed(() => {
      return typeof props.modelValue === 'number' ? String(props.modelValue).length : (props.modelValue || '').length
    })
    const inputExceed = computed(() => {
      return isWordLimitVisible.value && (textLength.value > props.maxLength)
    })

    const setNativeInputValue = () => {
      const input = input$.value
      if (!input || input.value === nativeInputValue.value) return
      input.value = nativeInputValue.value
    }

    const handleInput = (event: ElementEvent<HTMLInputElement, Event>) => {
      const {value} = event.target

      if (isComposing.value) return

      if (value === nativeInputValue.value) return

      ctx.emit(UPDATE_MODEL_EVENT, value)
      ctx.emit('input', value)

      nextTick(setNativeInputValue)
    }

    const handleChange = (event: ElementEvent<HTMLInputElement, Event>) => {
      ctx.emit('change', event.target.value)
    }

    const focus = () => {
      nextTick(() => {
        input$.value?.focus()
      })
    }

    const blur = () => {
      input$.value?.blur()
    }

    const handleFocus = (event: ElementEvent<HTMLInputElement, Event>) => {
      focused.value = true
      ctx.emit('focus', event)
    }

    const handleBlur = (event: ElementEvent<HTMLInputElement, Event>) => {
      focused.value = false
      ctx.emit('blur', event)
    }

    const select = () => {
      input$.value?.select()
    }

    const handleCompositionStart = () => {
      isComposing.value = true
    }

    const handleCompositionUpdate = (event: ElementEvent<HTMLInputElement, Event>) => {
      const text = event.target.value
      const lastCharacter = text[text.length - 1] || ''
      isComposing.value = !/([(\uAc00-\uD7AF)|(\u3130-\u318F)])+/gi.test(lastCharacter)
    }

    const handleCompositionEnd = (event: ElementEvent<HTMLInputElement, Event>) => {
      if (isComposing.value) {
        isComposing.value = false
        handleInput(event)
      }
    }

    const clear = () => {
      ctx.emit(UPDATE_MODEL_EVENT, '')
      ctx.emit('change', '')
      ctx.emit('clear')
    }

    const getSuffixVisible = () => {
      return ctx.slots.suffix ||
        props.suffixIcon ||
        showClear.value ||
        isWordLimitVisible.value
    }

    const updateIconOffset = () => {
      calcIconOffset('prefix')
      calcIconOffset('suffix')
    }

    const calcIconOffset = (place: string) => {
      const { el } = instance.vnode
      const acList: HTMLSpanElement[] = Array.from(el?.querySelectorAll(`.ac-input__${place}`))
      const target = acList.find(item => {
        return item.parentNode === el
      })

      if (!target) return

      const pendant: string = PENDANT_MAP[place]

      if (ctx.slots[pendant]) {
        target.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${el?.querySelector(`.ac-input-group__${pendant}`).offsetWidth}px)`
      } else {
        target.removeAttribute('style')
      }
    }

    watch(nativeInputValue, () => {
      setNativeInputValue()
    })

    watch(() => props.type, () => {
      nextTick(() => {
        setNativeInputValue()
        updateIconOffset()
      })
    })

    onMounted(() => {
      setNativeInputValue()
      updateIconOffset()
    })

    onUpdated(() => {
      nextTick(updateIconOffset)
    })

    return {
      input,
      textarea,
      showClear,
      isWordLimitVisible,
      textLength,
      inputExceed,
      input$,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd,
      clear,
      select,
      focus,
      blur,
      getSuffixVisible,
    }
  }
})
</script>
