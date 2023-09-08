interface HighlightProps {
	textObject: TextLabel
	src?: string
	forceUpdate?: boolean
	customLang?: { [K in string]: string }
}

interface Highlighter {
	highlight: (props: HighlightProps) => void
	matchStudioSettings: () => void
}

declare const Highlighter: Highlighter

export = Highlighter
