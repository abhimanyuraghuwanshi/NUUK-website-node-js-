import { fstat } from 'fs';
import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
import { type } from 'os';

const myport= process.env.PORT || 8000;


const server = http.createServer((req, res) => {

    var fullurl = url.parse(req.url)
    var realurl = fullurl.pathname

    var openfile, typeofPagetobeLoaded;

    if (realurl == "/home" || realurl == "/") {
        openfile = "home";
        typeofPagetobeLoaded = 1;
    }
    else if (realurl == "/about") {
        openfile = "about";
        typeofPagetobeLoaded = 1;
    }
    else if (realurl == "/service") {
        openfile = "service";
        typeofPagetobeLoaded = 1;
    }
    else if (realurl == "/project") {
        openfile = "project";
        typeofPagetobeLoaded = 1;
    }
    else if (realurl == "/quiz") {
        openfile = "quiz";
        typeofPagetobeLoaded = 1;
    }
    else if (realurl == "/blogs") {
        openfile = "blogs";
        typeofPagetobeLoaded = 1;
    }
    else if (realurl == "/license") {
        openfile = "license";
        typeofPagetobeLoaded = 1;
    }
    else if (realurl == "/protected") {
        openfile = "protected";
        typeofPagetobeLoaded = 1;
    }
    else if (realurl == "/demo") {
        openfile = "demo";
        typeofPagetobeLoaded = 1;
    }


    // static file loading
    else if (realurl.match("\.css$")) {
        typeofPagetobeLoaded = 2;
    }

    else if (realurl.match("\.jpg")) {
        typeofPagetobeLoaded = 3;
    }

    else if (realurl.match("\.js")) {
        typeofPagetobeLoaded = 4;
    }

    else {
        res.writeHead(404)
        openfile = "error";
        typeofPagetobeLoaded = 1;
    }

    switch (typeofPagetobeLoaded) {
        case 1: // read file sync => html
            fs.readFile("./views/" + openfile + ".html", (e, data) => {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            });
            break;

        case 2: //streaming css
            var filestream = fs.createReadStream(("./public" + realurl));
            res.writeHead(200, { "Content-Type": "text/css" });
            filestream.pipe(res);
            break;

        case 3: //streaming bg-imgage
            var filestream = fs.createReadStream(("./public" + realurl));
            res.writeHead(200, { "Content-Type": "image/jpg" });
            filestream.pipe(res);

        case 4: //streaming css
            var filestream = fs.createReadStream(("./public" + realurl));
            res.writeHead(200, { "Content-Type": "text/javascript" });
            filestream.pipe(res);
            break;
    }

});

server.listen(myport, (e) => {
    console.log("listening")
})