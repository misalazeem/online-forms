// IndividualQuestion.jsx
import React from 'react';
import '../styles/individualquestion.css';

const IndividualQuestion = ({ index, question, handleQuestionChange, handleQuestionOptionsChange, deleteQuestion }) => {
  const handleChange = (field, value) => {
    handleQuestionChange(index, field, value);
  };

  const handleAddOption = () => {
    const newOption = '';
    handleQuestionOptionsChange(index, [...question.options, newOption]);
  };

  const handleOptionChange = (optionIndex, value) => {
    const updatedOptions = [...question.options];
    updatedOptions[optionIndex] = value;
    handleQuestionOptionsChange(index, updatedOptions);
  };

  const handleDeleteOption = (optionIndex) => {
    const updatedOptions = question.options.filter((_, i) => i !== optionIndex);
    handleQuestionOptionsChange(index, updatedOptions);
  };

  return (
    <div className="add-question-container">
      <label>
        Content:
        <input
          type="text"
          value={question.content}
          onChange={(e) => handleChange('content', e.target.value)}
        />
      </label>
      <label>
        Type:
        <select value={question.type} onChange={(e) => handleChange('type', e.target.value)}>
          <option value="text">Text</option>
          <option value="textarea">Textarea</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio</option>
        </select>
      </label>
      <label>
        Label:
        <input
          type="text"
          value={question.label}
          onChange={(e) => handleChange('label', e.target.value)}
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          value={question.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </label>
      <label>
        Required:
        <input
          type="checkbox"
          checked={question.required}
          onChange={(e) => handleChange('required', e.target.checked)}
        />
      </label>
      {question.type === 'radio' || question.type === 'checkbox' ? (
        <div className="options">
          <ul>
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex}>
                Option {optionIndex + 1} :
                <br />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                  key={optionIndex} // Add key attribute here
                />
                <button className="delete-question" onClick={() => handleDeleteOption(optionIndex)}>
                  Delete Option
                </button>
              </li>
            ))}
          </ul>
          <button className="add-question" onClick={handleAddOption}>
            Add Option
          </button>
        </div>
      ) : null}
      <button className="delete-question" onClick={() => deleteQuestion(index)}>
        Delete Question
      </button>
    </div>
  );
};

export default IndividualQuestion;
