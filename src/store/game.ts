/// <reference types="@rbxts/types/plugin" />

import { createProducer } from "@rbxts/reflex"

export interface Game {
	gameState: {}
}

const initialState: Game = {
	gameState: {}
}

export const _game = createProducer(initialState, {
	update: (state, gameState: {}) => ({
		...state,
		gameState
	})
})
