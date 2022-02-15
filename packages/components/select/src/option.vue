<template>
  <li
    class="ac-select-dropdown__item"
    :class="{
      'selected': itemSelected,
      'is-disabled': disabled,
    }"
    @click.stop="selectOptionClick"
  >
    <slot>
      <span>{{ currentLabel }}</span>
    </slot>
  </li>
</template>

<script lang="ts">
import { defineComponent, inject, computed, getCurrentInstance, ComponentInternalInstance, onBeforeUnmount } from 'vue'
import { selectKey, SelectContext } from './select.vue'

export interface OptionType {
  value?: string | number;
  label?: string | number;
}

export default defineComponent({
  name: "AcOption",
  props: {
    value: [String, Number],
    label: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },
    option: Object
  },
  setup(props) {
    const select = inject(selectKey, {} as SelectContext)

    // const vm = (getCurrentInstance() as OptionType).proxy
    select?.onOptionCreate({ value: props.value, label: props.label } as OptionType)

    const itemSelected = computed(() => {
      return props.value === select?.modelValue || props.label === select?.modelValue
    })
    const currentLabel = computed(() => {
      return props.label || props.value
    })

    const selectOptionClick = () => {
      if (props.disabled) return
      select?.handleOptionSelect({ value: props.value } as OptionType)
    }

    onBeforeUnmount(() => {
      select.onOptionDestroy(props.value as (string | number))
    })

    return {
      select,
      currentLabel,
      itemSelected,
      selectOptionClick
    }
  }
})
</script>
