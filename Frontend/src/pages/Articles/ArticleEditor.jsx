import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './ArticleEditor.css';

const ArticleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [article, setArticle] = useState({
    title: '',
    content: '',
    summary: '',
    category: '',
    tags: [],
    coverImage: '',
    metaTitle: '',
    metaDescription: '',
    isFeatured: false,
    references: []
  });
  const [tagInput, setTagInput] = useState('');
  const [referenceInput, setReferenceInput] = useState({ title: '', url: '' });

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const { data } = await axios.get(`/api/articles/${id}`);
          setArticle(data);
        } catch (err) {
          setError(err.response?.data?.message || 'Error fetching article');
        }
      };
      fetchArticle();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setArticle(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTagAdd = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !article.tags.includes(tagInput.trim())) {
      setArticle(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setArticle(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleReferenceAdd = (e) => {
    e.preventDefault();
    if (referenceInput.title.trim()) {
      setArticle(prev => ({
        ...prev,
        references: [...prev.references, { ...referenceInput }]
      }));
      setReferenceInput({ title: '', url: '' });
    }
  };

  const handleReferenceRemove = (index) => {
    setArticle(prev => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (id) {
        await axios.put(`/api/articles/${id}`, article);
      } else {
        await axios.post('/api/articles', article);
      }
      navigate('/articles');
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving article');
      setLoading(false);
    }
  };

  if (!user?.isAdmin) {
    return <div className="error">Access denied. Admin privileges required.</div>;
  }

  return (
    <div className="article-editor-container">
      <h1>{id ? 'Edit Article' : 'Create New Article'}</h1>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="article-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={article.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            name="summary"
            value={article.summary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={article.content}
            onChange={handleChange}
            required
            rows="10"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={article.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Medical">Medical</option>
            <option value="Education">Education</option>
            <option value="NExT">NExT</option>
            <option value="Research">Research</option>
            <option value="General">General</option>
          </select>
        </div>

        <div className="form-group">
          <label>Tags</label>
          <div className="tags-input">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag"
            />
            <button type="button" onClick={handleTagAdd}>Add</button>
          </div>
          <div className="tags-list">
            {article.tags.map(tag => (
              <span key={tag} className="tag">
                {tag}
                <button
                  type="button"
                  onClick={() => handleTagRemove(tag)}
                  className="remove-tag"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="coverImage">Cover Image URL</label>
          <input
            type="url"
            id="coverImage"
            name="coverImage"
            value={article.coverImage}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="metaTitle">Meta Title</label>
          <input
            type="text"
            id="metaTitle"
            name="metaTitle"
            value={article.metaTitle}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="metaDescription">Meta Description</label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            value={article.metaDescription}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isFeatured"
              checked={article.isFeatured}
              onChange={handleChange}
            />
            Featured Article
          </label>
        </div>

        <div className="form-group">
          <label>References</label>
          <div className="reference-input">
            <input
              type="text"
              value={referenceInput.title}
              onChange={(e) => setReferenceInput(prev => ({
                ...prev,
                title: e.target.value
              }))}
              placeholder="Reference title"
            />
            <input
              type="url"
              value={referenceInput.url}
              onChange={(e) => setReferenceInput(prev => ({
                ...prev,
                url: e.target.value
              }))}
              placeholder="Reference URL (optional)"
            />
            <button type="button" onClick={handleReferenceAdd}>Add</button>
          </div>
          <div className="references-list">
            {article.references.map((ref, index) => (
              <div key={index} className="reference">
                <span>{ref.title}</span>
                {ref.url && <a href={ref.url} target="_blank" rel="noopener noreferrer">🔗</a>}
                <button
                  type="button"
                  onClick={() => handleReferenceRemove(index)}
                  className="remove-reference"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/articles')}
            className="cancel-button"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Article'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleEditor;
