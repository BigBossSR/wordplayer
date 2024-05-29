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
		const listID = this.title.replaceAll(/\s/g, '-');
      	
      	this.setAttribute('id', listID);
      	this.classList.add('stored-input-list');

      	const listHeader = document.createElement('div');
      	listHeader.classList.add('list-header');
      	listHeader.textContent = this.title;

      	listHeader.addEventListener('click', () => {
        	this.dispatchEvent(new CustomEvent('listHeaderClick', { detail: { term: this.title }, bubbles: true }));
      	});

      	this.shadowRoot.appendChild(listHeader);

      	const itemList = document.createElement('div');
      	itemList.classList.add('item-list');
      	this.shadowRoot.appendChild(itemList);

      	this.data.forEach(term => {
          	this.addListItem(term, false);
      	});

	}

}

customElements.define('stored-list', StoredList);