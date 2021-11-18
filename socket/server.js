const { init } = require("../dbConfig");
const fetch = require ('cross-fetch');

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

        fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`)
            .then(resp => {
                return resp.json();
            })
            .then(resp => createGame(roomId, username, resp.results))
            .catch(console.error);
    });

    const createGame = (roomId, username, questions) => {
        allGames[roomId] = {
            players: [{
                username: username,
                score: 0
            }],
            questions: questions.map((question) => {
                let answers = question.incorrect_answers.map((answer) => {
                    return {
                        answer: answer,
                        correct: false
                    };
                });
                answers.push({answer: question.correct_answer, correct: true});
                return {
                    question: question.question,
                    answers: answers,
                    playerAnswers: {},
                    current: false
                };
            }),
            isStarted: false,
            isEnded: false
        };

        allGames[roomId].questions[0].current = true;

        socket.emit('GameCreated');
    }

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

    let questionNumber = 0;
    // answer = {username: "Bob", answer: "C"}
    socket.on('AnswerQuestion', async ({username, answer}) => {
        console.log("question answered");

        allGames[roomId].questions[questionNumber].playerAnswers[username] = answer;
        
        // If not all players in the room have answered each question
        if (Object.keys(allGames[roomId].questions[questionNumber].playerAnswers).length < allGames[roomId].players.length) {
            console.log()
            return;
        }

        allGames[roomId].questions[questionNumber].current = false;

        //If there are no more questions, end the game
        if (!allGames[roomId].questions[questionNumber + 1]) {
            try {
                const db = await init();
                db.collection("players").insertMany(allGames[roomId].players.map((player) => {
                    return {
                        gameId: roomId,
                        username: player.username,
                        score: player.score
                    };
                }));
            } catch (err) {
                console.error(err);
            }
            
            console.log('Ending game');
            io.to(roomId).emit('EndGame', allGames[roomId]);
            return;
        }

        // If player's answer is right, update the player's score
        let correctAnswer = allGames[roomId].questions[questionNumber].answers.find((answer) => {
            return answer.correct == true;
        }).answer;

        for (let [username, answer] of Object.entries(allGames[roomId].questions[questionNumber].playerAnswers)) {
            if (correctAnswer == answer) {
                allGames[roomId].players.find((player) => {
                    return player.username == username;
                }).score += 100;
            }
        }

        allGames[roomId].questions[questionNumber + 1].current = true;
        questionNumber++;
        io.to(roomId).emit('UpdateGame', allGames[roomId]);
    });

    socket.on("disconnect", socket => { // runs when client disconnects
        console.log("K bye then");
    });
});

module.exports = httpServer;