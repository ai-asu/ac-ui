interface BarConfig {
	offset: string;
	scroll: string;
	scrollSize: string;
	size: string;
	key: string;
	axis: string;
	client: string;
	direction: string;
}

export const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top',
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left',
  },
}

export function renderThumbStyle({ move, size, bar }: { move: number, size: string, bar: BarConfig }) {
  const style = {} as any
  const translate = `translate${bar.axis}(${ move }%)`

  style[bar.size] = size
  style.transform = translate
  style.msTransform = translate
  style.webkitTransform = translate

  return style
}
