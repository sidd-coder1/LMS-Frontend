import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LabDashboard from './pages/LabDashboard';
import ComputerList from './components/ComputerList';
import Breadcrumb from './components/Breadcrumb';

// Mock data for labs
const LABS = [
  { 
    id: 'lab-a', 
    name: 'Computer Lab A', 
    totalComputers: 25,
    location: 'Building 1, Room 101',
    inCharge: 'Dr. Smith',
    lastUpdated: '2023-09-17T10:30:00Z'
  },
  { 
    id: 'lab-b', 
    name: 'Computer Lab B', 
    totalComputers: 30,
    location: 'Building 1, Room 205',
    inCharge: 'Prof. Johnson',
    lastUpdated: '2023-09-17T09:15:00Z'
  },
  { 
    id: 'lab-c', 
    name: 'Computer Lab C', 
    totalComputers: 20,
    location: 'Building 2, Room 110',
    inCharge: 'Dr. Williams',
    lastUpdated: '2023-09-16T16:45:00Z'
  },
];

// Main App component
function App() {
  return (
    <div className="app">
      <Breadcrumb />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage labs={LABS} />} />
          <Route path="/lab/:labId" element={<LabDashboard labs={LABS} />}>
            <Route index element={<Navigate to="working" replace />} />
            <Route 
              path="working" 
              element={
                <ComputerList 
                  status="working" 
                  title="Working Computers" 
                />
              } 
            />
            <Route 
              path="non-working" 
              element={
                <ComputerList 
                  status="non-working" 
                  title="Computers Needing Attention" 
                />
              } 
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

// Wrapper component to provide router context
const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
