import Roact, { useEffect } from "@rbxts/roact"
import { useRootProducer, useRootSelector } from "store"
import Highlighter from "vendor/highlighter"
import { ActionSelection } from "./actionSelection"
import { ActionState } from "./actionState"

Highlighter.matchStudioSettings()

const ACTIONS_WIDTH = 0.3

export function App() {
	const store = useRootProducer()

	const actions = useRootSelector(state => state.game.actions)
	const selected = useRootSelector(state => state.widget.selected)

	const selectedAction = selected !== undefined ? actions[selected.index] : undefined

	useEffect(() => {
		const last = actions.size() - 1
		if ((selected && !selected.manual && selected.index !== last) || !selected) {
			store.selectedAction(last, false)
		}
	}, [selected, actions])

	return (
		<frame BackgroundTransparency={1} Size={UDim2.fromScale(1, 1)}>
			<scrollingframe
				AutomaticCanvasSize={Enum.AutomaticSize.Y}
				BackgroundTransparency={1}
				BorderColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.Border)}
				CanvasSize={new UDim2()}
				ScrollBarImageColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.ScrollBar)}
				ScrollBarThickness={6}
				Size={UDim2.fromScale(ACTIONS_WIDTH, 1)}
			>
				{actions.map((action, index) => (
					<ActionSelection
						action={action}
						index={index}
						key={index}
						onSelected={() => {
							const isSelected = selected?.index === index
							if (!isSelected) {
								store.selectedAction(index, true)
							} else store.deselectedAction()
						}}
						selected={index === selected?.index}
					/>
				))}
				<uilistlayout SortOrder={Enum.SortOrder.LayoutOrder} />
			</scrollingframe>
			<frame
				BackgroundTransparency={1}
				Position={UDim2.fromScale(ACTIONS_WIDTH, 0)}
				Size={UDim2.fromScale(1 - ACTIONS_WIDTH, 1)}
			>
				{selectedAction && <ActionState state={selectedAction.state} />}
			</frame>
		</frame>
	)
}
