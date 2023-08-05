import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import NavBar from './components/navbar';
import Home from './components/Home';
import { AuthProvider, useAuth } from './AuthContext';
import CreateForm from './components/createform';
import ViewForms from './components/ViewForms';
import Signup from './components/signup';
import Login from './components/login';
import FormView from './components/FormView';
import AnswerForm from './components/AnswerForm';
import SendForms from './components/SendForms';
import SendFormLink from './components/SendFormLink';

function AppWrapper() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
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
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
