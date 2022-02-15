export type ObjectIndex<T> = {
	[key: string]: T
}

export type ElementEvent<T extends HTMLElement, P extends Event> = P & {
	target?: T;
	currentTarget?: T;
}