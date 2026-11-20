const http = require("http");

const students = [
    {
        id: 1,
        name: "John Doe",
        age: 20,
        department: "Computer Science"
    },
    {
        id: 2,
        name: "Mary James",
        age: 21,
        department: "Electrical Engineering"
    },
    {
        id: 3,
        name: "Peter Johnson",
        age: 19,
        department: "Information Technology"
    }
];

const courses = [
    "Computer Science",
    "Electrical Engineering",
    "Biology"
];

const server = http.createServer(function(req, res) {
    // console.log(req.url);
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname === "/students" && req.method === "GET") {
        if (url.searchParams.has("id")) {
            const studentId = url.searchParams.get("id");
            const [student] = students.filter(function(data) {
                return data.id === Number(studentId);
            });
            if (!student) {
                res.statusCode = 404;
                res.end("Student not found");
            }
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify(student));
        }

        const studentsData = JSON.stringify(students);
        res.setHeader("Content-Type", "application/json");
        res.end(studentsData);
    } else if (url.pathname === "/courses" && req.method === "GET") {
        if(url.searchParams.has("courseName")) {
        const courseName = url.searchParams.get("courseName");
        const [course] = courses.filter(function(data) {
            return data === courseName;
        })
        if (!course) {
            res.statusCode = 404;
            res.end("Course not found");
            return;
        }
        res.setHeader("Content-type", "application/json");
        return res.end(JSON.stringify(course));
        }
        const coursesData = JSON.stringify(courses);
        res.setHeader("Content-Type", "application/Json");
        res.end(coursesData);
    } 
    else {
        res.statusCode = 404;
        res.end("Route not found");
    }
});
const PORT = 5000;
server.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
});
