import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './AllCoursesPage.css';

// Extended mock data for demonstration
const allCourses = [
  {
    id: 1,
    title: 'Comprehensive NExT Step 1 Preparation',
    description: 'Master theoretical concepts and clinical knowledge with our structured program designed for NExT Step 1 success.',
    image: 'https://img.freepik.com/free-photo/medical-students-having-online-class-university_23-2149285268.jpg',
    duration: '6 months',
    enrolled: 1250,
    price: 49999,
    discountedPrice: 39999,
    isFeatured: true,
    category: 'Step 1',
    rating: 4.8
  },
  {
    id: 2,
    title: 'NExT Step 2 Clinical Skills Program',
    description: 'Enhance your clinical competencies through hands-on training and simulated patient interactions.',
    image: 'https://img.freepik.com/free-photo/medical-students-wearing-white-coats-studying-together_23-2149285257.jpg',
    duration: '4 months',
    enrolled: 875,
    price: 44999,
    discountedPrice: null,
    isFeatured: false,
    category: 'Step 2',
    rating: 4.7
  },
  {
    id: 3,
    title: 'NExT Fast Track Revision Course',
    description: 'Accelerated program focusing on high-yield topics and proven exam strategies for quick preparation.',
    image: 'https://img.freepik.com/free-photo/medical-students-studying-together-library_23-2149285242.jpg',
    duration: '2 months',
    enrolled: 2100,
    price: 24999,
    discountedPrice: 19999,
    isFeatured: true,
    category: 'Revision',
    rating: 4.9
  },
  {
    id: 4,
    title: 'Subject-wise NExT Preparation',
    description: 'Focused modules covering individual subjects with comprehensive study materials and assessments.',
    image: 'https://img.freepik.com/free-photo/medical-students-studying-with-teacher_23-2149285254.jpg',
    duration: '3 months',
    enrolled: 1560,
    price: 34999,
    discountedPrice: null,
    isFeatured: false,
    category: 'Step 1',
    rating: 4.6
  },
  {
    id: 5,
    title: 'Clinical Skills Mastery Program',
    description: 'Intensive hands-on training program focusing on essential clinical skills and patient interactions.',
    image: 'https://img.freepik.com/free-photo/young-doctor-getting-ready-work_23-2149284316.jpg',
    duration: '3 months',
    enrolled: 980,
    price: 39999,
    discountedPrice: 34999,
    isFeatured: true,
    category: 'Clinical Skills',
    rating: 4.8
  },
  {
    id: 6,
    title: 'Advanced Diagnostic Techniques',
    description: 'Master modern diagnostic methods and clinical decision-making with real case studies.',
    image: 'https://img.freepik.com/free-photo/medical-workers-analyzing-x-ray_23-2147666907.jpg',
    duration: '2 months',
    enrolled: 750,
    price: 29999,
    discountedPrice: null,
    category: 'Clinical Skills',
    rating: 4.7
  },
  {
    id: 7,
    title: 'Emergency Medicine Preparation',
    description: 'Specialized training in emergency medicine protocols and critical care management.',
    image: 'https://img.freepik.com/free-photo/team-doctors-examining-x-ray_23-2148980721.jpg',
    duration: '2 months',
    enrolled: 620,
    price: 27999,
    discountedPrice: 24999,
    category: 'Clinical Skills',
    rating: 4.9
  },
  {
    id: 8,
    title: 'Step 1 Theory Foundation',
    description: 'Build a strong theoretical foundation with comprehensive coverage of Step 1 subjects.',
    image: 'https://img.freepik.com/free-photo/medical-student-studying-library_23-2149285240.jpg',
    duration: '4 months',
    enrolled: 1100,
    price: 42999,
    discountedPrice: 39999,
    category: 'Step 1',
    rating: 4.6
  },
  {
    id: 9,
    title: 'Step 2 Advanced Practice',
    description: 'Advanced clinical scenarios and case-based learning for Step 2 excellence.',
    image: 'https://img.freepik.com/free-photo/medical-students-having-lecture_23-2149285265.jpg',
    duration: '3 months',
    enrolled: 890,
    price: 37999,
    discountedPrice: null,
    category: 'Step 2',
    rating: 4.8
  },
  {
    id: 10,
    title: 'Rapid Revision Program',
    description: 'Quick revision course covering high-yield topics for last-minute preparation.',
    image: 'https://img.freepik.com/free-photo/medical-student-studying-online_23-2149285238.jpg',
    duration: '1 month',
    enrolled: 1500,
    price: 19999,
    discountedPrice: 17999,
    category: 'Revision',
    rating: 4.7
  },
  {
    id: 11,
    title: 'Practical Skills Workshop',
    description: 'Intensive workshop focusing on practical aspects of medical procedures and examinations.',
    image: 'https://img.freepik.com/free-photo/medical-students-learning-with-skeleton-model_23-2149285255.jpg',
    duration: '2 months',
    enrolled: 680,
    price: 32999,
    discountedPrice: 29999,
    category: 'Clinical Skills',
    rating: 4.9
  },
  {
    id: 12,
    title: 'Complete NExT Bundle',
    description: 'Comprehensive package covering both Step 1 and Step 2 with additional practice materials.',
    image: 'https://img.freepik.com/free-photo/medical-students-having-group-discussion_23-2149285263.jpg',
    duration: '8 months',
    enrolled: 2200,
    price: 79999,
    discountedPrice: 69999,
    isFeatured: true,
    category: 'Step 1',
    rating: 4.9
  },
  {
    id: 13,
    title: 'Mock Test Series - Step 1',
    description: 'Extensive collection of mock tests with detailed explanations and performance analytics.',
    image: 'https://img.freepik.com/free-photo/medical-student-writing-notes_23-2149285237.jpg',
    duration: '2 months',
    enrolled: 1800,
    price: 22999,
    discountedPrice: 19999,
    category: 'Step 1',
    rating: 4.8
  },
  {
    id: 14,
    title: 'Clinical Case Studies Program',
    description: 'In-depth analysis of real clinical cases with expert guidance and discussions.',
    image: 'https://img.freepik.com/free-photo/medical-students-having-lesson_23-2149285261.jpg',
    duration: '3 months',
    enrolled: 720,
    price: 34999,
    discountedPrice: 31999,
    category: 'Step 2',
    rating: 4.7
  },
  {
    id: 15,
    title: 'Final Month Revision Sprint',
    description: 'Intensive revision program designed specifically for the final month before NExT.',
    image: 'https://img.freepik.com/free-photo/medical-students-studying-together_23-2149285244.jpg',
    duration: '1 month',
    enrolled: 950,
    price: 21999,
    discountedPrice: 18999,
    category: 'Revision',
    rating: 4.8
  }
];

