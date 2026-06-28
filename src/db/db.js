const dns = require("node:dns/promises");

dns.setServers(["1.1.1.1","8.8.8.8"]);

const mongoose = require("mongoose");


async function conectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("connected to database babuu Successfully");
    } catch(error) {
        console.log(error);
    }

}

module.exports = conectDB;