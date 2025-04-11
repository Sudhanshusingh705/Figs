import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';
import Modal from '../../../components/Modal';
import apiService from '../../../services/apiService';

const StudyMaterialList = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchStudyMaterials();
  }, []);

  const fetchStudyMaterials = async () => {
    setLoading(true);
    try {
      // Simulating API call with mock data
      setTimeout(() => {
        const mockData = [
          {
            id: 1,
            title: 'React Hooks Complete Guide',
            type: 'PDF',
            category: 'Frontend',
            tags: ['React', 'Hooks', 'JavaScript'],
            fileSize: '2.4 MB',
            createdAt: '2023-10-15',
            published: true
          },
          {
            id: 2,
            title: 'Docker and Kubernetes Fundamentals',
            type: 'Video',
            category: 'DevOps',
            tags: ['Docker', 'Kubernetes', 'Container'],
            fileSize: '145 MB',
            createdAt: '2023-10-18',
            published: false
          },
          {
            id: 3,
            title: 'Complete SQL Cheat Sheet',
            type: 'PDF',
            category: 'Database',
            tags: ['SQL', 'Database', 'Cheatsheet'],
            fileSize: '1.2 MB',
            createdAt: '2023-10-22',
            published: true
          },
          {
            id: 4,
            title: 'Python Data Analysis Tutorial',
            type: 'Interactive',
            category: 'Data Science',
            tags: ['Python', 'Pandas', 'Data Analysis'],
            fileSize: '5.8 MB',
            createdAt: '2023-10-25',
            published: true
          }
        ];
        setMaterials(mockData);
        setLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to fetch study materials. Please try again.');
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ open: true, id });
  };

  const confirmDelete = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setMaterials(prevMaterials => 
        prevMaterials.filter(material => material.id !== deleteModal.id)
      );
      
      setDeleteModal({ open: false, id: null });
      setAlert({
        type: 'success',
        message: 'Study material deleted successfully'
      });
      
      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Failed to delete study material'
      });
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ open: false, id: null });
  };

  const togglePublish = async (id, currentStatus) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setMaterials(prevMaterials => 
        prevMaterials.map(material => 
          material.id === id ? { ...material, published: !currentStatus } : material
        )
      );
      
      setAlert({
        type: 'success',
        message: `Study material ${currentStatus ? 'unpublished' : 'published'} successfully`
      });
      
      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Failed to update study material status'
      });
    }
  };

  const filteredMaterials = materials.filter(material => 
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Study Materials</h1>
        <Link to="/admin/study-materials/new">
          <Button variant="primary">Add New Study Material</Button>
        </Link>
      </div>

      {alert && (
        <div className="mb-4">
          <Alert 
            type={alert.type} 
            message={alert.message} 
            onClose={() => setAlert(null)} 
          />
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title, category, or tags..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center p-4">Loading study materials...</div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : filteredMaterials.length === 0 ? (
        <div className="text-center p-4">
          {searchTerm 
            ? "No study materials found matching your search."
            : "No study materials available. Click 'Add New Study Material' to create one."}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border text-left">Title</th>
                <th className="py-2 px-4 border text-left">Type</th>
                <th className="py-2 px-4 border text-left">Category</th>
                <th className="py-2 px-4 border text-left">Tags</th>
                <th className="py-2 px-4 border text-left">Size</th>
                <th className="py-2 px-4 border text-left">Created</th>
                <th className="py-2 px-4 border text-left">Status</th>
                <th className="py-2 px-4 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMaterials.map((material) => (
                <tr key={material.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{material.title}</td>
                  <td className="py-2 px-4 border">
                    <span className={`px-2 py-1 rounded text-xs ${
                      material.type === 'PDF' 
                        ? 'bg-blue-100 text-blue-800' 
                        : material.type === 'Video'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {material.type}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">{material.category}</td>
                  <td className="py-2 px-4 border">
                    <div className="flex flex-wrap gap-1">
                      {material.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-2 px-4 border">{material.fileSize}</td>
                  <td className="py-2 px-4 border">{material.createdAt}</td>
                  <td className="py-2 px-4 border">
                    <span className={`px-2 py-1 rounded text-xs ${
                      material.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {material.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">
                    <div className="flex space-x-2">
                      <Link to={`/admin/study-materials/${material.id}/preview`}>
                        <button className="text-blue-500 hover:text-blue-700">
                          Preview
                        </button>
                      </Link>
                      <Link to={`/admin/study-materials/${material.id}/edit`}>
                        <button className="text-blue-500 hover:text-blue-700">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => togglePublish(material.id, material.published)}
                        className={`${
                          material.published 
                            ? 'text-yellow-500 hover:text-yellow-700' 
                            : 'text-green-500 hover:text-green-700'
                        }`}
                      >
                        {material.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => handleDeleteClick(material.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={deleteModal.open}
        onClose={cancelDelete}
        title="Confirm Delete"
        size="small"
      >
        <div className="p-6">
          <p className="mb-6">Are you sure you want to delete this study material? This action cannot be undone.</p>
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudyMaterialList; 