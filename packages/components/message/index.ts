import { App } from 'vue'
import Message from './src/message'

type SFCWithInstall<T> = T & { install(app: App): void; }

const _Message: SFCWithInstall<typeof Message> = Message as SFCWithInstall<typeof Message>

_Message.install = (app: App) => {
	app.config.globalProperties.$message = _Message
}

export default _Message
