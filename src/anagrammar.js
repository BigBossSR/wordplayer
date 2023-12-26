import { rawInput, modifiedInput, letterBank, letterBankLabel, tableContent } from './elements.js';
import { areTermsEqual, getAlphanumerics } from './util.js';

const savedEntries = {};

const Anagrammar = {
  init: () => {

    rawInput.value = "Rearrange me!"
    letterBank.innerText = getAlphanumerics(rawInput.value).toUpperCase();

    rawInput.addEventListener('change', evt => {
      letterBank.innerText = getAlphanumerics(rawInput.value).toUpperCase();
    });

    /* NEW IDEA
    track CurrentValue in a variable
    on input, compare New Value to Current Value to find: chars added / chars removed
      both can exist, if an overwrite
    for each char removed:
      if it is alphanumeric, add it to end of letterbank

    for each char added
      if it is in letterbank, remove from letterbank
      if not, remove from New Value

    Assing modified leterbank
    Assign New Value to input
    Assign New Value to CurrentValue

    */

    let currentAnagram = '';
    // todo: decide if i like the array approach
    function handleInput () {
      /*let sourceText = getAlphanumerics(rawInput.value).toUpperCase();
      let newValue = modifiedInput.value;
      let unusedLetters = letterBank.innerText;
      let oldValue = currentAnagram;

      let charactersAdded = '';
      let charactersRemoved = '';*/ 
      let newValue = modifiedInput.value.split('');
      let unusedLetters = letterBank.innerText.split('');
      let oldValue = currentAnagram.toUpperCase().split('');

      let charactersAdded = [];
      let charactersRemoved = [];
      newValue.forEach(char => {
        const existingIndex = oldValue.indexOf(char.toUpperCase()); 
        if (existingIndex === -1) {
          //charactersAdded += char;
          charactersAdded.push(char);
        } else {
          // if character exists, remove so we don't match repeatedly
          // oldValue = oldValue.slice(0, existingIndex) + oldValue.slice(existingIndex + 1)
          oldValue.splice(existingIndex, 1);
        }
      });

      // any oldValue characters not in newValue must be deletions
      charactersRemoved = oldValue;

      charactersRemoved.forEach(removed => {
        if (/[a-zA-Z0-9]/.test(removed)) {
          // unusedLetters += removed;
          unusedLetters.push(removed.toUpperCase());
        }
      });

      charactersAdded.forEach((added) => {
        const existingIndex = unusedLetters.indexOf(added.toUpperCase());
        if (existingIndex !== -1) {
          // unusedLetters = unusedLetters.slice(0, existingIndex) + unusedLetters.slice(existingIndex + 1);
          unusedLetters.splice(existingIndex, 1);
        } else if (/[a-zA-Z0-9]/.test(added)) {
          const newIndex = newValue.indexOf(added);
          // newValue = newValue.slice(0, newIndex) + newValue.slice(newIndex + 1);
          newValue.splice(newIndex, 1);
        }
      });

      letterBank.innerText = unusedLetters.join('');
      modifiedInput.value = currentAnagram = newValue.join('');
    }


    modifiedInput.addEventListener('input', handleInput);
   /* modifiedInput.addEventListener('input', evt => {
      let sourceText = getAlphanumerics(rawInput.value).toUpperCase();
      let modifiedText = modifiedInput.value;
      let unusedLetters = letterBank.innerText;

      let processed = '';

      for (let i = 0; i < modifiedText.length; i++) {
        const modifiedChar = modifiedText[i];
        // if alphanumeric, be sure it is valid input
        if (/[a-zA-Z0-9]/.test(modifiedChar)) {
          // find index in raw sourcetext
          const sourceIndex = sourceText.indexOf(modifiedChar.toUpperCase());
          // if not a valid character, abort
          if (sourceIndex === -1) {
            break;
          } else {
            // if valid, splice the index from sourceText
            sourceText = sourceText.slice(0, sourceIndex) + sourceText.slice(sourceIndex + 1)
          }
        }
        processed += modifiedChar;
      }
      // assign sourceText to rawInput and modifiedText to modifiedInput

      modifiedInput.value = processed;

      // now, mutate the unusedLetters? SO that the word bank is refreshed?
      // iterate unusedLetters from back, to mutate
      // if a letter exists in sourceText, remove from sourceText
      // if it does not exist in sourceText, remove from this array
      // once we are done, any remaining characters from source text are deletions that should be added in to end, preferably as they are...

      letterBank.innerText = sourceText;
    });*/

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
      
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
      }

      shuffleArray(letterArray);

      letterBank.innerText = letterArray.join('');
    });
  }
};

export default Anagrammar;