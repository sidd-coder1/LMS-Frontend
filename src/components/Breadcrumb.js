import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  // Don't show breadcrumb on home page
  if (pathnames.length === 0) return null;

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link to="/">Home</Link>
          <span className="separator">/</span>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const displayName = name.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ');

          return isLast ? (
            <li key={name} className="current" aria-current="page">
              {displayName}
            </li>
          ) : (
            <li key={name}>
              <Link to={routeTo}>{displayName}</Link>
              <span className="separator">/</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
