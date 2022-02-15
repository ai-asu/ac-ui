<template>
  <div
    ref="selectWrapper"
    class="ac-select"
    :class="[
      {'is-border': border},
      size && `ac-select--${size}`
    ]"
    @click="toggleMenu"
  >
    <div class="select-trigger" ref="trigger">
      <AcInput
        v-model="selectedLabel"
        placeholder="请选择"
        readonly
        :disabled="disabled"
        :style="{'backgroundColor': backgroundColor}"
      >
        <template #suffix>
          <i :class="['ac-select__caret', 'ac-input__icon', 'ac-icon-' + iconClass]"></i>
        </template>
      </AcInput>
    </div>
    <Teleport to="body">
      <div
        class="ac-select__popper ac-popper"
        ref="reference"
        :style="{'width': referenceWidth+'px'}"
        :class="[size && `ac-select--${size}__popper`]"
      >
        <div class="ac-select-dropdown" v-show="isOpen">
          <AcScrollbar
            ref="scrollbar"
            tag="ul"
            wrap-class="ac-select-dropdown__wrap"
            view-class="ac-select-dropdown__list"
          >
            <slot></slot>
          </AcScrollbar>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  toRefs,
  provide,
  reactive,
  onMounted,
  nextTick,
  computed,
  InjectionKey,
  ComponentPublicInstance
} from 'vue'
import AcInput from '../../input/src/input.vue'
import AcScrollbar from '../../scrollbar/src/scrollbar.vue'
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../../../utils/constants'
import useClickOutside from './useClickOutside'
import { createPopper } from '@popperjs/core'
import { OptionType } from './option.vue'

export const selectKey = 'AcSelect' as unknown as InjectionKey<SelectContext>

export interface SelectContext {
  modelValue?: string | number
  onOptionCreate(vm: OptionType): void
  onOptionDestroy(key: string | number): void
  handleOptionSelect(option: OptionType): void
}

export default defineComponent({
  name: "AcSelect",
  components: {
    AcInput,
    AcScrollbar
  },
  props: {
    modelValue: [String, Number],
    border: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: 'transparent'
    }
  },
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT],
  setup(props, ctx) {
    const selectWrapper = ref<null | HTMLElement>(null)
    const trigger = ref<null | HTMLElement>(null)
    const reference = ref<null | HTMLElement>(null)
    const referenceWidth = ref(0)
    const options = new Map()
    const selectedLabel = ref<string | number | undefined>('')
    const selectSize = ref(null)
    const isOpen = ref(false)

    const iconClass = computed(() => isOpen.value ? 'arrow-up is-reverse' : 'arrow-up')

    onMounted(() => {
      nextTick(() => {
        // 基于div定位
        createPopper(trigger.value as HTMLElement, reference.value as HTMLElement, {
          placement: 'bottom',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 5],
              },
            }
          ]
        });
        referenceWidth.value = (trigger.value as HTMLElement).clientWidth
      })
    })

    // 点击外部关闭
    const isClickOutside = useClickOutside(selectWrapper)
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })

    const toggleMenu = () => {
      if (props.disabled) return
      isOpen.value = !isOpen.value
    }

    const onOptionCreate = (vm: OptionType) => {
      options.set(vm.value, vm)
    }
    const onOptionDestroy = (key: string | number) => {
      options.delete(key)
    }

    const handleOptionSelect = (option: OptionType) => {
      ctx.emit(UPDATE_MODEL_EVENT, option.value)
      ctx.emit(CHANGE_EVENT, option.value)
      toggleMenu()
    }

    provide(selectKey, reactive({
      ...toRefs(props),
      onOptionCreate,
      onOptionDestroy,
      handleOptionSelect
    }))

    watch(() => props.modelValue, () => {
      selectedLabel.value = options.get(props.modelValue).label
    }, {
      flush: 'post',
      deep: true,
    })

    return {
      selectWrapper,
      trigger,
      reference,
      referenceWidth,
      selectedLabel,
      selectSize,
      toggleMenu,
      iconClass,
      isOpen,
      handleOptionSelect
    }
  }
})
</script>
