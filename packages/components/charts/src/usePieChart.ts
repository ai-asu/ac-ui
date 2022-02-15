import 'echarts-liquidfill'
import { defaultConfig } from './defaultConfig'
import { handleLinearGradient } from "./useCharts";
import {ChartsPropsType, PieChartType} from "./types";
import {_ECOption} from "./echarts";
import {PieDataItemOption} from "echarts/types/src/chart/pie/PieSeries";
import {CallbackDataParams} from "echarts/types/src/util/types";

const {
	fontSize,
	fontWeight,
	fontFamily
} = defaultConfig

const usePieChart = (props: ChartsPropsType) => {
	if (!props.options) return

	return concatOptions(props)
}

function concatOptions({ options, type }: ChartsPropsType) {
	const legend = {
		orient: options.series[0].data.length > 1 && type === 'divide' ? 'horizontal' : 'vertical',
		right: '5%',
		top: 'center',
		...options.legend
	}

	const series = handleSeries(options, type as PieChartType)

	return {
		series,
		legend
	}
}

function handleSeries(options: _ECOption, type: PieChartType) {
	const { radius, data, colors } = options.series[0]
	// 水球图
	if (type === 'waterPolo') return returnWaterPolo(options)

	// 其他图形
	const _data: Array<any> = []
	data.forEach((item: PieDataItemOption, index: number) => {
		_data.push({
			value: item.value,
			name: item.name,
			...item,
			itemStyle: {
				color: colors && {
					...handleLinearGradient(true, colors[index], 'normal')
				},
				...item.itemStyle
			}
		})
		// 分割圆
		if (data.length > 1 && type === 'divide') {
			_data.push({
				name: '',
				value: 1,
				itemStyle: {
					label: {
						show: false
					},
					labelLine: {
						show: false
					},
					color: 'transparent',
					borderColor: 'transparent',
					borderWidth: 0
				}
			})
		}
	})
	options.series[0].data = _data

	const label = {
		...(radius && parseInt(radius[0]) > 0 ? {
			label: {
				position: 'center',
				y: 'center',
				align: 'center',
				formatter: '{a}\n{b}',
				verticalAlign: 'middle',
				fontSize: '0'
			},
			labelLine: {
				show: false
			},
			emphasis: {
				label: {
					show: true,
					formatter: function (params: CallbackDataParams) {
						return `{a|${params.value}}\n{b|${params.name}}`
					},
					rich: {
						a: {
							fontSize: 18,
							fontFamily,
							fontWeight: 'bold',
							color: 'rgba(255, 255, 255, 0.65)',
							lineHeight: 30
						},
						b: {
							fontSize,
							fontFamily,
							fontWeight,
							color: 'rgba(255, 255, 255, 0.65)'
						}
					}
				}
			}
		} : {
			label: {
				show: false
			},
			labelLine: {
				show: false
			}
		})
	}

	return [{
		type: 'pie',
		...label,
		minAngle: 5,	// 最小显示
		selectedOffset: 10,	// 选中扇区的偏移距离
		...options.series[0]
	}]
}

function returnWaterPolo(options: _ECOption) {
	return [{
		type: 'liquidFill',
		radius: '75%',
		itemStyle: {
			opacity: 0.95,
			shadowBlur: 50,
			shadowColor: 'rgba(0, 0, 0, 0.4)',
			color: {
				type: 'linear',
				x: 0,
				y: 0,
				x2: 0,
				y2: 1,
				colorStops: [{
					offset: 0, color: '#2FCBEB'
				}, {
					offset: 1, color: '#0072FF'
				}],
				global: false
			}
		},
		backgroundStyle: {
			color: '#0C2429',
		},
		label: {
			fontFamily,
			fontSize: 18,
			fontWeight: 500,
			color: 'rgba(255, 255, 255, 0.65)'
		},
		outline: {
			itemStyle: {
				borderColor: '#2FCBEB',
				borderWidth: 2
			},
			borderDistance: 5
		},
		emphasis: {
			itemStyle: {
				opacity: 0.8
			}
		},
		...options.series[0]
	}]
}

export default usePieChart