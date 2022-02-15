<template>
	<div
		class="ac-table"
		ref="table$"
	>
		<div class="ac-table__header-wrapper">
			<table
				class="ac-table__header"
				cellspacing="0"
				cellpadding="0"
				border="0"
				:style="{ width: tableWidth + 'px' }"
			>
				<thead>
					<tr>
						<th v-if="showIndex">
							<div class="cell">序号</div>
						</th>
						<th
							v-for="column in columns"
							:key="column.key"
							:class="column.align && `is-${column.align}`"
						>
							<div class="cell">{{ column.label }}</div>
						</th>
					</tr>
				</thead>
			</table>
		</div>
		<div class="ac-table__body-wrapper">
			<table
				class="ac-table__body"
				cellspacing="0"
				cellpadding="0"
				border="0"
				v-if="data && data.length > 0"
				:style="{ width: tableWidth + 'px' }"
			>
				<tbody>
					<tr
						class="ac-table__row"
						v-for="(item, index) in data"
						:key="index"
						:class="[
							{
								'ac-table__row--striped' : (index + 1) % 2 === 0,
							}
						]"
					>
						<td v-if="showIndex">
							<div class="cell">{{ index + 1 }}</div>
						</td>
						<td
							v-for="column in columns"
							:key="column.key"
							:class="column.align && `is-${column.align}`"
						>
							<div 
								class="cell"
								:class="column.ellipsis && 'cell-ellipsis'"
							>
								{{ item[column.key] }}
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div
        v-else
        ref="emptyBlock"
        class="ac-table__empty-block"
      >
        <span class="ac-table__empty-text">
          <slot name="empty">{{ emptyText || '暂无数据' }}</slot>
        </span>
      </div>
		</div>
	</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick
} from 'vue'
import { addResizeListener, removeResizeListener, ResizableElement } from '../../../utils/resize-event'

export default defineComponent({
	name: "AcTable",
	props: {
		data: Array,
		columns: Array,
    showIndex: Boolean,
		emptyText: String
	},
	setup() {
		const table$ = ref<null | ResizableElement>(null)
		const tableWidth = ref(0)
		const resizeWidth = ref(0)

		const resizeListener = () => {
			let shouldUpdateLayout = false
			const el = table$.value as ResizableElement
			const oldWidth = resizeWidth.value
			const width = el.offsetWidth

			if (oldWidth !== width) {
				shouldUpdateLayout = true
			}

			if (shouldUpdateLayout) {
				resizeWidth.value = width
        // todo: 减去2的原因未找到
				tableWidth.value = width - 2
			}
		}

		onMounted(() => {
			nextTick(() => {
				tableWidth.value = Math.ceil((table$.value as HTMLElement).offsetWidth)

				addResizeListener(table$.value as ResizableElement, resizeListener)
			})
		})

    onBeforeUnmount(() => {
			removeResizeListener(table$.value as ResizableElement, resizeListener)
		})

		return {
			table$,
			tableWidth
		}
	}
})
</script>
