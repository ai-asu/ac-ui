import { App } from 'vue'
import BarChart from './src/barChart.vue'
import LineChart from './src/lineChart.vue'
import PictorialBarChart from './src/pictorialBarChart.vue'
import PieChart from './src/pieChart.vue'
import RadarChart from './src/radarChart.vue'
import LineBarChart from './src/lineBarChart.vue'

BarChart.install = (app: App): void => {
	app.component(BarChart.name, BarChart);
};
LineChart.install = (app: App): void => {
	app.component(LineChart.name, LineChart);
};
PictorialBarChart.install = (app: App): void => {
	app.component(PictorialBarChart.name, PictorialBarChart);
};
PieChart.install = (app: App): void => {
	app.component(PieChart.name, PieChart);
};
RadarChart.install = (app: App): void => {
	app.component(RadarChart.name, RadarChart);
};
LineBarChart.install = (app: App): void => {
	app.component(LineBarChart.name, LineBarChart);
};

export {
	BarChart,
	LineChart,
	PictorialBarChart,
	PieChart,
	RadarChart,
	LineBarChart
}
