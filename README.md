TO RUN THE APP:
- `npm run start`
- Navigate to localhost:8080

TO RUN THE PRODUCTION VERSION:
- `npm run build`
- `npm run start-prod`
- Navigate to localhost:8080

TODOS:
EXPANDING
* Samples: 
	- convert letterbank to input
	- use placeholders with current example
	- "use this example"
* Set up homepage to load Anagrammar dynamically - and a universal wrapper with: developed by Scott AM Ross, changes to Mrs Taco Toss, to Scott AM Ross or Matt Ocs
* ~~Mechanism to mount a new app for Palindromer~~
* use regexp to find index checking only alphanumeric
* Probably want some routing/hashing which could also be cached. Then can have a homepage, but go back to your last or most common view

ANAGRAMMAR REFACTORS
* Extract the handlers and put them in the load saved part
* Maybe pass a callback to stored-list so it can update the cookie whenever data changes
* wrap the textarea and button in a div, so I can control alignment?
* consider refactoring to classes with private methods since everything is just inside init right now
* templates
	 - ~~clean 'templates' el and append to (Opting against cleaning now)~~
	 - ~~figure out a more dynamic way to create multiple templates on load - creating the template element at runtime, as that seems necessary.~~
	 - HTML/CSS template for the stored list

ANAGRAMMAR FEATURES
* starter terms
	- shuffle random starter word
		- don't load by default - at least, not the answer
		- "get me started" button
		- then set a flag "starterPopulated" - which goes false once raw input is modified
		- if "starterPopulated" display "What would you do?"
		- clicking that loads the example anagram and then sets flag to false
	- create more lists and rotate on page load
	- option to supply anagrams with start word or not
	- option to load starter terms or not - could be a 'get me started' mode
* edit could populate and replace selection
* collapsible lists would be nice



* ~~Fix cookie on WordPress~~
* ~~Factor out the repeated GET calls for template > and make it work for minified~~
	 - ~~go back through and figure out what was working and what isn't now~~
	 - ~~Probably: put templates file in root of src~~
	 - ~~include a templates section of index.html~~
	 - ~~load templates when mounting anagrammar~~
* ~~cookies~~
* ~~delete/edit saved entries~~
* ~~change to vertical lists~~
* ~~add explicit save/submit interaction~~
* ~~review save/submit code based on latest input handling practices~~
* ~~when modifying sourceText: update letterBank with new characters; strip deleted characters from modifiedInput~~
* ~~do not populate letterbank with duplicates when deleting after letterbank is updated by new source term (probably fix with above issue)~~

BUGFIX:
* ~~I broke the cookie again~~
* ~~Cookie clears id~~
* ~~cookie process throws an error~~
* ~~disallow a letter that's exhausted from letterbank > switch to strings. Find the substring of the change. If a single input and there are no available letters or it's invalid just switch back to currentanagram. If it's a paste operation, then find the index of the substring and remove any invalids and then modify if needed~~
* ~~I just broke tabbing with a new button - and highlights are not clear now~~