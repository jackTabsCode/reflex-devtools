/// <reference types="@rbxts/types/plugin" />

import { ReplicatedStorage, RunService } from "@rbxts/services"
import { t } from "@rbxts/t"
import { store } from "store"

print("Running capture!")

let event = ReplicatedStorage.FindFirstChild("REFLEX_DEVTOOLS") as RemoteEvent | undefined

if (!event) {
	event = new Instance("RemoteEvent")
	event.Name = "REFLEX_DEVTOOLS"
	event.Parent = ReplicatedStorage

	print("Created REFLEX_DEVTOOLS event")
}

const guard = t.interface({
	name: t.string,
	args: t.array(t.any),
	state: t.table
})

if (RunService.IsServer()) {
	event.OnServerEvent.Connect((player, payload) => {
		if (!guard(payload)) throw "did not pass guard"

		store.update(payload.state)
		event!.FireClient(player, payload)
	})
} else {
	event.OnClientEvent.Connect(payload => {
		if (!guard(payload)) throw "did not pass guard"

		store.update(payload.state)
	})
}
