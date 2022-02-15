<template>
  <ul class="ac-pager" @click="onPagerClick">
    <li
      v-if="pageCount > 0"
      :class="{ active: currentPage === 1, disabled }"
      class="number"
    >
      1
    </li>
    <li
      v-if="showPrevMore"
      class="ac-icon more btn-quickprev"
      :class="[quickprevIconClass, { disabled }]"
      @mouseenter="onMouseenter('left')"
      @mouseleave="quickprevIconClass = 'ac-icon-more'"
    >
    </li>
    <li
      v-for="pager in pagers"
      :key="pager"
      :class="{ active: currentPage === pager, disabled }"
      class="number"
    >
      {{ pager }}
    </li>
    <li
      v-if="showNextMore"
      class="ac-icon more btn-quicknext"
      :class="[quicknextIconClass, { disabled }]"
      @mouseenter="onMouseenter('right')"
      @mouseleave="quicknextIconClass = 'ac-icon-more'"
    >
    </li>
    <li
      v-if="pageCount > 1"
      :class="{ active: currentPage === pageCount, disabled }"
      class="number"
    >
      {{ pageCount }}
    </li>
  </ul>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watchEffect,
  inject
} from 'vue'
import { IPagination } from './pagiantion.type'

export default defineComponent({
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    pageCount: {
      type: Number,
    },
    pagerCount: {
      type: Number,
      default: 7,
    },
    disabled: Boolean,
  },
  emits: ['change'],
  setup(props) {
    const showPrevMore = ref(false)
    const showNextMore = ref(false)
    const quicknextIconClass = ref('ac-icon-more')
    const quickprevIconClass = ref('ac-icon-more')
    const pagination = inject<IPagination>('pagination', {} as IPagination)
    const pagers = computed(() => {
      // 页码按钮的数量，当总页数超过该值时会折叠
      const pagerCount = props.pagerCount
      const halfPagerCount = (pagerCount - 1) / 2
      // 当前页
      const currentPage = Number(props.currentPage)
      // 总页数
      const pageCount = Number(props.pageCount)

      let showPrevMore = false
      let showNextMore = false
      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore = true
        }
        if (currentPage < pageCount - halfPagerCount) {
          showNextMore = true
        }
      }

      const array: Array<number> = []
      if (showPrevMore && !showNextMore) {
        const startPage = pageCount - (pagerCount - 2)
        for (let i = startPage; i < pageCount; i++) {
          array.push(i)
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i)
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i)
        }
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push(i)
        }
      }

      return array
    })

    watchEffect(() => {
      const halfPagerCount = (props.pagerCount - 1) / 2

      showPrevMore.value = false
      showNextMore.value = false

      if ((props.pageCount as number) > props.pagerCount) {
        if (props.currentPage > props.pagerCount - halfPagerCount) {
          showPrevMore.value = true
        }
        if (props.currentPage < (props.pageCount as number) - halfPagerCount) {
          showNextMore.value = true
        }
      }
    })

    watchEffect(() => {
      if(!showPrevMore.value) quickprevIconClass.value = 'ac-icon-more'
    })
    watchEffect(() => {
      if(!showNextMore.value) quicknextIconClass.value = 'ac-icon-more'
    })

    function onMouseenter(direction: 'left' | 'right') {
      if (props.disabled) return
      if (direction === 'left') {
        quickprevIconClass.value = 'ac-icon-d-arrow-left'
      } else {
        quicknextIconClass.value = 'ac-icon-d-arrow-right'
      }
    }

    function onPagerClick(event: UIEvent) {
      const target = event.target as HTMLElement
      if (target.tagName.toLowerCase() === 'ul' || props.disabled) {
        return
      }

      let newPage = Number(target.textContent)
      const pageCount = props.pageCount as number
      const currentPage = props.currentPage
      const pagerCountOffset = props.pagerCount - 2
      if (target.className.includes('more')) {
        if (target.className.includes('quickprev')) {
          newPage = currentPage - pagerCountOffset
        } else if (target.className.includes('quicknext')) {
          newPage = currentPage + pagerCountOffset
        }
      }
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1
        }
        if (newPage > pageCount) {
          newPage = pageCount
        }
      }
      if (newPage !== currentPage) {
        pagination.changeEvent(Number(newPage))
      }
    }

    return {
      showPrevMore,
      showNextMore,
      quicknextIconClass,
      quickprevIconClass,
      pagers,
      onMouseenter,
      onPagerClick
    }
  }
})
</script>
