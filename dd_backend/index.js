const connectToMongo = require("./db");
const express = require("express");

const app = express();
const port = 5000;
var cors = require("cors");

app.use(cors()); // Enable CORS - Cross Origin Resource Sharing


app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

const startServer = async () => {
  await connectToMongo();
  app.listen(port);
};

startServer();
