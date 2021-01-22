require("dotenv").config();

const http = require("http");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const es6Renderer = require("express-es6-template-engine");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const app = express();
const server = http.createServer(app);

const logger = morgan("dev");
const hostname = "localhost";
const port = 5003;

// Middleware
app.use(logger);
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(
  session({
    store: new FileStore(), // no options for now
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "html");

app.use(require("./routes"));

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
