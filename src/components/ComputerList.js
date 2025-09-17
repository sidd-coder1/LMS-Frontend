import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaExclamationTriangle, FaCheckCircle, FaTools } from 'react-icons/fa';
import '../styles/ComputerList.css';

const ComputerList = ({ status, title }) => {
  const { labId } = useParams();
  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Generate mock computer data based on status and labId
  useEffect(() => {
    const fetchComputers = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Generate 5-15 computers for the lab
        const count = 5 + Math.floor(Math.random() * 11);
        const computerList = Array(count).fill(0).map((_, index) => {
          const computerId = `PC-${(index + 1).toString().padStart(2, '0')}`;
          const isWorking = status === 'working' || (status !== 'non-working' && Math.random() > 0.3);
          const hasIssues = !isWorking && Math.random() > 0.5;
          
          return {
            id: computerId,
            name: `${labId.toUpperCase()}-${computerId}`,
            status: isWorking ? 'working' : hasIssues ? 'maintenance' : 'not_working',
            lastChecked: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString(),
            issues: !isWorking ? (hasIssues ? ['Hardware issue', 'Needs maintenance'] : ['Not responding']) : [],
            specs: {
              cpu: 'Intel i5-10400',
              ram: '16GB',
              storage: '512GB SSD',
              os: 'Windows 10 Pro'
            }
          };
        });
        
        // Filter based on status if needed
        const filteredComputers = status === 'all' 
          ? computerList 
          : computerList.filter(comp => 
              status === 'working' ? comp.status === 'working' : comp.status !== 'working'
            );
            
        setComputers(filteredComputers);
      } catch (error) {
        console.error('Error fetching computers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComputers();
  }, [labId, status]);

  const getStatusBadge = (status) => {
    const statusMap = {
      working: { 
        label: 'Working', 
        className: 'status-working',
        icon: <FaCheckCircle className="status-icon" />
      },
      not_working: { 
        label: 'Not Working', 
        className: 'status-not-working',
        icon: <FaExclamationTriangle className="status-icon" />
      },
      maintenance: { 
        label: 'Maintenance', 
        className: 'status-maintenance',
        icon: <FaTools className="status-icon" />
      }
    };
    
    const statusInfo = statusMap[status] || { 
      label: 'Unknown', 
      className: 'status-unknown',
      icon: <FaExclamationTriangle className="status-icon" />
    };
    
    return (
      <span className={`status-badge ${statusInfo.className}`}>
        {statusInfo.icon}
        {statusInfo.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffInDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    }
    
    return date.toLocaleDateString();
  };

  const filteredComputers = computers.filter(computer => {
    const matchesSearch = computer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         computer.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'working' && computer.status === 'working') ||
                         (filter === 'not_working' && computer.status !== 'working');
    
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading computers...</p>
      </div>
    );
  }

  return (
    <div className="computer-list-container">
      <div className="computer-list-header">
        <Link to={`/lab/${labId}`} className="back-button">
          <FaArrowLeft /> Back to Lab
        </Link>
        <h2>{title || 'Computers'}</h2>
        <div className="search-container">
          <div className="search-input">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search computers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'working' ? 'active' : ''}`}
              onClick={() => setFilter('working')}
            >
              Working
            </button>
            <button 
              className={`filter-btn ${filter === 'not_working' ? 'active' : ''}`}
              onClick={() => setFilter('not_working')}
            >
              Needs Attention
            </button>
          </div>
        </div>
      </div>
      
      {filteredComputers.length === 0 ? (
        <div className="no-results">
          <FaExclamationTriangle className="no-results-icon" />
          <h3>No computers found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="computer-grid">
          {filteredComputers.map((computer) => (
            <div key={computer.id} className="computer-card" data-status={computer.status}>
              <div className="computer-card-inner">
                <div className="computer-header">
                  <h3 className="computer-name">{computer.name}</h3>
                  {getStatusBadge(computer.status)}
                </div>
                
                <div className="computer-specs">
                  <div className="spec">
                    <span className="spec-label">CPU:</span>
                    <span className="spec-value">{computer.specs.cpu}</span>
                  </div>
                  <div className="spec">
                    <span className="spec-label">RAM:</span>
                    <span className="spec-value">{computer.specs.ram}</span>
                  </div>
                  <div className="spec">
                    <span className="spec-label">Storage:</span>
                    <span className="spec-value">{computer.specs.storage}</span>
                  </div>
                  <div className="spec">
                    <span className="spec-label">OS:</span>
                    <span className="spec-value">{computer.specs.os}</span>
                  </div>
                </div>
                
                {computer.issues && computer.issues.length > 0 && (
                  <div className="computer-issues">
                    <div className="issues-header">
                      <FaExclamationTriangle className="issues-icon" />
                      <span>Reported Issues:</span>
                    </div>
                    <ul className="issues-list">
                      {computer.issues.map((issue, idx) => (
                        <li key={idx} className="issue-item">{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="computer-footer">
                  <span className="last-checked">
                    Last checked: {formatDate(computer.lastChecked)}
                  </span>
                  <button 
                    className="details-button"
                    onClick={() => {
                      // TODO: Navigate to computer details
                      console.log(`View details for ${computer.id}`);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComputerList;
