import { ref, computed, inject } from 'vue'
import { radioGroupKey, RadioGroupContext, IUseRadioAttrsProps, IUseRadioAttrsState } from './radio.type'

export const useRadio = () => {
  const radioGroup = inject(radioGroupKey, {} as RadioGroupContext)
  const isGroup = computed(() => radioGroup?.name === 'AcRadioGroup')
  const focus = ref(false)

  return {
    isGroup,
    focus,
    radioGroup
  }
}

export const useRadioAttrs = (props:IUseRadioAttrsProps, {
  isGroup,
  radioGroup,
  model,
}: IUseRadioAttrsState) => {
  const isDisabled = computed(() => {
    return isGroup.value
      ? radioGroup.disabled || props.disabled
      : props.disabled
  })

  const tabIndex = computed(() => {
    return (isDisabled.value || (isGroup.value && model.value !== props.label)) ? -1 : 0
  })

  return {
    isDisabled,
    tabIndex
  }
}
