<template>
  <div
    class="ac-checkbox-group"
    aria-label="checkbox-group"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, nextTick, toRefs } from 'vue'
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../../../utils/constants'

export default defineComponent({
  name: 'AcCheckboxGroup',

  props: {
    modelValue: {
      type: [Object, Boolean, Array],
      required: true
    },
    disabled: Boolean
  },

  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT],

  setup(props, ctx) {
    const changeEvent = (value: unknown) => {
      ctx.emit(UPDATE_MODEL_EVENT, value)
      nextTick(() => {
        ctx.emit(CHANGE_EVENT, value)
      })
    }

    provide('CheckboxGroup', {
      name: 'AcCheckboxGroup',
      ...toRefs(props),
      changeEvent,
    })
  }
})
</script>
