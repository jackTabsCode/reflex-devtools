import inspect from "@rbxts/inspect"
import Roact, { useEffect, useRef } from "@rbxts/roact"
import Highlighter from "vendor/highlighter"

export function ActionState(props: { state: {} }) {
	const label = useRef<TextLabel>()

	useEffect(() => {
		const ref = label.current
		if (!ref) {
			warn("no ref")
			return
		}

		Highlighter.highlight({ textObject: ref })
	}, [])

	const inspected = inspect(props.state)

	return (
		<scrollingframe
			AutomaticCanvasSize={Enum.AutomaticSize.XY}
			BackgroundTransparency={1}
			BorderColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.Border)}
			ScrollBarImageColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.ScrollBar)}
			ScrollBarThickness={6}
			Size={UDim2.fromScale(1, 1)}
		>
			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.RobotoMono}
				Size={UDim2.fromScale(1, 1)}
				Text={inspected}
				TextColor3={new Color3(1, 1, 1)}
				TextSize={16}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextYAlignment={Enum.TextYAlignment.Top}
				ref={label}
			/>
		</scrollingframe>
	)
}
