require("dotenv").config();
const express = require("express");
const app = express();
require("./src/db/connection");

const phoneRoutes = require("./src/routes/phone");
const indexRoutes = require("./src/routes/index");
const errorRoutes = require("./src/routes/error");
const searchRoutes = require("./src/routes/search");

app.use("/", indexRoutes);
app.use("/brands", phoneRoutes);
app.use("/search", searchRoutes);
app.use('*', errorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on PORT ${PORT}`));
