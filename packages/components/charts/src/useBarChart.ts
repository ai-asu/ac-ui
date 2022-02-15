import { _ECOption } from './echarts'
import CustomDraw, { ShapeColorsType } from './echarts_bar_custom'
import { handleItemStyle } from './useCharts'

import {
	defaultConfig,
	barSeriesConfig,
	tooltipConfig
} from './defaultConfig'
import {BarChartType, ChartsPropsType} from "./types";
import {CustomSeriesRenderItemAPI, CustomSeriesRenderItemParams} from "echarts/types/src/chart/custom/install";

const useBarChart = (props: ChartsPropsType) => {
	if (!props.options) return

	return concatOptions(props)
}

function concatOptions({ options, direction, type }: ChartsPropsType) {
	const { backgroundColor } = defaultConfig
	const isVertical = direction === 'vertical'

	const { series, barWidths } = handleSeries(
		options.series,
		isVertical,
		type as BarChartType,
		options.backgroundColor || backgroundColor
	)

	const tooltip = {
		...tooltipConfig,
		...handleTooltip(barWidths, type as BarChartType),
		...options.tooltip
	}

	return {
		tooltip,
		series
	}
}

export function handleSeries(sere: Array<_ECOption>, isVertical: boolean, seriesType: BarChartType, pictorialBarColor: string) {
	const series: Array<_ECOption> = []
	const barWidths: Array<number> = []

	// 默认柱子样式
	if (seriesType === 'basic' || seriesType === 'divide' || seriesType === 'stack') {
		sere.forEach(item => {
			const obj: _ECOption = {
				...barSeriesConfig,
				...item,
				...handleItemStyle(item, isVertical)
			}

			series.push(obj)
			barWidths.push(obj.barWidth as number)
		})
	}

	switch (seriesType) {
		// 分隔、堆叠柱状图
		case 'divide':
		case 'stack': {
			// 计算总量
			const total = calcStack(series)
			const widths: Array<number> = []
			series.forEach(item => {
				widths.push(item.barWidth as number)
			})
			const maxWidth = Math.max(...widths)

			series.push({
				name: '',
				type: "pictorialBar",
				itemStyle: {
					color: pictorialBarColor
				},
				symbolRepeat: "fixed",
				symbolMargin: 3,
				symbol: "rect",
				symbolClip: true,
				symbolSize: isVertical ? [maxWidth + 2, 3] : [3, maxWidth + 2],
				symbolPosition: "start",
				data: total,
				z: 2
			})
			break;
		}
		case 'customSquare': {
			// 立体
			const customDraw = CustomDraw.getInstance(sere[0].barWidth as number)
			customDraw.drawShape()
			series.push({
				renderItem: (params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) => {
					return customDraw.renderItem(api, sere[0].colors as ShapeColorsType)
				},
				...sere[0],
				type: 'custom'
			}, {
				itemStyle: {
					color: 'transparent'
				},
				...sere[0],
				type: 'bar'
			})
			barWidths.push(sere[0].barWidth as number)
			break;
		}
		case 'cylinder': {
			// 圆柱
			const { barWidth, normalColor, bottomImage } = sere[0]
			const _normalColor = defaultConfig.normalColor

			series.push(
				{
					// 顶部圆形
					name: "",
					symbolSize: [barWidth, barWidth / 2],
					symbolOffset: [0, -barWidth / 4],
					symbolPosition: "end",
					z: 12,
					color: normalColor ? normalColor[0] : _normalColor[0],
					...sere[0],
					type: "pictorialBar"
				},
				{
					type: "bar",
					...sere[0],
					...handleItemStyle(sere[0], true)
				},
				{
					// 底部圆形
					name: "",
					symbolSize: [barWidth, barWidth / 2],
					symbolOffset: [0, barWidth / 4],
					z: 12,
					color: normalColor ? normalColor[1] : 'rgba(0, 0, 0, 0.1)',
					...sere[0],
					type: 'pictorialBar'
				}
			)
			if (bottomImage) {
				const { path, size } = bottomImage
				series.push({
					// 底部图片
					name: "",
					symbol: path,
					symbolSize: size,
					symbolOffset: [0, size / 2],
					z: 12,
					...sere[0],
					type: "pictorialBar"
				})
			}
			break;
		}
		case 'progress': {
			// 进度
			const { data, total, barWidth, totalColor } = sere[0]
			const total_values: Array<number> = []
			data.forEach((d: number) => {
				total_values.push(total - d);
			})

			series.push(
				{
					type: "bar",
					stack: "progress",
					...sere[0],
					...handleItemStyle(sere[0], isVertical),
				},
				{
					type: 'pictorialBar',
					symbol: 'rect',
					symbolSize: isVertical ? [barWidth + 2, 2] : [2, barWidth + 2],
					symbolOffset: [0, 0],
					symbolPosition: 'end',
					z: 12,
					itemStyle: {
						color: '#DBEBFF'
					},
					data
				},
				{
					type: "bar",
					stack: "progress",
					itemStyle: {
						color: totalColor || 'rgba(200, 235, 255, 0.2)'
					},
					data: total_values
				}
			)
			break;
		}
		default:
			break;
	}

	return {
		series,
		barWidths
	}
}

function handleTooltip(barWidths: number[], seriesType: BarChartType) {
	if (seriesType === 'customSquare' || seriesType === 'cylinder') {
		return {
			axisPointer: {
				type: 'shadow',
				shadowStyle: tooltipConfig.axisPointer?.shadowStyle
			}
		}
	}

	return {
		axisPointer: {
			...tooltipConfig.axisPointer,
			type: 'line',
			lineStyle: {
				...tooltipConfig.axisPointer?.lineStyle,
				width: barWidths.reduce((pre, cur) => {
					return pre + cur
				}, 12)
			}
		}
	}
}

function calcStack(series: _ECOption[]) {
	const stackData: Array<[]> = []
	const total: Array<number> = []
	series.forEach(item => {
		item.stack = '总量'
		item.z = 1
		stackData.push(item.data as [])
	})
	stackData.forEach(item => {
		item.forEach((value, index) => {
			if (!Number.isFinite(total[index])) total[index] = 0
			if (!Number.isFinite(value)) (value as number) = 0
			total[index] += value
		})
	})
	return total
}

export default useBarChart