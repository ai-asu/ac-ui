import {_ECOption} from "./echarts";
import {XAXisOption, YAXisOption} from "echarts/types/dist/shared";

// 基础、分隔、堆叠、立体、圆柱、进度
export type BarChartType = 'basic' | 'divide' | 'stack' | 'customSquare' | 'cylinder' | 'progress'
// 基础、环形、水球
export type PieChartType = 'basic' | 'divide' | 'waterPolo'

export type DirectionType = 'vertical' | 'horizontal'

export type ChartType = 'bar' | 'line' | 'pie' | 'radar' | 'pictorialBar' | 'line-bar'
export type AxisType = Array<XAXisOption | YAXisOption>


export interface ChartsPropsType {
	id: string;
	type?: BarChartType | PieChartType;
	barType?: BarChartType;
	direction?: DirectionType;
	options: _ECOption;
}

