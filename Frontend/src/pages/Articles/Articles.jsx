import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Articles.css';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await axios.get(`/api/articles?page=${page}&category=${category}&search=${search}`);
        setArticles(data.articles);
        setPages(data.pages);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching articles');
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page, category, search]);

  const categories = ['Medical', 'Education', 'NExT', 'Research', 'General'];

  return (
    <div className="articles-container">
      <div className="articles-header">
        <h1>Articles</h1>
        <div className="articles-filters">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <div className="articles-grid">
            {articles.map((article) => (
              <div key={article._id} className="article-card">
                {article.coverImage && (
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="article-image"
                  />
                )}
                <div className="article-content">
                  <h2>{article.title}</h2>
                  <p className="article-summary">{article.summary}</p>
                  <div className="article-meta">
                    <span className="article-category">{article.category}</span>
                    <span className="article-date">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="article-stats">
                    <span>👁️ {article.views}</span>
                    <span>❤️ {article.likes}</span>
                    <span>💬 {article.comments.length}</span>
                  </div>
                  <Link to={`/articles/${article._id}`} className="read-more">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {pages > 1 && (
            <div className="pagination">
              {[...Array(pages).keys()].map((x) => (
                <button
                  key={x + 1}
                  onClick={() => setPage(x + 1)}
                  className={`page-button ${page === x + 1 ? 'active' : ''}`}
                >
                  {x + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Articles;
