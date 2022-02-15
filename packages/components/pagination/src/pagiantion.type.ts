import { ComputedRef } from 'vue'

export interface IPagination {
  currentPage: ComputedRef<number>
  pageCount: ComputedRef<number>
  disabled: ComputedRef<boolean>
  changeEvent: (...args: any[]) => any
  prev: (...args: any[]) => any
  next: (...args: any[]) => any
}

export interface IPaginationProps {
  pageSize: number
  small: boolean
  total: number
  pageCount: number
  pagerCount: number
  currentPage: number
  layout: string
  prevText: string
  nextText: string
  background: boolean
  disabled: boolean
  hideOnSinglePage: boolean
}
