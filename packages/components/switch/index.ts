import { App } from 'vue'
import Switch from './src/switch.vue'

Switch.install = (app: App): void => {
  app.component(Switch.name, Switch);
};

export default Switch
