const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const { initializeDBConnection } = require("./Database/db.js")
// const videoRouter = require("./routers/videos-router");
const Videos = require("./models/video.model")
const app = express()
const port = 5000
initializeDBConnection();

app.use(cors());
app.use(bodyParser.json());



app.use("/", function(req, res) {
  res.send("hyy server is onn")
})

// app.use("/videos", videoRouter);

async function insert(){
    await Videos({
      name:"demo",
      description: "lorem ipsum lorem ipsum"
    }).save() 
}
// me data ki baat kr raha hu vdeos ki wo kaha pr hai...frontend me h ruko 
// insert()

app.listen(port, () => {
  console.log(`Example app listening `)
})
