const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { initializeDBConnection } = require("./Database/db.js")
const videoresults = require('./routes/videos.router.js');
const users = require('./routes/users.router.js');
// const video = require("./router/videos.router")
const errorHandler  = require("./middlewares/error-handler.js")
const routeNotFound = require("./middlewares/route-not-found.js")
const app = express()
const port = 5000

initializeDBConnection();

app.use(cors());
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("hyy server is onn")
})

app.use("/videos", videoresults);
app.use("/users", users);

app.use(errorHandler);
app.use(routeNotFound);

app.listen(port, () => {
  console.log(`Example app listening `)
})
