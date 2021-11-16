const { init } = require("../dbConfig");
const { ObjectId } = require("mongodb");

class Player {
    constructor(data) {
        this.id = data._id;
        this.name = data.name;
        this.score = data.score;
    };

   
//     // Get player by ID
//     static findById(id) {
//         return new Promise(async (resolve, reject) => {
//             try {
//                 const db = await init();
//                 const data = await db.collection("players").find({ _id: ObjectId(id) }).toArray();
//                 const player = new Player({ ...data[0], id: data[0]._id });
//                 resolve(player);
//             } catch(err) {
//                 reject(`Error retrieving player ${id}`);
//             };
//         });
//     };

//     // Update player's score
//     updatePlayer() {
//         return new Promise(async (resolve, reject) => {
//             try {
//                 const db = await init();
//                 const updatedPlayerData = await db.collection("players").findOneAndUpdate({ id: ObjectId(this.id) }, { $inc: { score: 100 } }, { returnOriginal: false});
//                 let updatedPlayer = new Player(updatedPlayerData.value);
//                 console.log(updatedPlayer);
//                 resolve(updatedPlayer);
                
//             } catch(err) {
//                 reject(`Player ${this.id} could not be updated`);
//             };
//         });
//     };
 };

 module.exports = Player;