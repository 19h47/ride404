import { module as M } from 'modujs';
import R from '@19h47/radiogroup';

class Radiogroup extends M {
	init() {
		const radiogroup = new R(this.el);
		radiogroup.init();
	}
}

export default Radiogroup;
