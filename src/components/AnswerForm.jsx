import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/answerform.css';
import { useAuth } from '../AuthContext';

function AnswerForm() {
  const { formId } = useParams();
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        // Fetch the form details
        const formResponse = await axios.get(`https://online-forms-backend.onrender.com/forms/${formId}`);
        const formData = formResponse.data;

        // Fetch the questions for the form
        const questionsResponse = await axios.get(`https://online-forms-backend.onrender.com/forms/${formId}/questions`);
        const questionsData = questionsResponse.data;

        // Fetch the options for radio and checkbox questions
        const optionFetchPromises = questionsData
          .filter((question) => ['radio', 'checkbox'].includes(question.type))
          .map(async (question) => {
            const optionsResponse = await axios.get(`https://online-forms-backend.onrender.com/questions/${question.id}/options`);
            question.options = optionsResponse.data;
          });

        await Promise.all(optionFetchPromises);

        // Set the state for questions
        setQuestions(questionsData);

        // Combine form details and questions
        formData.questions = questionsData;
        setForm(formData);
      } catch (error) {
        console.error('Error fetching form:', error);
      }
    };
    fetchForm();
  }, [formId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Collect form data from the event.target and process it
      const formElement = document.getElementById('answerForm');
      const formData = new FormData(formElement);
      const answers = [];

      // Get the email value from the form data
      const email = formData.get('email');

      formData.forEach((value, key) => {
        if (key === 'email') {
          // Skip the email field
          return;
        }

        const questionId = key.replace('question_', '');
        const question = questions.find((q) => q.id === Number(questionId));

        if (!question) {
          // Handle scenario when the question is not found
          console.error(`Question with id ${questionId} not found.`);
          return;
        }

        // Determine the type of the question (text, textarea, radio, checkbox)
        let type;
        if (question.type === 'text' || question.type === 'textarea') {
          type = question.type;
        } else if (question.type === 'radio') {
          type = 'radio';
        } else if (question.type === 'checkbox') {
          type = 'checkbox';
        }

        // Handle answers for radio and checkbox questions
        let answer;
        if (type === 'radio') {
          // For radio questions, get the value of the selected option
          const optionId = formData.get(`question_${questionId}`);
          const option = question.options.find((opt) => opt.id === Number(optionId));
          answer = option ? option.value : '';
        } else if (type === 'checkbox') {
          // For checkbox questions, get an array of selected option values
          const selectedOptionIds = formData.getAll(`question_${questionId}`);
          const selectedOptions = question.options.filter((opt) =>
            selectedOptionIds.includes(opt.id.toString())
          );
          answer = selectedOptions.map((opt) => opt.value);
        } else {
          // For text and textarea questions, use the value directly
          answer = value;
        }

        answers.push({ question_id: Number(questionId), answer, type });
      });

      // Submit the answers to the backend
      await axios.post(`https://online-forms-backend.onrender.com/forms/${formId}/submissions`, {
        email: email,
        answers,
      });

      // Handle successful submission, e.g., show a success message or redirect
      console.log('Form submitted successfully');
      setSubmitted(true);

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  if (!form) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    navigate(`/fill-forms/${formId}`);
  }

  if (submitted) {
    return (
      <div className="thank-you-message">
        <h2>Thank you for submitting the form!</h2>
      </div>
    );
  }

  return (
    <div className="answer-form">
      <h2>{form.title}</h2>
      <p>{form.description}</p>
      <form id="answerForm" onSubmit={handleSubmit}>
        {/* Email field */}
        <div>
          <label>Email:</label>
          <span style={{ color: 'red' }}>*</span>
          <input type="email" name="email" required />
        </div>

        {/* Render other questions of the form */}
        {form.questions.map((question) => (
          <div key={question.id}>
            <h4>
              {question.content}
              {question.required && <span style={{ color: 'red' }}>*</span>}
            </h4>
            {/* Render question inputs based on the question type */}
            {question.type === 'text' && (
              <input type="text" name={`question_${question.id}`} required={question.required} />
            )}
            {question.type === 'textarea' && (
              <textarea name={`question_${question.id}`} required={question.required} />
            )}
            {question.type === 'radio' && (
              <>
                {question.options.map((option) => (
                  <div className="sameline" key={option.id}>
                    <input type="radio" name={`question_${question.id}`} value={option.id} required={question.required} />
                    <label>{option.value}</label>
                  </div>
                ))}
              </>
            )}
            {question.type === 'checkbox' && (
              <>
                {question.options.map((option) => (
                  <div className="sameline" key={option.id}>
                    <input type="checkbox" name={`question_${question.id}`} value={option.id} />
                    <label>{option.value}</label>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AnswerForm;