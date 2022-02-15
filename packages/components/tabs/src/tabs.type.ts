import { Ref, ComponentInternalInstance, ComputedRef } from 'vue'

export interface TabsProps {
  modelValue: string
}

export interface RootTabs {
  props: TabsProps
  currentName: Ref<string>
}

export interface PaneProps {
  label: string
  name: string
  lazy: boolean
}

export interface Pane {
  uid: number
  instance: ComponentInternalInstance
  props: PaneProps
  paneName: ComputedRef<string>
  active: ComputedRef<boolean>
  index: Ref<string>
}

export type UpdatePaneStateCallback = (pane: Pane) => void