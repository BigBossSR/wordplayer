import { StoredInputItem } from './stored-list-item.js';
import { StoredList } from './stored-list.js';

// todo: define app-specific templates as needed - probably on the app object
const TEMPLATES = {
    'stored-list-item-template': 'stored-list-item-template.html',
    'stored-list-template': 'stored-list-template.html'
};

export const loadWebComponentTemplates = async (templateContainer, templateInventory = TEMPLATES) => {
    // Filter out already loaded templates
    const templatesToLoad = Object.entries(templateInventory).filter(([id]) => 
        !templateContainer.querySelector(`#${id}`)
    );

    const promises = templatesToLoad.map(async ([id, path]) => {
        const response = await fetch('web-components/' + path);
        const html = await response.text();
        const template = document.createElement('template');
        template.setAttribute('id', id);
        template.innerHTML = html;
        templateContainer.appendChild(template);
    });

    // Wait for all promises to resolve
    await Promise.all(promises);
};

