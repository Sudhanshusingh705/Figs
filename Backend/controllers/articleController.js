const Article = require('../models/Article');
const asyncHandler = require('express-async-handler');

// @desc    Get all articles
// @route   GET /api/articles
// @access  Public
const getArticles = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;
  const category = req.query.category;
  const tag = req.query.tag;
  const search = req.query.search;

  let query = { status: 'published' };

  if (category) {
    query.category = category;
  }

  if (tag) {
    query.tags = tag;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ];
  }

  const count = await Article.countDocuments(query);
  const articles = await Article.find(query)
    .populate('author', 'name email')
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    articles,
    page,
    pages: Math.ceil(count / pageSize),
    total: count
  });
});

// @desc    Get single article
// @route   GET /api/articles/:id
// @access  Public
const getArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id)
    .populate('author', 'name email')
    .populate('comments.user', 'name');

  if (article) {
    // Increment views
    article.views += 1;
    await article.save();
    res.json(article);
  } else {
    res.status(404);
    throw new Error('Article not found');
  }
});

// @desc    Create article
// @route   POST /api/articles
// @access  Private/Admin
const createArticle = asyncHandler(async (req, res) => {
  const {
    title,
    content,
    summary,
    category,
    tags,
    coverImage,
    metaTitle,
    metaDescription,
    isFeatured,
    references
  } = req.body;

  const article = await Article.create({
    title,
    content,
    summary,
    author: req.user._id,
    category,
    tags,
    coverImage,
    metaTitle,
    metaDescription,
    isFeatured,
    references
  });

  res.status(201).json(article);
});

// @desc    Update article
// @route   PUT /api/articles/:id
// @access  Private/Admin
const updateArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article) {
    article.title = req.body.title || article.title;
    article.content = req.body.content || article.content;
    article.summary = req.body.summary || article.summary;
    article.category = req.body.category || article.category;
    article.tags = req.body.tags || article.tags;
    article.coverImage = req.body.coverImage || article.coverImage;
    article.status = req.body.status || article.status;
    article.metaTitle = req.body.metaTitle || article.metaTitle;
    article.metaDescription = req.body.metaDescription || article.metaDescription;
    article.isFeatured = req.body.isFeatured ?? article.isFeatured;
    article.references = req.body.references || article.references;

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } else {
    res.status(404);
    throw new Error('Article not found');
  }
});

// @desc    Delete article
// @route   DELETE /api/articles/:id
// @access  Private/Admin
const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article) {
    await article.remove();
    res.json({ message: 'Article removed' });
  } else {
    res.status(404);
    throw new Error('Article not found');
  }
});

// @desc    Add comment to article
// @route   POST /api/articles/:id/comments
// @access  Private
const addArticleComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const article = await Article.findById(req.params.id);

  if (article) {
    const comment = {
      user: req.user._id,
      content
    };

    article.comments.push(comment);
    await article.save();
    res.status(201).json(article);
  } else {
    res.status(404);
    throw new Error('Article not found');
  }
});

// @desc    Like article
// @route   POST /api/articles/:id/like
// @access  Private
const likeArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article) {
    article.likes += 1;
    await article.save();
    res.json(article);
  } else {
    res.status(404);
    throw new Error('Article not found');
  }
});

module.exports = {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  addArticleComment,
  likeArticle
}; 