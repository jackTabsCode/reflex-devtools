# Reflex Developer Tools

Developer tools for [Reflex](https://github.com/littensy/reflex), a Roblox state container library.

![image](https://github.com/jackTabsCode/reflex-devtools/assets/44332148/b3b368ef-dc0e-4eec-8119-3d8b5e9c527f)

> [!WARNING]
> This is nowhere near finished, but is usable! It should only be used on the Client at this time.

## Installation

-   Download the binary on the Releases page and place it in your `Roblox/Plugins` folder.
-   [Download it from the Creator Marketplace](https://create.roblox.com/marketplace/asset/14778387667/Reflex-DevTools).

## Building

```bash
npm install
npm run build
```

...and place it in your `Roblox/Plugins` folder.

## Middleware

You will need to use a middleware to dispatch actions and state to the plugin.

Here's what I use:

```ts
const event = ReplicatedStorage.FindFirstChild("REFLEX_DEVTOOLS") as RemoteEvent

const middleware: ProducerMiddleware<RootState, RootActions> = () => {
	return (nextAction, actionName) => {
		return (...args) => {
			const state = nextAction(...args)
			if (RunService.IsStudio() && event) {
				event.FireServer({ name: actionName, args: [...args], state })
			}

			return state
		}
	}
}

export = middleware
```

Whatever you do, fire the event an object that satisfies the following type:

```ts
interface DispatchedAction {
	name: string
	args: unknown[]
	state: {}
}
```

...then apply it to your store:

```ts
export const store = combineProducers({
	// ...
}).applyMiddleware(devTools)
```

## Why does it use RemoteEvents?

Couldn't get BindableEvents to be received by the Plugin.
Context: https://discord.com/channels/385151591524597761/385151591998816257/1149590579529912320
