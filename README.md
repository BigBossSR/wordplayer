TO RUN THE APP:
- `npm run start`
- Navigate to localhost:8080

TO RUN THE PRODUCTION VERSION:
- `npm run build`
- `npm run start-prod`
- Navigate to localhost:8080

TODOS:
* Extract the handlers and put them in the load saved part
* Factor out the repeated GET calls for template > and make it work for minified
	 - ~~go back through and figure out what was working and what isn't now~~
	 - ~~Probably: put templates file in root of src~~
	 - ~~include a templates section of index.html~~
	 - ~~load templates when mounting anagrammar~~
	 - clean 'templates' and append to
	 - figure out a more dynamic way to create multiple templates on load - creating the template element at runtime, as that seems necessary.
* HTML/CSS template for the stored list
* Maybe pass a callback to stored-list so it can update the cookie whenever data changes
* ~~cookies~~
* ~~delete/edit saved entries~~
	* edit could populate and replace selection
* ~~change to vertical lists~~
	* collapsible would be nice
* wrap the textarea and button in a div, so I can control alignment?
* consider refactoring to classes with private methods since everything is just inside init right now
* use regexp to find index checking only alphanumeric
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