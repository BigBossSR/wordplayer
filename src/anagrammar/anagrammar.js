import { rawInput, rawTextLabel, modifiedInput, modifiedInputLabel, letterBank, letterBankButton, listContainer, storeModifiedButton, clearRawButton, templateContainer, footerCredit } from '../common/elements.js';
import { areTermsEqual, getAlphanumerics, setCookieJSON, getCookieJSON, shuffleArray, randomFromArray } from '../common/util.js';

const DEFAULT_INPUTS = [
  { raw: "Jim Morrison", modified: "Mr. Mojo Risin'"},
  { raw: "Spiro Agnew", modified: "Grow a penis" },
  { raw: "Kanye West", modified: "Sweaty Ken" },
  { raw: "Leonardo DiCaprio", modified: "Periodic Anal Odor" },
  { raw: "Justin Timberlake", modified: "I’m a Jerk, But Listen" },
  { raw: "Kim Kardashian", modified: "His Kink, a Drama" },
  { raw: "Beyoncé Knowles", modified: "Obscenely Woken" },
  { raw: "Kevin Federline", modified: "Evil Knee Finder" },
  { raw: "Amy Poehler", modified: "My Pale Hero" },
  { raw: "John Mayer", modified: "Enjoy Harm" },
  { raw: "Emma Watson", modified: "Steam Woman" },
  { raw: "Matthew McConaughey", modified: "A ‘Catch Them Women’ Guy" },
  { raw: "Ryan Gosling", modified: "Sly Groaning" },
  { raw: "Bill Gates", modified: "Get Ill Abs" },
  { raw: "Jennifer Aniston", modified: "Fine in Torn Jeans"},
  { raw: "Tom Hiddleston", modified: "Odd Silent Moth" },
  { raw: "Britney Spears", modified: "Presbyterians" },
  { raw: "Chad Kroeger", modified: "Orchard Geek" },
  { raw: "Lil Wayne", modified: "Wine Ally" },
  { raw: "Neil Young", modified: "Online Guy" },
  { raw: "Eric Clapton", modified: "Narcoleptic" },
  { raw: "Clint Eastwood", modified: "Old West Action" }
];

const FOOTER_CREDITS = ["Casts Motors", "At Most Cross", "Coast Storms", "So Storm Cats", "Mrs. Taco Toss", "Tom's Co-Stars", "Cosmo's Tarts", "Mascot Sorts"];

// const savedEntries = {};

const APP_KEY = 'ANAGRAMMAR';

const anagrammerLabels = {
  anagrammar_rawText_label: "Enter term to anagram...",
  anagrammar_clearInput_button: "Clear",
  anagrammar_letterBank_placeholder: "Available letters are shown here",
  anagrammar_letterBank_button: "Shuffle Unused Letters",
  anagrammar_input_placeholder: "Ex: {0}",
  anagrammar_modifiedText_label: "Now anagram it!",
  anagrammar_modifiedText_button: "Store anagram"
};

function applyStyles() {
  rawInput.classList.add('classic-input');
  modifiedInput.classList.add('classic-input');
  clearRawButton.classList.add('classic-input', 'classic-button');
  letterBankButton.classList.add('classic-input', 'classic-button');
  storeModifiedButton.classList.add('classic-input', 'classic-button');
  // todo: probably doesn't go here, in final form
  // occasionally display real or anagrammed name
  if (Math.random() >= 0.75) {
    footerCredit.innerText = randomFromArray(FOOTER_CREDITS);
  }
  footerCredit.addEventListener('click', ({ target }) => {
    const current = target.innerText;
    if (FOOTER_CREDITS.indexOf(current) > -1) {
      target.innerText = "Scott A. M. Ross";
    } else {
      target.innerText = randomFromArray(FOOTER_CREDITS);
    }
  })

}

class Anagrammar {
  // todo: in-progress refactor to simplify and implement class method
  /*handleModifiedInput: () => {
    let newValue = modifiedInput.value;
    let oldValue = currentAnagram;

    let oldValueIterator = 0;
    let newValueIterator = 0;

    const charactersAdded = [];
    const charactersRemoved = [];

    while (oldValueIterator < oldValue.length && newValueIterator < newValue.length) {
      
      oldValueIterator++;
      newValueIterator++;
    }
    // find the index of the change
    // determine a delete or addition

  },*/

