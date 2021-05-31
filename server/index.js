const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectingDB } = require('./Database/db');

const app = express()
const port = 3000

app.use(cors());
app.use(bodyParser.json());

connectingDB();

app.use("/", function(req, res) {
  res.send("hyy server is onn")
})
app.listen(port, () => {
  console.log(`Example app listening `)
})
