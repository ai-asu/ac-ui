import { App } from 'vue'
import MessageBox from './src/message-box'

type SFCWithInstall<T> = T & { install(app: App): void; }

const _MessageBox: SFCWithInstall<typeof MessageBox> = MessageBox as SFCWithInstall<typeof MessageBox>

_MessageBox.install = (app: App) => {
	app.config.globalProperties.$msgbox = _MessageBox
	app.config.globalProperties.$messageBox = _MessageBox
}

export default _MessageBox