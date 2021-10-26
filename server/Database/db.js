const mongoose = require("mongoose")


function initializeDBConnection() {
  // Connecting to DB
  mongoose.connect("mongodb+srv://Anjali_R:anjali@neog-mongosession.dyxsl.mongodb.net/inventory?retryWrites=true&w=majority", {
    useCreateIndex: true,useUnifiedTopology: true, useNewUrlParser: true
  }) 
    .then(() => console.log("successfully connected"))
    .catch(error => console.error("mongoose connection failed...", error))
}


module.exports = { initializeDBConnection }