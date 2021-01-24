import { module } from 'modujs';
import R from '@19h47/radiogroup';

class Radiogroup extends module {
	init() {
		const radiogroup = new R(this.el);
		radiogroup.init();
	}
}

export default Radiogroup;
