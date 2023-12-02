import Roact from "@rbxts/roact"

export function RowButton(props: { text: string; order: number; onClick: () => void }) {
	return (
		<textbutton
			AutomaticSize={Enum.AutomaticSize.X}
			BackgroundColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.Button)}
			BorderSizePixel={0}
			Event={{ Activated: () => props.onClick() }}
			Font={Enum.Font.SourceSans}
			LayoutOrder={props.order}
			Size={UDim2.fromOffset(0, 20)}
			Text={props.text}
			TextColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.ButtonText)}
			TextSize={15}
		>
			<uipadding PaddingLeft={new UDim(0, 5)} PaddingRight={new UDim(0, 5)} key="padding" />
		</textbutton>
	)
}
