import fs from "fs";
import { Book } from "./books";
import express from "express";
import cors from "cors";
import bodyParser, { json, urlencoded } from "body-parser";
import http from "http";

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
      res.json(book);
    } else {
      res.json({ Response: "There is no book in the json with this ID" });
    }
  });

  app.put("/api/library/book/:id/add", (req, res) => {
    let myJSON: Book[] = JSON.parse(
      fs.readFileSync("src/books.json").toString()
    );

    let myMap = new Map();
    myJSON.forEach((book: Book) => {
      myMap.set(book.id, <Book>book);
    });

    const _id = parseInt(req.params["id"]);
    if (myMap.has(_id)) {
      res.json({ Response: "There is already book in the json with this ID" });
    } else {
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

      fs.writeFile("src/books.json", JSON.stringify(myJSON), function (err) {
        if (err) return console.log(err);
        res.json({ Response: "The book was added" });
      });
    }
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
    if (myMap.has(_id)) {
      myJSON = myJSON.filter((book: Book) => book.id !== _id);
      let json = JSON.stringify(myJSON);
      //fs.writeFileSync("src/book.json", json);
      fs.writeFile("src/books.json", json, function (err) {
        if (err) return console.log(err);
        res.json({ Response: "The book was deleted" });
      });
    } else {
      res.json("The book with this id is not in the list.");
    }
  });
}
createserver();

// app.delete(
//   apiRoot + id,
//   send((req) => Product.destroy({ where: { id: +req.params.id } }), 204)
// );
