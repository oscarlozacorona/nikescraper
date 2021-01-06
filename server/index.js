const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const cors = require('cors');

const scrapeShoeNames = require('./services/getshoes.js');
const scrapePurchace = require('./services/purchase.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.json({
    type: ['application/json', 'text/plain']
}))
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

app.post("/api/purchase", async (req, res) => {
    try {
        const { body } = req;
        console.log(body);
        await scrapePurchace.purchase(body);
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "hey" }));
    } catch (error) {
        console.log(error);
        res.status(500).send({err: error});
    };
});

app.listen(3001, () =>
    console.log("Express server is running on localhost:3001")
);
