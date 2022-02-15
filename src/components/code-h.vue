<template>
  <pre class="code-h line-numbers"><code :class="'language-' + lang" ref="codeContent"></code></pre>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, Ref, watch} from 'vue'
import Prism from 'prismjs'

Prism.plugins.NormalizeWhitespace.setDefaults({
	'remove-trailing': true,
	'remove-indent': true,
	'left-trim': true,
	'right-trim': true,
	'break-lines': 8888,
	'remove-initial-line-feed': false
})

export default defineComponent({
	name: 'code-h',
	props: {
    color: String,
		lang: {
			default: '',
			type: String
		},
		content: {
			default: '',
			type: String
		}
	},
	setup(props) {
		const codeContent: Ref<null | HTMLElement> = ref(null)
		const normalizeContent = (v: string) => {
      return v.split('\n')
          .map((c: string) => {
            c = c.replace(/</g, '&lt;')
            c = c.replace(/>/g, '&gt;')
            c = c.replace(/\\\{/g, '{')
            c = c.replace(/\\\}/g, '}')
            return c
          })
          .join('\n')
		}

		onMounted(() => {
			if (props.content) {
				(codeContent.value as HTMLElement).innerHTML = normalizeContent(props.content)
			}
			Prism.highlightAll()
		})
		watch(() => props.content, (v) => {
			(codeContent.value as HTMLElement).innerText = normalizeContent(v)
			Prism.highlightAll()
		})

		return {
			codeContent
		}
	}
})
</script>

<style lang="scss">
.code-h {
	max-height: 500px;
	border-radius: 4px;
}
.line-numbers-rows {
	span {
		line-height: 1.5;
	}
}

pre {
	&::-webkit-scrollbar {
		width: 5px;
		height: 5px;
	}

	/* 滚动条有滑块的轨道部分 */
	&::-webkit-scrollbar-track-piece {
		background-color: transparent;
		border-radius: 8px;
	}

	/* 滚动条滑块(竖向:vertical 横向:horizontal) */
	&::-webkit-scrollbar-thumb {
		cursor: pointer;
		background-color:#00d5ff;
		border-radius: 5px;
	}

	/* 滚动条滑块hover */
	&::-webkit-scrollbar-thumb:hover {
		background-color: #6de7ff;
	}

	/* 同时有垂直和水平滚动条时交汇的部分 */
	&::-webkit-scrollbar-corner {
		display: block;    /* 修复交汇时出现的白块 */
	}
}
</style>
