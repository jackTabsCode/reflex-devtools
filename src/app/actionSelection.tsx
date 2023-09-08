import inspect from "@rbxts/inspect"
import Roact, { useMemo } from "@rbxts/roact"
import { Action } from "store/game"

export function ActionSelection(props: { action: Action; index: number; selected: boolean; onSelected: () => void }) {
	const inspectedArgs = useMemo(() => inspect(props.action.args), [props.action])

	return (
		<textbutton
			AutomaticSize={Enum.AutomaticSize.Y}
			BackgroundColor3={settings().Studio.Theme.GetColor(
				Enum.StudioStyleGuideColor[props.selected ? "MainButton" : "Button"]
			)}
			BorderColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.ButtonBorder)}
			Event={{ Activated: props.onSelected }}
			LayoutOrder={0 - props.index}
			RichText
			Size={UDim2.fromScale(1, 0)}
			Text=""
		>
			<textlabel
				AutomaticSize={Enum.AutomaticSize.XY}
				BackgroundTransparency={1}
				Font={Enum.Font.SourceSans}
				Text={`(${props.index}) ${props.action.name}`}
				TextColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.ButtonText)}
				TextSize={16}
				TextWrapped
				TextXAlignment={Enum.TextXAlignment.Left}
			/>
			{!props.action.args.isEmpty() && (
				<textlabel
					AutomaticSize={Enum.AutomaticSize.XY}
					BackgroundTransparency={1}
					Font={Enum.Font.SourceSansMono}
					Text={inspectedArgs}
					TextColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.ButtonText)}
					TextSize={16}
					TextWrapped
					TextXAlignment={Enum.TextXAlignment.Left}
				/>
			)}

			<uilistlayout Padding={new UDim(0, 2)} />
			<uipadding
				PaddingBottom={new UDim(0, 8)}
				PaddingLeft={new UDim(0, 8)}
				PaddingRight={new UDim(0, 8)}
				PaddingTop={new UDim(0, 8)}
			/>
		</textbutton>
	)
}
