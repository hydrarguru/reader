import express from "express";
import { getAll, getOne } from "../db";
import { validateCommunityName } from "../util/validate";

export const CommunityRouter = express.Router();

CommunityRouter.get("/community", async (req, res) => {
    const communities = await getAll("Communities");
    res.send(communities);
});
  
CommunityRouter.get("/community/:name", async (req, res) => {
    const name = req.params.name;
    if (!validateCommunityName(name)) {
        res.status(400).send("Invalid community name.");
        return;
    }
    else {
        const community = await getOne("Communities", "community_name", name);
        if(community === null) {
            res.status(404).send("Community not found.");
            return;
        }
        else {
            res.send({community: community})
        }
    }
});