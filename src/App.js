import './App.css';
import React, {  useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import NavBar from './components/navbar';
import CreateForm from './components/createform';
import ViewForms from './components/ViewForms';
import Signup from './components/signup';
import Login from './components/login';
import FormView from './components/FormView';
import AnswerForm from './components/AnswerForm';
import SendForms from './components/SendForms';
import SendFormLink from './components/SendFormLink';
import { useAuth } from './AuthContext';

function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuth(); // Get isAuthenticated from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = () => {
    // Perform logout logic here (clear token, etc.)
    // For now, we will simply set isAuthenticated to false
    // and navigate the user to the login page
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="App">
      <NavBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/fill-forms/:formId" element={<AnswerForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {isAuthenticated ? (
          <>
            <Route path="/create-form" element={<CreateForm />} />
            <Route path="/view-forms" element={<ViewForms />} />
            <Route path="/forms/:formId" element={<FormView />} />
            <Route path="/send-forms" element={<SendForms />} />
            <Route path="/send-form/:formId" element={<SendFormLink />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
        
      </Routes>
    </div>
  );
}

export default App;
