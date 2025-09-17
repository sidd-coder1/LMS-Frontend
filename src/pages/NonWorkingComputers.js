import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ComputerList.css';

const NonWorkingComputers = () => {
  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchNonWorkingComputers = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Mock data - replace with actual API call
        // const response = await fetch('/api/non-working-computers');
        // const data = await response.json();
        // setComputers(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch non-working computers');
        setLoading(false);
      }
    };

    fetchNonWorkingComputers();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading non-working computers...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="computer-list-container">
      <div className="header">
        <h1>Non-Working Computers</h1>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
      
      <div className="stats">
        <div className="stat-card">
          <h3>Total Non-Working</h3>
          <p className="count">{computers.length || 0}</p>
        </div>
      </div>

      {computers.length > 0 ? (
        <div className="computer-grid">
          {computers.map(computer => (
            <div key={computer.id} className="computer-card">
              <h3>{computer.name || `Computer ${computer.id}`}</h3>
              <p>Status: <span className="status not-working">Not Working</span></p>
              {computer.issue && <p className="issue">Issue: {computer.issue}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-computers">
          <p>All computers are currently working.</p>
        </div>
      )}
    </div>
  );
};

export default NonWorkingComputers;
