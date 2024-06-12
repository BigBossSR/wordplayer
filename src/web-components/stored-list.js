export class StoredList extends HTMLElement {

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	addListItem(term, addToData = true) {
	    if (addToData) {
    	    // Add the new term to the internal data array
    	    this.data.push(term);
	    }

	    // Create and append the list item to the DOM
	    const listItem = document.createElement('stored-list-item');
	    listItem.setAttribute('text', term);
	    listItem.addEventListener('delete', () => {
	        // Remove the item from the internal data array
	        const index = this.data.indexOf(term);
	        if (index !== -1) {
	            this.data.splice(index, 1);
	        }

	        // Remove the list item from the DOM
	        listItem.remove();

	        this.dispatchEvent(new CustomEvent('itemDeleted', { detail: { id: this.title, data: this.data }, bubbles: true }));

	        if (this.data.length === 0) {
	        	this.remove();
	        }
	    });

	    listItem.addEventListener('edit', ({detail}) => {
	    	this.dispatchEvent(new CustomEvent('editItem', { detail: { source: this.title, anagram: detail.anagram }, bubbles: true }));
	    })

	    this.shadowRoot.querySelector('.item-list').appendChild(listItem);
	}

	connectedCallback() {
		const template = document.getElementById('stored-list-template');
    	this.shadowRoot.appendChild(template.content.cloneNode(true));

		const listID = this.title.replaceAll(/\s/g, '-');
      	
      	this.setAttribute('id', listID);
      	
      	const listHeader = this.shadowRoot.querySelector('.list-header');
      	listHeader.textContent = this.title;
      	listHeader.addEventListener('click', () => {
        	this.dispatchEvent(new CustomEvent('listHeaderClick', { detail: { term: this.title }, bubbles: true }));
      	});

        this.data.forEach(term => {
          	this.addListItem(term, false);
      	});

	}

}

customElements.define('stored-list', StoredList);