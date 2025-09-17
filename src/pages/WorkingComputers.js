import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ComputerList.css';

const WorkingComputers = () => {
  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchWorkingComputers = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Mock data - replace with actual API call
        // const response = await fetch('/api/working-computers');
        // const data = await response.json();
        // setComputers(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch working computers');
        setLoading(false);
      }
    };

    fetchWorkingComputers();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading working computers...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="computer-list-container">
      <div className="header">
        <h1>Working Computers</h1>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
      
      <div className="stats">
        <div className="stat-card">
          <h3>Total Working</h3>
          <p className="count">{computers.length || 0}</p>
        </div>
      </div>

      {computers.length > 0 ? (
        <div className="computer-grid">
          {computers.map(computer => (
            <div key={computer.id} className="computer-card">
              <h3>{computer.name || `Computer ${computer.id}`}</h3>
              <p>Status: <span className="status working">Working</span></p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-computers">
          <p>No working computers found.</p>
        </div>
      )}
    </div>
  );
};

export default WorkingComputers;