  #getExample() {
    return randomFromArray(DEFAULT_INPUTS);
  }

  #initializeDOM() {
    const example = this.#getExample();
    rawTextLabel.innerText = anagrammerLabels.anagrammar_rawText_label;
    rawInput.placeholder = anagrammerLabels.anagrammar_input_placeholder.replace('{0}', example.raw);
    clearRawButton.innerText = anagrammerLabels.anagrammar_clearInput_button;
    letterBank.placeholder = anagrammerLabels.anagrammar_letterBank_placeholder;
    letterBankButton.innerText = anagrammerLabels.anagrammar_letterBank_button;
    modifiedInputLabel.innerText = anagrammerLabels.anagrammar_modifiedText_label;
    modifiedInput.placeholder = anagrammerLabels.anagrammar_input_placeholder.replace('{0}', example.modified);
    storeModifiedButton.innerText = anagrammerLabels.anagrammar_modifiedText_button;
  }

  init() {
    // TEMP: backward compatible until class refactor finished
    const self = this;
    this.#initializeDOM();
    applyStyles();
    // track the user-created value so we can reference it as needed 
    let currentAnagram = '';

    // default setup: example anagram input
    /*const demoValues = DEFAULT_INPUTS[Math.floor(Math.random() * DEFAULT_INPUTS.length)];
    rawInput.value = demoValues.raw;
    letterBank.innerText = getAlphanumerics(rawInput.value).toUpperCase();*/

    /** Event Handlers */
    function listHeaderClick({detail}) {
      rawInput.value = detail.term;
      modifiedInput.value = '';
      handleRawInput();
      modifiedInput.focus();
    }

    function itemDeleted({ detail }) {
      const { id, data } = detail;
      const sessionData = getCookieJSON(APP_KEY) || {};
      if (data.length) {
        sessionData[id] = data;
      } else {
        delete sessionData[id];
      }
      setCookieJSON(APP_KEY, sessionData);
    }

    function editItem({detail}) {
      const { source, anagram } = detail;
      rawInput.value = source;
      handleRawInput();
      modifiedInput.value = anagram;
      handleModifiedInput();
      modifiedInput.focus();
    }

    /**
     * Identify alphanumeric values of original term, and update the letterbank.
     * This clears the currentAnagram and triggers handleModifiedInput to respond to changed values.
    */
    function handleRawInput() {
      if (rawInput.value.length) {
        modifiedInput.placeholder = '';
        clearRawButton.disabled = false;
        letterBankButton.disabled = false;
        storeModifiedButton.disabled = false;
      } else {
        const example = self.#getExample();
        rawInput.placeholder = anagrammerLabels.anagrammar_input_placeholder.replace('{0}', example.raw);
        modifiedInput.placeholder = anagrammerLabels.anagrammar_input_placeholder.replace('{0}', example.modified);
        clearRawButton.disabled = true;
        letterBankButton.disabled = true;
        storeModifiedButton.disabled = true;
      }
      letterBank.value = getAlphanumerics(rawInput.value).toUpperCase();
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
      let unusedLetters = letterBank.value.split('');
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
             // Get the cursor position in the input field
            const cursorIndex = modifiedInput.selectionStart;
            // Find the index of the character to remove based on the cursor position
            const indexToRemove = newValue.lastIndexOf(added, cursorIndex);
            newValue.splice(indexToRemove, 1);
          }
        });

        letterBank.value = unusedLetters.join('');
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
      let letterArray = letterBank.value.split('');
      
      shuffleArray(letterArray);

      letterBank.value = letterArray.join('');
    }

    /**
     * Populate the table with unique anagrams namespaced by raw input.
     * White space is trimmed from beginning and end, but internal spaces and punctuation are considered unique.
    */
    function storeAnagram() {
      if (letterBank.value.length === 0) {
        const key = rawInput.value.trim().toUpperCase();
        const currentValue = modifiedInput.value.trim();

        let isInputUnique = true; // assume this is a new term until we find it

        // Find or create the list element
        let listElement = listContainer.querySelector("[id='" + key.replaceAll(/\s/g, '-') + "'");
        if (!listElement) {
            listElement = Object.assign(document.createElement('stored-list'), {
                title: key,
                data: [currentValue]
            });
            listElement.addEventListener('listHeaderClick', listHeaderClick); 

            listElement.addEventListener('itemDeleted', itemDeleted);
            listElement.addEventListener('editItem', editItem);

            document.getElementById('list-container').appendChild(listElement);
        } else {
            isInputUnique = !listElement.data.includes(currentValue); // Check if value is unique
            if (isInputUnique) {
                listElement.addListItem(currentValue);
            }
        }

        if (isInputUnique) {
            modifiedInput.value = '';
            handleModifiedInput();
            shuffleLetterBank();
            handleRawInput();
            modifiedInput.focus();

            const sessionData = getCookieJSON(APP_KEY) || {};
            if (sessionData[key]) {
              sessionData[key].push(currentValue);
            } else {
              sessionData[key] = [currentValue];
            }
            setCookieJSON(APP_KEY, sessionData);
        }
      }
    }

    // set event listeners
    rawInput.addEventListener('change', handleRawInput);
    rawInput.addEventListener('beforeinput', () => {
      const selectedText = window.getSelection().toString();
      // if the whole raw input is replaced, assume user wants to clear anagram
      if (selectedText === rawInput.value) {
        letterBank.value = '';
        modifiedInput.value = '';
        currentAnagram = '';
      }
    });

    clearRawButton.addEventListener('click', () => {
      rawInput.value = '';
      handleRawInput();
      rawInput.focus();
    });

    modifiedInput.addEventListener('input', handleModifiedInput);

    storeModifiedButton.addEventListener('click', storeAnagram);

    letterBankButton.addEventListener('click', shuffleLetterBank);
     
    const sessionData = getCookieJSON(APP_KEY);
    if (sessionData) {
      Object.entries(sessionData).forEach(([key, data]) => {
        const listElement = Object.assign(document.createElement('stored-list'), {
          title: key,
          data: data
        });
        listElement.addEventListener('listHeaderClick', listHeaderClick);
        listElement.addEventListener('itemDeleted', itemDeleted);
        listElement.addEventListener('editItem', editItem);
        document.getElementById('list-container').appendChild(listElement)
      })
    }
          
    // FORMER final setup: populate the demo anagram and manually trigger input handler 
    /*modifiedInput.value = demoValues.modified;
    handleModifiedInput();*/
    rawInput.focus();
  }
};

export default Anagrammar;