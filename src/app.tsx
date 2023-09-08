import inspect from "@rbxts/inspect"
import Roact, { useEffect, useRef } from "@rbxts/roact"
import { useRootSelector } from "store"
import Highlighter from "vendor/highlighter"

Highlighter.matchStudioSettings()

export function App() {
	const gameState = useRootSelector(state => state.game.gameState)

	const inspected = inspect(gameState)

	const label = useRef<TextLabel>()

	useEffect(() => {
		const ref = label.current
		if (!ref) {
			warn("no ref")
			return
		}

		Highlighter.highlight({ textObject: ref })
	}, [])

	return (
		<scrollingframe
			AutomaticCanvasSize={Enum.AutomaticSize.XY}
			BackgroundTransparency={1}
			BorderSizePixel={0}
			ScrollBarThickness={4}
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
