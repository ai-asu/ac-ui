import {handleItemStyle} from "./useCharts";
import {ChartsPropsType} from "./types";
import {_ECOption} from "./echarts";

const usePictorialBarChart = (props: ChartsPropsType) => {
	if (!props.options) return

	return concatOptions(props)
}

function concatOptions({ options }: ChartsPropsType) {
	const series: _ECOption[] = []
	options.series.map((item: _ECOption) => {
		if (!item.normalColor) {
			item.normalColor = ['rgba(25, 220, 255, 0.85)', 'rgba(0, 114, 255, 0.85)']
		}
		if (!item.emphasisColor) {
			item.emphasisColor = ['rgba(25, 220, 255, 0.85)', 'rgba(0, 114, 255, 0.85)']
		}
		series.push({
			type: "pictorialBar",
			symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
			...item,
			...handleItemStyle(item, true)
		})
	})
	return {
		series
	}
}

export default usePictorialBarChart