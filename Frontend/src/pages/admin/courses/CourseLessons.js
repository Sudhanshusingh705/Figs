import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';
import Modal from '../../../components/Modal';
import apiService from '../../../services/apiService';

const CourseLessons = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, lessonId: null });
  const [lessonModal, setLessonModal] = useState({ open: false, isEdit: false, lessonData: null });

  useEffect(() => {
    fetchCourseAndLessons();
  }, [courseId]);

  const fetchCourseAndLessons = async () => {
    setLoading(true);
    try {
      // Simulating API call with mock data
      setTimeout(() => {
        // Mock course data
        const mockCourse = {
          id: courseId,
          title: courseId === '1' 
            ? 'React.js Complete Course' 
            : courseId === '2' 
              ? 'Node.js Backend Development' 
              : 'Unknown Course',
          thumbnail: 'https://example.com/course-thumbnail.jpg'
        };
        
        // Mock lessons data
        const mockLessons = [];
        
        if (courseId === '1') {
          mockLessons.push(
            {
              id: 1,
              title: 'Introduction to React',
              duration: '15 minutes',
              type: 'Video',
              order: 1,
              isPublished: true
            },
            {
              id: 2,
              title: 'React Components',
              duration: '25 minutes',
              type: 'Video',
              order: 2,
              isPublished: true
            },
            {
              id: 3,
              title: 'State and Props',
              duration: '30 minutes',
              type: 'Video',
              order: 3,
              isPublished: true
            },
            {
              id: 4,
              title: 'React Hooks',
              duration: '45 minutes',
              type: 'Video',
              order: 4,
              isPublished: false
            }
          );
        } else if (courseId === '2') {
          mockLessons.push(
            {
              id: 1,
              title: 'Introduction to Node.js',
              duration: '20 minutes',
              type: 'Video',
              order: 1,
              isPublished: true
            },
            {
              id: 2,
              title: 'Express.js Basics',
              duration: '35 minutes',
              type: 'Video',
              order: 2,
              isPublished: true
            },
            {
              id: 3,
              title: 'RESTful API Design',
              duration: '40 minutes',
              type: 'Video',
              order: 3,
              isPublished: true
            }
          );
        }
        
        setCourse(mockCourse);
        setLessons(mockLessons);
        setLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to fetch course and lessons. Please try again.');
      setLoading(false);
    }
  };

  // Delete lesson handlers
  const handleDeleteClick = (lessonId) => {
    setDeleteModal({ open: true, lessonId });
  };

  const confirmDelete = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setLessons(prevLessons => 
        prevLessons.filter(lesson => lesson.id !== deleteModal.lessonId)
      );
      
      setDeleteModal({ open: false, lessonId: null });
      setAlert({
        type: 'success',
        message: 'Lesson deleted successfully'
      });
      
      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Failed to delete lesson'
      });
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ open: false, lessonId: null });
  };

  // Add/Edit lesson handlers
  const handleAddLesson = () => {
    setLessonModal({
      open: true,
      isEdit: false,
      lessonData: {
        title: '',
        duration: '',
        type: 'Video',
        content: '',
        isPublished: false,
        order: lessons.length + 1
      }
    });
  };

  const handleEditLesson = (lesson) => {
    setLessonModal({
      open: true,
      isEdit: true,
      lessonData: { ...lesson }
    });
  };

  const closeLessonModal = () => {
    setLessonModal({ open: false, isEdit: false, lessonData: null });
  };

  const saveLesson = async (formData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (lessonModal.isEdit) {
        // Update existing lesson
        setLessons(prevLessons =>
          prevLessons.map(lesson =>
            lesson.id === formData.id ? formData : lesson
          )
        );
        
        setAlert({
          type: 'success',
          message: 'Lesson updated successfully'
        });
      } else {
        // Add new lesson with a new ID
        const newLesson = {
          ...formData,
          id: Math.max(0, ...lessons.map(l => l.id)) + 1
        };
        
        setLessons(prevLessons => [...prevLessons, newLesson]);
        
        setAlert({
          type: 'success',
          message: 'Lesson added successfully'
        });
      }
      
      closeLessonModal();
      
      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({
        type: 'error',
        message: `Failed to ${lessonModal.isEdit ? 'update' : 'add'} lesson`
      });
    }
  };

  // Reorder lessons
  const moveLesson = (id, direction) => {
    const lessonIndex = lessons.findIndex(lesson => lesson.id === id);
    if (
      (direction === 'up' && lessonIndex === 0) || 
      (direction === 'down' && lessonIndex === lessons.length - 1)
    ) {
      return;
    }
    
    const newLessons = [...lessons];
    const targetIndex = direction === 'up' ? lessonIndex - 1 : lessonIndex + 1;
    
    // Swap the lessons
    [newLessons[lessonIndex], newLessons[targetIndex]] = 
      [newLessons[targetIndex], newLessons[lessonIndex]];
    
    // Update order property
    newLessons.forEach((lesson, index) => {
      lesson.order = index + 1;
    });
    
    setLessons(newLessons);
  };

  // Toggle lesson publish status
  const togglePublish = async (id, currentStatus) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setLessons(prevLessons => 
        prevLessons.map(lesson => 
          lesson.id === id ? { ...lesson, isPublished: !currentStatus } : lesson
        )
      );
      
      setAlert({
        type: 'success',
        message: `Lesson ${currentStatus ? 'unpublished' : 'published'} successfully`
      });
      
      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Failed to update lesson status'
      });
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading course and lessons...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{course ? course.title : 'Course'} - Lessons</h1>
          <p className="text-gray-600">Manage lessons for this course</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            onClick={() => navigate('/admin/courses')}
          >
            Back to Courses
          </Button>
          <Button
            variant="primary"
            onClick={handleAddLesson}
          >
            Add New Lesson
          </Button>
        </div>
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

      {lessons.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No lessons yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new lesson.</p>
          <div className="mt-6">
            <Button variant="primary" onClick={handleAddLesson}>
              Add First Lesson
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lessons.map((lesson) => (
                <tr key={lesson.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="bg-gray-100 text-gray-700 w-8 h-8 flex items-center justify-center rounded-full font-medium text-sm">
                        {lesson.order}
                      </span>
                      <div className="flex flex-col space-y-1">
                        <button
                          onClick={() => moveLesson(lesson.id, 'up')}
                          disabled={lesson.order === 1}
                          className={`text-gray-500 hover:text-gray-700 ${lesson.order === 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => moveLesson(lesson.id, 'down')}
                          disabled={lesson.order === lessons.length}
                          className={`text-gray-500 hover:text-gray-700 ${lesson.order === lessons.length ? 'opacity-30 cursor-not-allowed' : ''}`}
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{lesson.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{lesson.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{lesson.duration}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        lesson.isPublished
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {lesson.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEditLesson(lesson)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => togglePublish(lesson.id, lesson.isPublished)}
                        className={`${
                          lesson.isPublished
                            ? 'text-yellow-600 hover:text-yellow-900'
                            : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {lesson.isPublished ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => handleDeleteClick(lesson.id)}
                        className="text-red-600 hover:text-red-900"
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

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={cancelDelete}
        title="Confirm Delete"
        size="small"
      >
        <div className="p-6">
          <p className="mb-6">Are you sure you want to delete this lesson? This action cannot be undone.</p>
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

      {/* Add/Edit Lesson Modal */}
      {lessonModal.open && (
        <LessonForm
          isOpen={lessonModal.open}
          onClose={closeLessonModal}
          onSave={saveLesson}
          isEdit={lessonModal.isEdit}
          lessonData={lessonModal.lessonData}
        />
      )}
    </div>
  );
};

// Lesson Form Component
const LessonForm = ({ isOpen, onClose, onSave, isEdit, lessonData }) => {
  const [formData, setFormData] = useState(lessonData || {
    title: '',
    duration: '',
    type: 'Video',
    content: '',
    isPublished: false,
    order: 1
  });

  const [errors, setErrors] = useState({});

  const lessonTypes = [
    'Video',
    'Text',
    'Quiz',
    'Assignment',
    'Presentation'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Lesson' : 'Add New Lesson'}
      size="large"
    >
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lesson Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter lesson title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lesson Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  {lessonTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration *
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.duration ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="E.g. 30 minutes, 1 hour"
                />
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-500">{errors.duration}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content / Description
              </label>
              <textarea
                name="content"
                value={formData.content || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded h-32"
                placeholder="Enter lesson content or description"
              />
            </div>

            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="isPublished"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
                Publish this lesson (make it visible to students)
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEdit ? 'Update Lesson' : 'Add Lesson'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CourseLessons; 