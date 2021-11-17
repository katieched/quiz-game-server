# Server Side

Quizkaban is an online quiz game, where users can play with others on a quiz based on any category they choose. They are able to pick the level of difficulty for the questions. When the quiz is completed by the group, a leaderboard will appear showing their scores and positions. This application makes use of the [Open Trivia DB](https://opentdb.com/api_config.php) API.

This README will guide you through how to setup the client side of the application and our experiences during this project.

The repo for the client side of the application can be found [here](https://github.com/saja-aabith/lap3-quizgame-client-two). 

## Installation & Usage

### Installation

* Clone or download the repository.
* Run `npm install` to install all of the dependencies required for this project.

### Usage

* Run `npm run dev` to locally open the website in your default browser.

## Technologies

* HTML, CSS, JavaScript and React
* Heroku for deloying the server side
* MongoDB / MongoDB Atlas for storing game data
* Jest library to test JavaScript code
* VSCode to edit the code
* Github for version control
* Slack for collaboration and communication between team members

## Process

1. Started by creating two different repositories for both the client and server.
2. Created an initial file structure for both repositories.
3. The UI was designed on Figma as a starting point.
4. Created a Kanban board with all the tasks required inside each of these repositories.
5. Half of the team worked on the client side (using React, adding styling and making API calls) and half of the team worked on the server side (creating RESTful routes and socket server).
6. Data are stored within a MongoDB database using MongoDB Atlas.
7. Test suites for both the client and server sides were added when most of the functionality was complete.
8. Finished by improving the user interface, functionality of the application and fixing up test suites on both sides.

## Wins & Challenges

### Wins

* Worked really well as a team, with constant communication throughout.
* Successfully managed to produce a site which met all of the basic requirements.
* Server successfully deployed on Heroku.
* Routes and HTTP requests provided us with the output we intended.
* Managed to use socket.io to allow for multiplayer gaming.
* Added a timer feature to countdown the seconds left.

### Challenges

* Spent a lot of time trying to understand the flow of sockets.
* Faced some issues trying to transfer results from components to pages on the server side.
* Were not able to deploy the website on Netlify.
* Got some failed test suites.

## Future Features

* Add a chat feature to the lobby with socket.io while the players wait for the game to start.
* Add an introductory page to let the users know how the quiz application works.

## Bugs

* The function to update the player's score on the server side seems to give an error related to the `ops` method.