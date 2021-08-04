const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//create post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();

    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );

        res.status(200).json(updatedPost);
      } catch (e) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post");
    }
  } catch (e) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.username === req.params.username) {
      await post.delete();
      res.status(200).json("post deleted");
    } else {
      res.status(401).json("You can only delete your posts");
    }

    res.status(200).json("Post has been deleted...");
  } catch (err) {
    res.status(404).json("post not found!");
  }
});

//get one

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json("post not found!");
  }
});

router.get("/", async (req, res) => {
  const username = req.query.user;
  const category = req.query.cat;

  try {
    let posts;

    if (username) {
      posts = await Post.find({
        username,
      });
    } else if (category) {
      posts = await Post.find({
        categories: {
          $in: [category],
        },
      });
    } else {
      posts = await Posts.find();
    }

    res.status(200).json(posts);
  } catch (e) {}
});

module.exports = router;
