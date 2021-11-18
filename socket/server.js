const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let allGames = {};

io.on('connection', socket => {
    let roomId = '';
    console.log("'Ello, who's this we got here?"); // runs when client first connects

    // get total number of client connections
    const playersCount = io.engine.clientsCount;

    // Send event only to new connecting clients
    socket.emit('Admin', 'Welcome to the Quiz!');
    // send event to all other clients (not new connecting client)
    socket.broadcast.emit('Admin', 'A new player has joined the game!')
    // send event to all clients
    io.emit('Admin', `There are ${playersCount} players currently playing!`)

    socket.on('CreateGame', ({gameId, username, category, difficulty}) => {
        roomId = gameId;
        console.log('created room', roomId);

        /**
         * @todo Generate the questions
         * Make request to trivia api
         * Returns an array of questions
         * Map each question object to an object like the one below
         */

        // function generateQuestions(category, difficulty) {
        //     fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
        //         .then(resp => {
        //             console.log(resp.json());
        //             return resp.json();
        //         })
        //         .catch(console.warn)
        // }

        // generateQuestions(category, difficulty);

        allGames[roomId] = {
            players: [{
                username: username,
                score: 0
            }],
            questions: [
                {
                    question: 'What is my name?',
                    answers: [
                        {prefix: 'A', answer: 'Bob', correct: false},
                        {prefix: 'B', answer: 'Katie', correct: true},
                        {prefix: 'C', answer: 'Sally', correct: false},
                        {prefix: 'D', answer: 'Tim', correct: false}
                    ],
                    playerAnswers: [],//Object of username: answer.
                    current: true
                },
                {
                    question: 'How old are you?',
                    answers: [
                        { prefix: 'A', answer: '13', correct: false },
                        { prefix: 'B', answer: '43', correct: true },
                        { prefix: 'C', answer: '18', correct: false },
                        { prefix: 'D', answer: '12', correct: false }
                    ],
                    playerAnswers: [],//Object of username: answer.
                    current: false
                }
            ],
            isStarted: false,
            isEnded: false
        };

        socket.emit('GameCreated');
    })

    socket.on('JoinGame', (gameId, username) => {
        if(!(allGames[gameId].players.find((player) => {
            return player.username == username;
        }))) {
            allGames[gameId].players.push({
                username: username,
                score: 0
            });
        }
        roomId = gameId;
        console.log(`joined game ${roomId}`);

        socket.join(roomId);
        io.to(roomId).emit('UpdateGame', allGames[roomId]);
    });

    socket.on('StartGameServer', () => {
        console.log(allGames);
        if (!allGames[roomId]) return;
        io.to(roomId).emit('StartGame');
        allGames[roomId].isStarted = true;
    });

    // answer = {username: "Bob", answer: "C"}
    socket.on('AnswerQuestion', (answer) => {
        /** 
         * @todo Add the answer/score when the Q is answered
         * Change score in allGames array
         * If it's the last question and everybody has answered, end the game
         * io.to(roomId).emit('EndGame', ...);
         * Somehow save scores to database
         */

        //  io.to(roomId).emit('UpdateGame', allGames[roomId])

        allGames[roomId].questions[0].playerAnswers.push(answer);
        
        // If all players in the room have answered each question
        if (allGames[roomId].questions[0].playerAnswers.length === allGames[roomId].players.length) {
            allGames[roomId].questions[0].current = false;
            allGames[roomId].questions[1].current = true;
        }

        // If players answer is right, update the player's score
        // let correctAnswer = allGames[roomId].questions[0].answers.find((answer) => {
        //     return answer.correct == true;
        // })

        // for(let i=0; i < allGames[roomId].players.length; i++) {
        //     let player = allGames[roomId].players[i].username;

        //     console.log("player name:", player)
            
        //     let playerAnswer = allGames[roomId].questions[0].playerAnswers.find((answer) => {
        //         return answer.username == player;
        //     })
        //     console.log("player's answer: ", playerAnswer);

        //     // if(correctAnswer.answer === playerAnswer)
        // }
        

        io.to(roomId).emit('UpdateGame', allGames[roomId]);

        console.log("question answered");
    });

    socket.on("disconnect", socket => { // runs when client disconnects
        console.log("K bye then");
    });
});

module.exports = httpServer;