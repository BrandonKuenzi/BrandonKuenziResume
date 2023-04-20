/**Manually pause the application
 *
 * @param {number} delay Number of milliseconds to sleep (1000 = 1 second)
 */
export const sleep = (delay: number) => {
	return new Promise((res) => setTimeout(res, delay));
};
