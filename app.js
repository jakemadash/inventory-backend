require("dotenv").config();
const express = require("express");
const createDynamicRouter = require("./entityRouter");
const app = express();

app.use(express.urlencoded({ extended: true }));

const entities = ["artists", "albums", "genres", "years"];
entities.forEach((entity) => {
  app.use(`/${entity}`, createDynamicRouter(entity));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
