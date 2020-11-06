export default function debug(message, color = '') {
	if (1 === window.startingBlocksDebugLevel) {
		console.debug(`%c[SB] %c${message}`, 'color:#749f73', 'color:debug', color);
	}
}
