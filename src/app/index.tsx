import Highlighter from "@rbxts/highlighter"
import Roact, { useEffect } from "@rbxts/roact"
import { FlatList } from "@rbxts/virtualized-list"
import { useRootProducer, useRootSelector } from "store"
import ActionSelection from "./actionSelection"
import ActionState from "./actionState"

Highlighter.matchStudioSettings()

const ACTIONS_WIDTH = 0.3

export function App() {
	const store = useRootProducer()

	const actions = useRootSelector(state => state.game.actions)
	const selected = useRootSelector(state => state.widget.selected)

	const selectedAction = selected !== undefined ? actions[selected.index] : undefined

	useEffect(() => {
		const size = actions.size()
		if (size === 0) return

		const last = size - 1
		if ((selected && !selected.manual && selected.index !== last) || !selected) {
			store.selectedAction(last, false)
		}
	}, [selected, actions])

	return (
		<frame BackgroundTransparency={1} Size={UDim2.fromScale(1, 1)} key="main">
			<frame
				BackgroundTransparency={1}
				BorderColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.Border)}
				Size={UDim2.fromScale(ACTIONS_WIDTH, 1)}
				key="actions"
			>
				<FlatList
					contentContainerStyle={{
						BackgroundTransparency: 1
					}}
					data={actions}
					renderItem={entry => (
						<ActionSelection
							action={entry.item}
							index={entry.index - 1}
							key={entry.index}
							selected={entry.index - 1 === selected?.index}
						/>
					)}
					style={{
						BackgroundTransparency: 1,
						ScrollBarImageColor3: settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.ScrollBar),
						ScrollBarThickness: 6,
						BorderSizePixel: 0
					}}
				/>
			</frame>
			<frame
				BackgroundTransparency={1}
				Position={UDim2.fromScale(ACTIONS_WIDTH, 0)}
				Size={UDim2.fromScale(1 - ACTIONS_WIDTH, 1)}
				key="state"
			>
				{selectedAction && <ActionState state={selectedAction.state} />}
			</frame>
		</frame>
	)
}
