/// <reference types="@rbxts/types/plugin" />

import React from "@rbxts/react"
import { ReflexProvider } from "@rbxts/react-reflex"
import { createRoot } from "@rbxts/react-roblox"
import { App } from "app"
import { $git } from "rbxts-transform-debug"
import { store } from "store"

const toolbar = plugin.CreateToolbar("Reflex DevTools")
const button = toolbar.CreateButton(
	"Open",
	"Opens or closes the Reflex Developer tools",
	"rbxassetid://14713769930",
	"Reflex DevTools",
)
button.ClickableWhenViewportHidden = true

const dockWidget = plugin.CreateDockWidgetPluginGui(
	"reflex-devtools",
	new DockWidgetPluginGuiInfo(Enum.InitialDockState.Float, false, false, 600, 400),
)

dockWidget.Title = `Reflex DevTools ${$git().LatestTag}`
dockWidget.Name = "Reflex DevTools"
dockWidget.ZIndexBehavior = Enum.ZIndexBehavior.Sibling

button.Click.Connect(store.toggled)
dockWidget.BindToClose(() => store.toggled(false))

store.subscribe(
	(state) => state.widget.open,
	(open) => {
		dockWidget.Enabled = open
	},
)

const root = createRoot(dockWidget)

root.render(
	<ReflexProvider producer={store}>
		<App />
	</ReflexProvider>,
)
