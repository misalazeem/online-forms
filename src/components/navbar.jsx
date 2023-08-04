import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import '../styles/navbar.css';

function NavBar() {
  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    console.log('isAuthenticated prop:', isAuthenticated);
  }, [isAuthenticated]);
  return (
    <>
      <div className='navbar'>
        <h2>Online Forms</h2>
        <div className='navigation'>
          <ul>
            {!isAuthenticated ? (
              <>
                <li><Link className="desktop-links" to="/signup">Signup</Link></li>
                <li><Link className="desktop-links" to="/login">Login</Link></li>
              </>
            ) : (
              <>
                <li><Link className="desktop-links" to="/create-form">Create Form</Link></li>
                <li><Link className="desktop-links" to="/view-forms">View Forms</Link></li>
                <li><Link className="desktop-links" to="/send-forms">Send Forms</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default NavBar;
