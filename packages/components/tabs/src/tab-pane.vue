<template>
  <div
    v-if="shouldBeRender"
    v-show="active"
    :id="`pane-${paneName}`"
    class="ac-tab-pane"
    :aria-hidden="!active"
    :aria-labelledby="`tab-${paneName}`"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, computed, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { UpdatePaneStateCallback, RootTabs, PaneProps } from './tabs.type'

export default defineComponent({
  name: "AcTabPane",
  props: {
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    lazy: Boolean,
  },
  setup(props: PaneProps) {
    let loaded = false
    const index = ref<string>('')
    const rootTabs = inject<RootTabs>('rootTabs')
    const updatePaneState = inject<UpdatePaneStateCallback>('updatePaneState')

    if (!rootTabs || !updatePaneState) {
      throw new Error(`AcTabPane must use with AcTabs`)
    }

    const active = computed(() => {
      const active = rootTabs.currentName.value === props.name
      loaded = active
      return active
    })

    const paneName = computed((): string => {
      return props.name || index.value
    })

    const shouldBeRender = computed(() => {
      return (!props.lazy || loaded) || active.value
    })

    const instance = getCurrentInstance() as ComponentInternalInstance
    updatePaneState({
      uid: instance.uid,
      instance,
      props,
      paneName,
      active,
      index
    })

    return {
      index,
      loaded,
      active,
      paneName,
      shouldBeRender,
    }
  }
})
</script>
