import { VNode } from 'vue'

export type Position = 'top' | 'bottom'

export type MessageType = 'success' | 'warning' | 'info' | 'error' | ''

export type MessageOptions = {
	customClass?: string
	center?: boolean
	useHTMLString?: boolean
	duration?: number
	iconClass?: string
	id?: string
	message?: string | VNode
	offset?: number
	onClose?: () => void
	showClose?: boolean
	type?: MessageType
	zIndex?: number
	position?: Position
}

export type IMessageOptions = string | MessageOptions

export interface IMessage {
	(options: IMessageOptions): { close: () => void }
	closeAll(): void
}

export type MessageVM = VNode

type MessageQueueItem = {
	vm: MessageVM
}

export type MessageQueue = Array<MessageQueueItem>