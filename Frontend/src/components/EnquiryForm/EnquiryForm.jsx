import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import emailService from '../../services/emailService';
import { isValidEmail } from '../../utils/helpers';
import './EnquiryForm.css';

const steps = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Please provide your contact details'
  },
  {
    id: 'education',
    title: 'Educational Background',
    description: 'Tell us about your education'
  },
  {
    id: 'requirements',
    title: 'Requirements',
    description: 'What are you looking for?'
  },
  {
    id: 'confirmation',
    title: 'Confirm & Submit',
    description: 'Please verify your information'
  }
];

const EnquiryForm = ({ quiz, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      city: '',
      qualification: '',
      institute: '',
      graduationYear: '',
      specializationInterest: '',
      messageNote: '',
      preferredTime: '',
      receiveUpdates: true
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Full name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      phone: Yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
      city: Yup.string().required('City is required'),
      qualification: Yup.string().required('Qualification is required'),
      institute: Yup.string().required('Institute name is required'),
      graduationYear: Yup.number().min(1950).max(new Date().getFullYear() + 5).required('Graduation year is required'),
      specializationInterest: Yup.string().required('Specialization interest is required'),
      preferredTime: Yup.string().required('Preferred time for callback is required')
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError(null);
      
      try {
        const inquiryData = {
          ...values,
          quizId: quiz?.id,
          quizTitle: quiz?.title,
          inquirySource: 'website',
          inquiryDate: new Date().toISOString()
        };
        
        // Send the inquiry using the email service
        await emailService.sendQuizInquiry(quiz?.id, inquiryData);
        
        setIsSubmitSuccess(true);
      } catch (err) {
        setError(err.message || 'Failed to submit inquiry. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  const nextStep = () => {
    const fieldsToValidate = [];
    
    // Determine which fields to validate based on current step
    switch (currentStep) {
      case 0: // Personal Information
        fieldsToValidate.push('name', 'email', 'phone', 'city');
        break;
      case 1: // Educational Background
        fieldsToValidate.push('qualification', 'institute', 'graduationYear');
        break;
      case 2: // Requirements
        fieldsToValidate.push('specializationInterest', 'preferredTime');
        break;
      default:
        break;
    }
    
    // Validate only the fields for the current step
    const errors = {};
    fieldsToValidate.forEach(field => {
      try {
        formik.validateField(field);
        if (formik.errors[field]) {
          errors[field] = formik.errors[field];
        }
      } catch (error) {
        errors[field] = error.message;
      }
    });
    
    // Proceed only if no errors
    if (Object.keys(errors).length === 0) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    } else {
      // Touch the fields with errors to display validation messages
      const touchedFields = {};
      fieldsToValidate.forEach(field => {
        touchedFields[field] = true;
      });
      formik.setTouched({ ...formik.touched, ...touchedFields });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    formik.resetForm();
    setCurrentStep(0);
    setIsSubmitSuccess(false);
    setError(null);
  };

  if (isSubmitSuccess) {
    return (
      <div className="enquiry-form">
        <div className="enquiry-form__success">
          <i className="fas fa-check-circle"></i>
          <h3>Thank You for Your Enquiry!</h3>
          <p>We have received your details and will get back to you soon. A confirmation has been sent to your email.</p>
          <div className="enquiry-form__actions">
            <button className="enquiry-form__btn" onClick={handleReset}>Submit Another Enquiry</button>
            <button className="enquiry-form__btn enquiry-form__btn--outline" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Personal Information
        return (
          <div className="enquiry-form__step">
            <div className="enquiry-form__group">
              <label htmlFor="name">Full Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your full name"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="enquiry-form__error">{formik.errors.name}</div>
              )}
            </div>
            
            <div className="enquiry-form__group">
              <label htmlFor="email">Email Address*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your email address"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="enquiry-form__error">{formik.errors.email}</div>
              )}
            </div>
            
            <div className="enquiry-form__group">
              <label htmlFor="phone">Phone Number*</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your 10-digit phone number"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="enquiry-form__error">{formik.errors.phone}</div>
              )}
            </div>
            
            <div className="enquiry-form__group">
              <label htmlFor="city">City*</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your city"
              />
              {formik.touched.city && formik.errors.city && (
                <div className="enquiry-form__error">{formik.errors.city}</div>
              )}
            </div>
          </div>
        );
        
      case 1: // Educational Background
        return (
          <div className="enquiry-form__step">
            <div className="enquiry-form__group">
              <label htmlFor="qualification">Highest Qualification*</label>
              <select
                id="qualification"
                name="qualification"
                value={formik.values.qualification}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select your qualification</option>
                <option value="MBBS">MBBS</option>
                <option value="BDS">BDS</option>
                <option value="BAMS">BAMS</option>
                <option value="BHMS">BHMS</option>
                <option value="MD">MD</option>
                <option value="MS">MS</option>
                <option value="Other">Other</option>
              </select>
              {formik.touched.qualification && formik.errors.qualification && (
                <div className="enquiry-form__error">{formik.errors.qualification}</div>
              )}
            </div>
            
            <div className="enquiry-form__group">
              <label htmlFor="institute">Institute/College*</label>
              <input
                type="text"
                id="institute"
                name="institute"
                value={formik.values.institute}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your institute or college name"
              />
              {formik.touched.institute && formik.errors.institute && (
                <div className="enquiry-form__error">{formik.errors.institute}</div>
              )}
            </div>
            
            <div className="enquiry-form__group">
              <label htmlFor="graduationYear">Graduation Year*</label>
              <input
                type="number"
                id="graduationYear"
                name="graduationYear"
                value={formik.values.graduationYear}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your graduation year"
                min="1950"
                max={new Date().getFullYear() + 5}
              />
              {formik.touched.graduationYear && formik.errors.graduationYear && (
                <div className="enquiry-form__error">{formik.errors.graduationYear}</div>
              )}
            </div>
          </div>
        );
        
      case 2: // Requirements
        return (
          <div className="enquiry-form__step">
            <div className="enquiry-form__group">
              <label htmlFor="specializationInterest">Specialization Interest*</label>
              <select
                id="specializationInterest"
                name="specializationInterest"
                value={formik.values.specializationInterest}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select your interest</option>
                <option value="NExT Preparation">NExT Preparation</option>
                <option value="NEET-PG">NEET-PG</option>
                <option value="USMLE">USMLE</option>
                <option value="PLAB">PLAB</option>
                <option value="Clinical Practice">Clinical Practice</option>
                <option value="Research">Research</option>
                <option value="Other">Other</option>
              </select>
              {formik.touched.specializationInterest && formik.errors.specializationInterest && (
                <div className="enquiry-form__error">{formik.errors.specializationInterest}</div>
              )}
            </div>
            
            <div className="enquiry-form__group">
              <label htmlFor="preferredTime">Preferred Time for Callback*</label>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formik.values.preferredTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select preferred time</option>
                <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
              </select>
              {formik.touched.preferredTime && formik.errors.preferredTime && (
                <div className="enquiry-form__error">{formik.errors.preferredTime}</div>
              )}
            </div>
            
            <div className="enquiry-form__group">
              <label htmlFor="messageNote">Additional Message (Optional)</label>
              <textarea
                id="messageNote"
                name="messageNote"
                value={formik.values.messageNote}
                onChange={formik.handleChange}
                rows="3"
                placeholder="Any specific questions or requirements?"
              ></textarea>
            </div>
            
            <div className="enquiry-form__group enquiry-form__group--checkbox">
              <input
                type="checkbox"
                id="receiveUpdates"
                name="receiveUpdates"
                checked={formik.values.receiveUpdates}
                onChange={formik.handleChange}
              />
              <label htmlFor="receiveUpdates">Receive updates about courses, discounts, and news via email</label>
            </div>
          </div>
        );
        
      case 3: // Confirmation
        return (
          <div className="enquiry-form__step">
            <h4>Please review your information:</h4>
            
            <div className="enquiry-form__summary">
              <div className="enquiry-form__summary-section">
                <h5>Personal Information</h5>
                <p><strong>Name:</strong> {formik.values.name}</p>
                <p><strong>Email:</strong> {formik.values.email}</p>
                <p><strong>Phone:</strong> {formik.values.phone}</p>
                <p><strong>City:</strong> {formik.values.city}</p>
              </div>
              
              <div className="enquiry-form__summary-section">
                <h5>Educational Background</h5>
                <p><strong>Qualification:</strong> {formik.values.qualification}</p>
                <p><strong>Institute:</strong> {formik.values.institute}</p>
                <p><strong>Graduation Year:</strong> {formik.values.graduationYear}</p>
              </div>
              
              <div className="enquiry-form__summary-section">
                <h5>Requirements</h5>
                <p><strong>Specialization Interest:</strong> {formik.values.specializationInterest}</p>
                <p><strong>Preferred Time:</strong> {formik.values.preferredTime}</p>
                {formik.values.messageNote && <p><strong>Additional Message:</strong> {formik.values.messageNote}</p>}
                <p><strong>Receive Updates:</strong> {formik.values.receiveUpdates ? 'Yes' : 'No'}</p>
              </div>
              
              <div className="enquiry-form__summary-section">
                <h5>Quiz Information</h5>
                <p><strong>Quiz:</strong> {quiz?.title}</p>
              </div>
            </div>
            
            {error && <div className="enquiry-form__error enquiry-form__error--global">{error}</div>}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="enquiry-form">
      <div className="enquiry-form__header">
        <button 
          className="enquiry-form__close" 
          onClick={onClose}
          aria-label="Close form"
        >
          &times;
        </button>
        <h2>Enquire about {quiz?.title}</h2>
        <p>Please fill out the form below and our team will get in touch with you shortly.</p>
      </div>
      
      <div className="enquiry-form__stepper">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className={`enquiry-form__step-indicator ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
          >
            <div className="enquiry-form__step-number">{index + 1}</div>
            <div className="enquiry-form__step-info">
              <div className="enquiry-form__step-title">{step.title}</div>
              <div className="enquiry-form__step-description">{step.description}</div>
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={formik.handleSubmit}>
        {renderStepContent()}
        
        <div className="enquiry-form__actions">
          {currentStep > 0 && (
            <button 
              type="button" 
              className="enquiry-form__btn enquiry-form__btn--outline" 
              onClick={prevStep}
              disabled={isSubmitting}
            >
              Previous
            </button>
          )}
          
          {currentStep < steps.length - 1 && (
            <button 
              type="button" 
              className="enquiry-form__btn" 
              onClick={nextStep}
            >
              Continue
            </button>
          )}
          
          {currentStep === steps.length - 1 && (
            <button 
              type="submit" 
              className="enquiry-form__btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EnquiryForm; 