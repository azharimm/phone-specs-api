require("dotenv").config();
const express = require("express");
const app = express();
require("./src/db/connection");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://azharimm.tk");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});

const phoneRoutes = require("./src/routes/phone");
const indexRoutes = require("./src/routes/index");
const errorRoutes = require("./src/routes/error");
const searchRoutes = require("./src/routes/search");
const scrapeRoutes = require("./src/routes/scrape");

app.use("/", indexRoutes);
app.use("/brands", phoneRoutes);
app.use("/search", searchRoutes);
app.use("/scrape", scrapeRoutes);
app.use('*', errorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on PORT ${PORT}`));
