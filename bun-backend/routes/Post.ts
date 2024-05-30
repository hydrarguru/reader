import express from "express";
import { getAll, getOne, insertOne } from "../db";
import { validateUUID } from "../util/validate";
import type { Post } from "../types/PostType";

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

PostRouter.post("/post/create", async (req, res) => {
    const newPost : Post = {
        post_id: crypto.randomUUID(),
        community_id: req.body.community_id,
        post_author: req.body.post_author,
        post_title: req.body.post_title,
        post_image_url: '',
        post_content: req.body.post_content,
        post_score: 0
    };

    await insertOne('Posts', newPost).catch((err) => {
        console.error(err);
        res.status(500).send({
            message: 'Error creating post.',
            error: err
        });
    }).finally(() => {
        res.status(201).send('Post created.');
    });
});