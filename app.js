require("dotenv").config();
const express = require("express");
const cors = require("cors");
const artistsRouter = require("./routes/artists");
const albumsRouter = require("./routes/albums");
const genresRouter = require("./routes/genres");
const yearsRouter = require("./routes/years");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/artists", artistsRouter);
app.use("/albums", albumsRouter);
app.use("/genres", genresRouter);
app.use("/years", yearsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
