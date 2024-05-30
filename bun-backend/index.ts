import express from "express";
import { createTables } from "./db";
import { UserRouter } from "./routes/User"
import { CommunityRouter } from "./routes/Community";

const shouldCreateTables = false;
const port = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', UserRouter);
app.use('/api', CommunityRouter);

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