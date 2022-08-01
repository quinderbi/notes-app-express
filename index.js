const express = require("express");
const { addNodeHandler, getAllNodeHandler, getNoteHandler, updateNodeHandler, deleteNodeHandler } = require("./handler");
const app = express();
const port = 5000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
});

app.use(express.json());

app.post("/notes", addNodeHandler);
app.get("/notes", getAllNodeHandler);
app.get("/notes/:id", getNoteHandler);
app.put("/notes/:id", updateNodeHandler);
app.delete("/notes/:id", deleteNodeHandler);

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}/`));
