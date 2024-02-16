import Highlighter from "@rbxts/highlighter"
import React, { useEffect, useMemo } from "@rbxts/react"
import { useRootProducer, useRootSelector } from "store"
import { ActionSelection } from "./actionSelection"
import { ActionState } from "./actionState"
import { RowButton } from "./rowButton"
import { RowText } from "./rowText"

Highlighter.matchStudioSettings()

const ACTIONS_WIDTH = 0.3
const ROW_HEIGHT = 30

export function App() {
	const store = useRootProducer()

	const actions = useRootSelector((state) => state.game.actions)
	const selectedIndex = useRootSelector((state) => state.widget.selectedIndex)
	const autoSelectLatest = useRootSelector((state) => state.widget.autoSelectLatest)
	const showArgs = useRootSelector((state) => state.widget.showArgs)

	const selectedAction = selectedIndex !== undefined ? actions[selectedIndex] : undefined

	useEffect(() => {
		const last = actions.size() - 1
		if (autoSelectLatest && last >= 0) {
			store.selectedAction(last)
		}
	}, [selectedIndex, actions, autoSelectLatest])

	const actionSelections = useMemo(() => {
		const elements = new Map<number, React.Element>()
		for (const [index, action] of pairs(actions)) {
			elements.set(index, <ActionSelection action={action} index={index} selected={index === selectedIndex} />)
		}
		return elements
	}, [actions, selectedIndex])

	return (
		<frame BackgroundTransparency={1} Size={UDim2.fromScale(1, 1)} key="main">
			<frame
				BackgroundColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.Titlebar)}
				BackgroundTransparency={0}
				BorderSizePixel={0}
				Size={new UDim2(1, 0, 0, ROW_HEIGHT)}
				key="topRow"
			>
				<RowText order={0} text={`${actions.size()} dispatched`} />
				<RowButton key="clear" onClick={() => store.clear()} order={1} text="Clear" />

				<RowText order={2} text="•" />

				<RowText order={3} text="Selection Mode" />
				<RowButton
					key="autoselect"
					onClick={() => store.changeAutoSelectMode(!autoSelectLatest)}
					order={4}
					text={autoSelectLatest ? "Auto" : "Manual"}
				/>

				<RowText order={5} text="•" />

				<RowText order={6} text="Show Arguments" />
				<RowButton
					key="showargs"
					onClick={() => store.changeShowArgs(!showArgs)}
					order={7}
					text={showArgs ? "On" : "Off"}
				/>

				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Left}
					Padding={new UDim(0, 10)}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Center}
					key="layout"
				/>
				<uipadding PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} key="padding" />
			</frame>

			<scrollingframe
				AutomaticCanvasSize={Enum.AutomaticSize.Y}
				BackgroundTransparency={1}
				BorderColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.Border)}
				CanvasSize={new UDim2()}
				Position={new UDim2(0, 0, 0, ROW_HEIGHT)}
				ScrollBarImageColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.ScrollBar)}
				ScrollBarThickness={6}
				Size={new UDim2(ACTIONS_WIDTH, 0, 1, -ROW_HEIGHT)}
				key="actions"
			>
				{actionSelections}
				<uilistlayout Padding={new UDim(0, 5)} SortOrder={Enum.SortOrder.LayoutOrder} key="layout" />
			</scrollingframe>

			<frame
				BackgroundTransparency={1}
				Position={new UDim2(ACTIONS_WIDTH, 0, 0, ROW_HEIGHT)}
				Size={new UDim2(1 - ACTIONS_WIDTH, 0, 1, -ROW_HEIGHT)}
				key="state"
			>
				{selectedAction && <ActionState state={selectedAction.state} />}
			</frame>
		</frame>
	)
}
