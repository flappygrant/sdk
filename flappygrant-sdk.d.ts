/**
 * TYPES ARE INCOMPLETE!
 * DO NOT ASSUME ANYTHING EXCEPT THE CURRENT STATE OF SEMANTICS AND GENERAL DESIGN.
 */

/**
 * Data format for numerical X/Y values. Look into `Vec2modulator` for common abstractions.
 */
interface Vec2 {
	x: number
	y: number
}

/**
 * Abstracted class for interfacing with a raw, optimized Vec2 value.
 */
declare class Vec2modulator {
	private value: Vec2

	/**
	 * Instantiates a Vec2 modulator with a Vec2.
	 * @param vec Source Vec2
	 */
	constructor(vec: Vec2)

	/**
	 * Copies and returns the raw, optimized value of this Vec2.
	 */
	public get(): Vec2

	/**
	 * Sets the X/Y values of this Vec2.
	 * @param x New X
	 * @param y New Y
	 */
	public set(x: number, y: number): Vec2modulator

	/**
	 * Adds to the X/Y values of this Vec2.
	 * @param x Additional X
	 * @param y Additional Y
	 */
	public add(x: number, y: number): Vec2modulator

	/**
	 * Subtracts from the X/Y values of this Vec2.
	 * @param x Subtractional X
	 * @param y Subtractional Y
	 */
	public sub(x: number, y: number): Vec2modulator

	/**
	 * Multiplies and sets the X/Y values of this Vec2 by X/Y factors.
	 * @param x X factor
	 * @param y Y factor
	 */
	public mul(x: number, y: number): Vec2modulator

	/**
	 * Divides and sets the X/Y values of this Vec2 by X/Y factors.
	 * @param x X factor
	 * @param y Y factor
	 */
	public div(x: number, y: number): Vec2modulator
}

/**
 * Abstracted class for interfacing with a numerical value.
 */
declare class NumericalModulator {
	private value: number

	/**
	 * Instantiates a numerical modulator with a numerical value.
	 * @param value Source numerical value
	 */
	constructor(value: number)

	/**
	 * Retrieves the numerical value.
	 */
	public get(): number

	/**
	 * Sets the numerical value.
	 * @param value New numerical value
	 */
	public set(value: number): NumericalModulator

	/**
	 * Adds to the numerical value.
	 * @param addend Addend
	 */
	public add(addend: number): NumericalModulator

	/**
	 * Subtracts from the numerical value.
	 * @param subtrahend Subtrahend
	 */
	public sub(subtrahend: number): NumericalModulator

	/**
	 * Multiplies and sets the numerical value by a numerical value.
	 * @param factor Factor
	 */
	public mul(factor: number): NumericalModulator

	/**
	 * Divides and sets the numerical value by a numerical value.
	 * @param divisor Divisor
	 */
	public div(divisor: number): NumericalModulator
}

/**
 * Describes an active sprite with a type, position, scale, rotation, and optionally additional data.
 *
 * `<D>` exists to optionally define the type of additional data a sprite stores, but can be ignored if unneeded.
 */
declare class Sprite<D = null> {
	public type: string

	private _position: Vec2
	private _scale: Vec2
	private _rotation: number

	/**
	 * Additional data specific to this sprite. Defaults to `null` when none was ever set.
	 */
	public data: D

	/**
	 * Describes an active sprite with a type, position, scale, rotation, and optionally additional data.
	 *
	 * `<D>` exists to optionally define the type of additional data a sprite stores, but can be ignored if unneeded.
	 */
	constructor(initial: {
		type: string
		position?: Vec2
		scale?: Vec2
		rotation?: number
		data?: D
	})

	/**
	 * Sprite position (in Vec2 modulator form)
	 */
	public position(): Vec2modulator

	/**
	 * Sprite scale (in Vec2 modulator form)
	 */
	public scale(): Vec2modulator

	/**
	 * Sprite rotation (in numerical modulator form, radians)
	 */
	public rotation(): NumericalModulator
}

/**
 * Supported event types.
 */
type FlappyGrantEvent =
	| "start"
	| "pre-update"
	| "update"
	| "post-update"
	| "pre-render"
	| "render"
	| "post-render"

/**
 * SDK for the FlappyGrant engine.
 */
declare class _FlappyGrant {
	/**
	 * Registers a sprite with the FlappyGrant engine.
	 * @param sprite Sprite
	 */
	public sprite(sprite: Sprite): _FlappyGrant

	/**
	 * Registers an event listener with the FlappyGrant engine.
	 * @param event Event type to listen for
	 * @param callback Callback when event occurs
	 */
	public on(event: FlappyGrantEvent, callback: (delta: number) => void): _FlappyGrant
}

/**
 * SDK for the FlappyGrant engine.
 */
declare const FlappyGrant: _FlappyGrant
