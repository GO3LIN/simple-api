# Simple API with Node.JS

## The endpoints

- PUT /:student-id/:propertyName(/:propertyName)
  - Stores data within `/data/${studentId}.json`.
  - If that file or property doesn't exist it is created.
  - Should also set nested properties: `curl -X PUT -d '{ "score": 98 }' http://localhost:1337/rn1abu8/courses/calculus/quizzes/ye0ab61` would mean that `require('./data/rn1abu8.json').courses.calculus.quizzes.ye0ab61.score === 98`
- GET /:student-id/:propertyName(/:propertyName)
  - Retrieves data from `/data/${studentId}.json`. Returns 404 if that file or property doesn't exist.
  - Should also retrieve nested properties: `curl http://localhost:1337/rn1abu8/courses/calculus`
- DELETE /:student-id/:propertyName(/:propertyName)
  - Removes data from `/data/${studentId}.json`. Returns 404 if that file or 
  property doesn't exist.
  - Should also remove nested properties.