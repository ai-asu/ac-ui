<template>
  <button
    type="button"
    class="btn-prev"
    :disabled="internalDisabled"
    @click="prev"
  >
    <span v-if="prevText ">{{ prevText }}</span>
    <i v-else class="ac-icon ac-icon-arrow-left"></i>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue'
import { IPagination } from './pagiantion.type'

export default defineComponent({
  name: 'Prev',
  props: {
    disabled: Boolean,
    currentPage: {
      type: Number,
      default: 1,
    },
    prevText: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { prev } = inject<IPagination>('pagination', {} as IPagination)
    const internalDisabled = computed(() => props.disabled || props.currentPage <= 1)
    return {
      internalDisabled,
      prev
    }
  },
})
</script>
