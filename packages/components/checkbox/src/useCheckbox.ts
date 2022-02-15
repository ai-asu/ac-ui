import {
	computed,
	getCurrentInstance,
	ComponentInternalInstance,
	ref,
	inject
} from 'vue'
import { toTypeString } from '@vue/shared'
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../../../utils/constants'
import {CheckboxProps, CheckboxGroupInstance, ModelType} from './checkbox.type'

export const useCheckbox = (props: CheckboxProps) => {
  const { model } = useModel(props)
  const { focus, isChecked } = useCheckboxStatus(props, { model })
  const { isDisabled } = useDisabled(props)
  const { handleChange } = useEvent(props)

  setStoreValue(props, { model })

  return {
    model,
    focus,
    isChecked,
    isDisabled,
    handleChange
  }
}

const useCheckboxGroup = () => {
  const checkboxGroup = inject<CheckboxGroupInstance>('CheckboxGroup', {})
  const isGroup = computed(() => checkboxGroup && checkboxGroup?.name === 'AcCheckboxGroup')

  return {
    isGroup,
    checkboxGroup,
  }
}

const useModel = (props: CheckboxProps) => {
  let selfModel = false
  const { emit } = getCurrentInstance() as ComponentInternalInstance
  const { isGroup, checkboxGroup } = useCheckboxGroup()
  const store = computed(() => checkboxGroup ? checkboxGroup.modelValue?.value : props.modelValue)
  const model: ModelType = computed({
    get() {
      return isGroup.value
        ? store.value
        : props.modelValue ?? selfModel
    },

    set(val: unknown) {
      if (isGroup.value && Array.isArray(val)) {
        checkboxGroup.changeEvent?.(val)
      } else {
        emit(UPDATE_MODEL_EVENT, val)
        selfModel = val as boolean
      }
    }
  })

  return {
    model
  }
}

const useCheckboxStatus = (props: CheckboxProps, { model }: { model: ModelType }) => {
  const focus = ref(false)
  const isChecked = computed(() => {
    const value = model.value
    if (toTypeString(value) === '[object Boolean]') {
      return value
    } else if (Array.isArray(value)) {
      return value.includes(props.label)
    } else if (value !== null && value !== undefined) {
      return value === props.trueLabel
    }
    return value
  })
  return {
    isChecked,
    focus
  }
}

const useDisabled = (props: CheckboxProps) => {
  const { isGroup, checkboxGroup } = useCheckboxGroup()
  const isDisabled = computed(() => {
    const disabled = props.disabled
    return isGroup.value
      ? checkboxGroup.disabled?.value || disabled
      : props.disabled
  })

  return {
    isDisabled
  }
}

const setStoreValue = (props: CheckboxProps, { model }: { model: ModelType }) => {
  function addToStore() {
    if (
      Array.isArray(model.value) &&
      !model.value.includes(props.label)
    ) {
      model.value.push(props.label)
    } else {
      model.value = props.trueLabel || true
    }
  }
  props.checked && addToStore()
}

const useEvent = (props: CheckboxProps) => {
  const { emit } = getCurrentInstance() as ComponentInternalInstance

  function handleChange(e: InputEvent) {
    const target = e.target as HTMLInputElement
    const value = target.checked
      ? props.trueLabel ?? true
      : props.falseLabel ?? false

    emit(CHANGE_EVENT, value, e)
  }

  return {
    handleChange
  }
}
