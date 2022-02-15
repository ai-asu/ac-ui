import { WritableComputedRef, ComputedRef, InjectionKey } from 'vue'

type IModelType = boolean | string | number

export interface RadioGroupContext {
  name: 'AcRadioGroup'
  modelValue: IModelType
  disabled: boolean
  changeEvent: (val: IModelType) => void
}

export const radioGroupKey: InjectionKey<RadioGroupContext> = 'RadioGroup' as any

export interface IUseRadioAttrsProps {
  disabled?: boolean
  label: string | number | boolean
}

export interface IUseRadioAttrsState {
  isGroup: ComputedRef<boolean>
  radioGroup: RadioGroupContext
  model: WritableComputedRef<string | number | boolean>
}
