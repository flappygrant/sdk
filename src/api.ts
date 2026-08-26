/**
 * Data format for numerical X/Y values. Look into `Vec2modulator` for common abstractions.
 */
export interface Vec2 {
	x: number
	y: number
}

export interface SpriteTypeData {
	/**
	 * Internet-bound texture URL (eg https://example.com/hello.png ./hello.png /media/hello.png).
	 */
	textureUrl: string

	/**
	 * 0-1 Vec2 representing the origin of these type of sprites, used during positioning.
	 */
	origin: Vec2

	/**
	 * Base size Vec2, multiplied by sprite-specific scale during math & rendering.
	 */
	size: Vec2
}

/**
 * Supported event types.
 */
export type FlappyGrantEvent =
	| "start"
	| "pre-update"
	| "update"
	| "post-update"
	| "pre-render"
	| "render"
	| "post-render"

/**
 * Abstracted class for interfacing with a raw, optimized Vec2 value.
 */
class _Vec2modulator {
	private value: Vec2

	/**
	 * Instantiates a Vec2 modulator with a Vec2.
	 * @param vec Source Vec2
	 */
	constructor(vec: Vec2) {
		this.value = vec
	}

	/**
	 * Copies and returns the raw, optimized value of this Vec2.
	 */
	public get(): Vec2 {
		return { ...this.value }
	}

	/**
	 * Sets the X/Y values of this Vec2.
	 * @param x New X
	 * @param y New Y
	 */
	public set(x: number, y: number): _Vec2modulator {
		this.value.x = x
		this.value.y = y
		return this
	}

	/**
	 * Adds to the X/Y values of this Vec2.
	 * @param x Additional X
	 * @param y Additional Y
	 */
	public add(x: number, y: number): _Vec2modulator {
		this.value.x += x
		this.value.y += y
		return this
	}

	/**
	 * Subtracts from the X/Y values of this Vec2.
	 * @param x Subtractional X
	 * @param y Subtractional Y
	 */
	public sub(x: number, y: number): _Vec2modulator {
		this.value.x -= x
		this.value.y -= y
		return this
	}

	/**
	 * Multiplies and sets the X/Y values of this Vec2 by X/Y factors.
	 * @param x X factor
	 * @param y Y factor
	 */
	public mul(x: number, y: number): _Vec2modulator {
		this.value.x *= x
		this.value.y *= y
		return this
	}

	/**
	 * Divides and sets the X/Y values of this Vec2 by X/Y factors.
	 * @param x X factor
	 * @param y Y factor
	 */
	public div(x: number, y: number): _Vec2modulator {
		this.value.x /= x
		this.value.y /= y
		return this
	}
}

/**
 * Abstracted class for interfacing with a numerical value.
 */
class _NumericalModulator {
	private value: number

	/**
	 * Instantiates a numerical modulator with a numerical value.
	 * @param value Source numerical value
	 */
	constructor(value: number) {
		this.value = value
	}

	/**
	 * Retrieves the numerical value.
	 */
	public get(): number {
		return this.value
	}

	/**
	 * Sets the numerical value.
	 * @param value New numerical value
	 */
	public set(value: number): _NumericalModulator {
		this.value = value
		return this
	}

	/**
	 * Adds to the numerical value.
	 * @param addend Addend
	 */
	public add(addend: number): _NumericalModulator {
		this.value += addend
		return this
	}

	/**
	 * Subtracts from the numerical value.
	 * @param subtrahend Subtrahend
	 */
	public sub(subtrahend: number): _NumericalModulator {
		this.value -= subtrahend
		return this
	}

	/**
	 * Multiplies and sets the numerical value by a numerical value.
	 * @param factor Factor
	 */
	public mul(factor: number): _NumericalModulator {
		this.value *= factor
		return this
	}

	/**
	 * Divides and sets the numerical value by a numerical value.
	 * @param divisor Divisor
	 */
	public div(divisor: number): _NumericalModulator {
		this.value /= divisor
		return this
	}
}

/**
 * Describes an active sprite with a type, position, scale, rotation, and optionally additional data.
 *
 * `<D>` exists to optionally define the type of additional data a sprite stores, but can be ignored if unneeded.
 */
class _Sprite<D = null> {
	/**
	 * Identifier of a valid registered sprite type, which describes the default texture and much more.
	 */
	public type: string

	private _position: Vec2
	private _scale: Vec2
	private _rotation: number

	/**
	 * Additional data specific to this sprite. Defaults to `null` when none was ever set.
	 */
	public data: D | null

