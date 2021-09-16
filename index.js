require("dotenv").config();
const express = require("express");
const app = express();
require("./src/db/connection");

const indexRoutes = require("./src/routes/index");
const indexRoutesV2 = require("./src/routes/v2/index");
const errorRoutes = require("./src/routes/error");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "api-mobilespecs.azharimm.site/v2");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});

app.use("/", indexRoutes);
app.use("/v2", indexRoutesV2);
app.use('*', errorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on PORT ${PORT}`));
