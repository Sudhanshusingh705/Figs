import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const articleService = {
  // Get all articles with pagination and filters
  getArticles: async (page = 1, filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        page,
        ...filters
      });
      const response = await axios.get(`${API_URL}/articles?${queryParams}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch articles');
    }
  },

  // Get a single article by ID
  getArticleById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/articles/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch article');
    }
  },

  // Create a new article
  createArticle: async (articleData) => {
    try {
      const response = await axios.post(`${API_URL}/articles`, articleData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create article');
    }
  },

  // Update an existing article
  updateArticle: async (id, articleData) => {
    try {
      const response = await axios.put(`${API_URL}/articles/${id}`, articleData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update article');
    }
  },

  // Delete an article
  deleteArticle: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/articles/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete article');
    }
  },

  // Get articles by category
  getArticlesByCategory: async (category, page = 1) => {
    try {
      const response = await axios.get(`${API_URL}/articles/category/${category}?page=${page}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch articles by category');
    }
  },

  // Get articles by tag
  getArticlesByTag: async (tag, page = 1) => {
    try {
      const response = await axios.get(`${API_URL}/articles/tag/${tag}?page=${page}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch articles by tag');
    }
  },

  // Search articles
  searchArticles: async (query, page = 1) => {
    try {
      const response = await axios.get(`${API_URL}/articles/search?q=${query}&page=${page}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search articles');
    }
  },

  // Get related articles
  getRelatedArticles: async (articleId) => {
    try {
      const response = await axios.get(`${API_URL}/articles/${articleId}/related`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch related articles');
    }
  },

  // Get article categories
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/articles/categories`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  },

  // Get article tags
  getTags: async () => {
    try {
      const response = await axios.get(`${API_URL}/articles/tags`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tags');
    }
  }
};

export default articleService; 