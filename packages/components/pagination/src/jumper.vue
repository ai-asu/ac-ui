<template>
  <span class="ac-pagination__jump">
    转
    <ac-input
      size="mini"
      class="ac-pagination__editor is-in-pagination"
      :min="1"
      :max="pageCount"
      :disabled="disabled"
      :model-value="innerValue"
      type="number"
      @update:modelValue="handleInput"
      @change="handleChange"
    />
    页
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue'
import { IPagination } from './pagiantion.type'

export default defineComponent({
  setup() {
    const pagination = inject<IPagination>('pagination', {} as IPagination)
    const { disabled, pageCount, currentPage, changeEvent } = pagination
    const userInput = ref<null | number>(null)
    const innerValue = computed(() => userInput.value ?? currentPage.value)

    const handleInput = (val: unknown) => {
      userInput.value = Number(val)
    }

    const handleChange = (val: unknown) => {
      changeEvent(Number(val))
      userInput.value = null
    }

    return {
      disabled,
      pageCount,
      innerValue,
      handleInput,
      handleChange
    }
  }
})
</script>