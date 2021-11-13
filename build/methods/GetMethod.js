"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMethod = void 0;
function getMethod() {
    let id = parseInt(req.params["id"]);
    let book = myMap.get(id);
    console.log(id);
    if (myMap.has(id)) {
        res.json({ id: book.id, name: book.name, author: book.author, genre: book.genre });
    }
    else {
        res.json({ Response: "There is no book in the json with this ID" });
    }
}
exports.getMethod = getMethod;
