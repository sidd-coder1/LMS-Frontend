import React, { useState, useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/LabDashboard.css';

const LabDashboard = ({ labs }) => {
  const { labId } = useParams();
  const [lab, setLab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    working: 0,
    nonWorking: 0,
    lastUpdated: new Date().toLocaleTimeString()
  });

  // Simulate API call to fetch lab data
  useEffect(() => {
    const fetchLabData = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundLab = labs.find(l => l.id === labId);
        if (!foundLab) {
          throw new Error('Lab not found');
        }
        
        // Simulate fetching stats
        const workingCount = Math.floor(Math.random() * foundLab.totalComputers);
        setStats({
          working: workingCount,
          nonWorking: foundLab.totalComputers - workingCount,
          lastUpdated: new Date().toLocaleTimeString()
        });
        
        setLab(foundLab);
        setError(null);
      } catch (err) {
        setError(err.message);
        setLab(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLabData();
  }, [labId, labs]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading lab information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Lab</h2>
        <p>{error}</p>
        <Link to="/" className="back-link">← Back to Labs</Link>
      </div>
    );
  }

  return (
    <div className="lab-dashboard">
      <header className="dashboard-header">
        <h1>{lab.name}</h1>
        <div className="stats-summary">
          <span className="last-updated">Last updated: {stats.lastUpdated}</span>
          <div className="stats">
            <span className="stat working">
              <strong>{stats.working}</strong> Working
            </span>
            <span className="stat non-working">
              <strong>{stats.nonWorking}</strong> Need Attention
            </span>
            <span className="stat total">
              <strong>{lab.totalComputers}</strong> Total Computers
            </span>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="status-cards">
          <Link to={`/lab/${labId}/working`} className="status-card working">
            <h3>Working Computers</h3>
            <div className="count">{stats.working}</div>
            <div className="view-details">View Details →</div>
          </Link>
          
          <Link to={`/lab/${labId}/non-working`} className="status-card non-working">
            <h3>Need Attention</h3>
            <div className="count">{stats.nonWorking}</div>
            <div className="view-details">View Details →</div>
          </Link>
        </div>

        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LabDashboard;
