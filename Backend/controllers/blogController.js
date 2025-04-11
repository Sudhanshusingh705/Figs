const Blog = require('../models/Blog');
const asyncHandler = require('express-async-handler');

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const { category, search, page = 1, limit = 10 } = req.query;
  const query = {};

  // Filter by category if provided
  if (category) {
    query.category = category;
  }

  // Search in title and content if search term provided
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ];
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Execute query with pagination
  const blogs = await Blog.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('author', 'name');

  // Get total count for pagination
  const total = await Blog.countDocuments(query);

  res.json({
    blogs,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    total
  });
});

// @desc    Get single blog post
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('author', 'name');

  if (blog) {
    // Increment view count
    blog.views += 1;
    await blog.save();
    
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  const { title, content, category, tags, featuredImage } = req.body;

  // Check if blog with same title exists
  const blogExists = await Blog.findOne({ title });

  if (blogExists) {
    res.status(400);
    throw new Error('Blog post with this title already exists');
  }

  const blog = await Blog.create({
    title,
    content,
    category,
    tags,
    featuredImage,
    author: req.user._id
  });

  if (blog) {
    res.status(201).json(blog);
  } else {
    res.status(400);
    throw new Error('Invalid blog data');
  }
});

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, category, tags, featuredImage } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    // Check if new title already exists (if title is being updated)
    if (title && title !== blog.title) {
      const blogExists = await Blog.findOne({ title });
      if (blogExists) {
        res.status(400);
        throw new Error('Blog post with this title already exists');
      }
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.category = category || blog.category;
    blog.tags = tags || blog.tags;
    blog.featuredImage = featuredImage || blog.featuredImage;

    const updatedBlog = await blog.save();

    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await blog.remove();
    res.json({ message: 'Blog post removed' });
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

// @desc    Get blog categories
// @route   GET /api/blogs/categories
// @access  Public
const getBlogCategories = asyncHandler(async (req, res) => {
  const categories = await Blog.distinct('category');
  res.json(categories);
});

// @desc    Get blog tags
// @route   GET /api/blogs/tags
// @access  Public
const getBlogTags = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}, 'tags');
  const allTags = blogs.reduce((tags, blog) => {
    return [...tags, ...blog.tags];
  }, []);
  
  // Remove duplicates and sort
  const uniqueTags = [...new Set(allTags)].sort();
  
  res.json(uniqueTags);
});

// @desc    Get blogs by tag
// @route   GET /api/blogs/tag/:tag
// @access  Public
const getBlogsByTag = asyncHandler(async (req, res) => {
  const { tag } = req.params;
  const { page = 1, limit = 10 } = req.query;
  
  const query = { tags: tag };
  const skip = (page - 1) * limit;
  
  const blogs = await Blog.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('author', 'name');
  
  const total = await Blog.countDocuments(query);
  
  res.json({
    blogs,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    total
  });
});

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogCategories,
  getBlogTags,
  getBlogsByTag
}; 