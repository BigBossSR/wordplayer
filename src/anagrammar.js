import { rawInput, modifiedInput, letterBank, letterBankLabel, tableContent } from './elements.js';
import { areTermsEqual, getAlphanumerics, shuffleArray } from './util.js';

const DEFAULT_INPUTS = [
  { raw: "Jim Morrison", modified: "Mr. Mojo Risin'"},
  { raw: "Spiro Agnew", modified: "Grow a penis"}
];

const savedEntries = {};


const Anagrammar = {
  init: () => {
    // track the user-created value so we can reference it as needed 
    let currentAnagram = '';

    // default setup: example anagram input
    const demoValues = DEFAULT_INPUTS[Math.floor(Math.random() * DEFAULT_INPUTS.length)];
    rawInput.value = demoValues.raw;
    letterBank.innerText = getAlphanumerics(rawInput.value).toUpperCase();

    // set listener for raw input
    rawInput.addEventListener('change', evt => {
      letterBank.innerText = getAlphanumerics(rawInput.value).toUpperCase();
      currentAnagram = '';
      // handleInput is smart enough to refresh the anagram from zero to reflect the new source input
      handleInput();
    });

    /** 
     * The Core Function: compare the anagrammed value to the source data and letterbank
     * This creates three arrays of characters from the stored currentAnagram, the latest user input, and the 
     * available letter bank. These arrays are used to determine added/deleted characters, enforce validity,
     * and update the stored values as appropriate.
    */
    function handleInput (/*evt*/) {
      let newValue = modifiedInput.value.split('');
      let unusedLetters = letterBank.innerText.split('');
      let oldValue = currentAnagram.toUpperCase().split('');

      let charactersAdded = [];

      newValue.forEach(char => {
        if (/[a-zA-Z0-9]/.test(char)) {
          const existingIndex = oldValue.indexOf(char.toUpperCase());
          // if alphanumeric and not in currentAnagram, it is an added character
          if (existingIndex === -1) {
            charactersAdded.push(char);
          } else {
            // remove matches from the old value inventory
            oldValue.splice(existingIndex, 1);
          }
        }
      });

      // any oldValue characters not in newValue must be deletions
      oldValue.forEach(removed => {
        if (/[a-zA-Z0-9]/.test(removed)) {
          unusedLetters.push(removed.toUpperCase());
        }
      });

      // If there are available letters from deletion of letter bank, proceed
      // Second condition covers an edge case to allow special characters
      if (unusedLetters.length || !charactersAdded.length) {
        charactersAdded.forEach((added) => {
          const existingIndex = unusedLetters.indexOf(added.toUpperCase());
          if (existingIndex !== -1) {
            unusedLetters.splice(existingIndex, 1);
          } else {
            const indexToRemove = newValue.indexOf(added);
            newValue.splice(indexToRemove, 1);
          }
        });

        letterBank.innerText = unusedLetters.join('');
        modifiedInput.value = currentAnagram = newValue.join('');
      } else {
        // if no available characters, replace the latest input with the stored anagram
        modifiedInput.value = currentAnagram;
      }
    }


    modifiedInput.addEventListener('input', handleInput);
   
    modifiedInput.addEventListener('change', evt => {
      if (letterBank.innerText.length === 0) {
        const key = rawInput.value.trim().toUpperCase(); // consider using alphanumeric here
        const currentValue = modifiedInput.value.trim();
        let isInputUnique = false;

        if (!savedEntries.hasOwnProperty(key)) {
          savedEntries[key] = [];
          savedEntries[key].id = key.replaceAll(/\s/g, '-');
        }

        const currentList = savedEntries[key];
        const listID = currentList.id;

        if (currentList.findIndex(existing => areTermsEqual(currentValue, existing)) < 0 &&
          !areTermsEqual(key, currentValue)) {
          currentList.push(currentValue);
          isInputUnique = true;
        }

        // todo: what dictates the table? a rerender each time? or shall we dictate this is new value?
        if (isInputUnique) {
          let listElement = tableContent.querySelector("[id='" + listID + "'");
          if (!listElement) {
            listElement = document.createElement('tr');
            listElement.setAttribute('id', listID);

            const rowHeaderElement = document.createElement('td');
            rowHeaderElement.classList.add('row-header');
            const headerText = document.createTextNode(key);
            rowHeaderElement.appendChild(headerText);
            listElement.appendChild(rowHeaderElement);
            tableContent.appendChild(listElement);
          }

          const newEntryTD = document.createElement('td');
          const newEntryText = document.createTextNode(currentValue);
          newEntryTD.appendChild(newEntryText)
          listElement.appendChild(newEntryTD);
        }
      }
    });

    letterBankLabel.addEventListener('click', () => {
      let letterArray = letterBank.innerText.split('');
      
      shuffleArray(letterArray);

      letterBank.innerText = letterArray.join('');
    });

    // final setup: populate the demo anagram and manually trigger input handler 
    modifiedInput.value = demoValues.modified;
    handleInput();
  }
};

export default Anagrammar;