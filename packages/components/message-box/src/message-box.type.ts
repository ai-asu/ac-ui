import { VNode } from "vue";

export type MessageBoxVM = VNode
export type Action = 'confirm' | 'close' | 'cancel'
export type IMessageType = string | MessageBoxVM | MessageBoxOptions

export interface MessageBoxOptions {
	title?: string
	message?: string | VNode
	useHTMLString?: boolean
	customClass?: string
	callback?: null | Callback
	showClose?: boolean
	beforeClose?: null | BeforeClose
	distinguishCancelAndClose?: boolean
	showCancelButton?: boolean
	showConfirmButton?: boolean
	cancelButtonText?: string
	confirmButtonText?: string
	cancelButtonClass?: string
	confirmButtonClass?: string
	closeOnClickModal?: boolean
	closeOnPressEscape?: boolean
	closeOnHashChange?: boolean
	center?: boolean
	action?: Action
	zIndex?: number
}

export interface MessageBoxState {
	title: string
	message: string
	useHTMLString: boolean
	customClass: string
	callback: undefined | Callback
	beforeClose: undefined | BeforeClose
	distinguishCancelAndClose: boolean
	showCancelButton: boolean
	showConfirmButton: boolean
	cancelButtonText: string
	confirmButtonText: string
	cancelButtonClass: string
	confirmButtonClass: string
	action: Action
	zIndex: number
}


export type Callback = (action: Action, instance: MessageBoxOptions) => any
export type BeforeClose = (
	action: Action,
	instance: MessageBoxOptions,
	done: () => void,
) => void