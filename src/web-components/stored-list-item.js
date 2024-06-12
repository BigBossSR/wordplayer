export class StoredInputItem extends HTMLElement {
    constructor() {
        super();
        // Create shadow DOM for encapsulated styling
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const template = document.getElementById('stored-list-item-template');
    	this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Now that the template content is available, you can interact with it
        const text = this.getAttribute('text');
        this.shadowRoot.querySelector('.item-text').textContent = text;

        // Add event listeners for delete and edit buttons
        this.shadowRoot.querySelector('.delete-btn').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('delete', { bubbles: true }));
        });

        this.shadowRoot.querySelector('.edit-btn').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('edit', { detail: { anagram: text }, bubbles: true }));
        });
    }
}

// Define custom element
customElements.define('stored-list-item', StoredInputItem);
