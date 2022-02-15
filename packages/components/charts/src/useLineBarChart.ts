import { _ECOption } from './echarts'
import { handleSeries } from "./useBarChart";
import {defaultConfig} from "./defaultConfig";
import {BarChartType, ChartsPropsType} from "./types";

const useLineBarChart = (props: ChartsPropsType) => {
	if (!props.options) return

	return concatOptions(props)
}

function concatOptions({ options, direction, barType }: ChartsPropsType) {
	let series: Array<_ECOption> = []
	const { backgroundColor } = defaultConfig
	const isVertical = direction === 'vertical'

	options.series.forEach((item: _ECOption) => {
		if (item.type === 'bar') {
			const res = handleSeries(
				[item],
				isVertical,
				barType as BarChartType,
				options.backgroundColor || backgroundColor)


			console.log(res.series)
			series = series.concat(res.series)
		} else {
			series.push({
				showSymbol: false,
				...item
			})
		}
	})

	return {
		series
	}
}

export default useLineBarChart