const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    duration: 'all',
    priceRange: 'all'
  });

  const coursesPerPage = 12;

  useEffect(() => {
    // Simulating API call
    setCourses(allCourses);
    setFilteredCourses(allCourses);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, courses]);

  const applyFilters = () => {
    let filtered = [...courses];

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(course => course.category === filters.category);
    }

    // Apply duration filter
    if (filters.duration !== 'all') {
      filtered = filtered.filter(course => {
        const duration = parseInt(course.duration);
        switch (filters.duration) {
          case 'short': return duration <= 2;
          case 'medium': return duration > 2 && duration <= 4;
          case 'long': return duration > 4;
          default: return true;
        }
      });
    }

    // Apply price range filter
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(course => {
        const price = course.discountedPrice || course.price;
        switch (filters.priceRange) {
          case 'low': return price <= 20000;
          case 'medium': return price > 20000 && price <= 40000;
          case 'high': return price > 40000;
          default: return true;
        }
      });
    }

    setFilteredCourses(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const CourseCard = ({ course }) => {
    return (
      <motion.div
        className="course-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="course-image">
          <img src={course.image} alt={course.title} />
          {course.isFeatured && <span className="featured-badge">Featured</span>}
        </div>
        <div className="course-content">
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <div className="course-meta">
            <span><i className="far fa-clock"></i> {course.duration}</span>
            <span><i className="fas fa-user-graduate"></i> {course.enrolled} enrolled</span>
            <span><i className="fas fa-star"></i> {course.rating}</span>
          </div>
          <div className="course-footer">
            <div className="course-price">
              {course.discountedPrice ? (
                <>
                  <span className="original-price">₹{course.price}</span>
                  <span className="discounted-price">₹{course.discountedPrice}</span>
                </>
              ) : (
                <span className="price">₹{course.price}</span>
              )}
            </div>
            <Link to={`/courses/next/${course.id}`} className="view-details-btn">
              View Details
            </Link>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="all-courses-page">
      <motion.div 
        className="courses-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1>All NExT Preparation Courses</h1>
        <p>Browse our comprehensive collection of NExT preparation courses designed to help you excel in your medical career.</p>
      </motion.div>

      <div className="courses-container">
        {/* Filters Section */}
        <div className="courses-filters">
          <input
            type="text"
            placeholder="Search courses..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="search-input"
          />
          
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="Step 1">Step 1</option>
            <option value="Step 2">Step 2</option>
            <option value="Clinical Skills">Clinical Skills</option>
            <option value="Revision">Revision</option>
          </select>

          <select
            value={filters.duration}
            onChange={(e) => handleFilterChange('duration', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Durations</option>
            <option value="short">Short (≤ 2 months)</option>
            <option value="medium">Medium (3-4 months)</option>
            <option value="long">Long (> 4 months)</option>
          </select>

          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Prices</option>
            <option value="low">₹20,000 & Below</option>
            <option value="medium">₹20,001 - ₹40,000</option>
            <option value="high">Above ₹40,000</option>
          </select>
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {currentCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        )}

        {filteredCourses.length === 0 && (
          <div className="no-courses">
            <h3>No courses found</h3>
            <p>Try adjusting your filters to find more courses.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCoursesPage; 