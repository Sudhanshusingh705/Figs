import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [isVisible, setIsVisible] = useState(false);
  const [counter, setCounter] = useState({
    students: 0,
    instructors: 0,
    courses: 0,
    successRate: 0
  });
  
  useEffect(() => {
    // Start the counter animation when component mounts
    setIsVisible(true);
    
    // Animate counter
    const duration = 2000; // 2 seconds
    const interval = 20; // Update every 20ms
    const steps = duration / interval;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      
      setCounter({
        students: Math.ceil((currentStep / steps) * 10000),
        instructors: Math.ceil((currentStep / steps) * 50),
        courses: Math.ceil((currentStep / steps) * 120),
        successRate: Math.ceil((currentStep / steps) * 95)
      });
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  const teamMembers = [
      {
        id: 1,
        name: 'Dr. Rajesh Sharma',
        role: 'Founder & Medical Director',
        image: require('../assets/images/Doctors/doc1.jpg'),
        bio: 'Dr. Rajesh Sharma has over 15 years of experience in medical education. He founded FIGS Medical Education to provide quality training to medical students preparing for their exams.',
        specialization: 'Cardiology',
        education: 'MBBS, MD (AIIMS Delhi)',
        awards: ['Best Medical Educator 2020', 'Innovation in Teaching Award 2018']
      },
      {
        id: 2,
        name: 'Dr. Sunil Verma',
        role: 'NExT Specialist & Lead Instructor',
        image: require('../assets/images/Doctors/doc2.jpg'),
        bio: 'Dr. Verma specializes in preparing students for the NExT exam with his comprehensive knowledge of the curriculum and experience as an examiner.',
        specialization: 'Internal Medicine',
        education: 'MBBS, MD (PGIMER Chandigarh)',
        awards: ['Outstanding Contribution to Medical Education 2021']
      },
      {
        id: 3,
        name: 'Dr. Amit Desai  ',
        role: 'Clinical Skills Trainer',
        image: require('../assets/images/Doctors/doc3.jpg'),
        bio: 'Dr. Patel focuses on teaching clinical skills and practical examination techniques to ensure students are well-prepared for their clinical assessments.',
        specialization: 'Surgery',
        education: 'MBBS, MS (KEM Hospital, Mumbai)',
        awards: ['Excellence in Clinical Teaching 2019', 'Best Medical Educator 2021']
      },
      {
        id: 4,
        name: 'Dr. Priya Patel',
        role: 'Medical Education Researcher',
        image: require('../assets/images/Doctors/doc4.jpg'),
        bio: 'With a PhD in Medical Education, Dr. Desai develops innovative teaching methodologies and creates comprehensive study materials for our students.',
        specialization: 'Medical Education',
        education: 'MBBS, PhD in Medical Education (JIPMER Pondicherry)',
        awards: ['Research Excellence Award 2022', 'Innovation in Medical Education 2020']
      }
  ];
  
  // Vision & Mission data
  const visionPoints = [
    {
      icon: 'fa-lightbulb',
      title: 'Excellence in Medical Education',
      description: 'Setting new standards of quality and innovation in medical education across India'
    },
    {
      icon: 'fa-users',
      title: 'Inclusive Learning',
      description: 'Making quality medical education accessible to students from all backgrounds and regions'
    },
    {
      icon: 'fa-globe',
      title: 'Global Recognition',
      description: 'Enabling Indian medical students to meet international standards and achieve global recognition'
    },
    {
      icon: 'fa-rocket',
      title: 'Continuous Innovation',
      description: 'Pioneering new teaching methodologies and technologies to enhance learning outcomes'
    }
  ];
  
  const missionPoints = [
    {
      icon: 'fa-graduation-cap',
      title: 'Comprehensive Learning',
      description: 'Provide comprehensive, up-to-date educational resources that prepare students for success'
    },
    {
      icon: 'fa-hands-helping',
      title: 'Personalized Support',
      description: 'Offer personalized guidance and support to help each student achieve their full potential'
    },
    {
      icon: 'fa-chart-line',
      title: 'Measurable Outcomes',
      description: 'Focus on measurable improvements in student performance and exam success rates'
    },
    {
      icon: 'fa-handshake',
      title: 'Industry Partnerships',
      description: 'Foster partnerships with medical institutions to align education with real-world requirements'
    }
  ];
  
  const milestones = [
    {
      year: 2015,
      title: 'Founded in Mumbai',
      description: 'FIGS Medical Education was established in Mumbai with a vision to revolutionize medical exam preparation for Indian students.'
    },
    {
      year: 2017,
      title: 'Online Platform Launch',
      description: 'Launched our comprehensive online learning platform, making quality education accessible to students across India and neighboring countries.'
    },
    {
      year: 2019,
      title: 'NExT Exam Focus',
      description: 'Developed specialized courses for NExT exam preparation, achieving a 95% success rate for our students from various medical colleges across India.'
    },
    {
      year: 2020,
      title: 'Virtual Learning Expansion',
      description: 'Expanded our virtual learning capabilities in response to the global pandemic, providing uninterrupted education to medical students throughout India.'
    },
    {
      year: 2021,
      title: 'Mobile App Launch',
      description: 'Released our mobile application, allowing students to learn anytime, anywhere with interactive features optimized for diverse internet connectivity across India.'
    },
    {
      year: 2023,
      title: 'Pan-India Expansion',
      description: 'Expanded our services with physical centers in Delhi, Chennai, Kolkata, and Hyderabad, offering specialized resources for students across the country.'
    }
  ];
  
  const testimonials = [
      {
        id: 1,
        name: 'Dr. Vikram Singh',
        role: 'Former Student, Now Practicing Physician at AIIMS',
        content: 'The NExT preparation course was exactly what I needed. The instructors are knowledgeable and the practice questions were very similar to the actual exam. I credit my success to FIGS Medical Education.',
        image: require('../assets/images/testimonials/test1.jpg'),
        rating: 5
      },
      {
        id: 2,
        name: 'Dr. Priya Sharma',
        role: 'Recent Medical Graduate from Grant Medical College',
        content: 'I had struggled with clinical assessments, but after taking the clinical skills course, I passed with confidence. The personalized feedback and hands-on practice sessions made all the difference in my performance.',
        image: require('../assets/images/testimonials/test2.jpg'),
        rating: 5
      },
      {
        id: 3,
        name: 'Rahul Mehta',
        role: 'Final Year Medical Student at KEM Hospital',
        content: 'The online platform is user-friendly and the content is comprehensive. The mock exams really helped me identify my weak areas and focus my studying. I particularly appreciated the detailed explanations for each question.',
        image: require('../assets/images/testimonials/test3.jpg'),
        rating: 4
      },
      {
        id: 4,
        name: 'Dr. Khushi Singh',
        role: 'International Medical Graduate from Maharashtra',
        content: 'As an IMG, I found the courses specifically designed for international students very helpful. The instructors understand our unique challenges and provided targeted strategies to overcome them. I can proudly say I am now licensed to practice in the US.',
        image: require('../assets/images/testimonials/test4.jpg'),
        rating: 5
      }
  ];
  
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
        <i 
        key={index} 
        className={`fas fa-star ${index < rating ? 'filled' : 'empty'}`}
        ></i>
    ));
  };
  
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-overlay"></div>
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="about-hero-content"
          >
            <motion.h1 
              className="about-hero-title text-white"
              variants={fadeIn}
            >
              About <span className="text-highlight">FIGS</span> <span className="text-gradient-white">Medical Education</span>
            </motion.h1>
            <motion.p 
              className="about-hero-subtitle"
              variants={fadeIn}
            >
              Empowering the next generation of medical professionals through innovative education and personalized learning
            </motion.p>
            <motion.div 
              className="about-hero-buttons"
              variants={fadeIn}
            >
              <a href="#vision" className="btn btn-primary me-3">Our Vision</a>
              <a href="#mission" className="btn btn-outline-light">Our Mission</a>
            </motion.div>
          </motion.div>
        </Container>
        <div className="about-hero-shape-1"></div>
        <div className="about-hero-shape-2"></div>
      </section>
      
      {/* Stats Counter Section */}
      <section className="about-stats-section">
        <Container>
          <Row>
            <Col md={3} sm={6} className="mb-4 mb-md-0">
              <motion.div 
                className="about-stat-card"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: isVisible ? 1 : 0.8, opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="about-stat-icon">
                  <i className="fas fa-user-graduate"></i>
                </div>
                <h3 className="about-stat-number">{counter.students.toLocaleString()}+</h3>
                <p className="about-stat-title">Students Trained</p>
              </motion.div>
            </Col>
            
            <Col md={3} sm={6} className="mb-4 mb-md-0">
              <motion.div 
                className="about-stat-card"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: isVisible ? 1 : 0.8, opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="about-stat-icon">
                  <i className="fas fa-chalkboard-teacher"></i>
                </div>
                <h3 className="about-stat-number">{counter.instructors}+</h3>
                <p className="about-stat-title">Expert Instructors</p>
              </motion.div>
            </Col>
            
            <Col md={3} sm={6} className="mb-4 mb-md-0">
              <motion.div 
                className="about-stat-card"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: isVisible ? 1 : 0.8, opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="about-stat-icon">
                  <i className="fas fa-book-medical"></i>
            </div>
                <h3 className="about-stat-number">{counter.courses}+</h3>
                <p className="about-stat-title">Specialized Courses</p>
              </motion.div>
            </Col>
            
            <Col md={3} sm={6}>
              <motion.div 
                className="about-stat-card"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: isVisible ? 1 : 0.8, opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="about-stat-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3 className="about-stat-number">{counter.successRate}%</h3>
                <p className="about-stat-title">Success Rate</p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Vision Section */}
      <section id="vision" className="vision-section">
        <div className="vision-bg-pattern"></div>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Our Vision</h2>
            <div className="section-title-underline mx-auto"></div>
            <p className="section-subtitle">
              Transforming medical education in India through innovation, accessibility, and excellence
            </p>
          </motion.div>
          
          <Row className="vision-cards-container">
            {visionPoints.map((point, index) => (
              <Col lg={3} md={6} className="mb-4" key={index}>
                <motion.div 
                  className="vision-card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 40px rgba(0, 86, 179, 0.15)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="vision-card-icon">
                    <i className={`fas ${point.icon}`}></i>
                  </div>
                  <h3 className="vision-card-title">{point.title}</h3>
                  <p className="vision-card-text">{point.description}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
      {/* Who We Are Section */}
      <div className="about-main-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title about-title-enhanced">Who We Are</h2>
            <div className="section-title-underline mx-auto"></div>
          </motion.div>
          
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
                <div className="about-content">
                <p className="about-text-enhanced">
                  <strong>FIGS</strong> (Future Indo Global Service) was established in 2025 in Noida with a 
                  singular focus to provide exceptional education and training to medical 
                  students and professionals across India. Our institution has grown to 
                  become a trusted name in medical education, particularly for NEXT
                  exam preparation and continued medical education.
                </p>
                <p className="about-text-enhanced">
                  We offer a comprehensive range of courses designed by experienced 
                  Indian medical professionals and educators. Our curriculum is regularly 
                  updated to reflect the latest developments in medical science and 
                  examination standards of the National Medical Commission.
                </p>
                
                <div className="about-features enhanced">
                  <div className="about-feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-user-md"></i>
                    </div>
                    <div className="feature-content">
                      <h4>Expert-Led Instruction</h4>
                      <p>Learn from practicing physicians and specialists with years of teaching experience</p>
                    </div>
                  </div>
                  
                  <div className="about-feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-laptop-medical"></i>
                    </div>
                    <div className="feature-content">
                      <h4>Advanced Learning Platform</h4>
                      <p>Access comprehensive study materials, practice questions, and simulated exams</p>
                    </div>
                  </div>
                  
                  <div className="about-feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-user-graduate"></i>
                    </div>
                    <div className="feature-content">
                      <h4>Personalized Approach</h4>
                      <p>Receive individualized attention and tailored learning plans to address your needs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="about-image-wrapper enhanced">
                <img 
                  src={require('../assets/images/about/who we are.jpg')}
                  alt="Medical professionals at FIGS" 
                  className="about-main-image"
                />
                <div className="about-image-caption">
                  FIGS Campus - Noida
                </div>
                <div className="about-image-overlay">
                  <div className="about-overlay-content">
                    <h3>Our Commitment</h3>
                    <p>We're committed to excellence in medical education and supporting the next generation of healthcare professionals in India.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Mission Section */}
      <section id="mission" className="mission-section enhanced">
        <div className="mission-bg-pattern"></div>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title mission-title-enhanced">Our Mission & Values</h2>
            <div className="section-title-underline mx-auto"></div>
            <p className="section-subtitle mission-subtitle-enhanced">
              Driving positive change in medical education through commitment to excellence, innovation, and student success
            </p>
          </motion.div>
          
          <Row className="align-items-center mission-main-row">
            <Col lg={6} className="order-lg-2 mb-5 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mission-image-wrapper"
              >
                <img 
                  src={require('../assets/images/about/mission.jpg')} 
                  alt="FIGS Medical Education Mission" 
                  className="mission-image enhanced"
                />
                <div className="mission-image-shape enhanced"></div>
              </motion.div>
            </Col>
            
            <Col lg={6} className="order-lg-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mission-content enhanced"
              >
                <p className="mission-text enhanced">
                  At <strong>FIGS</strong> (Future Indo Global Service), established in 2025 in Noida, our mission is to empower Indian medical students and professionals with the knowledge, skills, and confidence they need to excel in their examinations and careers. We are committed to educational excellence, innovation, and student success across the diverse healthcare landscape of India.
                </p>
                
                <div className="mission-values enhanced">
                  <div className="value-row">
                    <motion.div 
                      className="value-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                    >
                        <div className="value-icon">
                        <i className="fas fa-star"></i>
                      </div>
                      <h4>Excellence</h4>
                      <p>Commitment to the highest standards in medical education</p>
                    </motion.div>
                    
                    <motion.div 
                      className="value-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                    >
                        <div className="value-icon">
                          <i className="fas fa-users"></i>
                      </div>
                      <h4>Collaboration</h4>
                      <p>Fostering teamwork and peer learning in medical training</p>
                    </motion.div>
                      </div>
                      
                  <div className="value-row">
                    <motion.div 
                      className="value-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                    >
                        <div className="value-icon">
                          <i className="fas fa-lightbulb"></i>
                      </div>
                      <h4>Innovation</h4>
                      <p>Embracing new teaching methodologies and technologies</p>
                    </motion.div>
                    
                    <motion.div 
                      className="value-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                    >
                        <div className="value-icon">
                        <i className="fas fa-heart"></i>
                      </div>
                      <h4>Compassion</h4>
                      <p>Nurturing empathetic future healthcare professionals</p>
                    </motion.div>
                      </div>
                    </div>
                    
                <motion.blockquote 
                  className="mission-quote enhanced"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <i className="fas fa-quote-left quote-icon"></i>
                  <p>We believe that exceptional medical education creates exceptional physicians who will transform healthcare for generations to come across India and beyond.</p>
                  <footer className="blockquote-footer">Mr. Rajeev Kumar, <cite title="Source Title">Founder & Managing Director</cite></footer>
                </motion.blockquote>
              </motion.div>
            </Col>
          </Row>
          
          <Row className="mt-5 pt-5 mission-points-row">
            <Col lg={12} className="text-center mb-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="mission-subtitle">How We Accomplish Our Mission</h3>
                <div className="section-title-underline mx-auto"></div>
              </motion.div>
            </Col>
            
            {missionPoints.map((point, index) => (
              <Col md={6} lg={3} className="mb-4" key={index}>
                <motion.div 
                  className="mission-action-card enhanced"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 15px 30px rgba(0, 86, 179, 0.2)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="mission-action-icon">
                    <i className={`fas ${point.icon}`}></i>
                  </div>
                  <h4 className="mission-action-title">{point.title}</h4>
                  <p className="mission-action-text">{point.description}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
      {/* Our Journey Timeline */}
      <section className="timeline-section enhanced">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Our Journey</h2>
            <div className="section-title-underline mx-auto"></div>
            <p className="section-subtitle">Milestones that have shaped our institution and impacted thousands of medical careers</p>
          </motion.div>
          <div className="timeline enhanced">
            <div className="timeline-progress"></div>
            <motion.div 
              className="timeline-item enhanced left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5, 
                scale: 1.05, 
                boxShadow: "0 15px 40px rgba(0, 86, 179, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="timeline-badge enhanced">
                <span>2025</span>
              </div>
              <div className="timeline-panel enhanced">
                <div className="timeline-heading">
                  <h4>FIGS Established</h4>
                </div>
                <div className="timeline-body">
                  <p>FIGS (Future Indo Global Service) was established in Noida in 2025 as the parent domain, overseeing multiple domains.</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="timeline-item enhanced right"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5, 
                scale: 1.05, 
                boxShadow: "0 15px 40px rgba(0, 86, 179, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="timeline-badge enhanced">
                <span>2014</span>
              </div>
              <div className="timeline-panel enhanced">
                <div className="timeline-heading">
                  <h4>SMC (Search My College) Established</h4>
                </div>
                <div className="timeline-body">
                  <p>SMC was established in 2014, focusing on student career counseling for India and abroad.</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="timeline-item enhanced left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5, 
                scale: 1.05, 
                boxShadow: "0 15px 40px rgba(0, 86, 179, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="timeline-badge enhanced">
                <span>2025</span>
              </div>
              <div className="timeline-panel enhanced">
                <div className="timeline-heading">
                  <h4>SMT (Search My Trips) Established</h4>
                </div>
                <div className="timeline-body">
                  <p>SMT was established in 2025, focusing on travel and tourism services.</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="timeline-item enhanced right"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5, 
                scale: 1.05, 
                boxShadow: "0 15px 40px rgba(0, 86, 179, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="timeline-badge enhanced">
                <span>2025</span>
              </div>
              <div className="timeline-panel enhanced">
                <div className="timeline-heading">
                  <h4>SMM (Search My Medical) Established</h4>
                </div>
                <div className="timeline-body">
                  <p>SMM was established in 2025, focusing on comprehensive medical services.</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="timeline-item enhanced left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5, 
                scale: 1.05, 
                boxShadow: "0 15px 40px rgba(0, 86, 179, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="timeline-badge enhanced">
                <span>2025</span>
              </div>
              <div className="timeline-panel enhanced">
                <div className="timeline-heading">
                  <h4>NExT Exam Preparation</h4>
                </div>
                <div className="timeline-body">
                  <p>FIGS developed specialized courses for NExT exam preparation, achieving a high success rate for students.</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="timeline-item enhanced right"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5, 
                scale: 1.05, 
                boxShadow: "0 15px 40px rgba(0, 86, 179, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="timeline-badge enhanced">
                <span>2025</span>
              </div>
              <div className="timeline-panel enhanced">
                <div className="timeline-heading">
                  <h4>MBBS Program Support</h4>
                </div>
                <div className="timeline-body">
                  <p>FIGS expanded its offerings to support MBBS students with comprehensive resources and guidance.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
      
      {/* Team Section */}
      <section id="team" className="team-section">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Meet Our Expert Team</h2>
            <div className="section-title-underline mx-auto"></div>
            <p className="section-subtitle">Our team consists of experienced medical professionals, educators, and researchers dedicated to your success</p>
          </motion.div>
          
          <div className="team-members">
            <Row>
              {teamMembers.map((member, index) => (
                <Col lg={3} md={6} className="mb-4" key={member.id}>
                  <motion.div
                    className="team-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="team-card-image">
                      <motion.img 
                        src={member.image} 
                        alt={member.name} 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="team-social">
                        <motion.a 
                          href="#" 
                          className="social-icon"
                          whileHover={{ y: -3, color: "#0077B5" }}
                          transition={{ duration: 0.2 }}
                        >
                          <i className="fab fa-linkedin-in"></i>
                        </motion.a>
                        <motion.a 
                          href="#" 
                          className="social-icon"
                          whileHover={{ y: -3, color: "#1DA1F2" }}
                          transition={{ duration: 0.2 }}
                        >
                          <i className="fab fa-twitter"></i>
                        </motion.a>
                        <motion.a 
                          href="#" 
                          className="social-icon"
                          whileHover={{ y: -3, color: "#ea4335" }}
                          transition={{ duration: 0.2 }}
                        >
                          <i className="fas fa-envelope"></i>
                        </motion.a>
                      </div>
                    </div>
                    <div className="team-card-content">
                      <motion.h4 
                        className="team-name"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {member.name}
                      </motion.h4>
                      <motion.p 
                        className="team-role"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        {member.role}
                      </motion.p>
                      <div className="team-specialization">
                        <i className="fas fa-stethoscope"></i> {member.specialization}
                      </div>
                      <p className="team-bio">{member.bio}</p>
                      <div className="team-details">
                        <div className="team-education">
                          <i className="fas fa-graduation-cap"></i> {member.education}
                        </div>
                        <div className="team-awards">
                          {member.awards.map((award, i) => (
                            <motion.span 
                              key={i} 
                              className="team-award-badge"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 * i }}
                              viewport={{ once: true }}
                            >
                              <i className="fas fa-award"></i> {award}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Col>
                    ))}
            </Row>
          </div>
        </Container>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section enhanced">
        <div className="testimonials-bg-pattern"></div>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Success Stories</h2>
            <div className="section-title-underline mx-auto"></div>
            <p className="section-subtitle">Hear from our students who have transformed their medical careers with FIGS</p>
          </motion.div>
          
          <div className="testimonials-carousel">
            <Row>
              {testimonials.map((testimonial, index) => (
                <Col lg={6} className="mb-4" key={testimonial.id}>
                  <motion.div 
                    className="testimonial-card enhanced"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -8,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                      transition: { duration: 0.3 }
                    }}
                  >
                <div className="testimonial-content">
                      <div className="testimonial-quote-mark">
                        <i className="fas fa-quote-left"></i>
                      </div>
                      <div className="testimonial-rating">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="testimonial-text">"{testimonial.content}"</p>
                </div>
                    <div className="testimonial-footer enhanced">
                      <div className="testimonial-image">
                        <motion.img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <div className="testimonial-info">
                        <h4 className="testimonial-name">{testimonial.name}</h4>
                        <p className="testimonial-role">{testimonial.role}</p>
                      </div>
                      <div className="testimonial-quote-icon">
                        <i className="fas fa-quote-right"></i>
                </div>
              </div>
                  </motion.div>
                </Col>
            ))}
            </Row>
          </div>
        </Container>
      </section>
      
      {/* Contact CTa */}
      <section className="about-cta-section enhanced" style={{
        background: "linear-gradient(270deg, #0077b6, #00b4d8, #90e0ef, #caf0f8)",
        backgroundSize: "800% 800%",
        animation: "gradientAnimation 15s ease infinite",
        padding: "100px 0",
        color: "#fff",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div className="animated-patterns" style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          background: "url('https://www.transparenttextures.com/patterns/cubes.png')",
          opacity: "0.1",
          zIndex: 1
        }}></div>
        <Container style={{ position: "relative", zIndex: 2 }}>
          <Row className="justify-content-center">
            <Col lg={10}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="about-cta-container"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: "15px",
                  padding: "50px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
                }}
              >
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{ fontSize: "2.8rem", fontWeight: "bold", marginBottom: "20px" }}
                >
                  Ready to Start Your Medical Education Journey?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  style={{ fontSize: "1.3rem", marginBottom: "30px" }}
                >
                  Join thousands of Indian medical students who have transformed their learning and careers with FIGS Medical Education. Our expert-led courses, comprehensive resources, and supportive community are waiting for you.
                </motion.p>
                <div className="about-cta-buttons">
                  <Link to="/courses" className="btn btn-light btn-lg" style={{
                    marginRight: "15px",
                    padding: "15px 30px",
                    borderRadius: "30px",
                    transition: "transform 0.3s ease, background-color 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1)";
                    e.target.style.backgroundColor = "#90e0ef";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.backgroundColor = "transparent";
                  }}
                  >
                    Explore Our Courses
                  </Link>
                  <Link to="/contact" className="btn btn-outline-light btn-lg" style={{
                    padding: "15px 30px",
                    borderRadius: "30px",
                    transition: "transform 0.3s ease, background-color 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1)";
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.backgroundColor = "transparent";
                  }}
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
        <style>{`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </section>
    </div>
  );
};

export default About; 