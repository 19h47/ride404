/* global rider404 */
import { module as M } from '@19h47/modular';

let debounceTimer;

const debounce = (callback, time) => {
	window.clearTimeout(debounceTimer);
	debounceTimer = window.setTimeout(callback, time);
};

const getChildrenCount = $wrapper => {
	let count = 0;

	[...$wrapper.children].forEach($row => {
		[...$row.children].forEach($column => {
			count += $column.children.length;
		});
	});

	return count;
};

class LoadMorePosts extends M {
	constructor(m) {
		super(m);

		this.postType = this.getData('post-type') || 'post';
		this.foundPosts = 0;

		this.events = {
			click: { button: 'load', reset: 'all' },
			change: { filter: 'filter' },
			input: { search: 'filter' },
		};
	}

	async load() {
		console.log('🖨️ LoadMorePosts.load');

		this.locked();

		const response = await this.fetch();
		const data = await response.json();

		this.insert(data);
		this.unlocked();
	}

	async filter() {
		this.locked();

		debounce(async () => {
			this.reset = true;

			const response = await this.fetch();
			const data = await response.json();

			this.insert(data);
			this.unlocked();

			this.reset = false;
		}, 500);
	}

	async all() {
		this.reset = true;

		this.$('filter').forEach(filter => {
			if ('SELECT' === filter.tagName) {
				filter.value = '';
			}
		});

		await this.load();
		this.reset = false;
	}

	fetch() {
		// console.log('❤️ LoadMorePosts.fetch', this.termId);

		const url = new URL(rider404.ajax_url);

		const params = {
			action: this.getData('action') || 'load_more_posts',
			nonce: rider404.nonce,
			postsPerPage: JSON.parse(this.getData('posts-per-page')) || 6,
			offset: this.reset ? 0 : getChildrenCount(this.$('container')[0]),
			postType: this.postType,
		};

		if (this.$('taxonomy')[0]) {
			params.taxonomy = JSON.stringify({
				taxonomy: this.$('taxonomy')[0].name,
				term_id: this.$('taxonomy')[0].value,
			});
		}

		if (this.filters().length) {
			params.filters = JSON.stringify(this.filters());
		}

		if (this.$('search')[0] && this.$('search')[0].value) {
			params.s = this.$('search')[0].value;
		}

		if (this.$('view')[0] && this.$('view')[0].value) {
			params.view = this.$('view')[0].value;
		}

		Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

		return fetch(url);
	}

	filters() {
		const filters = [];

		this.$('filter').forEach(filter => {
			if (filter.value && 'SELECT' === filter.tagName) {
				filters.push({ taxonomy: filter.name, term_id: filter.value });
			}

			if (filter.value && 'hidden' === filter.type) {
				filters.push({ taxonomy: filter.name, term_id: filter.value });
			}

			if (filter.value && 'checkbox' === filter.type && filter.checked) {
				filters.push({ taxonomy: filter.name, term_id: filter.value });
			}
		});

		return filters;
	}

	insert({ html, foundPosts }) {
		// console.log('➡️ LoadMorePosts.insert', html);
		this.foundPosts = foundPosts;

		if (!html) {
			return;
		}

		if (this.reset) {
			this.$('container')[0].innerHTML = JSON.parse(html);
			return;
		}

		this.$('container')[0].innerHTML += JSON.parse(html);
	}

	locked() {
		this.$('container')[0].classList.add('opacity-50');

		if (this.$('button')[0]) {
			this.$('button')[0].classList.add('pointer-events-none');
		}

		if (this.$('search')[0]) {
			this.$('search')[0].classList.add('pointer-events-none');
		}
	}

	unlocked() {
		console.log('LoadMorePosts.unlocked');

		this.$('container')[0].classList.remove('opacity-50');

		if (this.$('counter')[0]) {
			if (0 === this.foundPosts) {
				this.$('counter')[0].style.setProperty('display', 'none');
			}

			if (1 === this.foundPosts) {
				this.$('counter')[0].style.setProperty('display', 'block');
				this.$('counter')[0].innerHTML = this.$('counter')[0].getAttribute('data-singular');
			}

			if (1 < this.foundPosts) {
				this.$('counter')[0].style.setProperty('display', 'block');
				this.$('counter')[0].innerHTML = this.$('counter')[0]
					.getAttribute('data-plural')
					.replace('%s', this.foundPosts);
			}
		}

		if (this.$('button')[0]) {
			this.$('button')[0].classList.remove('pointer-events-none');

			if (getChildrenCount(this.$('container')[0]) >= this.foundPosts) {
				this.$('button')[0].style.setProperty('display', 'none');
			} else {
				this.$('button')[0].style.setProperty('display', 'block');
			}
		}

		if (this.$('search')[0]) {
			this.$('search')[0].classList.remove('pointer-events-none');
		}

		this.call('destroy', this.el, 'app');
		this.call('update', this.el, 'app');
		this.call('update', null, 'Scroll');
	}
}

export default LoadMorePosts;
