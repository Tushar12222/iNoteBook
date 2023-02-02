const connectToMongo = require("./db.js");
var cors = require("cors");
const express = require("express");
connectToMongo();

const app = express();
const port = 5000;
app.use(cors());

app.use(express.json());

//Available routes
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/notes", require("./routes/notes.js"));

app.listen(port, () => {
  console.log(`iNoteBook backend listening on port ${port}`);
});
