import { createContext, useContext, useState } from 'react';

// Create a new context
export const AuthContext = createContext();

// Create a custom hook to access the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// Create the AuthProvider component to wrap your app with
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');

  // Provide the value of the context to its children
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}
