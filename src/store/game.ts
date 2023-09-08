/// <reference types="@rbxts/types/plugin" />

import { createProducer } from "@rbxts/reflex"

export interface Action {
	name: string
	args: unknown[]
	state: {}
}

export interface Game {
	actions: Action[]
}

const initialState: Game = {
	actions: []
}

export const _game = createProducer(initialState, {
	dispatched: (state, action: Action) => ({
		...state,
		actions: [...state.actions, action]
	})
})
