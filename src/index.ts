import fs from "fs";
import { Book } from "./books";
import express from "express";
import cors from "cors";
import bodyParser, { json, urlencoded } from "body-parser";
import http from "http";

let app;

let myJSON: Book[] = JSON.parse(fs.readFileSync("src/books.json").toString());

let myMap = new Map();
myJSON.forEach((book: Book) => {
  myMap.set(book.id, <Book>book);
});

function createserver() {
  app = express();
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: false }));

  http.createServer(app).listen(3000, () => {
    console.log("Running server on port 3000");
  });

  // updating and creating map of book from Json
  app.get("/api/library/book/:id/info", (req, res) => {
    let myJSON: Book[] = JSON.parse(
      fs.readFileSync("src/books.json").toString()
    );
    let myMap = new Map();
    myJSON.forEach((book: Book) => {
      myMap.set(book.id, <Book>book);
    });

    // request parameter later used in if for returning values
    const _id = parseInt(req.params["id"]);

    if (myMap.has(_id)) {
      const book = myMap.get(_id);
      res.json({
        id: book.id,
        name: book.name,
        author: book.author,
        genre: book.genre,
      });
    } else {
      res.json({ Response: "There is no book in the json with this ID" });
    }
  });

  app.post("/api/library/book/:id/info", (req, res) => {
    let myJSON: Book[] = JSON.parse(
      fs.readFileSync("src/books.json").toString()
    );
    let myMap = new Map();
    myJSON.forEach((book: Book) => {
      myMap.set(book.id, <Book>book);
    });

    const _id = parseInt(req.params["id"]);
    if (myMap.has(_id)) {
      const book = myMap.get(_id);
      res.json(book);  // returning whole object
    } else {
      res.json({ Response: "There is no book in the json with this ID" });
    }
  });

  app.post("/api/library/book/find/author", (req, res) => {
    let myJSON: Book[] = JSON.parse(
      fs.readFileSync("src/books.json").toString()
    );
    let myMap = new Map();
    myJSON.forEach((book: Book) => {
      myMap.set(book.id, <Book>book);
    });

    const author = req.body["author"];
    let filteredBooks: Book[] = []

    /* In this for loop whe are searching for the chars from the author name in string */
    for(let i = 0; i < myJSON.length; i++){
      if (myJSON[i].author.toString().toLowerCase().includes(author.toLowerCase())){
          filteredBooks.push(myJSON[i])
      }
  }
  // response of filtered books
    res.json(filteredBooks);
  });

  app.post("/api/library/book/find/name", (req, res) => {
    let myJSON: Book[] = JSON.parse(
      fs.readFileSync("src/books.json").toString()
    );
    let myMap = new Map();
    myJSON.forEach((book: Book) => {
      myMap.set(book.id, <Book>book);
    });
    const name = req.body["name"];

    let filteredBooks: Book[] = []

    /* In this for loop whe are searching for the chars from the book name in string */
    for(let i = 0; i < myJSON.length; i++){
      if (myJSON[i].name.toString().toLowerCase().includes(name.toLowerCase())){
          filteredBooks.push(myJSON[i])
      }
  }
    res.json(filteredBooks);
});

  app.put("/api/library/book/add", (req, res) => {
    let myJSON: Book[] = JSON.parse(
      fs.readFileSync("src/books.json").toString()
    );
    let myMap = new Map();
    myJSON.forEach((book: Book) => {
      myMap.set(book.id, <Book>book);
    });
    let _id = 0

    // Generating new and random id
    do {
      _id = Math.floor(Math.random() * (100 + 1));
    } while (_id === 0 || myMap.has(_id) )

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

     // writing that new book into the json
    let newBookList = JSON.stringify(myJSON);
    fs.writeFile("src/books.json", newBookList, function (err) {
      if (err) return console.log(err);
      res.json({ Response: "The book was added" });
    });
  });

  app.delete("/api/library/book/:id/delete", (req, res) => {
    let myJSON: Book[] = JSON.parse(
      fs.readFileSync("src/books.json").toString()
    );
    let myMap = new Map();
    myJSON.forEach((book: Book) => {
      myMap.set(book.id, <Book>book);
    });
    const _id = parseInt(req.params["id"]);

    // filtering json by the given id
    if (myMap.has(_id)) {
      let myNewJSON = myJSON.filter((book: Book) => book.id !== _id);
      let newBookList = JSON.stringify(myNewJSON);
      fs.writeFile("src/books.json", newBookList, function (err) {
        if (err) return console.log(err);
        res.json({ Response: "The book was deleted" });
      });
    } else {
      res.json({ Response: "The book with this id is not in the list" });
    }
  });
}
createserver();