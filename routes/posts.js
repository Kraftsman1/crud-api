const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Post = require('../models/post');

// Create Post
router.post('/', authMiddleware, async (req, res) => {
    const { title, content } = req.body;
    // Extract UserID
    const userId = req.user.userId; 

    try {
        // Create New Post
        const newPost = new Post({
            title,
            content,
            // Set the Author == UserID
            author: userId,
        });

        // Save Post to DB
        await newPost.save();

        return res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get all Posts
router.get('/', async (req, res) => {
    try {
        // Fetch all Posts
        const posts = await Post.find().populate('author', 'username');
        return res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get specific Post by ID
router.get('/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        // Fetch Post by ID
        const post = await Post.findById(postId).populate('author', 'username');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update Post
router.put('/:postId', authMiddleware, async (req, res) => {
    const { postId } = req.params;
    const { title, content } = req.body;
    const userId = req.user.userId; // Extract user ID from the authenticated user

    try {
        // Fetch Post by ID
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check User == Post Author
        if (post.author.toString() !== userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Update Post
        post.title = title;
        post.content = content;

        // Save Post to DB
        await post.save();

        return res.json(post);
    } catch (error) {
        console.error('Error updating post:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete Post
router.delete('/:postId', authMiddleware, async (req, res) => {
    const { postId } = req.params;
    // Extract UserID
    const userId = req.user.userId; 

    try {
        // Fetch Post by ID
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if User == Post Author
        if (post.author.toString() !== userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Delete Post
        await post.remove();

        return res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
