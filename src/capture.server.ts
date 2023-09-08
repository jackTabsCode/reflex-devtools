/// <reference types="@rbxts/types/plugin" />

import { ReplicatedStorage, RunService } from "@rbxts/services"
import { t } from "@rbxts/t"
import { store } from "store"

let event = ReplicatedStorage.FindFirstChild("REFLEX_DEVTOOLS") as RemoteEvent | undefined

if (!event) {
	event = new Instance("RemoteEvent")
	event.Name = "REFLEX_DEVTOOLS"
	event.Parent = ReplicatedStorage

	print("[reflex-devtools] Created capture event")
}

const guard = t.interface({
	name: t.string,
	args: t.array(t.any),
	state: t.table
})

const clientGuard = t.intersection(
	guard,
	t.interface({
		timestamp: t.number
	})
)

if (RunService.IsServer()) {
	event.OnServerEvent.Connect((player, payload) => {
		if (!guard(payload)) throw "did not pass guard"

		const timestamp = DateTime.now().UnixTimestampMillis

		store.dispatched(payload, timestamp)
		event?.FireClient(player, { ...payload, timestamp })
	})
} else {
	event.OnClientEvent.Connect(payload => {
		if (!clientGuard(payload)) throw "did not pass guard"

		store.dispatched(payload, payload.timestamp)
	})
}
