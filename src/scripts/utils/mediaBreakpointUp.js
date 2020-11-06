import { breakpoints } from 'scripts/config';
import getViewportSize from 'utils/getViewportSize';

/**
 * Media breakpoint up
 *
 * @param  {string} breakpoint
 * @return bool
 */
export default function mediaBreakpointUp(breakpoint) {
	if (!breakpoints[breakpoint]) {
		const errorMessage = `Breakpoint '${breakpoint}' do not exist`;
		console.error(errorMessage);
		throw new Error(errorMessage);
	}

	return getViewportSize().width > breakpoints[breakpoint];
}
