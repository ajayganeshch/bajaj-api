const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection. Shutting Down....");
  console.log(err.name, err.message);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("Uncaught Exception. Shutting Down....");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");

//--------------- Server ---------------

const port = process.env.PORT || 3000;
const server = app.listen(port, "127.0.0.1", () => {
  console.log(port);
});
