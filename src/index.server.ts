/// <reference types="@rbxts/types/plugin" />

const toolbar = plugin.CreateToolbar("Reflex DevTools")
const button = toolbar.CreateButton("Open", "", "")

button.Click.Connect(() => {
	print("Button clicked ok!")
})
