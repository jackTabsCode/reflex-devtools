/// <reference types="@rbxts/types/plugin" />

import { createProducer } from "@rbxts/reflex"

export interface Widget {
	open: boolean
	selected?: {
		index: number
		manual: boolean
	}
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
	selectedAction: (state, index: number, manual: boolean) => {
		return {
			...state,
			selected: {
				index,
				manual
			}
		}
	},
	deselectedAction: state => {
		return {
			...state,
			selected: undefined
		}
	}
})
