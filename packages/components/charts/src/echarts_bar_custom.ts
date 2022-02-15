import echarts from './echarts'
import {CustomSeriesRenderItemAPI} from "echarts/types/src/chart/custom/install";
import { graphic_d } from 'echarts/types/dist/shared';
import {GraphicComponentOption} from "echarts/types/dist/option";

interface Shape {
	type: string;
	shape: {
		xValue: any;
		yValue: any;
		xAxisPoint: any;
		x: any;
		y: any;
		api: any;
	}
	style: any;
}
interface ShapeItem {
	type: "group";
	children: Array<Shape>
}
export interface ShapeColorsType {
	left: Array<string>;
	right: Array<string>;
	top: Array<string>;
}

export default class CustomDraw {
	private static instance: CustomDraw
	private static barWidth = 14
	private normalColors: ShapeColorsType = {
		left: ['#00D5FF', '#995CFF'],
		right: ['#45E0FF', '#AD7EFF'],
		top: ['#A9F1FF']
	}

	private constructor() {}

	public static getInstance(barWidth: number): CustomDraw {
		if (!this.instance) {
			this.instance = new CustomDraw()
		}
		if (barWidth) this.barWidth = barWidth
		return this.instance
	}

	drawShape() {
		const _barWidth = CustomDraw.barWidth
		// 绘制左侧面
		const CubeLeft = this.createShape(
			(ctx: CanvasRenderingContext2D, shape) => {
				const xAxisPoint = shape.xAxisPoint
				const c1 = [shape.x + _barWidth, shape.y]
				const c2 = [shape.x - _barWidth, shape.y]
				const c3 = [xAxisPoint[0] - _barWidth, xAxisPoint[1]]
				const c4 = [xAxisPoint[0] + _barWidth, xAxisPoint[1]]
				this.canvasDraw(ctx, c1, c2, c3, c4)
			}
		)
		// 绘制右侧面
		const CubeRight = this.createShape(
			(ctx: CanvasRenderingContext2D, shape) => {
				const xAxisPoint = shape.xAxisPoint
				const c1 = [shape.x + _barWidth, shape.y]
				const c2 = [xAxisPoint[0] + _barWidth, xAxisPoint[1]]
				const c3 = [xAxisPoint[0] + _barWidth + 4, xAxisPoint[1] - 2]
				const c4 = [shape.x + _barWidth + 4, shape.y - 2]
				this.canvasDraw(ctx, c1, c2, c3, c4)
			}
		)
		// 绘制顶面
		const CubeTop = this.createShape(
			(ctx: CanvasRenderingContext2D, shape) => {
				const c1 = [shape.x + _barWidth, shape.y]
				const c2 = [shape.x + _barWidth + 4, shape.y - 2]
				const c3 = [shape.x - 8, shape.y - 2]
				const c4 = [shape.x - _barWidth, shape.y]
				this.canvasDraw(ctx, c1, c2, c3, c4)
			}
		)
		this.registerShape('CubeLeft', CubeLeft)
		this.registerShape('CubeRight', CubeRight)
		this.registerShape('CubeTop', CubeTop)
	}
	createShape(cb: (ctx: CanvasRenderingContext2D, shape: any) => void): any {
		return echarts.graphic.extendShape({
			shape: {
				x: 0,
				y: 0
			},
			buildPath: (ctx: CanvasRenderingContext2D, shape: any) => {
				cb(ctx, shape)
			}
		})
	}
	registerShape(name: string, shape: any) {
		echarts.graphic.registerShape(name, shape)
	}
	canvasDraw(ctx: CanvasRenderingContext2D, c1: number[], c2: number[], c3: number[], c4: number[]) {
		ctx.moveTo(c1[0], c1[1])
		ctx.lineTo(c2[0], c2[1])
		ctx.lineTo(c3[0], c3[1])
		ctx.lineTo(c4[0], c4[1])
		ctx.strokeStyle = 'transparent'
		ctx.closePath()
	}
	renderShape(api: CustomSeriesRenderItemAPI) {
		const location = api.coord([api.value(0), api.value(1)])

		return {
			api,
			xValue: api.value(0),
			yValue: api.value(1),
			x: location[0],
			y: location[1],
			xAxisPoint: api.coord([api.value(0), 0])
		}
	}
	renderItem(api: CustomSeriesRenderItemAPI, colors = this.normalColors ): ShapeItem {
		return {
			type: 'group',
			children: [
				{
					type: 'CubeLeft',
					shape: this.renderShape(api),
					style: this.fillStyle(colors.left)
				},
				{
					type: 'CubeRight',
					shape: this.renderShape(api),
					style: this.fillStyle(colors.right)
				},
				{
					type: 'CubeTop',
					shape: this.renderShape(api),
					style: this.fillStyle(colors.top)
				}
			]
		}
	}
	fillStyle(colors: string[]): { fill: any } {
		return {
			fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
				{
					offset: 0,
					color: colors[0]
				},
				{
					offset: 1,
					color: colors[1] || colors[0]
				}
			])
		}
	}
}