import Roact from "@rbxts/roact"
import { useRootProducer, useRootSelector } from "store"
import Highlighter from "vendor/highlighter"
import { ActionSelection } from "./actionSelection"
import { ActionState } from "./actionState"

Highlighter.matchStudioSettings()

const ACTIONS_WIDTH = 0.3

export function App() {
	const store = useRootProducer()

	const actions = useRootSelector(state => state.game.actions)
	const selectedIndex = useRootSelector(state => state.widget.selectedIndex)

	const selectedAction = selectedIndex !== undefined ? actions[selectedIndex] : undefined

	return (
		<frame BackgroundTransparency={1} Size={UDim2.fromScale(1, 1)}>
			<scrollingframe
				AutomaticCanvasSize={Enum.AutomaticSize.Y}
				BackgroundTransparency={1}
				BorderSizePixel={0}
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
						onSelected={() => store.selectedAction(index)}
						selected={index === selectedIndex}
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
