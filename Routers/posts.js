const express = require("express");

const posts = require("../data/db");

const commentsRouter = require("./comments");

const router = express.Router();

router.use("/:id/comments", commentsRouter);

router.post("/", async (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({errorMessage: "Please provide title and contents for the post"});
    };

    const newPost = {
        title: req.body.title,
        contents: req.body.contents
    };

    let post = await posts.insert(newPost);
    if (post) {
        res.status(201).json(post);
    } else {
        res.status(500).json({error: "There was an error saving the post to the database"});
    };

});

router.get("/", async (req, res) => {
    let post = await posts.find();

    if (post) {
        res.json(post);
    } else {
        res.status(500).json({error: "The posts information could not be retrieved"});
    };
});

router.get("/:id", async (req, res) => {
    let post = await posts.findById(req.params.id);

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({message: "The post the specified ID does not exist"});
    };
});

router.delete("/:id", async (req, res) => {
    let post = await posts.findById(req.params.id);

    if (post) {
        let deletedPost = await posts.remove(req.params.id);
        if (deletedPost) {
            res.json(deletedPost);
        } else {
            res.status(500).json({error: "The post could not be removed"});
        };
    } else {
        res.status(404).json({message: "The post with the specified ID does not exist"});
    };
});

router.put("/:id", async (req, res) => {
    let originalPost = await posts.findById(req.params.id);

    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({errorMessage: "Please provide title and contents for the post"});
    };
    let newPost = {
        title: req.body.title,
        contents: req.body.contents
    };

    if (originalPost) {
        let updatedPost = await posts.insert(newPost);
        
        if (updatedPost) {
            res.status(200).json(updatedPost);
        } else {
            res.status(500).json({error: "The post information could not be modified"});
        };
    } else {
        res.status(404).json({message: "The post with the specified ID does not exist"});
    };
});

module.exports = router;