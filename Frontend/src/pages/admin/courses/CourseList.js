import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';
import Modal from '../../../components/Modal';
import apiService from '../../../services/apiService';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      // Simulating API call with mock data
      setTimeout(() => {
        const mockData = [
          {
            id: 1,
            title: 'React.js Complete Course',
            category: 'Frontend',
            instructor: 'John Doe',
            level: 'Intermediate',
            duration: '12 weeks',
            totalLessons: 24,
            price: 49.99,
            students: 356,
            createdAt: '2023-09-12',
            published: true
          },
          {
            id: 2,
            title: 'Node.js Backend Development',
            category: 'Backend',
            instructor: 'Jane Smith',
            level: 'Advanced',
            duration: '10 weeks',
            totalLessons: 20,
            price: 59.99,
            students: 214,
            createdAt: '2023-10-05',
            published: true
          },
          {
            id: 3,
            title: 'Data Structures & Algorithms',
            category: 'Computer Science',
            instructor: 'Michael Johnson',
            level: 'Advanced',
            duration: '16 weeks',
            totalLessons: 32,
            price: 79.99,
            students: 189,
            createdAt: '2023-08-18',
            published: false
          },
          {
            id: 4,
            title: 'UI/UX Design Fundamentals',
            category: 'Design',
            instructor: 'Sarah Williams',
            level: 'Beginner',
            duration: '8 weeks',
            totalLessons: 16,
            price: 39.99,
            students: 427,
            createdAt: '2023-11-02',
            published: true
          }
        ];
        setCourses(mockData);
        setLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to fetch courses. Please try again.');
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
      
      setCourses(prevCourses => 
        prevCourses.filter(course => course.id !== deleteModal.id)
      );
      
      setDeleteModal({ open: false, id: null });
      setAlert({
        type: 'success',
        message: 'Course deleted successfully'
      });
      
      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Failed to delete course'
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
      
      setCourses(prevCourses => 
        prevCourses.map(course => 
          course.id === id ? { ...course, published: !currentStatus } : course
        )
      );
      
      setAlert({
        type: 'success',
        message: `Course ${currentStatus ? 'unpublished' : 'published'} successfully`
      });
      
      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Failed to update course status'
      });
    }
  };

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Link to="/admin/courses/new">
          <Button variant="primary">Add New Course</Button>
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
          placeholder="Search by title, category, instructor, or level..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center p-4">Loading courses...</div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center p-4">
          {searchTerm 
            ? "No courses found matching your search."
            : "No courses available. Click 'Add New Course' to create one."}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border text-left">Title</th>
                <th className="py-2 px-4 border text-left">Category</th>
                <th className="py-2 px-4 border text-left">Instructor</th>
                <th className="py-2 px-4 border text-left">Level</th>
                <th className="py-2 px-4 border text-left">Lessons</th>
                <th className="py-2 px-4 border text-left">Price</th>
                <th className="py-2 px-4 border text-left">Students</th>
                <th className="py-2 px-4 border text-left">Status</th>
                <th className="py-2 px-4 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{course.title}</td>
                  <td className="py-2 px-4 border">{course.category}</td>
                  <td className="py-2 px-4 border">{course.instructor}</td>
                  <td className="py-2 px-4 border">{course.level}</td>
                  <td className="py-2 px-4 border">{course.totalLessons}</td>
                  <td className="py-2 px-4 border">${course.price}</td>
                  <td className="py-2 px-4 border">{course.students}</td>
                  <td className="py-2 px-4 border">
                    <span className={`px-2 py-1 rounded text-xs ${
                      course.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {course.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">
                    <div className="flex space-x-2">
                      <Link to={`/admin/courses/${course.id}/lessons`}>
                        <button className="text-blue-500 hover:text-blue-700">
                          Lessons
                        </button>
                      </Link>
                      <Link to={`/admin/courses/${course.id}/edit`}>
                        <button className="text-blue-500 hover:text-blue-700">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => togglePublish(course.id, course.published)}
                        className={`${
                          course.published 
                            ? 'text-yellow-500 hover:text-yellow-700' 
                            : 'text-green-500 hover:text-green-700'
                        }`}
                      >
                        {course.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => handleDeleteClick(course.id)}
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
          <p className="mb-6">Are you sure you want to delete this course? This will remove all associated lessons and student enrollments. This action cannot be undone.</p>
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

export default CourseList; 