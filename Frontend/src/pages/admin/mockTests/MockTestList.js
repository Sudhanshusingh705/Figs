import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';
import Modal from '../../../components/Modal';
import apiService from '../../../services/apiService';

const MockTestList = () => {
  const [mockTests, setMockTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchMockTests();
  }, []);

  const fetchMockTests = async () => {
    setLoading(true);
    try {
      // Simulating API call with mock data
      setTimeout(() => {
        const mockData = [
          {
            id: 1,
            title: 'Full Stack Developer Mock Interview',
            category: 'Web Development',
            duration: 120,
            totalQuestions: 50,
            difficulty: 'Advanced',
            createdAt: '2023-10-15',
            published: true
          },
          {
            id: 2,
            title: 'Python Data Science Assessment',
            category: 'Data Science',
            duration: 90,
            totalQuestions: 40,
            difficulty: 'Intermediate',
            createdAt: '2023-10-18',
            published: false
          },
          {
            id: 3,
            title: 'AWS Cloud Practitioner Exam',
            category: 'Cloud Computing',
            duration: 60,
            totalQuestions: 65,
            difficulty: 'Beginner',
            createdAt: '2023-10-22',
            published: true
          }
        ];
        setMockTests(mockData);
        setLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to fetch mock tests. Please try again.');
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
      
      setMockTests(prevMockTests => 
        prevMockTests.filter(test => test.id !== deleteModal.id)
      );
      
      setDeleteModal({ open: false, id: null });
      setAlert({
        type: 'success',
        message: 'Mock test deleted successfully'
      });
      
      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Failed to delete mock test'
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
      
      setMockTests(prevMockTests => 
        prevMockTests.map(test => 
          test.id === id ? { ...test, published: !currentStatus } : test
        )
      );
      
      setAlert({
        type: 'success',
        message: `Mock test ${currentStatus ? 'unpublished' : 'published'} successfully`
      });
      
      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Failed to update mock test status'
      });
    }
  };

  const filteredMockTests = mockTests.filter(test => 
    test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mock Tests</h1>
        <Link to="/admin/mock-tests/new">
          <Button variant="primary">Add New Mock Test</Button>
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
          placeholder="Search by title or category..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center p-4">Loading mock tests...</div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : filteredMockTests.length === 0 ? (
        <div className="text-center p-4">
          {searchTerm 
            ? "No mock tests found matching your search."
            : "No mock tests available. Click 'Add New Mock Test' to create one."}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border text-left">Title</th>
                <th className="py-2 px-4 border text-left">Category</th>
                <th className="py-2 px-4 border text-left">Questions</th>
                <th className="py-2 px-4 border text-left">Duration (min)</th>
                <th className="py-2 px-4 border text-left">Difficulty</th>
                <th className="py-2 px-4 border text-left">Created</th>
                <th className="py-2 px-4 border text-left">Status</th>
                <th className="py-2 px-4 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMockTests.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{test.title}</td>
                  <td className="py-2 px-4 border">{test.category}</td>
                  <td className="py-2 px-4 border">{test.totalQuestions}</td>
                  <td className="py-2 px-4 border">{test.duration}</td>
                  <td className="py-2 px-4 border">{test.difficulty}</td>
                  <td className="py-2 px-4 border">{test.createdAt}</td>
                  <td className="py-2 px-4 border">
                    <span className={`px-2 py-1 rounded text-xs ${
                      test.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {test.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">
                    <div className="flex space-x-2">
                      <Link to={`/admin/mock-tests/${test.id}/questions`}>
                        <button className="text-blue-500 hover:text-blue-700">
                          Questions
                        </button>
                      </Link>
                      <Link to={`/admin/mock-tests/${test.id}/edit`}>
                        <button className="text-blue-500 hover:text-blue-700">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => togglePublish(test.id, test.published)}
                        className={`${
                          test.published 
                            ? 'text-yellow-500 hover:text-yellow-700' 
                            : 'text-green-500 hover:text-green-700'
                        }`}
                      >
                        {test.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => handleDeleteClick(test.id)}
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
          <p className="mb-6">Are you sure you want to delete this mock test? This action cannot be undone.</p>
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

export default MockTestList; 