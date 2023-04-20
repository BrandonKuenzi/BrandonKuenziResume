export const randomRangeFloat = (min: number, max: number) => {
	return Math.random() * (max - min) + min;
};
/**
 *
 * @param min (inclusive)
 * @param max (inclusive)
 *
 */
export const randomRangeInt = (min: number, max: number) => {
	return Math.round(Math.random() * (max - min) + min);
};
