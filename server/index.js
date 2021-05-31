const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const { initializeDBConnection } = require("./Database/db.js")
const videoRouter = require("./routers/videos-router");
const app = express()
const port = 5000
initializeDBConnection();

app.use(cors());
app.use(bodyParser.json());



app.use("/", function(req, res) {
  res.send("hyy server is onn")
})

app.use("/videos", videoRouter);

app.listen(port, () => {
  console.log(`Example app listening `)
})
