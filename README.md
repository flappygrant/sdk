<div align="center">
    <h1>
        SDK for Games On
        <a href="https://www.flappygrant.com">
            <small>www.</small>FlappyGrant<small>.com</small>
        </a>
    </h1>
</div>

**The FlappyGrant SDK** assists in the creation of games geared towards our website, [www.flappygrant.com](https://www.flappygrant.com). It's dead simple!

## Usage

Game developers do not directly use the FlappyGrant runtime. Instead, games are written in TypeScript/JavaScript against the API described by our generated types! We used to have a dedicated declarations file, but those have moved to a file named `dist/index.d.ts` in our NPM package below.

We recommend installing our NPM package (`@flappygrant/sdk`) in your Node/Bun project, which provides both the runtime (unimportant) and best of all, types! Your IDE or TypeScript compiler can then use those types to provide accurate type checking and editor support while developing your game.

Once the game has been compiled to a singular JavaScript file, it can be provided to the [FlappyGrant Custom Game Page](https://www.flappygrant.com/custom-game) for execution by the site's runtime!

**Example source:** (in TypeScript+ESM form, note that typed imports are removed during compilation, and ignored after)

```ts
import "@flappygrant/sdk/api.d.ts"

FlappyGrant.sprite("player", new Sprite({ type: "player" })) // Registers a sprite by ID "player" of type "player", also usefully returns the created Sprite for fast access

FlappyGrant.on("update", delta => {
    FlappyGrant.getSprite("player")?.position().add(10, 10) // Retrieves a sprite by ID "player" and adds to its position
})
```

## Licensing

Due to the scale of this project, we have a custom and much stricter license to ensure educational purposes are required for the majority of what other licenses allow.

You can view it [here](LICENSE)!
