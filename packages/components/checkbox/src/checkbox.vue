<template>
	<label
    :id="id"
    class="ac-checkbox"
    :class="[
      { 'is-disabled': disabled },
      { 'is-checked': isChecked }
    ]"
  >
    <span
      class="ac-checkbox__input"
      :class="{
        'is-disabled': disabled,
        'is-checked': isChecked,
        'is-focus': focus
      }"

    >
      <span class="ac-checkbox__inner"></span>
      <input
        v-if="trueLabel || falseLabel"
        v-model="model"
        :checked="isChecked"
        class="ac-checkbox__original"
        type="checkbox"
        :disabled="disabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      >
      <input
        v-else
        v-model="model"
        class="ac-checkbox__original"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      >
    </span>
    <span v-if="$slots.default || label" class="ac-checkbox__label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
		import { useCheckbox } from './useCheckbox'
    import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../../../utils/constants'
    import {CheckboxProps} from "./checkbox.type";

    export default defineComponent({
			name: "AcCheckbox",
			props: {
				modelValue: {
					type: [Boolean, Number, String],
				},
				label: {
					type: [Boolean, Number, String],
				},
				disabled: Boolean,
				checked: Boolean,
				trueLabel: {
					type: [String, Number],
					default: undefined,
				},
				falseLabel: {
					type: [String, Number],
					default: undefined,
				},
				id: {
					type: String,
					default: undefined,
				}
			},
      emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT],
			setup(props) {
				return useCheckbox(props as CheckboxProps)
			}
    })
</script>
