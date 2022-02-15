<template>
  <div
    :class="[
      'ac-pagination',
      {
        'ac-pagination__rightwrapper': haveRightWrapper
      },
    ]"
    v-if="!this.hideOnSinglePage"
  >
    <template v-for="c in components" :key="c">
      <component
        :is="c" v-if="c !== 'right'"
        v-bind="template[c]"
      />
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watchEffect
} from 'vue'

import usePagination from './usePagination'
import { IPaginationProps } from './pagiantion.type'

import Prev from './prev.vue'
import Next from './next.vue'
import Jumper from './jumper.vue'
import Total from './total.vue'
import Pager from './pager.vue'

export default defineComponent({
  name: "AcPagination",
  components: {
    Prev,
    Next,
    Jumper,
    Total,
    Pager,
  },
  props: {
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
    },
    pageCount: {
      type: Number
    },
    pagerCount: {
      type: Number,
      validator: (value: number) => {
        return (
          (value | 0) === value && value > 4 && value < 22 && value % 2 === 1
        )
      },
      default: 7,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    layout: {
      type: String,
      default: 'prev, pager, next, jumper, total, right',
    },
    prevText: {
      type: String,
      default: '',
    },
    nextText: {
      type: String,
      default: '',
    },
    disabled: Boolean,
    hideOnSinglePage: Boolean,
  },
  emits: [
    'current-change',
    'prev-click',
    'next-click',
    'update:currentPage',
    'update:pageSize',
  ],
  setup(props, { emit }) {
    const template = ref({})
    const haveRightWrapper = ref(false)
    const {
      internalCurrentPage,
      internalPageCount
    } = usePagination(props as IPaginationProps, emit)

    watchEffect(() => {
      const TEMPLATE_PROPS_MAP = {
        'prev': {
          disabled: props.disabled,
          currentPage: internalCurrentPage.value,
          prevText: props.prevText,
        },
        'jumper': {},
        'pager': {
          currentPage: internalCurrentPage.value,
          pageCount: internalPageCount.value,
          pagerCount: props.pagerCount,
          disabled: props.disabled,
        },
        'next': {
          disabled: props.disabled,
          currentPage: internalCurrentPage.value,
          pageCount: internalPageCount.value,
          nextText: props.nextText,
        },
        'total': {
          total: props.total
        }
      }
      template.value = TEMPLATE_PROPS_MAP
    })

    // 是否靠右布局
    const components = props.layout.split(',').map((item: string) => item.trim())
    components.forEach((c) => {
      if (c === 'right') {
        haveRightWrapper.value = true
        return
      }
    })

    return {
      haveRightWrapper,
      components,
      template
    }
  }
})
</script>
