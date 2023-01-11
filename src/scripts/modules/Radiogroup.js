import { module as M } from '@19h47/modular';
import R from '@19h47/radiogroup';

class Radiogroup extends M {
	init() {
		const radiogroup = new R(this.el);
		radiogroup.init();
	}
}

export default Radiogroup;
