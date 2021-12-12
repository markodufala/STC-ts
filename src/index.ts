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

function newMap() {
  myJSON = JSON.parse(fs.readFileSync("src/books.json").toString());

  myJSON.forEach((book: Book) => {
    myMap.set(book.id, <Book>book);
  });
}

let findBooks = function (author: string = "", name: string = "", book: Book) {
  if (author) {
      for(let i = 0; i < book.author.length; i++){
          if (book.author[i].toLowerCase().includes(author.toLowerCase())){
              return book
          }
      }
  }
  else if (name) {
      return book.name.toLowerCase().includes(name.toLowerCase()) ? book : false;
  } 
}

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

  app.post("/api/library/book/find/author", (req, res) => {
    let myJSON: Book[] = JSON.parse(
      fs.readFileSync("src/books.json").toString()
    );
    let myMap = new Map();
    myJSON.forEach((book: Book) => {
      myMap.set(book.id, <Book>book);
    });

    const author = req.body["author"];
    let responseBooks: Array<Book> = myJSON.filter((book) => findBooks(author, undefined, book));
    // Sending response - array of book that have match in authors name
    // responseBooks.forEach((book: Book) => {
    //   console.log(book)
    // })
    res.json(responseBooks);
  });


  app.post("/api/library/book/find/name", (req, res) => {
    let myJSON: Book[] = JSON.parse(
      fs.readFileSync("src/books.json").toString()
    );
    let myMap = new Map();
    myJSON.forEach((book: Book) => {
      myMap.set(book.id, <Book>book);
    });
    
    // Getting books's name from request parameters
    const name = req.body["name"];
    // Filtering books by name
    const responseBooks: Array<Book> = myJSON.filter(book => findBooks(undefined, name, book));
    // Sending response - array of book that have match in book's name
    res.json(responseBooks);
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


    _id = Math.floor(Math.random() * (100 + 1));

    if (myMap.has(_id)){

    }
    else{

    }



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
