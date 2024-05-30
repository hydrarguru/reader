import express from "express";
import { getAll, getOne } from "../db";
import { validateUUID } from "../util/validate";

export const PostRouter = express.Router();

PostRouter.get("/posts", async (req, res) => {
    const posts = await getAll("Posts");
    res.send(posts);
});

PostRouter.get("/post/:id", async (req, res) => {
    const id = req.params.id;

    if(!validateUUID(id)) {
        res.status(400).send("Invalid UUID.");
        return;
    }
    else {
        const post = await getOne("Posts", "post_id", id);
        if (post === null) {
            res.status(404).send("Post not found.");
            return;
        }
        else {
            res.send({post: post});
        }
    }
});