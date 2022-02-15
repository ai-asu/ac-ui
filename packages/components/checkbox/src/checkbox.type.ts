import {ComputedRef, WritableComputedRef} from 'vue'

export interface CheckboxGroupInstance {
  name?: string
  modelValue?: ComputedRef
  disabled?: ComputedRef<boolean>
  changeEvent?: any
}

export interface CheckboxProps {
  modelValue: string | boolean | number
  label?: string | boolean | number
  disabled?: boolean
  checked?: boolean
  trueLabel?: string | number
  falseLabel?: string | number
  id?: string
}

export type ModelType = WritableComputedRef<string | number | boolean>