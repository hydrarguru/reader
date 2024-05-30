import express from "express";
import { validateUUID } from "../util/validate_uuid";
import { getAll, getOne } from "../db";

export const router = express.Router();

router.get("/users", async (req, res) => {
    const users = await getAll("Users");
    res.send(users);
});
  
router.get("/users/:id", async (req, res) => {
    if (!validateUUID(req.params.id)) {
      res.status(400).send("Invalid UUID.");
      return;
    }
    else {
      const id = req.params.id;
      const user = await getOne("Users", "user_id", id);
      if(user === null) {
        res.status(404).send("User not found.");
        return;
      }
      else {
        res.send(user);
      }
    }
});