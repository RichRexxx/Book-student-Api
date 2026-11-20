const http = require("http");

const movies= [
    {
    Id: 1,
    title: "Love don't cost a dime",
    genre: "Romance",
    rating: 7.7,
    year: 2023,
    duration: "2 hrs"
    },
    {
        Id: 2,
    title: "The Extraction",
    genre: "Action",
    rating: 8.7,
    year: 2021,
    duration: "1hrs 43mins"
    },
    {
        Id: 3,
    title: "Journey around the world",
    genre: "Adventure",
    rating: 9.0,
    year: 2024,
    duration: "2 hrs"
    },
    {
        Id: 4,
    title: "Two and a half men",
    genre: "Comedy",
    rating: 8.1,
    year: 2012,
    duration: "45 mins"
    },
    {
        Id: 5,
    title: "Friends with benefits",
    genre: "Romcom",
    rating: 8.9,
    year: 2017,
    duration: "2 hrs"
    },
    {
        Id: 6,
    title: "The conjuring",
    genre: "Horror",
    rating: 7.5,
    year: 2020,
    duration: "2 hrs"
    },
];




const server = http.createServer(function(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
if(url.pathname === "/movies" && req.method === "GET") {
    if(url.searchParams.has("genre")) {
        const genreParams = (url.searchParams.get("genre"));
        const filteredMovies = movies.filter(function(data) {
        return data.genre === genreParams;
    });
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(filteredMovies));
}
if(url.searchParams.has("year")) {
    const yearParams = url.searchParams.get("year");
    const filteredMovies = movies.filter(function(data) {
        return data.year === Number(yearParams);
    })
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(filteredMovies));
}
if(url.searchParams.has("rating")) {
    const ratingParams = url.searchParams.get("rating");
    const filteredMovies = movies.filter(function(data) {
        return data.rating === Number(ratingParams);
    });
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(filteredMovies));
}
if(url.searchParams.has("title")) {
    const titleParams = url.searchParams.get("title");
    const filteredMovies = movies.filter(function(data) {
        return data.title === titleParams;
    })
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(filteredMovies));
}
if(url.searchParams.has("duration")) {
    const durationParams = url.searchParams.get("duration");
    const filteredMovies = movies.filter(function(data) {
        return data.duration === durationParams;
    })
    res.setHeader("Control-Type", "application/json");
    return res.end(JSON.stringify(filteredMovies));
}
const moviesData =JSON.stringify(movies);
res.setHeader("Content-Type", "application/json");
res.end(moviesData);
}else if(url.pathname === "/top-movies" && req.method === "GET") {
    const topMovies = movies.filter(function(data) {
        return data.rating >=8;
    });
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(topMovies));
} 
else if (url.pathname === "/stats" && req.method === "GET") {
    const totalMovies = movies.length;
    const highestRatedMovie = movies.reduce(function(best, current) {
        return current.rating > best.rating ? current : best;
    })
    const lowestRatedMovie =movies.reduce(function(worst, current) {
        return current.ratinig < worst.rating ? current : worst;
    })
    const totalRating = movies.reduce(function(sum, current) {
        return sum + current.rating;
    }, 0);
    const averageRating = totalRating / movies.length;
    const stats = {
        totalMovies: totalMovies,
        higestRatedMovie: highestRatedMovie,
        lowestRatedMovie: lowestRatedMovie,
        averageRating: averageRating
    };
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(stats));
}
else {
    res.statusCode = 404;
    res.end("route not found");
}
});
const PORT = 5001;
server.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
});



