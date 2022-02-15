<template>
  <div class="ac-tabs__nav-wrap">
    <div class="ac-tabs__nav-scroll">
      <div class="ac-tabs__nav">
        <div 
          v-for="(pane, index) in panes"
          :key="`tab-${pane.props.name || pane.index || index.toString()}`"
          :id="`tab-${pane.props.name || pane.index || index.toString()}`"
          :ref="`tab-${pane.props.name || pane.index || index.toString()}`"
          :class="{
            'ac-tabs__item': true,
            'is-active': pane.active,
          }"
          @click="(ev) => $emit('onTabClick', { tab: pane, tabName: pane.props.name || pane.index || index.toString(), event: ev })"
        >
          {{pane.props.label}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Pane } from './tabs.type'

export default defineComponent({
  props: {
    panes: {
      type: Array as PropType<Pane[]>,
      default: () => ([] as Pane[]),
    },
    currentName: {
      type: String,
      default: '',
    }
  }
})
</script>