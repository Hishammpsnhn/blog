import mongoose from "mongoose";
import Post from "../model/PostModel.js";
import PostModel from "../model/PostModel.js";

// @desc    get posts
// @route   GET /api/post
// @access  Public
export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    return res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// @desc    create post
// @route   POST /api/post
// @access  Private
export const createPosts = async (req, res) => {
  try {
    const { title, desc, imageUrl } = req.body;
    const newPost = await new Post({
      title,
      desc,
      image: imageUrl,
      author: req.user,
    });
    const savedPost = await newPost.save();
    return res.status(200).json({ success: true, post: newPost });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// @desc    Edit post
// @route   PUT /api/post/:id
// @access  Private
export const updatePost = async (req, res) => {
  try {
    const { title, desc, image } = req.body;
    const { id } = req.params;
    const newPost = await new Post.findByIdAndUpdate(
      id,
      { title, desc, image },
      { new: true, runValidators: true }
    );

    if (!newPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res
      .status(200)
      .json({ message: "Post updated successfully", post: newPost });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

// @desc    delete post
// @route   DELETE /api/post/:id
// @access  Private
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(
      new mongoose.Types.ObjectId(id)
    );
    console.log(deletedPost);
    if (!deletedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    return res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    console.log(error)
    return res.status(404).json({ message: error });
  }
};
