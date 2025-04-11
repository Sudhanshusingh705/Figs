import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendar, FaTag, FaFolder, FaSearch } from 'react-icons/fa';
import './ArticleList.css';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    tag: ''
  });

  const fetchArticles = async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      const queryParams = new URLSearchParams({
        page: currentPage,
        ...filters
      });
      const response = await fetch(`/api/articles?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch articles');
      const data = await response.json();
      setArticles(data.articles);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError('Failed to load articles');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [currentPage, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchArticles();
  };

  if (loading) return <div className="loading">Loading articles...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="article-list">
      <div className="filters">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input">
            <FaSearch />
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search articles..."
            />
          </div>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">All Categories</option>
            <option value="medical">Medical</option>
            <option value="education">Education</option>
            <option value="technology">Technology</option>
          </select>
          <select
            name="tag"
            value={filters.tag}
            onChange={handleFilterChange}
          >
            <option value="">All Tags</option>
            <option value="research">Research</option>
            <option value="news">News</option>
            <option value="guide">Guide</option>
          </select>
        </form>
      </div>

      {articles.length === 0 ? (
        <div className="no-articles">
          <h2>No articles found</h2>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="articles-grid">
          {articles.map(article => (
            <article key={article.id} className="article-card">
              {article.image && (
                <div className="article-image">
                  <img src={article.image} alt={article.title} />
                </div>
              )}
              <div className="article-content">
                <h2>
                  <Link to={`/articles/${article.id}`}>{article.title}</Link>
                </h2>
                <div className="article-meta">
                  <span className="meta-item">
                    <FaCalendar />
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                  <span className="meta-item">
                    <FaFolder />
                    {article.category}
                  </span>
                  <span className="meta-item">
                    <FaTag />
                    {article.tags.join(', ')}
                  </span>
                </div>
                <p className="article-excerpt">{article.excerpt}</p>
                <Link to={`/articles/${article.id}`} className="read-more">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="page-button"
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="page-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleList; 