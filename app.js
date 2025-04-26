require("dotenv").config();
const express = require("express");
const createDynamicRouter = require("./entityRouter");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const entities = ["artists", "albums", "genres", "years"];
entities.forEach((entity) => {
  app.use(`/${entity}`, createDynamicRouter(entity));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
