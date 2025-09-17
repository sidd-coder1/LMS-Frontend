import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaDesktop, FaExclamationTriangle, FaClock, FaSearch } from 'react-icons/fa';
import '../styles/HomePage.css';

const HomePage = ({ labs }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLabs, setFilteredLabs] = useState(labs);

  // Simulate data fetching for lab stats
  useEffect(() => {
    const fetchLabStats = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - generate random stats for each lab
        const mockStats = {};
        labs.forEach(lab => {
          const working = Math.floor(Math.random() * lab.totalComputers);
          const maintenance = Math.floor(Math.random() * 3); // 0-2 computers in maintenance
          const notWorking = Math.max(0, lab.totalComputers - working - maintenance);
          
          mockStats[lab.id] = {
            working,
            notWorking,
            maintenance,
            lastUpdated: new Date().toISOString(),
            issues: notWorking > 0 ? [
              ...(notWorking > 0 ? [`${notWorking} computer(s) not working`] : []),
              ...(maintenance > 0 ? [`${maintenance} computer(s) under maintenance`] : [])
            ] : ['All systems operational']
          };
        });
        
        setStats(mockStats);
      } catch (error) {
        console.error('Error fetching lab statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLabStats();
    
    // Set up polling to refresh stats every 30 seconds
    const intervalId = setInterval(fetchLabStats, 30000);
    
    return () => clearInterval(intervalId);
  }, [labs]);

  // Filter labs based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredLabs(labs);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = labs.filter(lab => 
      lab.name.toLowerCase().includes(query) || 
      lab.location.toLowerCase().includes(query) ||
      lab.inCharge.toLowerCase().includes(query)
    );
    
    setFilteredLabs(filtered);
  }, [searchQuery, labs]);

  const formatLastUpdated = (dateString) => {
    const now = new Date();
    const updated = new Date(dateString);
    const diffInMinutes = Math.floor((now - updated) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return updated.toLocaleDateString();
  };

  const getStatusVariant = (percentage) => {
    if (percentage >= 90) return 'success';
    if (percentage >= 60) return 'warning';
    return 'error';
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading labs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="page-header">
        <h1>Computer Lab Dashboard</h1>
        <p className="page-subtitle">Monitor and manage computer labs across campus</p>
        
        <div className="search-container">
          <div className="search-input">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search labs by name, location, or in-charge..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search labs"
            />
          </div>
        </div>
      </header>
      
      {filteredLabs.length === 0 ? (
        <div className="no-results">
          <FaDesktop className="no-results-icon" />
          <h3>No labs found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="labs-grid">
          {filteredLabs.map((lab) => {
            const labStats = stats[lab.id] || { working: 0, notWorking: 0, maintenance: 0 };
            const totalComputers = lab.totalComputers || 1; // Avoid division by zero
            const workingPercentage = Math.round((labStats.working / totalComputers) * 100);
            const statusVariant = getStatusVariant(workingPercentage);
            
            return (
              <Link 
                to={`/lab/${lab.id}`} 
                key={lab.id} 
                className={`lab-card ${statusVariant}`}
                aria-label={`View ${lab.name} details`}
              >
                <div className="lab-card-header">
                  <div className="lab-title">
                    <FaBuilding className="lab-icon" />
                    <h2>{lab.name}</h2>
                  </div>
                  <span className={`status-badge ${statusVariant}`}>
                    {workingPercentage}% Operational
                  </span>
                </div>
                
                <div className="lab-location">
                  <span>{lab.location}</span>
                  <span className="lab-incharge">In-charge: Mrs.Kasliwal </span>
                </div>
                
                <div className="progress-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${workingPercentage}%` }}
                    role="progressbar"
                    aria-valuenow={workingPercentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuetext={`${workingPercentage}% of computers are operational`}
                  ></div>
                </div>
                
                <div className="lab-stats">
                  <div className="stat working">
                    <span className="stat-number">{labStats.working}</span>
                    <span className="stat-label">Working</span>
                  </div>
                  <div className="stat maintenance">
                    <span className="stat-number">{labStats.maintenance || 0}</span>
                    <span className="stat-label">Maintenance</span>
                  </div>
                  <div className="stat not-working">
                    <span className="stat-number">{labStats.notWorking || 0}</span>
                    <span className="stat-label">Issues</span>
                  </div>
                </div>
                
                <div className="lab-footer">
                  <span className="last-updated">
                    <FaClock className="icon" />
                    Updated {formatLastUpdated(labStats.lastUpdated)}
                  </span>
                  <span className="view-details">View Details →</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
