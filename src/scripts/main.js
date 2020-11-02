import StartingBlocks, { polyfills } from 'starting-blocks';

import WebpackAsyncBlockBuilder from 'services/WebpackAsyncBlockBuilder';

import Guid from 'common/Guid';

import DefaultPage from 'scripts/pages/DefaultPage';

require('common/Scroll');

const production = 'production' !== process.env.NODE_ENV;

(() => {
	if (window.MAIN_EXECUTED) {
		throw new Error('Safari 10');
	}

	window.MAIN_EXECUTED = true;

	polyfills();

	const startingBlocks = new StartingBlocks({
		manualDomAppend: true,
		debug: production ? 1 : 0,
	});

	startingBlocks.provider('BlockBuilder', WebpackAsyncBlockBuilder);

	startingBlocks.instanceFactory('DefaultPage', c => new DefaultPage(c));

	if (production) {
		const guid = new Guid();

		guid.init();
	}

	startingBlocks.boot();

	document.documentElement.classList.add('is-loaded');
	document.documentElement.classList.remove('is-loading');

	setTimeout(() => {
		document.documentElement.classList.add('is-ready');
	}, 300);
})();
