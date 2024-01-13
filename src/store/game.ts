/// <reference types="@rbxts/types/plugin" />

import { createProducer } from "@rbxts/reflex"

interface DispatchedAction {
	name: string
	args: unknown[]
	state: object
}

export interface Action extends DispatchedAction {
	timestamp: number
}

export interface Game {
	actions: Action[]
}

const initialState: Game = {
	actions: [],
}

export const _game = createProducer(initialState, {
	dispatched: (state, action: DispatchedAction, timestamp: number) => ({
		...state,
		actions: [...state.actions, { ...action, timestamp }],
	}),
	clear: (state) => ({
		...state,
		actions: [],
	}),
})
