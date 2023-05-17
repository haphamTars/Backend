const mongoose = require("mongoose");

// const uri = `mongodb://${process.env.DB_HOST||process.env.DB_PORT}:27017/${process.env.DB_NAME}`
const uri = `mongodb+srv://hapt:Anh12345@cluster0.tk1zjzk.mongodb.net/${process.env.DB_NAME}`

async function initDbConnection() {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

        .then(() => {
            console.log("Connect database successfully!");
        })
        .catch(err => {
            console.log(err);
        })

};

module.exports = {
    initDbConnection
};