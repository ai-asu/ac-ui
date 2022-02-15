import {
	GridOption,
	LegendOption,
	RadarOption,
	TooltipOption,
	XAXisOption,
	YAXisOption
} from "echarts/types/dist/shared";

const defaultConfig = {
	backgroundColor: 'transparent',
	fontFamily: 'PingFangRegular',
	fontSize: 14,
	fontWeight: 400,
	color: '#FFFFFF',
	x_fontColor: 'rgba(255, 255, 255, 0.45)',
	y_fontColor: 'rgba(255, 255, 255, 0.45)',
	normalColor: ['#3194F7', 'transparent'],
	emphasisColor: ['#4466F4', 'transparent'],
	splitLine: {
		lineStyle: {
			type: 'dashed',
			color: 'rgba(255, 255, 255, 0.15)'
		}
	},
	axisLine: {
		show: true,
		lineStyle: {
			type: 'solid',
			color: '#464D4E'
		}
	}
}
const {
	fontFamily,
	fontSize,
	fontWeight,
	color,
	x_fontColor,
	y_fontColor,
	splitLine
} = defaultConfig
const legendConfig: LegendOption = {
	itemWidth: 16,
	itemHeight: 8,
	itemGap: 20,
	textStyle: {
		fontFamily,
		fontSize,
		fontWeight,
		color
	}
}
const tooltipConfig: TooltipOption = {
	trigger: 'axis',
	axisPointer: {
		type: 'shadow',
		lineStyle: {
			type: 'solid',
			width: 24,
			color: 'rgba(46, 230, 223, 0.1)',
		},
		shadowStyle: {
			color: 'rgba(46, 230, 223, 0.1)',
		},
		label: {
			show: false
		}
	},
	textStyle: {
		fontFamily,
		fontSize,
		fontWeight,
		color
	},
	borderColor: 'transparent',
	backgroundColor: 'rgba(52, 71, 97, 0.8)',
}
const gridConfig: GridOption = {
	top: 10,
	left: 10,
	right: 10,
	bottom: 10,
	containLabel: true
}
const xAxisConfig: XAXisOption = {
	type: 'category',
	axisLine: defaultConfig.axisLine as XAXisOption['axisLine'],
	axisTick: {
		show: false
	},
	axisLabel: {
		show: true,
		interval: 0,
		fontFamily,
		fontSize,
		fontWeight,
		color: x_fontColor
	},
	splitLine: {
		show: false,
		...splitLine
	} as XAXisOption['splitLine']
}
const yAxisConfig: YAXisOption = {
	type: 'value',
	name: '',
	nameTextStyle: {
		fontFamily,
		color,
		fontWeight,
		fontSize,
	},
	position: 'left',
	axisLine: defaultConfig.axisLine as YAXisOption['axisLine'],
	axisTick: {
		show: false,
	},
	axisLabel: {
		show: true,
		fontFamily,
		fontSize,
		fontWeight,
		color: y_fontColor,
		formatter: '{value}'
	},
	splitLine: {
		show: true,
		...splitLine
	} as YAXisOption['splitLine']
}
const barSeriesConfig = {
	name: '',
	type: 'bar',
	barMinHeight: 10,
	barWidth: 12,
	itemStyle: {},
	data: []
}
const radarConfig: RadarOption = {
	center: ['50%', '50%'],
	radius: '80%',
	splitNumber: 4,
	splitArea: {
		areaStyle: {
			color: ['#1F5F89', '#1D4974', '#1B365D', '#152945']
		}
	},
	axisLine: {
		show: true,
		lineStyle: {
			color: 'rgba(14, 190, 252, 0.2)'
		}
	},
	splitLine: {
		show: false
	},
	axisTick: {
		show: false
	},
	axisName: {
		show: false,
	}
}

export {
	defaultConfig,
	legendConfig,
	tooltipConfig,
	gridConfig,
	xAxisConfig,
	yAxisConfig,
	barSeriesConfig,
	radarConfig
}