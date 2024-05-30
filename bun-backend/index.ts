import express from "express";
import { Client, createTables } from "./db";

const port = 8080;
const app = express();

await createTables();

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});