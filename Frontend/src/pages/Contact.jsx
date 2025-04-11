import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Simulate form submission
    try {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful submission
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! We will get back to you shortly.'
      });
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'There was an error submitting your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero" style={{
        position: "relative",
        backgroundImage: "url('https://img.freepik.com/free-photo/abstract-blur-defocused-coffee-shop-cafe-interior_1203-1974.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "100px 0",
        color: "#fff",
        textAlign: "center",
        filter: "brightness(0.8)"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1
        }}></div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="hero-content">
            <h1 style={{ fontWeight: "bold" }}>Contact Us</h1>
            <p>We're here to help and answer any questions you might have. We look forward to hearing from you.</p>
          </div>
        </div>
      </section>
      
      <section className="contact-info-section">
        <div className="container" style={{ padding: "20px" }}>
          <div className="contact-info-grid" style={{ 
            gap: "20px", 
            display: "flex", 
            justifyContent: "center", 
            flexWrap: "wrap" 
          }}>
            <div className="contact-info-card" style={{ 
              padding: "30px", 
              borderRadius: "15px", 
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", 
              textAlign: "center", 
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              backgroundColor: "#fff",
              width: "250px",
              margin: "10px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
            }}
            >
              <div className="info-icon" style={{ marginBottom: "15px" }}>
                <i className="fas fa-map-marker-alt" style={{ fontSize: "24px", color: "#0077b6" }}></i>
              </div>
              <h3>Visit Us</h3>
              <p>Office No. 519, B Tower, Ithum Tower</p>
              <p>Noida Sector 62, Uttar Pradesh 201309</p>
              <p>India</p>
            </div>
            
            <div className="contact-info-card" style={{ 
              padding: "30px", 
              borderRadius: "15px", 
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", 
              textAlign: "center", 
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              backgroundColor: "#fff",
              width: "250px",
              margin: "10px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
            }}
            >
              <div className="info-icon" style={{ marginBottom: "15px" }}>
                <i className="fas fa-phone-alt" style={{ fontSize: "24px", color: "#0077b6" }}></i>
              </div>
              <h3>Call Us</h3>
              <p>Phone: +91 8882855844</p>
              <p>Toll Free: 0120-4438-111</p>
              <p>Monday to Saturday, 10:00 AM to 6:30 PM</p>
            </div>
            
            <div className="contact-info-card" style={{ 
              padding: "30px", 
              borderRadius: "15px", 
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", 
              textAlign: "center", 
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              backgroundColor: "#fff",
              width: "300px",
              margin: "10px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
            }}
            >
              <div className="info-icon" style={{ marginBottom: "15px" }}>
                <i className="fas fa-envelope" style={{ fontSize: "24px", color: "#0077b6" }}></i>
              </div>
              <h3>Email Us</h3>
              <p>General Inquiries: info@futureindoglobalservices.com<br />
              Enquiry: enquiry@futureindoglobalservices.com</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-container">
              <h2>Send Us a Message</h2>
              <p>Fill out the form below, and we'll get back to you as soon as possible.</p>
              
              {submitStatus && (
                <div className={`alert alert-${submitStatus.type}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Your email address"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone (Optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
            
            <div className="contact-map">
              <h2>Find Us</h2>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0830313310503!2d77.36992837528886!3d28.627273475667632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a1c8e21a39%3A0xcab1ad9edd7cc086!2sSearch%20My%20College!5e0!3m2!1sen!2sin!4v1744276368150!5m2!1sen!2sin"
                  width="100%"
                  height="500"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              
              <div className="social-links">
                <h3>Connect With Us</h3>
                <div className="social-icons">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How can I enroll in a course?</h3>
              <p>You can enroll in any of our courses by creating an account, browsing our course catalog, and selecting the course you wish to take. Follow the enrollment instructions to complete the process.</p>
            </div>
            
            <div className="faq-item">
              <h3>Do you offer refunds?</h3>
              <p>Yes, we offer a 7-day money-back guarantee for all our courses. If you're not satisfied with the course content, you can request a refund within 7 days of purchase.</p>
            </div>
            
            <div className="faq-item">
              <h3>How long do I have access to a course?</h3>
              <p>Once enrolled, you have lifetime access to the course materials, including any future updates to the content.</p>
            </div>
            
            <div className="faq-item">
              <h3>Do you offer certificates upon completion?</h3>
              <p>Yes, we provide digital certificates for all completed courses. These certificates can be downloaded and shared on your professional profiles.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 