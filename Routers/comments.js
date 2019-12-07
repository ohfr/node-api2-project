const express = require("express");

const posts = require("../data/db");

const router = express.Router({
    mergeParams: true,
});

router.post("/", async (req, res) => {
    let post = await posts.findById(req.params.id);

    if (!req.body.text){
        return res.status(400).json({errorMessage: "Please provide text for the comment"});
    };

    let newPost = {
        text: req.body.text,
        post_id: req.params.id
    };

    if (post) {
        let posted = await posts.insertComment(newPost);
        if (posted) {
            res.status(201).json(posted);
        } else {
            res.status(500).json({error: "There was an error while saving the comment to the database"});
        };
    } else {
        res.status(404).json({message: "The post with the specified ID does not exist"});
    };
});

router.get("/", async (req, res) => {
    let post = await posts.findPostComments(req.params.id);

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({message: "The post with the specified ID does not exist"});
    };
});

router.get("/:commentId", async (req, res) => {
    let post = await posts.findCommentById(req.params.commentId);

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({error: "The comment with the specified ID does not exist"});
    };
});

module.exports = router;