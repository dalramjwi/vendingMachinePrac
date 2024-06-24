const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer(function (req, res) {
  if (req.method === "GET" && req.url === "/") {
    const data = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  } else if (req.method === "POST" && req.url === "/get-item") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const requestData = JSON.parse(body);
      const item = requestData.item;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ item }));
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