	/**
	 * Describes an active sprite with a type, position, scale, rotation, and optionally additional data.
	 *
	 * `<D>` exists to optionally define the type of additional data a sprite stores, but can be ignored if unneeded.
	 */
	constructor(initial: {
		/**
		 * Identifier of a valid registered sprite type, which describes the default texture and much more.
		 */
		type: string

		/**
		 * Initial sprite position
		 */
		position?: Vec2

		/**
		 * Initial sprite scale, defaults to 1x1
		 */
		scale?: Vec2

		/**
		 * Initial sprite rotation (in radians)
		 */
		rotation?: number

		/**
		 * Additional data specific to this sprite. Defaults to `null` when none was ever set.
		 */
		data?: D
	}) {
		this.type = initial.type
		this._position = { ...(initial.position ?? { x: 0, y: 0 }) }
		this._scale = { ...(initial.scale ?? { x: 1, y: 1 }) }
		this._rotation = initial.rotation ?? 0
		this.data = initial.data ?? null
	}

	/**
	 * Sprite position (in Vec2 modulator form)
	 */
	public position(): _Vec2modulator {
		return new Vec2modulator(this._position)
	}

	/**
	 * Sprite scale (in Vec2 modulator form)
	 */
	public scale(): _Vec2modulator {
		return new Vec2modulator(this._scale)
	}

	/**
	 * Auto-generated sprite size, which is the sprite type's size multiplied by this sprite's scale (in Vec2 modulator form)
	 */
	public size(): Vec2 {
		const type = window.FlappyGrant.getSpriteType(this.type)
		if (!type) return this.scale().get()
		return new Vec2modulator(this._scale).mul(type.size.x, type.size.y).get()
	}

	/**
	 * Sprite rotation (in numerical modulator form, radians)
	 */
	public rotation(): _NumericalModulator {
		return new NumericalModulator(this._rotation)
	}
}

/**
 * SDK for the FlappyGrant engine.
 */
class __FlappyGrant {
	private spriteTypes: Record<string, SpriteTypeData>
	private spriteTypesCache: Record<string, { textureImage: HTMLImageElement }>

	private sprites: Record<string, _Sprite>
	private spritesRenderMe: string[]
	private events: { event: FlappyGrantEvent; callback: (delta: number) => void }[]

	private canvas: HTMLCanvasElement
	private ctx: CanvasRenderingContext2D

	constructor(canvas: HTMLCanvasElement, ctx?: CanvasRenderingContext2D) {
		this.spriteTypes = {}
		this.spriteTypesCache = {}

		this.sprites = {}
		this.spritesRenderMe = []
		this.events = []

		this.canvas = canvas
		this.ctx = ctx ?? canvas.getContext("2d")!
	}

	/**
	 * Registers a sprite type with the FlappyGrant engine.
	 * @param type Unique name given to this specific sprite type
	 * @param data Data describing the sprite type
	 * @returns Sprite type name
	 */
	public spriteType(type: string, data: SpriteTypeData): string {
		this.spriteTypes[type] = { ...data }
		return type
	}

	/**
	 * Retrieves sprite type data by name.
	 * @param id Sprite type name
	 */
	public getSpriteType(type: string): SpriteTypeData | undefined {
		const data = this.spriteTypes[type]
		if (!data) return undefined
		return { ...data }
	}

	/**
	 * Registers a sprite with the FlappyGrant engine.
	 * @param id Unique identifier given to this specific sprite instance
	 * @param sprite Sprite
	 */
	public sprite(id: string, sprite: _Sprite): _Sprite {
		this.sprites[id] = sprite
		return sprite
	}

	/**
	 * Retrieves a sprite by ID.
	 * @param id Sprite ID
	 */
	public getSprite(id: string): _Sprite | undefined {
		return this.sprites[id]
	}

	/**
	 * Renders a sprite with the FlappyGrant engine.
	 * @param id Sprite ID
	 */
	public renderSprite(id: string): __FlappyGrant {
		this.spritesRenderMe.push(id)
		return this
	}

	/**
	 * Registers an event listener with the FlappyGrant engine.
	 * @param event Event type to listen for
	 * @param callback Callback when event occurs
	 */
	public on(event: FlappyGrantEvent, callback: (delta: number) => void): __FlappyGrant {
		this.events.push({ event, callback })
		return this
	}

