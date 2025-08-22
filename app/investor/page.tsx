'use client';

import { useState, useEffect } from 'react';

// Mock user data - in a real app, this would come from a database
const MOCK_USERS = [
  { 
    id: 1, 
    email: 'investor1@example.com', 
    password: 'password123', 
    name: 'John Smith', 
    role: 'investor',
    status: 'active',
    dateAdded: '2025-01-15',
    lastLogin: '2025-08-20'
  },
  { 
    id: 2, 
    email: 'investor2@example.com', 
    password: 'password123', 
    name: 'Sarah Johnson', 
    role: 'investor',
    status: 'active',
    dateAdded: '2025-02-01',
    lastLogin: '2025-08-18'
  },
  { 
    id: 3, 
    email: 'admin@c3hdenver.com', 
    password: 'admin123', 
    name: 'Lance Nading', 
    role: 'admin',
    status: 'active',
    dateAdded: '2025-01-01',
    lastLogin: '2025-08-22'
  }
];

export default function InvestmentPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('documents');
  const [hasAgreedToDisclaimer, setHasAgreedToDisclaimer] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  // Admin functionality state
  const [users, setUsers] = useState(MOCK_USERS);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    name: '',
    role: 'investor',
    password: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!hasAgreedToDisclaimer) {
      setError('You must agree to the disclaimers and confidentiality terms before proceeding.');
      return;
    }

    // Find user by email and password
    const user = users.find(u => u.email === email && u.password === password && u.status === 'active');
    
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      setError('');
      
      // Update last login (in real app, this would be handled by backend)
      const updatedUsers = users.map(u => 
        u.id === user.id ? { ...u, lastLogin: new Date().toISOString().split('T')[0] } : u
      );
      setUsers(updatedUsers);
    } else {
      setError('Invalid email or password. Please try again.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setEmail('');
    setPassword('');
    setShowAdminPanel(false);
    setActiveTab('documents');
  };

  const handleRequestPassword = () => {
    window.location.href = `mailto:lance.nading@c3hdenver.com?subject=Investment Portal Access Request - Liv 1403&body=Hello,%0D%0A%0D%0AI am requesting access to the Liv 1403 Investment Portal. Please provide me with login credentials.%0D%0A%0D%0AName: [Your Full Name]%0D%0AEmail: [Your Email Address]%0D%0ACompany: [Your Company Name]%0D%0APhone: [Your Phone Number]%0D%0A%0D%0AThank you,%0D%0A[Your Name]`;
  };

  const handleCall = () => {
    window.location.href = 'tel:720-359-8337';
  };

  // Admin functions
  const handleAddUser = (e) => {
    e.preventDefault();
    
    // Check if email already exists
    if (users.find(u => u.email === newUser.email)) {
      alert('A user with this email already exists.');
      return;
    }

    const user = {
      id: Math.max(...users.map(u => u.id)) + 1,
      ...newUser,
      status: 'active',
      dateAdded: new Date().toISOString().split('T')[0],
      lastLogin: 'Never'
    };

    setUsers([...users, user]);
    setNewUser({ email: '', name: '', role: 'investor', password: '' });
    setShowAddUser(false);
  };

  const handleDeleteUser = (userId) => {
    if (userId === currentUser.id) {
      alert('You cannot delete your own account.');
      return;
    }
    
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleToggleUserStatus = (userId) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
        : u
    ));
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewUser({ ...newUser, password: result });
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6 pt-[100px]">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Liv 1403</h1>
            <p className="text-gray-300">Investment Portal</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Secure Access</h2>
              <p className="text-gray-300 text-sm">Enter your credentials to access confidential investment materials</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-3">
                <p className="text-blue-300 text-xs mb-2"><strong>Demo Credentials:</strong></p>
                <p className="text-blue-300 text-xs">Investor: investor1@example.com / password123</p>
                <p className="text-blue-300 text-xs">Admin: admin@c3hdenver.com / admin123</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3 text-sm">Required Agreement - Confidential Investment Presentation</h4>
                <div className="max-h-32 overflow-y-auto text-xs text-gray-300 leading-relaxed mb-3 space-y-2">
                  <p>
                    <strong>Confidentiality:</strong> By accessing this portal, you agree the information is confidential and will not be disclosed to any other person without prior written consent.
                  </p>
                  <p>
                    <strong>Investment Risk:</strong> All investments are high risk and you could lose your entire investment. No returns are guaranteed.
                  </p>
                </div>
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={hasAgreedToDisclaimer}
                    onChange={(e) => setHasAgreedToDisclaimer(e.target.checked)}
                    className="mt-1 w-4 h-4 text-yellow-600 bg-white/10 border-white/20 rounded focus:ring-yellow-600 focus:ring-2"
                  />
                  <span className="text-xs text-gray-300">
                    I have read and agree to all disclaimers and confidentiality terms, acknowledge I am an accredited investor, and understand the investment risks.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
              >
                Access Portal
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-gray-300 text-sm text-center mb-4">
                Need access to the portal?
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={handleRequestPassword}
                  className="w-full bg-white/10 text-white py-3 rounded-lg font-medium hover:bg-white/20 transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Request Access</span>
                </button>
                
                <button
                  onClick={handleCall}
                  className="w-full bg-white/10 text-white py-3 rounded-lg font-medium hover:bg-white/20 transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Call 720-359-8337</span>
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-400 text-xs">
              This portal contains confidential investment materials. 
              Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 pt-[92px] min-h-screen">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Investment Portal</h1>
              <p className="text-gray-600 mt-1">
                Welcome, {currentUser.name} • Liv 1403 - Confidential Investor Materials
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {currentUser.role === 'admin' && (
                <button
                  onClick={() => setShowAdminPanel(!showAdminPanel)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {showAdminPanel ? 'Hide Admin' : 'Admin Panel'}
                </button>
              )}
              <button
                onClick={handleLogout}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAdminPanel && currentUser.role === 'admin' && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-blue-900">User Management</h2>
              <button
                onClick={() => setShowAddUser(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add New User
              </button>
            </div>

            <div className="bg-white rounded-lg border border-blue-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-900">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-900">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-900">Role</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-900">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-900">Last Login</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-25'}>
                      <td className="px-4 py-3 text-sm text-gray-900">{user.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{user.email}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{user.lastLogin}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleToggleUserStatus(user.id)}
                            className={`px-3 py-1 rounded text-xs ${
                              user.status === 'active' 
                                ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                                : 'bg-green-100 text-green-800 hover:bg-green-200'
                            }`}
                          >
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                          {user.id !== currentUser.id && (
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="px-3 py-1 rounded text-xs bg-red-100 text-red-800 hover:bg-red-200"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {showAddUser && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                  <h3 className="text-lg font-bold mb-4">Add New User</h3>
                  <form onSubmit={handleAddUser} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="investor">Investor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newUser.password}
                          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                          required
                        />
                        <button
                          type="button"
                          onClick={generateRandomPassword}
                          className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                    <div className="flex space-x-3 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                      >
                        Add User
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddUser(false)}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'documents'
                  ? 'border-yellow-600 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Documents
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reports'
                  ? 'border-yellow-600 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Project Reports
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Investment Documents</h2>
            <p className="text-gray-600">
              Complete the required paperwork to formalize your investment in Liv 1403.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Non-Disclosure Agreement
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Confidentiality agreement required before accessing detailed financial information.
                    </p>
                    <div className="space-y-2">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        View NDA
                      </button>
                      <button className="ml-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        Download PDF
                      </button>
                    </div>
                    <div className="mt-3 flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Status: Pending Signature
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Offering Memorandum
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Comprehensive investment details, financials, and terms for Liv 1403.
                    </p>
                    <div className="space-y-2">
                      <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium">
                        View Memorandum
                      </button>
                      <button className="ml-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        Download PDF
                      </button>
                    </div>
                    <div className="mt-3 flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Requires NDA Completion
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Investment Process</h3>
              <div className="space-y-3 text-sm text-blue-800">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium">Portal Access Granted</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-xs">1</div>
                  <span>Review and sign Non-Disclosure Agreement</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-3 text-gray-600 font-bold text-xs">2</div>
                  <span>Study the Offering Memorandum</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-3 text-gray-600 font-bold text-xs">3</div>
                  <span>Complete Subscription Agreement</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-3 text-gray-600 font-bold text-xs">4</div>
                  <span>Schedule investment consultation call</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-3 text-gray-600 font-bold text-xs">5</div>
                  <span>Finalize investment and wire transfer</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Project Reports</h2>
            <p className="text-gray-600">
              Stay updated with quarterly progress reports and financial updates.
            </p>

            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Q4 2024 Progress Report</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Construction planning, permit updates, and timeline adjustments
                    </p>
                    <div className="mt-2 text-xs text-gray-500">
                      Published: December 31, 2024
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      View Report
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Download
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Q1 2025 Financial Update</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Budget status, pre-construction activities, and market analysis update
                    </p>
                    <div className="mt-2 text-xs text-gray-500">
                      Published: March 31, 2025
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      View Report
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Download
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-500">Q2 2025 Construction Report</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Construction commencement and progress updates
                    </p>
                    <div className="mt-2 text-xs text-gray-400">
                      Expected: September 30, 2025
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    Coming Soon
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-8">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">Questions About Reports?</h3>
              <p className="text-yellow-800 text-sm mb-4">
                Contact our team for clarification on any project updates or financial information.
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <a 
                  href="mailto:lance.nading@c3hdenver.com"
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium text-center"
                >
                  Email Lance Nading
                </a>
                <a 
                  href="tel:720-359-8337"
                  className="bg-white text-yellow-600 border border-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-50 transition-colors text-sm font-medium text-center"
                >
                  Call 720-359-8337
                </a>
                <button
                  onClick={() => window.open('https://calendly.com/c3hdenver', '_blank')}
                  className="bg-yellow-100 text-yellow-800 border border-yellow-300 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-colors text-sm font-medium"
                >
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}