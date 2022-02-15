// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import {
	CustomChart,
	CustomSeriesOption,
	PictorialBarChart,
	PictorialBarSeriesOption,
	BarChart,
	BarSeriesOption,
	LineChart,
	LineSeriesOption,
	PieChart,
	PieSeriesOption,
	RadarChart,
	RadarSeriesOption,
	ScatterChart,
	ScatterSeriesOption,
} from 'echarts/charts';
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
	TitleComponent,
	TooltipComponent,
	GridComponent,
	AxisPointerComponent,
	LegendComponent,
	PolarComponent
} from 'echarts/components';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
	CanvasRenderer,
} from 'echarts/renderers';
import { SeriesOption } from 'echarts/types/dist/shared';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
	CustomSeriesOption |
	PictorialBarSeriesOption |
	BarSeriesOption |
	LineSeriesOption |
	PieSeriesOption |
	RadarSeriesOption |
	ScatterSeriesOption | SeriesOption
>;
export type _ECOption = ECOption | { [key: string]: any }

// 注册必须的组件
echarts.use(
	[
		TitleComponent,
		TooltipComponent,
		GridComponent,
		AxisPointerComponent,
		LegendComponent,
		PolarComponent,
		CustomChart,
		PictorialBarChart,
		BarChart,
		LineChart,
		PieChart,
		RadarChart,
		ScatterChart,
		CanvasRenderer
	]
);

export default echarts