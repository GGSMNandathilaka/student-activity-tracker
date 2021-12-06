# student-activity-tracker
This is a student activity tracker for learning purposes. A teacher wants to be able to view a snapshot at the class level for monitoring the activity of all the students in the class from a single report.


## Installation

This application requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

For the back-end...
```sh
cd server
npm install
node server
```

For the front-end...

```sh
cd ng-client
npm install
npm run start
```

## Back-end app

This is a simple application which is developed using NodeJs & ExpressJs. 
Mailny there are two endpoints available - /login & /register.
For the simplicity I have stored user credentials in an in-memory Json file.
Once user login or register JWT will issue.

## Front-end app

This application is developed using Angular 12.
For the styling purposes tailwind css has used. [https://tailwindui.com/, https://tailwindcomponents.com/]

