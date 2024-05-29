import express from "express";
import { createTables } from "./schema";

const app = express();
const port = 8080;

createTables();

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});