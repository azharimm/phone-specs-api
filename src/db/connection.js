const mongoose = require("mongoose");
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_collection = process.env.DB_COLLECTION;
const db_url = `mongodb+srv://${db_user}:${db_password}@mongo-01.exofm.mongodb.net/${db_collection}?retryWrites=true&w=majority`;
mongoose.connect(
    db_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    (err) => {
        if (!err) {
            console.log("Connection successful");
        } else {
            console.log("No Connection");
        }
    }
);
