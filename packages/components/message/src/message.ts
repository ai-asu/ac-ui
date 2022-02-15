import {IMessage, IMessageOptions, MessageOptions, MessageQueue, Position} from "./message.type";
import {ComponentInternalInstance, ComponentPublicInstance, createVNode, isVNode, render, VNode} from "vue";
import MessageConstructor from './index.vue'
import {nextZIndex} from "../../../utils/util";

const messages: Record<Position, MessageQueue> = {
	'top': [],
	'bottom': []
}
let seed = 1

const Message: IMessage = (opts) => {
	if (typeof opts === 'string') {
		opts = {
			message: opts
		}
	}

	let options: MessageOptions = <MessageOptions>opts
	const position = options.position || 'top'

	let verticalOffset = options.offset || 20
	messages[position]
		.forEach(({ vm }) => {
			verticalOffset += (vm.el?.offsetHeight || 0) + 16
		})
	verticalOffset += 16

	const id = 'message_' + seed++
	const userOnClose = options.onClose

	options = {
		...options,
		onClose: () => {
			close(id, options.position || 'top', userOnClose)
		},
		offset: verticalOffset,
		id,
		zIndex: nextZIndex(),
	}

	const container = document.createElement('div')

	container.className = `container_${id}`

	const message = options.message
	const vm = createVNode(
		MessageConstructor,
		options,
		isVNode(options.message) ? { default: () => message } : null,
	)

	// 手动删除message实例
	if (vm.props) {
		vm.props.onDestroy = () => render(null, container)
	}

	render(vm, container)
	messages[position].push({ vm })
	document.body.appendChild(container.firstElementChild as HTMLDivElement)

	return {
		// 通过设置组件的 visible 值关闭 Message，使组件的生命周期保留完整
		close: () => ((vm.component as ComponentInternalInstance).proxy as ComponentPublicInstance<{visible: boolean}>).visible = false,
	}
}

export function close(
	id: string,
	position: Position,
	userOnClose?: (vm: VNode) => void
): void {
	const instance = messages[position]
	const idx = instance.findIndex(({vm}) => {
		if (vm.component) {
			return id === vm.component.props.id
		}
		return -1
	})
	if (idx === -1) {
		return
	}

	const {vm} = instance[idx]
	if (!vm) return
	userOnClose?.(vm)

	const removedHeight = vm.el ? vm.el.offsetHeight : 0
	instance.splice(idx, 1)

	// 调整垂直方向偏移
	const len = instance.length
	if (len < 1) return
	for (let i = idx; i < len; i++) {
		const pos = parseInt(instance[i].vm.el?.style[position], 10) - removedHeight - 16;

		(instance[i].vm.component as ComponentInternalInstance).props.offset = pos
	}
}

(['success', 'warning', 'info', 'error'] as const).forEach(type => {
	Object.assign(Message, {
		[type]: (options: IMessageOptions) => {
			if (typeof options === 'string') {
				options = {
					message: options,
					type,
				}
			} else {
				options.type = type
			}
			return Message(options)
		}
	})
})

export function closeAll(): void {
	for (const key in messages) {
		const instance = messages[key as Position]
		instance.forEach(({ vm }) => {
			(vm.component as any).ctx.close()
		})
	}
}

Message.closeAll = closeAll

export default Message