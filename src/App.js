import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './components/Home';
import { useAuth } from './AuthContext';


function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuth(); // Get isAuthenticated from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="App">
      <NavBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Home />} />
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
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </div>
  );
}

export default App;