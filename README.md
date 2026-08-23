<div align="center">
    <h1>
        SDK for Games On
        <a href="https://www.flappygrant.com">
            <small>www.</small>FlappyGrant<small>.com</small>
        </a>
    </h1>
</div>

**The FlappyGrant SDK** assists in the creation of games geared towards our website, [www.flappygrant.com](https://www.flappygrant.com). It's dead simple!

## Repo structure

|Name|Location|Description|
|---|---|---|
|TypeScript declarations|[/flappygrant-sdk.d.ts](./flappygrant-sdk.d.ts)|Freely redistributable TypeScript declarations|
|Runtime|[/runtime](./runtime)|The runtime used by [www.flappygrant.com](https://www.flappygrant.com) to execute game JavaScript|

## Usage

Game developers do not directly use the FlappyGrant runtime. Instead, games are written in TypeScript/JavaScript against the API described by [/flappygrant-sdk.d.ts](./flappygrant-sdk.d.ts)!

We recommend adding this repository as a [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) or using an equivalent setup. Your IDE or TypeScript compiler can then use the SDK's `.d.ts` file to provide accurate type checking and editor support while developing your game!

Once the game has been compiled to a singular JavaScript file, it can be provided to the [FlappyGrant Custom Game Page](https://www.flappygrant.com/custom-game) for execution by the site's runtime!

## Licensing

Due to the scale of this project, we have a custom and much stricter license to ensure educational purposes are required for the majority of what other licenses allow.

However, our TypeScript declarations ([/flappygrant-sdk.d.ts](./flappygrant-sdk.d.ts)) are exempt! This is because our types do not contain important resources, and should be freely redistributed for ease of development.

You can view it [here](LICENSE)!
