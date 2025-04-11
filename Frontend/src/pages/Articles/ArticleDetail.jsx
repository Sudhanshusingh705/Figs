import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './ArticleDetail.css';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await axios.get(`/api/articles/${id}`);
        setArticle(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching article');
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const { data } = await axios.post(`/api/articles/${id}/like`);
      setArticle(data);
      setLiked(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Error liking article');
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const { data } = await axios.post(`/api/articles/${id}/comments`, {
        content: comment
      });
      setArticle(data);
      setComment('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding comment');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!article) return <div className="error">Article not found</div>;

  return (
    <div className="article-detail-container">
      {article.coverImage && (
        <img
          src={article.coverImage}
          alt={article.title}
          className="article-cover"
        />
      )}

      <div className="article-content">
        <h1>{article.title}</h1>
        
        <div className="article-meta">
          <span className="article-author">By {article.author.name}</span>
          <span className="article-date">
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
          <span className="article-category">{article.category}</span>
        </div>

        <div className="article-stats">
          <span>👁️ {article.views} views</span>
          <span>❤️ {article.likes} likes</span>
          <span>💬 {article.comments.length} comments</span>
        </div>

        <div className="article-body">
          {article.content}
        </div>

        <div className="article-tags">
          {article.tags.map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>

        <div className="article-actions">
          <button
            onClick={handleLike}
            className={`like-button ${liked ? 'liked' : ''}`}
          >
            {liked ? '❤️ Liked' : '🤍 Like'}
          </button>
        </div>

        <div className="comments-section">
          <h2>Comments ({article.comments.length})</h2>
          
          <form onSubmit={handleComment} className="comment-form">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              required
            />
            <button type="submit" className="submit-comment">
              Post Comment
            </button>
          </form>

          <div className="comments-list">
            {article.comments.map((comment) => (
              <div key={comment._id} className="comment">
                <div className="comment-header">
                  <span className="comment-author">{comment.user.name}</span>
                  <span className="comment-date">
                    {new Date(comment.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="comment-content">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>

        {article.references && article.references.length > 0 && (
          <div className="references-section">
            <h2>References</h2>
            <ul className="references-list">
              {article.references.map((ref, index) => (
                <li key={index}>
                  {ref.url ? (
                    <a href={ref.url} target="_blank" rel="noopener noreferrer">
                      {ref.title}
                    </a>
                  ) : (
                    ref.title
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;
