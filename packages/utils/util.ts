import { extend } from '@vue/shared'

export function toObject<T>(arr: Array<T>): Record<string, T> {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

export const on = function(
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false,
): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture)
  }
}

export const off = function(
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false,
): void {
  if (element && event && handler) {
    element.removeEventListener(event, handler, useCapture)
  }
}

export function parseHeight(height: number | string) {
  if (typeof height === 'number') {
    return height
  }
	if (/^\d+(?:px)?$/.test(height)) {
		return parseInt(height, 10)
	} else {
		return height
	}
}


let zIndex = 2000
export const nextZIndex = () => {
	return ++zIndex
}