// todo: I think the goal here was to connect the generic elements with the specific view loaded
// import { rawInput, modifiedInput } from './common/elements.js'
// todo: clean the element event listeners
import { templateContainer } from './common/elements.js';
import Anagrammar from './anagrammar/anagrammar.js';
import { loadWebComponentTemplates } from './web-components/index.js';
// confirm
const setView = (view) => {
  view.init()
}

loadWebComponentTemplates(templateContainer)
  .then(() => {
    setView(Anagrammar);
  })
  .catch(err => console.error(err));