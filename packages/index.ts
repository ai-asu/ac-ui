import {App} from 'vue'
import Button from './components/button/index'
import Checkbox from './components/checkbox/index'
import CheckboxGroup from './components/checkbox-group/index'
import Input from './components/input/index'
import Radio from './components/radio/index'
import RadioGroup from './components/radio-group/index'
import Scrollbar from './components/scrollbar/index'
import Select from './components/select/index'
import Option from './components/option/index'
import Pagination from './components/pagination/index'
import Switch from './components/switch/index'
import TabPane from './components/tab-pane/index'
import Table from './components/table/index'
import Tabs from './components/tabs/index'
import Title from './components/title/index'
import {
	BarChart,
	LineChart,
	PictorialBarChart,
	PieChart,
	RadarChart,
	LineBarChart
} from './components/charts/index'
import Message from './components/message/index'
import MessageBox from './components/message-box/index'


const components = [
	Button,
	Checkbox,
	CheckboxGroup,
	Input,
	Radio,
	RadioGroup,
	Scrollbar,
	Select,
	Option,
	Pagination,
	Switch,
	Table,
	TabPane,
	Tabs,
	Title,
	BarChart,
	LineChart,
	PieChart,
	RadarChart,
	PictorialBarChart,
	LineBarChart
]

export {
	Button,
	Checkbox,
	CheckboxGroup,
	Input,
	Radio,
	RadioGroup,
	Scrollbar,
	Select,
	Option,
	Pagination,
	Switch,
	Table,
	TabPane,
	Tabs,
	Title,
	BarChart,
	LineChart,
	PieChart,
	RadarChart,
	PictorialBarChart,
	LineBarChart,
	Message,
	MessageBox
}

const plugins = [
	Message,
	MessageBox
]

const install = (app: App): void => {
	components.forEach(component => {
		app.component(component.name, component);
	});

	plugins.forEach(plugin => {
		app.use(plugin)
	})
}

export default {
	install
}
