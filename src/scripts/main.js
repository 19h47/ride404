import StartingBlocks, { polyfills } from 'starting-blocks';

import WebpackAsyncBlockBuilder from 'services/WebpackAsyncBlockBuilder';

import Guid from 'common/Guid';

import { elements } from 'scripts/config';

import DefaultPage from 'pages/DefaultPage';

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

	elements.html.classList.add('is-loaded');
	elements.html.classList.remove('is-loading');
})();
