<template>
	<div 
		:class="[
			'ac-title',
			showSpacer && 'ac-title--spacer',
			size && `ac-title--${size}`,
		]"
    :style="{ background }"
	>
    <!-- 前置内容 -->
    <span v-if="$slots.prefix || prefixIcon" class="ac-title__prefix">
      <slot name="prefix"></slot>
      <i
        v-if="prefixIcon"
        :class="['ac-title__icon', prefixIcon]"
      />
    </span>
    <span class="ac-title__inner">{{title}}</span>
    <!-- 后置内容 -->
    <span v-if="$slots.suffix || suffixLabel" class="ac-title__suffix">
      <slot name="suffix"></slot>
      <label v-if="suffixLabel">{{suffixLabel}}</label>
    </span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: "AcTitle",
	props: {
		size: {
			type: String,
      validator: (val: string) => ['', 'medium', 'small', 'mini'].includes(val),
      default: ''
		},
		title: String,
    prefixIcon: String,
    suffixLabel: String,
    background: String,
    showSpacer: {
      type: Boolean,
      default: false
    }
	}
})
</script>