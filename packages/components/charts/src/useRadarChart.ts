import { radarConfig } from './defaultConfig'
import {ChartsPropsType} from "./types";
import {RadarIndicatorOption} from "echarts/types/src/coord/radar/RadarModel";

const useRadarChart = (props: ChartsPropsType) => {
	if (!props.options) return

	return concatOptions(props)
}

function concatOptions({ options }: ChartsPropsType) {
	const { radar, series, angleAxis, radiusAxis } = options
	const colors = ['#00D5FF', '#4CA9FF', '#FFB55B', '#FF7C85', '#8BC36D']
	const value: number[] = [];
	const name: string[] = [];
	const scatterData: Array<any> = [];

	let _radar
	if (radar) {
		if (!Array.isArray(radar) && radar.indicator) {
			radar.indicator = radar.indicator.map((item: RadarIndicatorOption) => {
				name.push(item.text as string)

				return {
					max: (radar as any).max,
					...item
				}
			})
		}

		_radar = {
			...radarConfig,
			...radar
		}
	}

	if (series) {
		series[0].data[0].value.map((v: number, i: number) => {
			value.push(v);
			scatterData.push({
				value: [v, i],
				itemStyle: {
					color: colors[i] || '#00D5FF',
				}
			})
		})
	}

	return {
		tooltip: {
			show: false
		},
		radar: _radar,
		polar: {},
		angleAxis: [{
			type: 'category',
			data: name,
			boundaryGap: false,
			clockwise: false,
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			splitLine: {
				show: false
			},
			axisLabel: {
				fontSize: 17,
				fontFamily: 'SegoeuiRegular',
				fontWeight: 400,
				color: '#A0BDE0'
			},
			...angleAxis
		}],
		radiusAxis: [{
			type: 'category',
			max: _radar.max,
			data: value,
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				show: false
			},
			axisLine: {
				show: false
			},
			...radiusAxis
		}],
		series: [{
			type: 'radar',
			symbol: 'none',
			lineStyle: {
				width: 1,
				color: "#00D5FF",
			},
			areaStyle: {
				color: 'rgba(0, 213, 255, 0.5)',
				shadowColor: 'rgba(0, 213, 255, 0.5)',
				shadowBlur: 10
			},
			...(series ? series[0] : {})
		}, {
			type: 'scatter',
			coordinateSystem: 'polar',
			symbolSize: 5,
			data: scatterData,
		}]
	}
}


export default useRadarChart