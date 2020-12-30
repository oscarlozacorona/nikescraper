const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const cors = require('cors');

const scrapeShoeNames = require('./services/getshoes.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(cors());

app.get("/api/getshoes", async (req, res) => {
    try {
        const shoes = await scrapeShoeNames.getItems();
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ shoes: shoes }));
    } catch (err) {
        res.status(500).send({ err: err});
    };
});

app.listen(3001, () =>
    console.log("Express server is running on localhost:3001")
);
