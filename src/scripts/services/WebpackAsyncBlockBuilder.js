import { AbstractBlockBuilder } from 'starting-blocks';

function getModule(nodeTypeName) {
	return import(`../blocks/${nodeTypeName}` /* webpackChunkName: "block-" */).then(
		block => block.default,
	);
}

export default class WebpackAsyncBlockBuilder extends AbstractBlockBuilder {
	async getBlockInstance(nodeTypeName) {
		try {
			const Block = await getModule(nodeTypeName);

			if (!this.hasService(nodeTypeName)) {
				this.container.$register({
					$name: nodeTypeName,
					$type: 'instanceFactory',
					$value: c => new Block(c),
				});
			}

			return this.getService(nodeTypeName).instance();
		} catch (e) {
			console.error(e.message);
			return null;
		}
	}
}
