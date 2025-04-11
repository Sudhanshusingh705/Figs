import React from 'react';
import { useParams } from 'react-router-dom';
import { FaCalendar, FaTag, FaFolder } from 'react-icons/fa';
import './Article.css';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        const response = await fetch(`/api/articles/${id}`);
        if (!response.ok) throw new Error('Article not found');
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div className="loading">Loading article...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!article) return <div className="error">Article not found</div>;

  return (
    <article className="article">
      <header className="article-header">
        <h1>{article.title}</h1>
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
      </header>

      <div 
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {article.author && (
        <footer className="article-footer">
          <div className="author-info">
            <img 
              src={article.author.avatar || '/images/default-avatar.png'} 
              alt={article.author.name}
              className="author-avatar"
            />
            <div className="author-details">
              <h3>About the Author</h3>
              <h4>{article.author.name}</h4>
              <p>{article.author.bio}</p>
            </div>
          </div>
        </footer>
      )}

      <div className="article-navigation">
        {article.previousArticle && (
          <a 
            href={`/articles/${article.previousArticle.id}`} 
            className="nav-link prev"
          >
            ← {article.previousArticle.title}
          </a>
        )}
        {article.nextArticle && (
          <a 
            href={`/articles/${article.nextArticle.id}`} 
            className="nav-link next"
          >
            {article.nextArticle.title} →
          </a>
        )}
      </div>
    </article>
  );
};

export default Article; 