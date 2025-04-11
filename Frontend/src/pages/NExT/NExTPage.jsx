import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import NextCourseSection from '../../components/CourseSections/NextCourseSection';
import test1 from '../../assets/images/testimonials/test1.jpg';
import test2 from '../../assets/images/testimonials/test2.jpg';
import test3 from '../../assets/images/testimonials/test3.jpg';
import test4 from '../../assets/images/testimonials/test4.jpg';
import './NExTPage.css';

const NExTPage = () => {
  const featuresRef = useRef(null);
  const curriculumRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const featureElements = document.querySelectorAll('.next-feature');
    const curriculumElements = document.querySelectorAll('.curriculum-item');
    const testimonialElements = document.querySelectorAll('.testimonial');

    featureElements.forEach(el => observer.observe(el));
    curriculumElements.forEach(el => observer.observe(el));
    testimonialElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="next-page">
      <div className="next-page-container">
        <motion.div 
          className="next-page-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="next-page-hero-content">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Master the National Exit Test (NExT)
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your Gateway to Medical Excellence - Comprehensive preparation for MBBS graduates
              with expert guidance, clinical skills training, and personalized learning paths.
            </motion.p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="badge success lg"
            >
              NMC Approved Curriculum
            </motion.div>
          </div>
        </motion.div>
        
        <section className="next-page-about" ref={featuresRef}>
          <div className="container">
            <div className="section-title">
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Why Choose Our NExT Program?
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Our comprehensive NExT preparation program is meticulously designed by leading medical educators 
                and experienced professionals. We combine cutting-edge learning methodologies with personalized 
                guidance to ensure your success in the National Exit Test. With a proven track record of excellence, 
                we offer an unparalleled learning experience that prepares you for both the theoretical and 
                practical aspects of medical practice.
              </motion.p>
            </div>
            
            <div className="next-features">
              <div className="next-feature">
                <div className="feature-content">
                  <h3>Clinical Excellence Program</h3>
                  <p>
                    Master essential clinical skills through our comprehensive hands-on training program, 
                    designed to build confidence in patient care and medical procedures.
                  </p>
                  <div className="feature-details">
                    <ul>
                      <li>Supervised clinical practice sessions</li>
                      <li>Real-world case study analysis</li>
                      <li>Advanced diagnostic techniques</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="next-feature">
                <div className="feature-content">
                  <h3>Expert Faculty Mentorship</h3>
                  <p>
                    Learn from India's leading medical educators and practitioners who bring years of 
                    experience in preparing students for national medical examinations.
                  </p>
                  <div className="feature-details">
                    <ul>
                      <li>One-on-one mentoring sessions</li>
                      <li>Personalized study plans</li>
                      <li>Regular performance reviews</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="next-feature">
                <div className="feature-content">
                  <h3>Comprehensive Assessment</h3>
                  <p>
                    Track your progress with our advanced assessment system that identifies your strengths 
                    and areas for improvement through regular evaluations.
                  </p>
                  <div className="feature-details">
                    <ul>
                      <li>Weekly mock tests</li>
                      <li>Detailed performance analytics</li>
                      <li>Adaptive question banks</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="next-feature">
                <div className="feature-content">
                  <h3>Updated Study Material</h3>
                  <p>
                    Access comprehensive study materials that are regularly updated to reflect the latest 
                    NMC guidelines and examination patterns.
                  </p>
                  <div className="feature-details">
                    <ul>
                      <li>Digital learning resources</li>
                      <li>Video lectures and tutorials</li>
                      <li>Practice question sets</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="next-feature">
                <div className="feature-content">
                  <h3>Personalized Learning Path</h3>
                  <p>
                    Experience a customized learning journey tailored to your specific needs and learning style, 
                    ensuring optimal preparation for the NExT examination.
                  </p>
                  <div className="feature-details">
                    <ul>
                      <li>Customized study schedules</li>
                      <li>Targeted weakness improvement</li>
                      <li>Progress tracking system</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="next-feature">
                <div className="feature-content">
                  <h3>Interactive Learning Experience</h3>
                  <p>
                    Engage in dynamic learning sessions that combine traditional teaching methods with 
                    modern educational technology for enhanced understanding.
                  </p>
                  <div className="feature-details">
                    <ul>
                      <li>Live interactive sessions</li>
                      <li>Group discussions</li>
                      <li>Virtual clinical scenarios</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <NextCourseSection />
        
        <section className="next-page-curriculum" ref={curriculumRef}>
          <div className="container">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Comprehensive NExT Curriculum
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our meticulously designed curriculum covers all aspects of the National Exit Test,
              ensuring thorough preparation for both theory and practical components.
            </motion.p>
            <div className="curriculum-grid">
              <div className="curriculum-item">
                <h3>Theory Excellence</h3>
                <ul>
                  <li>Comprehensive subject coverage</li>
                  <li>High-yield topic focus</li>
                  <li>Regular mock tests</li>
                  <li>Question bank access</li>
                  <li>Performance analytics</li>
                </ul>
              </div>
              <div className="curriculum-item">
                <h3>Clinical Mastery</h3>
                <ul>
                  <li>Hands-on clinical training</li>
                  <li>Case-based learning</li>
                  <li>Patient interaction skills</li>
                  <li>Diagnostic approach</li>
                  <li>Emergency management</li>
                </ul>
              </div>
              <div className="curriculum-item">
                <h3>Practical Skills</h3>
                <ul>
                  <li>Laboratory procedures</li>
                  <li>Medical equipment handling</li>
                  <li>Clinical examination techniques</li>
                  <li>Documentation practice</li>
                  <li>Communication skills</li>
                </ul>
              </div>
              <div className="curriculum-item">
                <h3>Exam Strategies</h3>
                <ul>
                  <li>Time management techniques</li>
                  <li>Answer writing skills</li>
                  <li>OSCE preparation</li>
                  <li>Viva preparation</li>
                  <li>Stress management</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <section className="next-testimonials" ref={testimonialsRef}>
          <div className="container">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Success Stories
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Learn from our distinguished alumni who have achieved excellence through our comprehensive NExT preparation program.
            </motion.p>
            <div className="testimonials-slider">
              <motion.div 
                className="testimonial"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="testimonial-content">
                  <p>"The NExT preparation program at FIGS is truly exceptional. Their comprehensive approach and expert guidance helped me develop both theoretical knowledge and practical skills. The clinical training was particularly outstanding."</p>
                </div>
                <div className="testimonial-author">
                  <img src={test1} alt="Dr. Rakesh Mahajan" />
                  <div>
                    <h4>Dr. Rakesh Mahajan</h4>
                    <p>Senior Consultant, 2023</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="testimonial"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="testimonial-content">
                  <p>"FIGS's structured approach to NExT preparation is unparalleled. The faculty's expertise and personalized mentoring were crucial to my success. Their focus on practical application sets them apart."</p>
                </div>
                <div className="testimonial-author">
                  <img src={test2} alt="Dr. Sandeep Vaishya" />
                  <div>
                    <h4>Dr. Sandeep Vaishya</h4>
                    <p>Neurosurgeon, 2023</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="testimonial"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="testimonial-content">
                  <p>"The interactive learning sessions and case-based discussions at FIGS were invaluable. Their innovative teaching methods and comprehensive study materials helped me excel in both theory and practical aspects."</p>
                </div>
                <div className="testimonial-author">
                  <img src={test3} alt="Dr. Hitesh Garg" />
                  <div>
                    <h4>Dr. Hitesh Garg</h4>
                    <p>Orthopedic Surgeon, 2023</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="testimonial"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="testimonial-content">
                  <p>"FIGS's NExT preparation program provided me with a strong foundation and confidence. Their systematic approach to learning and regular assessments helped me achieve excellence in my medical career."</p>
                </div>
                <div className="testimonial-author">
                  <img src={test4} alt="Dr. Harnarayan Singh" />
                  <div>
                    <h4>Dr. Harnarayan Singh</h4>
                    <p>Cardiologist, 2023</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        <motion.section 
          className="next-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="cta-container">
            <div className="cta-content">
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="cta-title"
              >
                Begin Your Journey to Success
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="cta-description"
              >
                Join our comprehensive NExT preparation program and take the first step towards your
                successful medical career. Limited seats available!
              </motion.p>
              <motion.div
                className="cta-button-wrapper"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.button 
                  className="cta-button"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(37, 99, 235, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  ENROLL NOW
                </motion.button>
              </motion.div>
            </div>
            <div className="cta-background-elements">
              <div className="floating-circle circle-1"></div>
              <div className="floating-circle circle-2"></div>
              <div className="floating-circle circle-3"></div>
              <div className="gradient-overlay"></div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default NExTPage; 