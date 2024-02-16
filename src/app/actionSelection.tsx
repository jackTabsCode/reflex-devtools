import inspect from "@rbxts/inspect"
import React, { memo, useMemo } from "@rbxts/react"
import { useRootProducer, useRootSelector } from "store"
import { Action } from "store/game"

interface Props {
	action: Action
	index: number
	selected: boolean
}

export const ActionSelection = memo((props: Props) => {
	const store = useRootProducer()

	const showArgs = useRootSelector((state) => state.widget.showArgs)

	const inspectedArgs = useMemo(() => inspect(props.action.args), [props.action])

	const formattedTimestamp = DateTime.fromUnixTimestampMillis(props.action.timestamp).FormatLocalTime(
		"hh:mm:ss.SSS",
		"en-us",
	)

	const backgroundColor = settings().Studio.Theme.GetColor(
		Enum.StudioStyleGuideColor[props.selected ? "DialogMainButton" : "DialogButton"],
	)
	const textColor = settings().Studio.Theme.GetColor(
		Enum.StudioStyleGuideColor[props.selected ? "DialogMainButtonText" : "DialogButtonText"],
	)
	const subTextColor = settings().Studio.Theme.GetColor(
		Enum.StudioStyleGuideColor[props.selected ? "DialogMainButtonText" : "SubText"],
	)

	return (
		<textbutton
			AutomaticSize={Enum.AutomaticSize.Y}
			BackgroundColor3={backgroundColor}
			BorderColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.DialogButtonBorder)}
			Event={{
				Activated: () => {
					store.selectedAction(props.index, true)
				},
			}}
			LayoutOrder={0 - props.index}
			RichText
			Size={UDim2.fromScale(1, 0)}
			Text=""
		>
			<textlabel
				AutomaticSize={Enum.AutomaticSize.XY}
				BackgroundTransparency={1}
				Font={Enum.Font.SourceSansSemibold}
				LayoutOrder={0}
				Text={props.action.name}
				TextColor3={textColor}
				TextSize={16}
				TextWrapped
				TextXAlignment={Enum.TextXAlignment.Left}
				key="name"
			/>
			{!props.action.args.isEmpty() && (
				<textlabel
					AutomaticSize={Enum.AutomaticSize.XY}
					BackgroundTransparency={1}
					Font={Enum.Font.RobotoMono}
					LayoutOrder={1}
					Text={inspectedArgs}
					TextColor3={textColor}
					TextSize={16}
					TextWrapped
					TextXAlignment={Enum.TextXAlignment.Left}
					Visible={showArgs}
					key="args"
				/>
			)}
			<textlabel
				AutomaticSize={Enum.AutomaticSize.XY}
				BackgroundTransparency={1}
				Font={Enum.Font.RobotoMono}
				LayoutOrder={2}
				Text={`${formattedTimestamp} • #${props.index}`}
				TextColor3={subTextColor}
				TextSize={15}
				TextWrapped
				TextXAlignment={Enum.TextXAlignment.Left}
				key="index"
			/>

			<uilistlayout Padding={new UDim(0, 2)} SortOrder={Enum.SortOrder.LayoutOrder} key="layout" />
			<uipadding
				PaddingBottom={new UDim(0, 8)}
				PaddingLeft={new UDim(0, 8)}
				PaddingRight={new UDim(0, 8)}
				PaddingTop={new UDim(0, 8)}
				key="padding"
			/>
		</textbutton>
	)
})
