const debounce = (func, wait, immediate) => {
	let timeout;

	return function () { // eslint-disable-line func-names
		const context = this;
		const args = arguments; // eslint-disable-line prefer-rest-params
		const later = function () { // eslint-disable-line func-names
			timeout = null;
			if (!immediate) func.apply(context, args);
		};

		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export default debounce;
