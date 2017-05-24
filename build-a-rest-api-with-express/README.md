### About this Course
REST services are a powerful way of providing functionality over the internet. Not only can they be used as a foundation to build sophisticated web applications, they can also be integrated into any number of other projects, making them the ultimate in modularity and reusability! Instead of having to rebuild an application for several platforms, for example -- iOS, Android, browser, etc -- you can build the back-end once and just add user interfaces as needed. You can build a REST service in many different languages/platforms, but for this course, we will be building one with Express, a popular framework written for Node.js. We will also use Mongoose with MongoDB to persist our data. Let’s get started!  

### What you'll learn
REST API Design  
API Routing  
Express  
Mongoose  
Mongo  

### Endpoints
**`GET /questions`**  
Responds with an array of all questions.  

**`POST /questions`**  
Send a JSON body with a new question.  
*Example:* `{ text: "Who created JavaScript?" }`  

**`GET /:qid`**  
Responds with a specific question.  
`qid === question._id`  

**`POST /qid/answers`**  
Send an answer to a specific question.  
*Example:* `{ text: "Brendan Eich" }`  

**`PUT /qid/answers/aid`**  
Update a specific answer.
`aid === answer._id`  

**`POST /qid/answers/aid/vote-[up|down]`**  
Increments/decrements `answer.vote`.  

### Instructions
1. Download and extract the [zip](https://github.com/adamelliotfields/treehouse-node/raw/master/build-a-rest-api-with-express/build-a-rest-api-with-express.zip).
2. Run `npm install` or `yarn install`.
3. Run `mongod`.
4. Run `npm run start` or `yarn start`.
5. Use [Postman](https://www.getpostman.com) to make requests to each endpoint.

*Note: the `mongoose.js` file is not required to run the application.*
