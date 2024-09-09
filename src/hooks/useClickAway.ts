

import { useCallback, useEffect } from "react"

export function useClickAway(ref: React.RefObject<HTMLElement>, onClickAway: () => void) {
	const handleClick = useCallback(
		(event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onClickAway()
			}
		},
		[ref, onClickAway]
	)
	useEffect(() => {
		document.addEventListener("click", handleClick)
		return () => {
			document.removeEventListener("click", handleClick)
		}
	}, [handleClick])
}
