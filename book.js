const http = require("http");

const books = require("./text/edit");
const PORT = 3000;

const server = http.createServer(function(req, res) {
    const url = new URL(req.url,  `http://${req.headers.host}`);
    const path = url.pathname.split("/");
    if (path[1] === "books" && path[2] && req.method === "GET") {
        const ID = Number(path[2]);
        const book = books.find(function(data) {
            return data.ID === ID;
        })
        if(!book) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({message: "Book not found"}));
        }
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(book));
    }
    else if (url.pathname === "/books" && req.method === "GET") {
    if(url.searchParams.has("category")) {
        const categoryParams = url.searchParams.get("category");
        const filteredBooks = books.filter(function(data) {
            return data.category === categoryParams;
        });
        res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(filteredBooks));
     }
     else if(url.searchParams.has("author")) {
        const authorParams = url.searchParams.get("author");
        const filteredBooks = books.filter(function(data) {
            return data.author === authorParams;
        });
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(filteredBooks));
     }
     else if(url.searchParams.has("yearpublished")) {
        const yearpublishedParams = url.searchParams.get("yearpublished");
        const filteredBooks = books.filter(function(data) {
            return data.yearpublished === Number(yearpublishedParams);
        })
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(filteredBooks));
     } 
     else if (url.searchParams.has("available")) {
        const avialableParams = url.searchParams.get("available");
        const filteredBooks = books.filter(function(data) {
            return data.available === (avialableParams === "true");
        });
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(filteredBooks));
     }
     else if(url.searchParams.has("pages")) {
        const pagesParams = url.searchParams.get("pages");
        const filteredBooks = books.filter(function(data) {
            return data.pages = Number(pagesParams);
        })
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(filteredBooks));
    }
   else { 
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(books));
   }
}
});

server.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
});