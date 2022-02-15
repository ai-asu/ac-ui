import { App } from 'vue'
import Scrollbar from './src/scrollbar.vue'

Scrollbar.install = (app: App): void => {
  app.component(Scrollbar.name, Scrollbar);
};

export default Scrollbar
