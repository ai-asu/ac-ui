import { App } from 'vue'
import Title from './src/title.vue'

Title.install = (app: App): void => {
    app.component(Title.name, Title);
};

export default Title
