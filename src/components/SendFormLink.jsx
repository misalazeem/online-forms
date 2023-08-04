import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/sendformlink.css';

function SendFormLink() {
  const { formId } = useParams();
  const [recipientEmail, setRecipientEmail] = useState('');
  console.log(formId);
  const handleSendLink = async () => {
    try {
      await axios.post('https://online-forms-backend.onrender.com/sendFormLink', { formId, email: recipientEmail });
      alert('Form link sent successfully');
    } catch (error) {
      console.error('Error sending form link:', error);
      alert('Error sending form link');
    }
  };

  return (
    <div className="send-form-link-container">
      <h2>Form Details</h2>
      <h3>Form ID: {formId}</h3>
      <div className="email-input">
        <label htmlFor="recipientEmail">Recipient's Email:</label>
        <input
          type="email"
          id="recipientEmail"
          placeholder="Enter recipient's email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
        />
      </div>
      <button className="send-button" onClick={handleSendLink}>
        Send Link
      </button>
    </div>
  );
}

export default SendFormLink;
