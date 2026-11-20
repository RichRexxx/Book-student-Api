const http = require("http");

const statusCodes = [
    {code: 200, message: "ok", description: "the request was successfully created."},
        {code: 201, message: "Created", description: "A new resource was successfully created."},
        {code: 204, message: " No content", description: "the request succeeded but there is no content to return."},
            {code: 301, message: "moved permanently", description: "the resource have been moved to a new url permanently."},
                {code: 400, message: "Bad request", description: "the server could not understand the request due to invalid syntax."},
                    {code: 401, message: "Unauthorised", description: "authentication is required to access this resource."},
                        {code: 403, message: "Forbidden", description: "the client does not have permission to access this resource"},
                            {code: 404, message: "NOt found", description: "the server encountered an unexpected error."},
                                {code: 200, message: "Internal service error", description: "the server is currently unable to handle the request."}
            
            ];
const server = http.createServer(function(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname === "/code" && req.method === "GET") {
        if(url.searchParams.has("code")) {
            const codeParams = url.searchParams.get("code");
            const [statusInfo] = statusCodes.filter(function(data) {
                return data.code === Number(codeParams);
            });
 if (!statusInfo) {
                res.statusCodes = 404;
                res.end("Statuscode not found");
            }
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify(statusInfo));
        }
        const allCodes = JSON.stringify(statusCodes);
        res.setHeader("Content-Type", "application/json");
        res.end(allCodes);
    } else {
        res.statusCode = 404;
        res.end("Route not found");
    }
});
const PORT = 6000;
server.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
});