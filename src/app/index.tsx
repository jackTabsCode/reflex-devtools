import Highlighter from "@rbxts/highlighter"
import Roact, { useEffect, useMemo } from "@rbxts/roact"
import { useRootProducer, useRootSelector } from "store"
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

	const actionSelections = useMemo(() => {
		return actions.map((action, index) => (
			<ActionSelection action={action} index={index} key={index} selected={index === selected?.index} />
		))
	}, [actions, selected])

	return (
		<frame BackgroundTransparency={1} Size={UDim2.fromScale(1, 1)} key="main">
			<scrollingframe
				AutomaticCanvasSize={Enum.AutomaticSize.Y}
				BackgroundTransparency={1}
				BorderColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.Border)}
				CanvasSize={new UDim2()}
				ScrollBarImageColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.ScrollBar)}
				ScrollBarThickness={6}
				Size={UDim2.fromScale(ACTIONS_WIDTH, 1)}
				key="actions"
			>
				{actionSelections}
				<uilistlayout Padding={new UDim(0, 5)} SortOrder={Enum.SortOrder.LayoutOrder} key="layout" />
			</scrollingframe>

			<frame
				BackgroundTransparency={1}
				Position={UDim2.fromScale(ACTIONS_WIDTH, 0)}
				Size={UDim2.fromScale(1 - ACTIONS_WIDTH, 1)}
				key="state"
			>
				{selectedAction && <ActionState state={selectedAction.state} />}
			</frame>

			{actions.isEmpty() && (
				<textlabel
					AnchorPoint={new Vector2(0.5, 0.5)}
					AutomaticSize={Enum.AutomaticSize.XY}
					BackgroundTransparency={1}
					Font={Enum.Font.SourceSans}
					Position={UDim2.fromScale(0.5, 0.5)}
					Text="Oopsie woopsie, no actions here yet! Try dispatching some."
					TextColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.DimmedText)}
					TextSize={16}
					TextWrapped
					key="empty"
				/>
			)}
		</frame>
	)
}
