import { _ECOption } from './echarts'
import {ChartsPropsType} from "./types";

const useLineChart = (props: ChartsPropsType) => {
	if (!props.options) return

	return concatOptions(props)
}

function concatOptions({ options }: ChartsPropsType) {
	const series: Array<_ECOption> = []

	options.series.forEach((item: _ECOption) => {
		series.push({
			type: 'line',
			showSymbol: false,
			...item
		})
	})

	return {
		series
	}
}

export default useLineChart