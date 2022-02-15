<template>
  <div class="ac-tabs">
    <div class="ac-tabs__header">
      <tab-nav
        ref="nav$"
        :panes="panes"
        :currentName="currentName"
        @onTabClick="handleTabClick"
      />
    </div>
    <div class="ac-tabs__content">
      <slot v-if="$slots.default"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ComponentInternalInstance,
  VNode,
  Component,
  Fragment,
  provide,
  ref,
  watch,
  Ref,
  onUpdated,
  onMounted
} from 'vue'
import TabNav from './tab-nav.vue'
import { UPDATE_MODEL_EVENT } from '../../../utils/constants'
import { TabsProps, RootTabs, Pane, UpdatePaneStateCallback } from './tabs.type'
import {ObjectIndex} from "../../../types";

export default defineComponent({
  name: "AcTabs",
  components: {
    TabNav
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    }
  },
  emits: ['tab-click', UPDATE_MODEL_EVENT],
  setup(props: TabsProps, ctx) {
    const nav$ = ref<typeof TabNav | null>(null)
    const currentName = ref(props.modelValue || '0')
    const panes: Ref<Pane[]> = ref([])
    const instance = getCurrentInstance() as ComponentInternalInstance
    const paneStatesMap: ObjectIndex<Pane> = {}

    provide<RootTabs>('rootTabs', {
      props,
      currentName
    })

    provide<UpdatePaneStateCallback>('updatePaneState', (pane: Pane) => {
      paneStatesMap[pane.uid] = pane
    })

    watch(() => props.modelValue, modelValue => {
      setCurrentName(modelValue)
    })

    watch(currentName, () => {
      setPaneInstances(true)
    })

    const setPaneInstances = (isForceUpdate = false) => {
      if(ctx.slots.default) {
        const children = instance.subTree.children

        // 判断类型是否正确
        const content = Array.from(children as ArrayLike<VNode>).find(({ props }) => {
          return props?.class === 'ac-tabs__content'
        })

        if(!content) return

        const paneInstanceList: Pane[] = getPaneInstanceFromSlot(content).map(paneComponent => {
          return paneStatesMap[paneComponent.uid]
        })
        const panesChanged = !(paneInstanceList.length === panes.value.length &&
            paneInstanceList.every((pane, index) => pane.uid === panes.value[index].uid))

        if (isForceUpdate || panesChanged) {
          panes.value = paneInstanceList
        }
      } else if (panes.value.length !== 0) {
        panes.value = []
      }
    }

    const getPaneInstanceFromSlot = (vnode: VNode, paneInstanceList: ComponentInternalInstance[] = []) => {
      Array.from((vnode.children || []) as ArrayLike<VNode>).forEach(node => {
        let type = node.type
        type = (type as Component).name || type
        if (type === 'AcTabPane' && node.component) {
          paneInstanceList.push(node.component)
        } else if(type === Fragment || type === 'template') {
          getPaneInstanceFromSlot(node, paneInstanceList)
        }
      })
      return paneInstanceList
    }

    // 设置当前tab
    const setCurrentName = (value: string) => {
      currentName.value = value
      ctx.emit(UPDATE_MODEL_EVENT, value)
    }

    const handleTabClick = ({ tab, tabName, event }: { tab: Pane, tabName: string, event: HTMLElement }) => {
      setCurrentName(tabName)
      ctx.emit('tab-click', tab, event)
    }

    onUpdated(() => {
      setPaneInstances()
    })

    onMounted(() => {
      setPaneInstances()
    })

    return {
      nav$,
      handleTabClick,
      panes,
      currentName
    }
  }
})
</script>
