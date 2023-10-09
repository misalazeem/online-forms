import React, { useState } from "react";
import IndividualQuestion from "./individualquestion";
import axios from 'axios';
import { useAuth } from '../AuthContext';
import '../styles/createform.css';

function CreateForm() {
  const { userId } = useAuth();
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [formCreated, setFormCreated] = useState(false);

  const addQuestion = () => {
    setQuestions([...questions, { type: 'text', label: '', name: '', options: [], content: '', required: false }]);
  };

  const deleteQuestion = (questionIndex) => {
    setQuestions((prevQuestions) => prevQuestions.filter((_, index) => index !== questionIndex));
  };

  const handleQuestionChange = (index, field, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [field]: value,
      };
      return updatedQuestions;
    });
  };

  const handleQuestionOptionsChange = (index, updatedOptions) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        options: updatedOptions,
      };
      return updatedQuestions;
    });
  };

const handleQuestionTypeChange = (index, newType) => {
  setQuestions((prevQuestions) => {
    const updatedQuestions = [...prevQuestions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      type: newType,
      options: newType === 'checkbox' || newType === 'radio' ? [] : updatedQuestions[index].options,
    };
    return updatedQuestions;
  });
};
  const handleSubmitForm = () => {
    const hasEmptyContent = questions.some((question) => !question.content || question.content.trim() === '');
    if (hasEmptyContent) {
      console.error('Form submission error: Question content is required');
      return;
    }

    console.log(questions);

    const formData = {
      title: formTitle,
      description: formDescription,
      questions: questions.map(({ options, ...rest }) => {
        if (rest.type === 'checkbox' || rest.type === 'radio' || rest.type === 'select') {
          return {
            ...rest,
            options: options.filter((option) => option.trim() !== ''),
          };
        }
        return {
          ...rest,
          options,
        };
      }),
      user_id: userId,
    };

    console.log(formData);

    axios
      .post('https://online-forms-backend.onrender.com/addform', formData)
      .then((response) => {
        console.log('Form submitted successfully!', response.data);
        setFormTitle('');
        setFormDescription('');
        setQuestions([]);
        setFormCreated(true);
      })
      .catch((error) => {
        console.error('Form submission error:', error.response.data);
      });
  };

  return (
    <div>
      <h2>Add Form</h2>

      {formCreated ? (
  <div>Form created successfully!</div>
) : (
      <div className="add-container">
        <div className="form-title">
          <label>
            Form Title:
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />
          </label>
        </div>
        <div className="form-description">
          <label>
            Form Description:
            <textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
            />
          </label>
        </div>
        {questions.map((question, index) => (
          <IndividualQuestion
            key={index}
            index={index}
            question={question}
            handleQuestionChange={handleQuestionChange}
            handleQuestionOptionsChange={handleQuestionOptionsChange}
            handleQuestionTypeChange={handleQuestionTypeChange}
            deleteQuestion={deleteQuestion}
          />
        ))}
        <div className="add-form-buttons">
          <button className="add-question" onClick={addQuestion}>Add Question</button>
          <button className="submit-form" onClick={handleSubmitForm}>Submit Form</button>
        </div>
      </div>
      )}
    </div>
  );
}

export default CreateForm;
