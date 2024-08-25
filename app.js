const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helment = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");

const bfhlRouter = require("./routes/bfhlRoutes");

const app = express();

app.use(helment());

console.log(process.env.NODE_ENV, "from");

if (process.env.NODE_ENV == "development") app.use(morgan("dev"));

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message:
    "Invalid Activity Detected Or Too Many Requests From this IP, Try Again in an Hour!",
});

app.use("/api", limiter);
app.use(cors());

app.use(express.json({ limit: "10kb" }));

app.use(xss());

app.get("/", (req, res) => {
  res.send(`<html>
    <head>
      <style>
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .box {
          width: 300px;
          height: 200px;
          background-color: #f2f2f2;
          border: 1px solid #ccc;
          padding: 20px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="box">
          <h1>Welcome to Bajaj Backend API</h1>
          <p>Frontend link: <a href="https://bajaj-frontend-ew1p.onrender.com">https://bajaj-frontend-ew1p.onrender.com</a></p>
          <p>Api Endpoint: <a href="https://bajaj-api-2f8j.onrender.com/api/bfhl">https://bajaj-api-2f8j.onrender.com/api/bfhl</a></p>
        </div>
      </div>
    </body>
  </html>`);
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/bfhl", bfhlRouter);

app.all("*", (req, res) => {
  res.status(404).send(`Can't find path ${req.originalUrl} on the server`);
});

module.exports = app;
