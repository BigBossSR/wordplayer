import { rawTextLabel } from '../common/elements.js';

const palindromerLabels = {
	palindromer_rawText_label: 'Start building a palindrome...'
};

class Palindromer {
	constructor() {
		
	}

	#initializeDOM() {
		rawTextLabel.innerText = palindromerLabels.palindromer_rawText_label;
	}

	init() {
		this.#initializeDOM();
	}
}

export default Palindromer;