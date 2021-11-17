const socketServer = require('./server');

const port = process.env.PORT || 5001;

socketServer.listen(port, () => console.log(`Game now being served from port ${port}!`));