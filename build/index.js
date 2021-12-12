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
let app;
let myJSON = JSON.parse(fs_1.default.readFileSync("src/books.json").toString());
let myMap = new Map();
myJSON.forEach((book) => {
    myMap.set(book.id, book);
});
function newMap() {
    myJSON = JSON.parse(fs_1.default.readFileSync("src/books.json").toString());
    myJSON.forEach((book) => {
        myMap.set(book.id, book);
    });
}
let findBooks = function (author = "", name = "", book) {
    if (author) {
        for (let i = 0; i < book.author.length; i++) {
            if (book.author[i].toLowerCase().includes(author.toLowerCase())) {
                return book;
            }
        }
    }
    else if (name) {
        return book.name.toLowerCase().includes(name.toLowerCase()) ? book : false;
    }
};
function createserver() {
    app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use((0, body_parser_1.json)());
    app.use((0, body_parser_1.urlencoded)({ extended: false }));
    http_1.default.createServer(app).listen(3000, () => {
        console.log("Running server on port 3000");
    });
    app.get("/api/library/book/:id/info", (req, res) => {
        let myJSON = JSON.parse(fs_1.default.readFileSync("src/books.json").toString());
        let myMap = new Map();
        myJSON.forEach((book) => {
            myMap.set(book.id, book);
        });
        const _id = parseInt(req.params["id"]);
        if (myMap.has(_id)) {
            const book = myMap.get(_id);
            res.json({
                id: book.id,
                name: book.name,
                author: book.author,
                genre: book.genre,
            });
        }
        else {
            res.json({ Response: "There is no book in the json with this ID" });
        }
    });
    app.post("/api/library/book/:id/info", (req, res) => {
        let myJSON = JSON.parse(fs_1.default.readFileSync("src/books.json").toString());
        let myMap = new Map();
        myJSON.forEach((book) => {
            myMap.set(book.id, book);
        });
        const _id = parseInt(req.params["id"]);
        if (myMap.has(_id)) {
            const book = myMap.get(_id);
            res.json(book);
        }
        else {
            res.json({ Response: "There is no book in the json with this ID" });
        }
    });
    app.post("/api/library/book/find/author", (req, res) => {
        let myJSON = JSON.parse(fs_1.default.readFileSync("src/books.json").toString());
        let myMap = new Map();
        myJSON.forEach((book) => {
            myMap.set(book.id, book);
        });
        const author = req.body["author"];
        let responseBooks = myJSON.filter((book) => findBooks(author, undefined, book));
        // Sending response - array of book that have match in authors name
        // responseBooks.forEach((book: Book) => {
        //   console.log(book)
        // })
        res.json(responseBooks);
    });
    app.post("/api/library/book/find/name", (req, res) => {
        let myJSON = JSON.parse(fs_1.default.readFileSync("src/books.json").toString());
        let myMap = new Map();
        myJSON.forEach((book) => {
            myMap.set(book.id, book);
        });
        // Getting books's name from request parameters
        const name = req.body["name"];
        // Filtering books by name
        const responseBooks = myJSON.filter(book => findBooks(undefined, name, book));
        // Sending response - array of book that have match in book's name
        res.json(responseBooks);
    });
    app.put("/api/library/book/add", (req, res) => {
        let myJSON = JSON.parse(fs_1.default.readFileSync("src/books.json").toString());
        let myMap = new Map();
        myJSON.forEach((book) => {
            myMap.set(book.id, book);
        });
        let _id = 0;
        _id = Math.floor(Math.random() * (100 + 1));
        myJSON.push({
            id: _id,
            name: req.body["name"],
            author: req.body["author"],
            genre: req.body["genre"],
            year_published: req.body["published"],
            publisher: req.body["publisher"],
            country: req.body["origin_country"],
            number_of_pages: req.body["pages"],
        });
        let newBookList = JSON.stringify(myJSON);
        fs_1.default.writeFile("src/books.json", newBookList, function (err) {
            if (err)
                return console.log(err);
            res.json({ Response: "The book was added" });
        });
    });
    app.delete("/api/library/book/:id/delete", (req, res) => {
        let myJSON = JSON.parse(fs_1.default.readFileSync("src/books.json").toString());
        let myMap = new Map();
        myJSON.forEach((book) => {
            myMap.set(book.id, book);
        });
        const _id = parseInt(req.params["id"]);
        if (myMap.has(_id)) {
            let myNewJSON = myJSON.filter((book) => book.id !== _id);
            let newBookList = JSON.stringify(myNewJSON);
            fs_1.default.writeFile("src/books.json", newBookList, function (err) {
                if (err)
                    return console.log(err);
                res.json({ Response: "The book was deleted" });
            });
        }
        else {
            res.json({ Response: "The book with this id is not in the list" });
        }
    });
}
createserver();
