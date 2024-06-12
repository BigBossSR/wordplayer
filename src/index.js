// todo: I think the goal here was to connect the generic elements with the specific view loaded
// import { rawInput, modifiedInput } from './common/elements.js'
// todo: clean the element event listeners
import Anagrammar from './anagrammar/anagrammar.js';
// confirm
const setView = (view) => {
  view.init()
}

setView(Anagrammar);
