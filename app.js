require("dotenv").config();
const express = require("express");
const app = express();

const brandRoutes = require("./src/routes/brand");
const specsRoutes = require("./src/routes/specs");

app.get("/", (req, res) => {
    res.json({
        status: true,
        data: "Phone Specs API",
    });
});

app.use("/brand", brandRoutes);
app.use("/specs", specsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on PORT ${PORT}`));
