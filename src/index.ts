import fs from "fs";
import { Book } from "./books";
import express from "express";
import cors from "cors";
import bodyParser, { json, urlencoded } from "body-parser";
import http from "http";

//const myJSON: Book[] = JSON.parse(fs.readFileSync("src/books.json").toString());
let app;

function createserver() {
  app = express();
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: false }));

  http.createServer(app).listen(3000, () => {
    console.log("Running server on port 3000");
  });

  app.get("/api/library/book/:id/info", (req, res) => {
    const myJSON: Book[] = JSON.parse(
      fs.readFileSync("src/books.json").toString()
    );
    let myMap = new Map();
    myJSON.forEach((book: Book) => {
      myMap.set(book.id, <Book>book);
    });
    const _id = parseInt(req.params["id"]);
    if (myMap.has(_id)) {
      const book = myMap.get(_id);
      console.log(
        "The id of your book is " +
          _id +
          ". The name of the book is: " +
          book.name
      );
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
    const myJSON: Book[] = JSON.parse(
      fs.readFileSync("src/books.json").toString()
    );
    let myMap = new Map();
    myJSON.forEach((book: Book) => {
      myMap.set(book.id, <Book>book);
    });
    // console.log(myJSON);
    const _id = parseInt(req.params["id"]);
    if (myMap.has(_id)) {
      const book = myMap.get(_id);
      res.json(book);
    } else {
      res.json({ Response: "There is no book in the json with this ID" });
    }
  });

  app.put("/api/library/book/:id/add", (req, res) => {
    const myJSON: Book[] = JSON.parse(
      fs.readFileSync("src/books.json").toString()
    );
    let myMap = new Map();
    myJSON.forEach((book: Book) => {
      myMap.set(book.id, <Book>book);
    });
    console.log(req.body);
    const _id = parseInt(req.params["id"]);
    if (myMap.has(_id)) {
      res.json({ Response: "There is already book in the json with this ID" });
    } else {
      myJSON.push({
        id: req.body["id"],
        name: req.body["name"],
        author: req.body["author"],
        genre: req.body["genre"],
        year_published: req.body["published"],
        publisher: req.body["publisher"],
        country: req.body["origin_country"],
        number_of_pages: req.body["pages"],
      });

      let json = JSON.stringify(myJSON);
      fs.writeFile("src/books.json", json, "utf8", function (err) {
        res.json({ Response: "The book was added" });
      });
    }
  });
}
createserver();
