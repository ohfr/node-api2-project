const express = require("express");

const postsRouter = require("./Routers/posts");

const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter);




server.listen(4000, () => {
    console.log(`*****Running on port 4000*****`);
});