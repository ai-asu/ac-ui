<template>
  <ac-scrollbar
    ref="navScroll"
    class="right-nav"
    wrap-style="max-height: 300px"
    style="position: fixed;right: 10px;top: 100px;width: 150px;border-left: 1px solid rgb(220, 223, 230);height: auto;max-height: 300px;"
  >
    <div v-for="item in anchors" :key="item" style="margin: 3px 0 3px 10px">
      <a
        class="ac-link"
        href="javascript:void 0;"
        :id="item"
        :title="item"
        @click="handleAnchorClick(item)"
      >
        <span class="ac-link--inner">{{ item }}</span>
      </a>
    </div>
  </ac-scrollbar>
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import ResizeObserver from 'resize-observer-polyfill'

export default defineComponent({
  setup() {
    // ordered
    const map = new Map()
    let anchors = ref<Array<string>>([])
    let scrollContainer: HTMLElement | null = null
    const active = ref('')
    const navScroll = ref(null)

    const handleAnchorClick = (anchor: string) => {
      (scrollContainer as HTMLElement).scrollTop = map.get(anchor)
      active.value = anchor
    }

    let resizeObserver: ResizeObserver | null = null

    onMounted(async () => {
      // waiting for components render, e.g. table.
      await nextTick()
      scrollContainer = document.querySelector('.ac-scrollbar.page-component__scroll>.ac-scrollbar__wrap.ac-scrollbar__wrap--hidden-default') as HTMLElement
      const content = document.querySelector('.ac-doc')
      if (!content) return
      const h3 = content.querySelectorAll('h3')
      anchors.value = Array.from(h3).map(item => {
        const content = item.childNodes[1].textContent
        const text = content ? content.trim() : ''
        map.set(text, item.offsetTop)
        return text
      })

      let mapValues = Array.from(map.values()).reverse()
      let mapKeys = Array.from(map.keys()).reverse()
      resizeObserver = new ResizeObserver(() => {
        Array.from(h3).map(item => {
          const content = item.childNodes[1].textContent
          const text = content ? content.trim() : ''
          map.set(text, item.offsetTop)
        })
        mapValues = Array.from(map.values()).reverse()
        mapKeys = Array.from(map.keys()).reverse()
      })
      resizeObserver.observe(<Element>(scrollContainer as HTMLElement).childNodes[0])

      let cachedIndex = -1
      scrollContainer.addEventListener('scroll', () => {
        const index = mapValues.findIndex(item => (scrollContainer as HTMLElement).scrollTop > item - 75)
        if (cachedIndex !== index && index !== -1) {
          active.value = mapKeys[index]
          cachedIndex = index
          document.getElementById(active.value)?.focus()
        }
      })
    })

    onBeforeUnmount(() => {
      resizeObserver?.disconnect()
    })
    return {
      navScroll,
      anchors,
      active,
      handleAnchorClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.ac-link {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  span {
    font-size: 12px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 135px;
  }
  &:hover {
    color: #409eff;
    &:after {
      display: block;
    }
  }
  &:after {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    height: 0;
    bottom: 0;
    display: none;
    border-bottom: 1px solid #409eff;
  }
}

@media (max-width: 1000px) {
  .right-nav {
    display: none;
  }
}
</style>
