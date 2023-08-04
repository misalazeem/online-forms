import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/formview.css'

function ViewForms() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get('https://online-forms-backend.onrender.com/forms');
      setForms(response.data);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  return (
    <div>
      <h2>View Forms</h2>
      <ul>
        {forms.map((form) => (
          <li key={form.id}>
            <Link to={`/forms/${form.id}`}>{form.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewForms;
