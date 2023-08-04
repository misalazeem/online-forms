import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function FormView() {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchForm();
    fetchSubmissions();
  }, []);

  const fetchForm = async () => {
    try {
      const response = await axios.get(`https://online-forms-backend.onrender.com/forms/${formId}`);
      setForm(response.data);
    } catch (error) {
      console.error('Error fetching form:', error);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get(`https://online-forms-backend.onrender.com/forms/${formId}/submissions`);
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-view-container">
      <div className="form-details">
        <h2>Form View</h2>
        <h3>Title: {form.title}</h3>
        <p>Description: {form.description}</p>
        {/* Render other details of the form here */}
      </div>

      <div className="submissions-container">
        <h3>Submissions:</h3>
        {submissions.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          <ul>
            {submissions.map((submission) => (
              <li key={submission.id}>
                <p>Email: {submission.email}</p>
                <h4>Answers:</h4>
                <ul>
                  {submission.responses.map((response) => (
                    <li key={response.id}>
                      <p>Question: {response.question_content}</p>
                      <p>Answer: {response.answer}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FormView;
