import { useEffect, useRef, useState } from "react";
export interface AnimValue {
	toTop: number; // 1 is at top. 0 is at bottom
	toCenter: number; //0 is center. -1 is bottom. 1 is top
	toBottom: number;
	onScreen: number;
}
//Contents is used if you want to force a re-render every time the content changes
export const useScrollValues = (pageScrollPercent: number) => {
	const componentRef = useRef<HTMLDivElement>(null);
	const [animValue, setAnimValue] = useState<AnimValue>({
		toTop: 0,
		toCenter: 0,
		toBottom: 0,
		onScreen: 1,
	});

	useEffect(() => {
		const top = (componentRef.current as HTMLDivElement).getBoundingClientRect()
			.top;
		const maxHeight = window.innerHeight;
		const elementHeight = (componentRef.current as HTMLDivElement).scrollHeight;
		const elementHeightScreenPercent = elementHeight / maxHeight;
		let toTop = 1 - top / maxHeight;
		let toCenter = (0.5 - (toTop - elementHeightScreenPercent / 2)) * -2;
		let toBottom = 1 - toTop + elementHeightScreenPercent / 2;
		let onScreen = 1;
		if (toCenter > 0) {
			onScreen = 1 - (1 - top - elementHeightScreenPercent) / elementHeight;
			if (onScreen > 1) onScreen = 1;
		} else if (toCenter <= 0) {
			onScreen = toTop / elementHeightScreenPercent;
			if (onScreen > 1) onScreen = 1;
		}

		const animValue = {
			toTop: toTop,
			toCenter: toCenter,
			toBottom: toBottom,
			onScreen: onScreen,
		};

		setAnimValue(animValue);
	}, [componentRef, pageScrollPercent]);

	return {
		componentRef,
		animValue,
	};
};
