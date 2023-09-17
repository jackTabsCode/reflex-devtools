import Highlighter from "@rbxts/highlighter"
import inspect from "@rbxts/inspect"
import Roact, { useBinding, useEffect, useRef } from "@rbxts/roact"

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

	const [textYSize, setTextYSize] = useBinding(0)

	return (
		<scrollingframe
			BackgroundTransparency={1}
			BorderColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.Border)}
			CanvasSize={textYSize.map(y => new UDim2(1, 0, 0, y))}
			ScrollBarImageColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.ScrollBar)}
			ScrollBarThickness={6}
			Size={UDim2.fromScale(1, 1)}
		>
			<textlabel
				AutomaticSize={Enum.AutomaticSize.XY}
				BackgroundTransparency={1}
				Change={{ AbsoluteSize: rbx => setTextYSize(rbx.AbsoluteSize.Y) }}
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
