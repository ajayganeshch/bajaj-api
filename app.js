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
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
        }
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          padding: 20px;
        }
        .box {
          width: 550px;
          padding: 30px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        h1 {
          margin: 0;
          font-size: 24px;
          color: #333;
        }
        p {
          margin: 10px 0;
          color: #555;
        }
        a {
          color: #007bff;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="box">
          <h1>Welcome to Bajaj Backend API</h1>
          <br>
          <p>Frontend link: <a href="https://bajaj-frontend-ew1p.onrender.com" target="_blank">https://bajaj-frontend-ew1p.onrender.com</a></p>
          <br>
          <p>API Endpoint: <a href="https://bajaj-api-2f8j.onrender.com/api/bfhl" target="_blank">https://bajaj-api-2f8j.onrender.com/api/bfhl</a></p>
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
