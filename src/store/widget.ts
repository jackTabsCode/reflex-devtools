/// <reference types="@rbxts/types/plugin" />

import { createProducer } from "@rbxts/reflex"

export interface Widget {
	open: boolean
	selectedIndex?: number
}

const initialState: Widget = {
	open: false
}

export const widget = createProducer(initialState, {
	toggled: (state, open?: boolean) => {
		return {
			...state,
			open: open ?? !state.open
		}
	},
	selectedAction: (state, index?: number) => {
		return {
			...state,
			selectedIndex: index
		}
	}
})
