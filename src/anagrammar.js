import { rawInput, modifiedInput, letterBank, letterBankLabel, tableContent, storeModifiedButton, clearRawButton } from './elements.js';
import { areTermsEqual, getAlphanumerics, setCookie, shuffleArray } from './util.js';

const DEFAULT_INPUTS = [
  { raw: "Jim Morrison", modified: "Mr. Mojo Risin'"},
  { raw: "Spiro Agnew", modified: "Grow a penis"}
];

const savedEntries = {};

const APP_KEY = 'ANAGRAMMAR';

const Anagrammar = {
  init: () => {
    // track the user-created value so we can reference it as needed 
    let currentAnagram = '';

    // default setup: example anagram input
    const demoValues = DEFAULT_INPUTS[Math.floor(Math.random() * DEFAULT_INPUTS.length)];
    rawInput.value = demoValues.raw;
    letterBank.innerText = getAlphanumerics(rawInput.value).toUpperCase();


    /**
     * Identify alphanumeric values of original term, and update the letterbank.
     * This clears the currentAnagram and triggers handleModifiedInput to respond to changed values.
    */
    function handleRawInput() {
      letterBank.innerText = getAlphanumerics(rawInput.value).toUpperCase();
      shuffleLetterBank();
      currentAnagram = '';
      // handleModifiedInput is smart enough to refresh the anagram from zero to reflect the new source input
      handleModifiedInput();
    }

    /** 
     * The Core Function: compare the anagrammed value to the source data and letterbank
     * This creates three arrays of characters from the stored currentAnagram, the latest user input, and the 
     * available letter bank. These arrays are used to determine added/deleted characters, enforce validity,
     * and update the stored values as appropriate.
    */
    function handleModifiedInput(/*evt*/) {
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

    /**
     * Randomly rearrange letterBank on demand
    */
    function shuffleLetterBank() {
      let letterArray = letterBank.innerText.split('');
      
      shuffleArray(letterArray);

      letterBank.innerText = letterArray.join('');
    }

    /**
     * Populate the table with unique anagrams namespaced by raw input.
     * White space is trimmed from beginning and end, but internal spaces and punctuation are considered unique.
    */
    function storeAnagram() {
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
            createRow(key, [currentValue]);
          } else {
            createTableCell(currentValue, listElement);
          }


          modifiedInput.value = '';
          //currentAnagram = '';
          handleModifiedInput();
          shuffleLetterBank();
          handleRawInput();
          modifiedInput.focus();

          setCookie(APP_KEY, savedEntries);
        }
      }
    }

    // todo: I don't know if I want these components here.
    function createRow(title, data) {
      const listID = title.replaceAll(/\s/g, '-');
      const listElement = document.createElement('tr');
      listElement.setAttribute('id', listID);

      const rowHeaderElement = document.createElement('td');
      rowHeaderElement.classList.add('row-header');
      const headerText = document.createTextNode(title);
      rowHeaderElement.appendChild(headerText);
      rowHeaderElement.addEventListener('click', () => {
        rawInput.value = title;
        modifiedInput.value = '';
        handleRawInput();
      });


      listElement.appendChild(rowHeaderElement);
      tableContent.appendChild(listElement);

      if(Array.isArray(data)) {
        data.forEach(term => createTableCell(term, listElement));
      }
    }

    function createTableCell(term, rowElement) {
      const newEntryTD = document.createElement('td');
      const newEntryText = document.createTextNode(term);
      newEntryTD.appendChild(newEntryText);
      rowElement.appendChild(newEntryTD);
    }

    // set event listeners
    rawInput.addEventListener('change', handleRawInput);

    clearRawButton.addEventListener('click', () => {
      rawInput.value = '';
      handleRawInput();
      rawInput.focus();
    });

    modifiedInput.addEventListener('input', handleModifiedInput);

    storeModifiedButton.addEventListener('click', storeAnagram);

    letterBankLabel.addEventListener('click', shuffleLetterBank);

    if (document.cookie.length) {
      const sessionData = JSON.parse(document.cookie)[APP_KEY];
      if (sessionData) {
        Object.entries(sessionData).forEach(([key, data]) => {
          savedEntries[key] = data;
          createRow(key, data);
        })
      }
    }

    // final setup: populate the demo anagram and manually trigger input handler 
    modifiedInput.value = demoValues.modified;
    handleModifiedInput();
    modifiedInput.focus();
  }
};

export default Anagrammar;