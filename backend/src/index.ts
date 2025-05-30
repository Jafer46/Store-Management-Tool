import express from "express";
import "dotenv/config";
import dbConnect from "./config/db";
import { errorHandler } from "./middleware/error.middleware";

dbConnect();

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());

app.use("/api", require("./modules/module.route"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
