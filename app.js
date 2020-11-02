require("dotenv").config();
const express = require("express");
const app = express();
require("./src/db/connection");

const brandRoutes = require("./src/routes/brand");
const { errorJson } = require("./src/utils/response");

app.get("/", (req, res) => {
    res.json({
        status: true,
        data: "Phone Specs API",
    });
});

app.use("/brands", brandRoutes);
app.get('*', (req, res) => errorJson(res, `Route not found!`, 404))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on PORT ${PORT}`));
