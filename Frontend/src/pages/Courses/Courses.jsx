import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiUsers, FiTag } from 'react-icons/fi';
import './Courses.css';

// Mock data - replace with actual API call
const mockCourses = [
  {
    id: 1,
    title: "NExT Comprehensive Course",
    description: "Complete preparation for NExT exam with comprehensive coverage of all subjects.",
    image: "/images/courses/next-course.jpg",
    duration: "12 months",
    enrolled: 250,
    price: 49999,
    discountedPrice: 39999,
    stream: "NExT",
    isFeatured: true
  },
  {
    id: 2,
    title: "MBBS Final Year Complete Package",
    description: "Thorough preparation for MBBS final year examinations with clinical case studies.",
    image: "/images/courses/mbbs-course.jpg",
    duration: "6 months",
    enrolled: 180,
    price: 29999,
    stream: "MBBS",
    isFeatured: false
  },
  // Add more mock courses as needed
];

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  useEffect(() => {
    // Simulating API call
    setCourses(mockCourses);
    setFilteredCourses(mockCourses);
  }, []);

  useEffect(() => {
    let filtered = courses;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply stream filter
    if (selectedStream) {
      filtered = filtered.filter(course => course.stream === selectedStream);
    }

    // Apply price filter
    if (priceRange) {
      switch (priceRange) {
        case 'under-20k':
          filtered = filtered.filter(course => 
            (course.discountedPrice || course.price) < 20000
          );
          break;
        case '20k-40k':
          filtered = filtered.filter(course => {
            const price = course.discountedPrice || course.price;
            return price >= 20000 && price < 40000;
          });
          break;
        case 'above-40k':
          filtered = filtered.filter(course => 
            (course.discountedPrice || course.price) >= 40000
          );
          break;
        default:
          break;
      }
    }

    setFilteredCourses(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedStream, priceRange, courses]);

  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <motion.div 
      className="courses-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="courses-hero">
        <div className="container">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our Courses
          </motion.h1>
          <motion.p
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Explore our comprehensive range of medical courses designed to help you excel in your career
          </motion.p>
        </div>
      </div>

      <div className="container">
        <motion.div 
          className="courses-filters"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="filter-group">
            <input
              type="text"
              className="search-input"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <select
              className="stream-select"
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
            >
              <option value="">All Streams</option>
              <option value="NExT">NExT</option>
              <option value="MBBS">MBBS</option>
              {/* Add more streams as needed */}
            </select>
          </div>
          <div className="filter-group">
            <select
              className="price-select"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="under-20k">Under ₹20,000</option>
              <option value="20k-40k">₹20,000 - ₹40,000</option>
              <option value="above-40k">Above ₹40,000</option>
            </select>
          </div>
        </motion.div>

        {currentCourses.length > 0 ? (
          <motion.div 
            className="courses-grid"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {currentCourses.map((course, index) => (
              <motion.div
                key={course.id}
                className="course-card"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="course-image">
                  <img src={course.image} alt={course.title} />
                  {course.isFeatured && (
                    <span className="course-badge">Featured</span>
                  )}
                </div>
                <div className="course-content">
                  <span className="stream-badge">{course.stream}</span>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-details">
                    <div className="course-info">
                      <span><FiClock /> {course.duration}</span>
                      <span><FiUsers /> {course.enrolled} enrolled</span>
                    </div>
                    <div className="course-price">
                      {course.discountedPrice ? (
                        <>
                          <span className="original-price">₹{course.price.toLocaleString()}</span>
                          <span className="discounted-price">₹{course.discountedPrice.toLocaleString()}</span>
                        </>
                      ) : (
                        <span className="price">₹{course.price.toLocaleString()}</span>
                      )}
                    </div>
                    <Link to={`/course/${course.id}`} className="btn-course">
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="no-courses">
            <h3>No courses found matching your criteria</h3>
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-button"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="pagination-button"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Courses; 