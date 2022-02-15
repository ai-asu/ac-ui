<template>
	<button
		:class="[
			'ac-button',
			`ac-button--${type}`,
			{
				'is-disabled': disabled
			}
		]"
		:disabled="disabled"
		@click="handleClick"
	>
		<i v-if="icon" :class="icon"></i>
		<span v-if="$slots.default"><slot></slot></span>
	</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"

type ButtonType = PropType<
	'default' | 'handle' | 'special' | 'image' | 'text'
>

export default defineComponent({
	name: "AcButton",
	props: {
		type: {
			type: String as ButtonType,
			default: 'default',
			validator: (val: string) => {
        return [
          'default',
          'handle',
          'special',
          'image',
          'text',
        ].includes(val)
      }
		},
		icon: {
      type: String,
      default: ''
    },
		disabled: Boolean
	},
	emits: ['click'],
	setup(props, ctx) {
		const handleClick = (evt: Event) => {
      ctx.emit('click', evt)
    }

		return {
			handleClick
		}
	}
})
</script>
