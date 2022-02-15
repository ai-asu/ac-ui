<template>
  <div
    class="ac-switch"
    :class="{
      [`ac-switch--${size || ''}`]: size,
      'is-disabled': disabled,
      'is-checked': checked
    }"
    :aria-checked="checked"
    :aria-disabled="disabled"
    @click.prevent="switchValue"
  >
    <input
      :id="id"
      ref="input"
      class="ac-switch__input"
      type="checkbox"
      :disabled="disabled"
      @change="handleChange"
      @keydown.enter="switchValue"
    >
    <span ref="core" class="ac-switch__core">
      <div class="ac-switch__action"></div>
    </span>
    <span
      v-if="activeText || inactiveText"
      :class="['ac-switch__label', 'ac-switch__label--right', checked ? 'is-active' : '']"
    >
      <span>{{ checked ? activeText : inactiveText }}</span>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, PropType, watch } from 'vue'
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../../../utils/constants'

export default defineComponent({
  name: "AcSwitch",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    activeText: {
      type: String,
      default: '',
    },
    inactiveText: {
      type: String,
      default: '',
    },
    id: String,
    size: {
      type: String as PropType<'medium' | 'small'>,
      validator: (val: string) => ['', 'medium', 'small'].includes(val)
    }
  },
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT, 'input'],
  setup(props, ctx) {
    const input = ref<null | HTMLInputElement>(null)
    const core = ref(null)
    const checked = ref(props.modelValue !== false)

    watch(() => props.modelValue, (val) => {
      checked.value = val
    })

    const handleChange = (): void => {
      checked.value = !checked.value
      const val = checked.value
      ctx.emit(UPDATE_MODEL_EVENT, val)
      ctx.emit(CHANGE_EVENT, val)
      ctx.emit('input', val)
      nextTick(() => {
        (input.value as HTMLInputElement).checked = val
      })
    }

    const switchValue = (): void => {
      !props.disabled && handleChange()
    }

    return {
      input,
      core,
      checked,
      handleChange,
      switchValue
    }
  }
})
</script>
