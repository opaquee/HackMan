var express = require("express");
var http =  require("http");
var path = require("path");

const app = express();
const port = 8080;
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => console.log("Listening on port 8080"));
//const server = http.createServer(app);
/*
const sio = require("socket.io")(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

sio.on("connection", () => {
    console.log("Connected!");
});
*/

//server.listen(8080);