import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './components/Home';
import { useAuth } from './AuthContext';

// Lazy load the components
const CreateForm = React.lazy(() => import('./components/createform'));
const ViewForms = React.lazy(() => import('./components/ViewForms'));
const Signup = React.lazy(() => import('./components/signup'));
const Login = React.lazy(() => import('./components/login'));
const FormView = React.lazy(() => import('./components/FormView'));
const AnswerForm = React.lazy(() => import('./components/AnswerForm'));
const SendForms = React.lazy(() => import('./components/SendForms'));
const SendFormLink = React.lazy(() => import('./components/SendFormLink'));

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