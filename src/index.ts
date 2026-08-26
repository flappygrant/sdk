import "./api"

export async function init(
	canvas: HTMLCanvasElement,
	ctx?: CanvasRenderingContext2D,
): Promise<void> {
	window.FlappyGrant = new window._FlappyGrant(canvas, ctx)
	globalThis.FlappyGrant = window.FlappyGrant
}

export async function execute(source: string): Promise<void> {
	new Function("window", "globalThis", source)(window, globalThis)
	window.FlappyGrant.beginExecution()
}
