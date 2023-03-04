import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthenticator, Heading, View } from '@aws-amplify/ui-react';
import './Layout.css';

export function Layout() {
  const { route, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);

  const navigate = useNavigate();

  function logOut() {
    signOut();
    navigate('/login');
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/logo.png" alt="Logo" />
          <span>My App</span>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="nav-link" onClick={() => navigate('/')}>
              Home
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={() => navigate('/restaurant')}
            >
              Restaurant
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => navigate('/about')}>
              About
            </button>
          </li>

          {route !== 'authenticated' ? (
            <li className="nav-item">
              <button className="nav-link" onClick={() => navigate('/login')}>
                Login
              </button>
            </li>
          ) : (
            <li className="nav-item">
              <button className="nav-link" onClick={() => logOut()}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
      <Heading level={1}>Example Auth Routes App</Heading>
      <View>
        {route === 'authenticated' ? 'You are logged in!' : 'Please Login!'}
      </View>

      <Outlet />
    </>
  );
}
