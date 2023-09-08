/// <reference types="@rbxts/types/plugin" />

import { createProducer } from "@rbxts/reflex"

export interface Widget {
	open: boolean
}

const initialState: Widget = {
	open: false
}

export const widget = createProducer(initialState, {
	toggle: (state, open?: boolean) => {
		return {
			...state,
			open: open ?? !state.open
		}
	}
})
