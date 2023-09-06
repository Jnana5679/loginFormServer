require("./databaseConnection/databaseConnection");
const express = require("express");
const cors = require("cors");
const expressRouter = require("./expressRoutes/expressRoutes");

const localhostPort = process.env.PORT || 5000;

const app = express();
app.use(express.json(), cors());

app.use("/", expressRouter);

app.listen(localhostPort, () => {
  console.log(`Server is Runnign on Port http://localhost:${localhostPort}`);
});