	/**
	 * ***INTERNAL ENGINE FUNCTION! DO NOT CALL IN GAMES, WILL PRODUCE UNEXPECTED RECURSION.***
	 *
	 * Begins the game's lifecycle, such as firing the events and doing some basic rendering.
	 */
	public beginExecution(): void {
		const tis = this

		for (const type of Object.keys(this.spriteTypes)) {
			const image = new Image()
			image.src = this.spriteTypes[type]!.textureUrl
			image.onload = () => (this.spriteTypesCache[type] = { textureImage: image })
		}

		function update(): void {
			const events = [...tis.events]

			for (let i = 0; i < events.length; i++)
				if (events[i]!.event == "pre-update") {
					events[i]!.callback(0)
					events.splice(i--, 1)
				}

			for (let i = 0; i < events.length; i++)
				if (events[i]!.event == "update") {
					events[i]!.callback(0)
					events.splice(i--, 1)
				}

			for (let i = 0; i < events.length; i++)
				if (events[i]!.event == "post-update") {
					events[i]!.callback(0)
					events.splice(i--, 1)
				}

			for (let i = 0; i < events.length; i++)
				if (events[i]!.event == "pre-render") {
					events[i]!.callback(0)
					events.splice(i--, 1)
				}

			tis.ctx.clearRect(0, 0, tis.canvas.width, tis.canvas.height)

			for (let i = 0; i < events.length; i++)
				if (events[i]!.event == "render") {
					events[i]!.callback(0)
					events.splice(i--, 1)
				}

			for (let i = 0; i < tis.spritesRenderMe.length; i++) {
				const sprite = tis.getSprite(tis.spritesRenderMe[i]!)
				if (!sprite) continue

				const spriteType = tis.getSpriteType(sprite.type)
				if (!spriteType) continue

				const spriteTypeCache = tis.spriteTypesCache[sprite.type]
				if (!spriteTypeCache) continue

				tis.ctx.save()

				const translation = new Vec2modulator(sprite.size()).mul(
					spriteType.origin.x,
					spriteType.origin.y,
				)

				tis.ctx.translate(translation.get().x, translation.get().y)
				tis.ctx.rotate(sprite.rotation().get())
				tis.ctx.drawImage(spriteTypeCache.textureImage, 0, 0)
				tis.ctx.restore()
				tis.spritesRenderMe.splice(i--, 1)
			}

			for (let i = 0; i < events.length; i++)
				if (events[i]!.event == "post-render") {
					events[i]!.callback(0)
					events.splice(i--, 1)
				}

			requestAnimationFrame(update)
		}

		for (let i = 0; i < this.events.length; i++)
			if (this.events[i]!.event == "start") {
				this.events[i]!.callback(0)
				this.events.splice(i--, 1)
			}

		update()
	}
}

declare global {
	interface Window {
		/**
		 * Abstracted class for interfacing with a raw, optimized Vec2 value.
		 */
		Vec2modulator: typeof _Vec2modulator

		/**
		 * Abstracted class for interfacing with a numerical value.
		 */
		NumericalModulator: typeof _NumericalModulator

		/**
		 * Describes an active sprite with a type, position, scale, rotation, and optionally additional data.
		 *
		 * `<D>` exists to optionally define the type of additional data a sprite stores, but can be ignored if unneeded.
		 */
		Sprite: typeof _Sprite

		/**
		 * SDK for the FlappyGrant engine.
		 */
		_FlappyGrant: typeof __FlappyGrant

		/**
		 * SDK for the FlappyGrant engine.
		 */
		FlappyGrant: __FlappyGrant
	}

	/**
	 * Abstracted class for interfacing with a raw, optimized Vec2 value.
	 */
	var Vec2modulator: typeof _Vec2modulator

	/**
	 * Abstracted class for interfacing with a numerical value.
	 */
	var NumericalModulator: typeof _NumericalModulator

	/**
	 * Describes an active sprite with a type, position, scale, rotation, and optionally additional data.
	 *
	 * `<D>` exists to optionally define the type of additional data a sprite stores, but can be ignored if unneeded.
	 */
	var Sprite: typeof _Sprite

	/**
	 * SDK for the FlappyGrant engine.
	 */
	var _FlappyGrant: typeof __FlappyGrant

	/**
	 * SDK for the FlappyGrant engine.
	 */
	var FlappyGrant: __FlappyGrant
}

window.Vec2modulator = _Vec2modulator
window.NumericalModulator = _NumericalModulator
window.Sprite = _Sprite
window._FlappyGrant = __FlappyGrant
globalThis.Vec2modulator = _Vec2modulator
globalThis.NumericalModulator = _NumericalModulator
globalThis.Sprite = _Sprite
globalThis._FlappyGrant = __FlappyGrant
