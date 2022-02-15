<template>
  <label
    class="ac-radio"
    :class="{
      'is-disabled': isDisabled,
      'is-focus': focus,
      'is-checked': model === label
    }"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
  >
    <span
      class="ac-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    >
      <span class="ac-radio__inner"></span>
      <input
        ref="radioRef"
        v-model="model"
        class="ac-radio__original"
        :value="label"
        type="radio"
        aria-hidden="true"
        :disabled="isDisabled"
        tabindex="-1"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
      >
    </span>
    <span class="ac-radio__label" @keydown.stop>
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue'
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../../../utils/constants'
import { useRadio, useRadioAttrs } from './useRadio'

export default defineComponent({
  name: "AcRadio",
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    },
    label: {
      type: [String, Number, Boolean],
      default: ''
    },
    disabled: Boolean
  },
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT],
  setup(props, ctx) {
    const {
      isGroup,
      radioGroup,
      focus
    } = useRadio()

    const radioRef = ref<HTMLInputElement>()
    const model = computed<string | number | boolean>({
      get() {
        return isGroup.value ? radioGroup.modelValue : props.modelValue
      },
      set(val) {
        if (isGroup.value) {
          radioGroup.changeEvent(val)
        } else {
          ctx.emit(UPDATE_MODEL_EVENT, val)
        }
        (radioRef.value as HTMLInputElement).checked = props.modelValue === props.label
      },
    })

    const {
      tabIndex,
      isDisabled,
    } = useRadioAttrs(props, {
      isGroup,
      radioGroup,
      model
    })

    function handleChange() {
      nextTick(() => {
        ctx.emit(CHANGE_EVENT, model.value)
      })
    }

    return {
      focus,
      isGroup,
      isDisabled,
      model,
      tabIndex,
      handleChange,
      radioRef
    }
  }
})
</script>
