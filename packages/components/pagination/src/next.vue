<template>
  <button
    type="button"
    class="btn-next"
    :disabled="internalDisabled"
    @click="next"
  >
    <span v-if="nextText">{{ nextText }}</span>
    <i v-else class="ac-icon ac-icon-arrow-right"></i>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue'
import { IPagination } from './pagiantion.type'

export default defineComponent({
  props: {
    disabled: Boolean,
    currentPage: {
      type: Number,
      default: 1,
    },
    pageCount: {
      type: Number,
      default: 50,
    },
    nextText: {
      type: String,
      default: '',
    }
  },
  setup(props) {
    const { next } = inject<IPagination>('pagination', {} as IPagination)
    const internalDisabled = computed(() => props.disabled
      || props.currentPage === props.pageCount
      || props.pageCount === 0
    )

    return {
      internalDisabled,
      next
    }
  }
})
</script>
