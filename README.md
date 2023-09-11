# Reflex Developer Tools

Developer tools for [Reflex](https://github.com/littensy/reflex), a Roblox state container library.

> [!WARNING]
> This is nowhere near finished, but is usable! It should only be used on the Client at this time.

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

export const devToolsMiddleware: ProducerMiddleware<RootState, RootActions> = () => {
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
```

...then apply it to your store:

```ts
export const store = combineProducers({
	// ...
}).applyMiddleware(devToolsMiddleware)
```
