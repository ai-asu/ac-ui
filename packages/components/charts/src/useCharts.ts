import { nextTick, onMounted, onUnmounted } from 'vue'
import echarts, {_ECOption} from './echarts'
import {
	Axis,
	XAXisOption,
	YAXisOption,
	LegendOption,
	GridOption,
	TooltipOption, EChartsType
} from "echarts/types/dist/shared";

import {
	defaultConfig,
	gridConfig,
	legendConfig,
	tooltipConfig,
	xAxisConfig,
	yAxisConfig,
} from './defaultConfig'
import {AxisType, ChartsPropsType, ChartType} from "./types";


const useCharts = (props: ChartsPropsType, otherOptions: _ECOption, type: ChartType) => {
	if (!props.options) return

	const option = concatOptions(props, type)
	const options: _ECOption = {
		...option,
		...otherOptions,
		legend: {
			...option.legend as LegendOption,
			...otherOptions.legend
		}
	}
	console.log(options)

	let chart: EChartsType

	function initEcharts() {
		chart = echarts.init(document.getElementById(props.id) as HTMLElement)

		// 清除画布内容,以便重加载
		chart.clear();
		chart.setOption(options);
		// 清除点击事件
		chart.off('click');
		chart.on('click',(params) => {
			if (props.options.clickFn) props.options.clickFn(params);
		});
	}

	function onResize() {
		if (chart) chart.resize();
	}

	onMounted(() => {
		nextTick(() => {
			initEcharts();
		})
		window.addEventListener('resize', onResize)
	});

	onUnmounted(() => {
		window.removeEventListener('resize', onResize)
	})
}

function concatOptions({ options, direction }: ChartsPropsType, type: ChartType) {
	const { splitLine, backgroundColor } = defaultConfig
	const isVertical: boolean = !direction ? true : direction === 'vertical'

	const legend = {
		...legendConfig,
		...(options.legend as LegendOption)
	}
	const grid = {
		...gridConfig,
		...(options.grid as GridOption)
	}
	const tooltip: TooltipOption = {
		...tooltipConfig,
		...options.tooltip as TooltipOption
	}

	let result: _ECOption | {string: any} = {
		...options,
		backgroundColor: options.backgroundColor || backgroundColor,
		legend,
		grid,
		tooltip
	}

	if (type !== 'radar') {
		let xAxis: AxisType = [{
			axisLine: {
				show: false
			}
		}], yAxis: AxisType = [{
			axisLine: {
				show: false
			}
		}]
		if (type !== 'pie') {
			xAxis = handleAxis('x', options.xAxis as AxisType, isVertical, splitLine as XAXisOption['splitLine'])
			yAxis = handleAxis('y', options.yAxis as AxisType, isVertical, splitLine as YAXisOption['splitLine'])
		}
		result = { ...result, xAxis, yAxis }
	}

	return result
}

function handleAxis(
	type: string,
	axis: AxisType,
	isVertical: boolean,
	splitLine: XAXisOption['splitLine'] | YAXisOption['splitLine']
) : AxisType
{
	const axisConfig = type === 'x' ? xAxisConfig : yAxisConfig,
		axisType: Axis['type'] = type === 'x' ?
			(isVertical ? 'category' : 'value') :
			(isVertical ? 'value' : 'category')

	if (!axis) {
		return [{
			...axisConfig,
			type: axisType,
			splitLine: {
				show: type === 'x' ? !isVertical : isVertical,
				...splitLine
			},
		}]
	} else {
		const _axis: AxisType = []
		axis.forEach(item => {
			_axis.push({
				...axisConfig,
				type: axisType,
				splitLine: {
					show: type === 'x' ? !isVertical : isVertical,
					...splitLine
				},
				...item
			} as (XAXisOption | YAXisOption))
		})
		return _axis
	}
}


export function handleItemStyle(item: _ECOption, isVertical: boolean): {
	itemStyle: _ECOption['itemStyle'],
	emphasis: _ECOption['emphasis']
} {

	return {
		itemStyle: {
			color: {
				...handleLinearGradient(isVertical, item.normalColor, 'normal')
			},
			...item.itemStyle
		},
		emphasis: {
			itemStyle: {
				color: {
					...handleLinearGradient(isVertical, item.emphasisColor, 'emphasis')
				},
				...(item.emphasis && item.emphasis.itemStyle)
			},
			...item.emphasis
		}
	}
}

export function handleLinearGradient(isVertical: boolean, color: string[], type: 'normal' | 'emphasis'): echarts.LinearGradientObject {
	const { normalColor, emphasisColor } = defaultConfig
	const defaultColor = type === 'normal' ? normalColor : emphasisColor

	return {
		type: 'linear',
		x: (!isVertical ? 1 : 0),
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [{
			offset: 0,
			color: color ? color[0] : defaultColor[0]
		}, {
			offset: 1,
			color: color ?
				(color[1] ? color[1] : color[0]) :
				defaultColor[1]
		}],
		global: false
	}
}

export default useCharts