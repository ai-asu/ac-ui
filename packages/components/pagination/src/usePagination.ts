import { ref, provide, computed, watch } from 'vue'
import { IPagination, IPaginationProps } from './pagiantion.type'

const getValidPageSize = (val: number) => Number.isNaN(val) ? 10 : val

const usePagination = (props: IPaginationProps, emit: any) => {
  const lastEmittedPage = ref(-1)
  const userChangePageSize = ref(false)

  // 每页显示个数
  const internalPageSize = ref(getValidPageSize(props.pageSize))
  // 总页数
  const internalPageCount = computed(() => {
    if (typeof props.total === 'number') {
      return Math.max(1, Math.ceil(props.total / internalPageSize.value))
    } else if (typeof props.pageCount === 'number') {
      return Math.max(1, props.pageCount)
    }
    return 1
  })
   // 当前页
  const internalCurrentPage = ref(getValidCurrentPage(props.currentPage))

  function emitChange() {
    if (
      internalCurrentPage.value !== lastEmittedPage.value ||
      userChangePageSize.value
    ) {
      lastEmittedPage.value = internalCurrentPage.value
      userChangePageSize.value = false
      emit('update:currentPage', internalCurrentPage.value)
      emit('current-change', internalCurrentPage.value)
    }
  }

  // 跳转页数
  function handleCurrentChange(val: number) {
    internalCurrentPage.value = getValidCurrentPage(val)
    userChangePageSize.value = true
    emitChange()
  }
  // 上一页
  function prev() {
    if (props.disabled) return
    const newVal = internalCurrentPage.value - 1
    internalCurrentPage.value = getValidCurrentPage(newVal)
    emit('prev-click', internalCurrentPage.value)
    emitChange()
  }
  // 下一页
  function next() {
    if (props.disabled) return
    const newVal = internalCurrentPage.value + 1
    internalCurrentPage.value = getValidCurrentPage(newVal)
    emit('next-click', internalCurrentPage.value)
    emitChange()
  }
  // 处理页数
  function getValidCurrentPage (value: number | string) {
    // 输入框输入，转为数字
    if (typeof value === 'string') {
      value = parseInt(value, 10)
    }

    // -------------------以下判断主要针对输入框的值
    let resetValue: number | undefined
    
    if (value < 1) { // 输入的值小于1
      resetValue = 1
    } else if (value > internalPageCount.value) { // 输入的值超出总页数
      resetValue = internalPageCount.value
    }

    if (resetValue === undefined && isNaN(value)) {
      resetValue = 1
    } else if (resetValue === 0) {
      resetValue = 1
    }
    // -------------------

    return resetValue === undefined ? value : resetValue
  }

  watch(() => props.pageSize, val => {
    internalPageSize.value = getValidPageSize(val)
  })
  watch(() => props.currentPage, val => {
    internalCurrentPage.value = getValidCurrentPage(val)
  })
  watch(() => internalPageCount.value, val => {
    const oldPage = internalCurrentPage.value
    if (val > 0 && oldPage === 0) {
      internalCurrentPage.value = 1
    } else if (oldPage > val) {
      internalCurrentPage.value = val === 0 ? 1 : val
      emitChange()
    }
  })
  
  provide<IPagination>('pagination', {
    pageCount: computed(() => props.pageCount),
    disabled: computed(() => props.disabled),
    currentPage: computed(() => internalCurrentPage.value),
    changeEvent: handleCurrentChange,
    prev,
    next
  })

  return {
    internalPageSize,
    internalCurrentPage,
    internalPageCount
  }
}

export default usePagination