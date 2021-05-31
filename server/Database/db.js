const mongoose = require('mongoose');

async function connectingDB() {
try {
    await mongoose.connect(process.env['uri'], {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    console.log("connected to DB successfully")
} catch (error) {
    console.log(error);
    console.log("failed to connect to db.")
}
}

module.exports =  {connectingDB};