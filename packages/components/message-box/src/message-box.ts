import {Action, Callback, IMessageType, MessageBoxState} from "./message-box.type";
import {ComponentInternalInstance, ComponentPublicInstance, h, isVNode, render, watch} from "vue";
import MessageBoxConstructor from './index.vue'

const messageInstance = new Map<
	ComponentPublicInstance<{
		visible: boolean;
		doClose: () => void
	}>,
	{
		options: any
		callback: Callback
		resolve: (res: any) => void
		reject: (reason?: any) => void
	}
>()

const initInstance = (props: any, container: HTMLElement) => {
	const vnode = h(MessageBoxConstructor, props)
	render(vnode, container)
	document.body.appendChild(container.firstElementChild as HTMLElement)
	return vnode.component as ComponentInternalInstance
}

const showMessage = (options: any) => {
	const container = document.createElement('div')

	// MessageBox 关闭后删除实例释放内存
	options.onVanish = () => {
		render(null, container)
		messageInstance.delete(vm)
	}
	// MessageBox 点击按钮的操作回调，cancel、close、confirm
	options.onAction = (action: Action) => {
		const currentMsg = messageInstance.get(vm)

		if (options.callback) {
			options.callback(action, instance.proxy)
		} else {
			if (action === 'cancel' || action === 'close') {
				// 	区分close、cancel
				if (options.distinguishCancelAndClose && action !== 'cancel') {
					currentMsg?.reject('close')
				} else {
					currentMsg?.reject('cancel')
				}
			} else {
				currentMsg?.resolve(action)
			}
		}
	}
	// 挂载到div上
	const instance = initInstance(options, container)

	const vm = instance.proxy as ComponentPublicInstance<{
		visible: boolean
		doClose: () => void
	} & MessageBoxState>


	watch(() => vm.message, (newVal, oldVal) => {
		if (isVNode(newVal)) {
			// VNode重写slots
			instance.slots.default = () => [newVal]
		} else if(isVNode(oldVal) && !isVNode(newVal)){
			delete instance.slots.default
		}
	}, {
		immediate: true,
	})

	vm.visible = true
	return vm
}

const MessageBox = (options: IMessageType): Promise<Action> => {
	let callback: Callback
	if (typeof options === 'string' || isVNode(options)) {
		options = {
			message: options
		}
	} else {
		callback = options.callback as Callback
	}

	return new Promise((resolve, reject) => {
		const vm = showMessage(options)

		messageInstance.set(vm, {
			options,
			callback,
			resolve,
			reject
		})
	})
}

MessageBox.close = () => {
	messageInstance.forEach((_, vm) => {
		vm.doClose()
	})

	messageInstance.clear()
}

export default MessageBox