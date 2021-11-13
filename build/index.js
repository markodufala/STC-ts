"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const http_1 = __importDefault(require("http"));
const myFile = fs_1.default.readFileSync("src/books.json");
const myJSON = JSON.parse(myFile.toString());
let app;
let myMap = new Map();
myJSON.forEach((book) => {
    myMap.set(book.id, book);
});
console.log(myJSON);
function createserver() {
    app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use((0, body_parser_1.json)());
    app.use((0, body_parser_1.urlencoded)({ extended: false }));
    http_1.default.createServer(app).listen(3000, () => {
        console.log("Running server on port 3000");
    });
    app.get("/api/library/book/:id/info", (req, res) => {
        let _id = parseInt(req.params["id"]);
        let book = myMap.get(_id);
        if (myMap.has(_id)) {
            console.log("The id of your book is " + _id + ". The name of the book is: " + book.name);
            res.json({ id: book.id, name: book.name, author: book.author, genre: book.genre });
        }
        else {
            res.json({ Response: "There is no book in the json with this ID" });
        }
    });
    app.post("/api/library/book/:id/info", (req, res) => {
        let _id = parseInt(req.params["id"]);
        let book = myMap.get(_id);
        console.log(_id);
        if (myMap.has(_id)) {
            res.json(book);
        }
        else {
            res.json({ Response: "There is no book in the json with this ID" });
        }
    });
}
createserver();
