const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const pageName = url.split("/")[1];

  res.setHeader("Content-Type", "text/html");
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write(
      `<body><form action="/message" method="POST"><input type="text" name="message"><button>Send</button></form></body>`
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && req.method === "POST") {
    const body = [];
    
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync('message.txt', message);
    });
    res.writeHead(302, { Location: "/" });
    return res.end();
  }
  // console.log(req);
  // res.write("<html>");
  // res.write("<head><title>My First Page</title></head>");
  // res.write(`<body><h1>hello this is ${pageName} page</h1></body>`);
  // res.write("</html>");
  // res.end();
});

server.listen(3000);
