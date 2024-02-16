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

export interface Host {
	actions: Action[]
}

const initialState: Host = {
	actions: [],
}

export const host = createProducer(initialState, {
	dispatched: (state, action: DispatchedAction, timestamp: number) => ({
		...state,
		actions: [...state.actions, { ...action, timestamp }],
	}),
	clear: (state) => ({
		...state,
		actions: [],
	}),
})
