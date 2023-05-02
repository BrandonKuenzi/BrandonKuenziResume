import { RefObject, useCallback, useEffect, useState } from "react";

//Contents is used if you want to force a re-render every time the content changes
export const useScrollHelper = (
	scrollViewRef: RefObject<HTMLDivElement | HTMLTextAreaElement>
) => {
	const [isScrollable, setIsScrollable] = useState(false);

	const manualRecalculateScrollability = () => {
		const canScroll = scrollableTest();
		setIsScrollable(canScroll);
	};

	useEffect(() => {
		const canScroll = scrollableTest();
		setIsScrollable(canScroll);
	});

	const scrollableTest = (): boolean => {
		if (scrollViewRef.current) {
			return (
				scrollViewRef.current?.scrollHeight >
				scrollViewRef.current?.clientHeight
			);
		} else return false;
	};

	const [scrolledToBottom, setScrolledToBottom] = useState(false);
	const [scrolledToTop, setScrolledToTop] = useState(true);

	// You can use handleScroll in the onScroll event of whatever element has the overflow
	const handleScroll = (e: any) => {
		setScrolledToBottom(
			e.target.scrollHeight - e.target.scrollTop - 1 <= e.target.clientHeight
		); // had to add -1 for buffer
		setScrolledToTop(e.target.scrollTop === 0);
		const canScroll = scrollableTest();
		setIsScrollable(canScroll);
	};

	return {
		scrolledToBottom,
		scrolledToTop,
		isScrollable,
		handleScroll,
		manualRecalculateScrollability,
	};
};
