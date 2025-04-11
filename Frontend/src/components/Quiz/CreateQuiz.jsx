import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    subjectArea: '',
    timeLimit: 30,
    questions: [
      { 
        text: '', 
        options: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false }
        ],
        explanation: ''
      }
    ]
  });

  const handleQuizDataChange = (e) => {
    const { name, value } = e.target;
    setQuizData({
      ...quizData,
      [name]: value
    });
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [name]: value
    };
    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const { value } = e.target;
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].options[optionIndex].text = value;
    
    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });
  };

  const handleCorrectOptionChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...quizData.questions];
    
    // Reset all options to not correct
    updatedQuestions[questionIndex].options.forEach((option, i) => {
      option.isCorrect = i === optionIndex;
    });
    
    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });
  };

  const addNewQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        { 
          text: '', 
          options: [
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false }
          ],
          explanation: ''
        }
      ]
    });
  };

  const removeQuestion = (indexToRemove) => {
    if (quizData.questions.length === 1) {
      setError('A quiz must have at least one question');
      return;
    }

    setQuizData({
      ...quizData,
      questions: quizData.questions.filter((_, index) => index !== indexToRemove)
    });
  };

  const validateQuiz = () => {
    if (!quizData.title.trim()) return 'Quiz title is required';
    if (!quizData.description.trim()) return 'Quiz description is required';
    if (!quizData.subjectArea.trim()) return 'Subject area is required';
    
    for (let i = 0; i < quizData.questions.length; i++) {
      const question = quizData.questions[i];
      if (!question.text.trim()) return `Question ${i + 1} text is required`;
      
      let hasCorrectOption = false;
      for (let j = 0; j < question.options.length; j++) {
        const option = question.options[j];
        if (!option.text.trim()) return `Option ${j + 1} for Question ${i + 1} is required`;
        if (option.isCorrect) hasCorrectOption = true;
      }
      
      if (!hasCorrectOption) return `Question ${i + 1} must have a correct answer marked`;
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const validationError = validateQuiz();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(quizData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create quiz');
      }
      
      const createdQuiz = await response.json();
      navigate(`/teacher/quizzes/${createdQuiz.id}`);
    } catch (err) {
      setError(err.message || 'An error occurred while creating the quiz');
      console.error('Create quiz error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-quiz-container">
      <div className="create-quiz-header">
        <h1>Create New Quiz</h1>
        <p>Create a new quiz for your students</p>
      </div>
      
      <div className="create-quiz-content">
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          
          <div className="form-section">
            <h3>Quiz Details</h3>
            <div className="form-group">
              <label htmlFor="title">Quiz Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={quizData.title}
                onChange={handleQuizDataChange}
                placeholder="Enter quiz title"
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={quizData.description}
                onChange={handleQuizDataChange}
                placeholder="Enter quiz description"
                className="form-control"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="subjectArea">Subject Area</label>
                <input
                  type="text"
                  id="subjectArea"
                  name="subjectArea"
                  value={quizData.subjectArea}
                  onChange={handleQuizDataChange}
                  placeholder="e.g. Mathematics, Science"
                  className="form-control"
                />
              </div>
              
              <div className="form-group col-md-6">
                <label htmlFor="timeLimit">Time Limit (minutes)</label>
                <input
                  type="number"
                  id="timeLimit"
                  name="timeLimit"
                  value={quizData.timeLimit}
                  onChange={handleQuizDataChange}
                  min="1"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h3>Questions</h3>
            
            {quizData.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="question-card">
                <div className="question-header">
                  <h4>Question {questionIndex + 1}</h4>
                  <button 
                    type="button" 
                    className="btn btn-sm btn-danger"
                    onClick={() => removeQuestion(questionIndex)}
                  >
                    Remove
                  </button>
                </div>
                
                <div className="form-group">
                  <label htmlFor={`question-${questionIndex}`}>Question Text</label>
                  <textarea
                    id={`question-${questionIndex}`}
                    name="text"
                    value={question.text}
                    onChange={(e) => handleQuestionChange(questionIndex, e)}
                    placeholder="Enter your question here"
                    className="form-control"
                  />
                </div>
                
                <div className="options-container">
                  <p>Options (select one as correct answer):</p>
                  
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="option-row">
                      <input
                        type="radio"
                        id={`option-${questionIndex}-${optionIndex}`}
                        name={`correct-option-${questionIndex}`}
                        checked={option.isCorrect}
                        onChange={() => handleCorrectOptionChange(questionIndex, optionIndex)}
                        className="option-radio"
                      />
                      <input
                        type="text"
                        value={option.text}
                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)}
                        placeholder={`Option ${optionIndex + 1}`}
                        className="form-control option-text"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="form-group">
                  <label htmlFor={`explanation-${questionIndex}`}>Explanation (Optional)</label>
                  <textarea
                    id={`explanation-${questionIndex}`}
                    name="explanation"
                    value={question.explanation}
                    onChange={(e) => handleQuestionChange(questionIndex, e)}
                    placeholder="Explain why the correct answer is right (will be shown after quiz)"
                    className="form-control"
                  />
                </div>
              </div>
            ))}
            
            <button 
              type="button" 
              className="btn btn-secondary add-question-btn"
              onClick={addNewQuestion}
            >
              Add Another Question
            </button>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-outline-secondary"
              onClick={() => navigate('/teacher/quizzes')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Quiz'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz; 