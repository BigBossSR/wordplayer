// todo: I think the goal here was to connect the generic elements with the specific view loaded
// import { rawInput, modifiedInput } from './common/elements.js'
// todo: clean the element event listeners
import { tabs, templateContainer } from './common/elements.js';
import Anagrammar from './anagrammar/anagrammar.js';
import Palindromer from './palindromer/palindromer.js';
import { loadWebComponentTemplates } from './web-components/index.js';

let currentApp;

const setView = (view) => {
  currentApp = new view();
  currentApp.init()
}

[Anagrammar, Palindromer].forEach(app => {
  const tabLink = document.createElement('button');
  tabLink.innerText = app.name;
  if (app.name === 'Anagrammar') {
    tabLink.classList.add('active-tab');
  } else {
    // only anagrammar is currently supported
    tabLink.disabled = true;
    tabLink.title = "Coming soon!";
  }

  tabLink.addEventListener('click', () => {
    if (currentApp.name !== app.name) {
        tabs.querySelector('.active-tab').classList.remove('active-tab');
        tabLink.classList.add('active-tab');
        setView(app);
      }
  });
  tabs.appendChild(tabLink);
})


loadWebComponentTemplates(templateContainer)
  .then(() => {
    setView(Anagrammar);
  })
  .catch(err => console.error(err));