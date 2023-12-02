import Roact from "@rbxts/roact"

interface Props {
	text: string
	order: number
}

export function RowText(props: Props) {
	return (
		<textlabel
			AutomaticSize={Enum.AutomaticSize.XY}
			BackgroundTransparency={1}
			Font={Enum.Font.SourceSans}
			LayoutOrder={props.order}
			Text={props.text}
			TextColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.SubText)}
			TextSize={15}
		/>
	)
}
