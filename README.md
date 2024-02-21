TO RUN THE APP:
`http-server`
Navigate to localhost:8080

TODOS:
* consider refactoring to classes with private methods since everything is just inside init right now
* use regexp to find index checking only alphanumeric
* ~~add explicit save/submit interaction~~
* ~~review save/submit code based on latest input handling practices~~
* ~~when modifying sourceText: update letterBank with new characters; strip deleted characters from modifiedInput~~
* ~~do not populate letterbank with duplicates when deleting after letterbank is updated by new source term (probably fix with above issue)~~

BUGFIX:
* ~~disallow a letter that's exhausted from letterbank~~