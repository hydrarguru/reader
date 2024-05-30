import express from "express";
import { createTables } from "./db";
import { router } from "./routes/User.get"

const shouldCreateTables = false;
const port = 8080;
const app = express();
app.use('/api', router);

if (shouldCreateTables) {
  await createTables();
  console.log("Tables created.");
}
else {
  console.log("Tables not created.");
}

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});