import React from 'react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    role: "MBBS Graduate, Delhi",
    image: "/images/testimonials/testimonial1.jpg",
    text: "The NExT preparation program helped me clear the exam with excellent marks. The mock tests and clinical case discussions were particularly helpful for the practical component."
  },
  {
    id: 2,
    name: "Dr. Rahul Verma",
    role: "Medical Student, Mumbai",
    image: "/images/testimonials/testimonial2.jpg",
    text: "I was struggling with the clinical aspects of NExT preparation. The simulation training and case-based discussions offered by this program significantly improved my confidence."
  },
  {
    id: 3,
    name: "Dr. Anjali Patel",
    role: "House Surgeon, Bangalore",
    image: "/images/testimonials/testimonial3.jpg",
    text: "The faculty's expertise and the comprehensive study material made a huge difference in my NExT preparation. I'm thankful for the personalized guidance throughout my journey."
  }
];

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      <div className="testimonials-wrapper">
        {testimonials.map((testimonial) => (
          <div className="testimonial-card" key={testimonial.id}>
            <div className="testimonial-content">
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials; 