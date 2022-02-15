<template>
  <div
    ref="radioGroup"
    class="ac-radio-group"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  provide,
  ref,
  reactive,
  toRefs,
} from 'vue'
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../../../utils/constants'
import { radioGroupKey } from './radio.type'

export default defineComponent({
  name: 'AcRadioGroup',
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: '',
    },
    disabled: Boolean,
  },

  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT],

  setup(props, ctx) {
    const radioGroup = ref(null)

    const changeEvent = (value: boolean | string | number)  => {
      ctx.emit(UPDATE_MODEL_EVENT, value)
      nextTick(() => {
        ctx.emit(CHANGE_EVENT, value)
      })
    }

    provide(radioGroupKey, reactive({
      name: 'AcRadioGroup',
      ...toRefs(props),
      changeEvent: changeEvent,
    }))

    return {
      radioGroup
    }
  },
})
</script>
