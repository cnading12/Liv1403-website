'use client';

import { useState, useEffect } from 'react';

export default function InvestmentPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hasAgreedToDisclaimer, setHasAgreedToDisclaimer] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  // Admin functionality state
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    name: '',
    role: 'investor',
    password: ''
  });

  // Check for existing token on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Fetch users when admin panel is shown
  useEffect(() => {
    if (showAdminPanel && currentUser?.role === 'admin') {
      fetchUsers();
    }
  }, [showAdminPanel, currentUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!hasAgreedToDisclaimer) {
      setError('You must agree to the disclaimers and confidentiality terms before proceeding.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        setCurrentUser(data.user);
        setIsAuthenticated(true);
        setError('');
      } else {
        setError(data.error || 'Login failed. Please try again.');
        setPassword('');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please check your connection and try again.');
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setEmail('');
    setPassword('');
    setShowAdminPanel(false);
    setActiveTab('dashboard');
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    
    if (users.find(u => u.email === newUser.email)) {
      alert('A user with this email already exists.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUsers([data.user, ...users]);
        setNewUser({ email: '', name: '', role: 'investor', password: '' });
        setShowAddUser(false);
        alert('User created successfully!');
      } else {
        alert(data.error || 'Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Network error. Please try again.');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (userId === currentUser.id) {
      alert('You cannot delete your own account.');
      return;
    }
    
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setUsers(users.filter(u => u.id !== userId));
          alert('User deleted successfully!');
        } else {
          const data = await response.json();
          alert(data.error || 'Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Network error. Please try again.');
      }
    }
  };

  const handleToggleUserStatus = async (userId) => {
    const user = users.find(u => u.id === userId);
    const newStatus = user.status === 'active' ? 'inactive' : 'active';

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(users.map(u => 
          u.id === userId ? data.user : u
        ));
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to update user status');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Network error. Please try again.');
    }
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewUser({ ...newUser, password: result });
  };

  const handleRequestPassword = () => {
    window.location.href = `mailto:lance.nading@liv1403.com?subject=Investment Portal Access Request - Liv 1403&body=Hello,%0D%0A%0D%0AI am requesting access to the Liv 1403 Investment Portal. Please provide me with login credentials.%0D%0A%0D%0AName: [Your Full Name]%0D%0AEmail: [Your Email Address]%0D%0ACompany: [Your Company Name]%0D%0APhone: [Your Phone Number]%0D%0A%0D%0AThank you,%0D%0A[Your Name]`;
  };

  const handleCall = () => {
    window.location.href = 'tel:720-359-8337';
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6 pt-[100px]">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Liv 1403</h1>
            <p className="text-gray-300">Investor Portal</p>
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
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-3">
                <p className="text-blue-300 text-xs mb-2"><strong>Demo Credentials:</strong></p>
                <p className="text-blue-300 text-xs">Admin: merrittfitnessmanager@gmail.com / Liv1403CNLN</p>
                <p className="text-blue-300 text-xs">Use the admin account to create investor accounts</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3 text-sm">Required Agreement - Confidential Investment Information</h4>
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
                    disabled={loading}
                  />
                  <span className="text-xs text-gray-300">
                    I have read and agree to all disclaimers and confidentiality terms, acknowledge I am an accredited investor, and understand the investment risks.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In...' : 'Access Portal'}
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
              <h1 className="text-3xl font-bold text-gray-900">Investor Portal</h1>
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
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                      </td>
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
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-yellow-600 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Investment Dashboard
            </button>
            <button
              onClick={() => setActiveTab('financials')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'financials'
                  ? 'border-yellow-600 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Financial Details
            </button>
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
              onClick={() => setActiveTab('updates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'updates'
                  ? 'border-yellow-600 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Project Updates
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Investment Overview</h2>
              
              {/* Key Metrics Grid */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="text-sm text-gray-600 mb-2">Total Project Cost</div>
                  <div className="text-3xl font-bold text-gray-900">$6.2M</div>
                  <div className="text-xs text-gray-500 mt-2">75% Debt | 25% Equity</div>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="text-sm text-gray-600 mb-2">Projected Value</div>
                  <div className="text-3xl font-bold text-green-600">$8.2M</div>
                  <div className="text-xs text-gray-500 mt-2">At completion</div>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="text-sm text-gray-600 mb-2">Target IRR</div>
                  <div className="text-3xl font-bold text-yellow-600">39.48%</div>
                  <div className="text-xs text-gray-500 mt-2">Annual return</div>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="text-sm text-gray-600 mb-2">Equity Multiple</div>
                  <div className="text-3xl font-bold text-blue-600">1.32x</div>
                  <div className="text-xs text-gray-500 mt-2">MOIC</div>
                </div>
              </div>

              {/* Capital Structure */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Capital Structure</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Equity Capital</span>
                      <span className="font-semibold text-gray-900">$1,600,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">25% of total cost</div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Members (90%):</span>
                        <span className="font-medium">$1,440,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Manager (10%):</span>
                        <span className="font-medium">$160,000</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Debt Financing</span>
                      <span className="font-semibold text-gray-900">$4,600,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-600 h-3 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">75% LTC</div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Minimum Investment</span>
                    <span className="text-2xl font-bold text-gray-900">$150,000</span>
                  </div>
                </div>
              </div>

              {/* Waterfall Structure */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Return Waterfall Structure</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold text-gray-900">Tier 1: Return of Capital</div>
                        <div className="text-sm text-gray-600 mt-1">
                          90% to Members | 10% to Manager until each receives back initial capital
                        </div>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">90/10</span>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-green-600 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold text-gray-900">Tier 2: Initial Preferred Return (10%)</div>
                        <div className="text-sm text-gray-600 mt-1">
                          90% to Members | 10% to Manager until 10% annual return achieved
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">90/10</span>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-yellow-600 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold text-gray-900">Tier 3: Cumulative Preferred Return (15%)</div>
                        <div className="text-sm text-gray-600 mt-1">
                          70% to Members | 30% to Manager until 15% annual return achieved
                        </div>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">70/30</span>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-purple-600 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold text-gray-900">Tier 4: Residual Split (&gt;15%)</div>
                        <div className="text-sm text-gray-600 mt-1">
                          60% to Members | 40% to Manager on all additional distributions
                        </div>
                      </div>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">60/40</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Project Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-32 text-sm text-gray-600">Months 1-14</div>
                  <div className="flex-1 bg-blue-600 rounded-full h-8 flex items-center px-4 text-white text-sm font-medium">
                    Construction
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-32 text-sm text-gray-600">Months 3-14</div>
                  <div className="flex-1 ml-24 bg-green-600 rounded-full h-8 flex items-center px-4 text-white text-sm font-medium">
                    Pre-Sales Period
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-32 text-sm text-gray-600">Months 14-16</div>
                  <div className="flex-1 ml-48 bg-yellow-600 rounded-full h-8 flex items-center px-4 text-white text-sm font-medium">
                    Pre-Sales Closing
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-32 text-sm text-gray-600">Months 16-18</div>
                  <div className="flex-1 ml-56 bg-purple-600 rounded-full h-8 flex items-center px-4 text-white text-sm font-medium">
                    Remaining Sales & Final Close
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Target Investment Period</span>
                  <span className="text-xl font-bold text-gray-900">18 Months</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-700 font-medium">Target Completion Date</span>
                  <span className="text-xl font-bold text-gray-900">May 15, 2027</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'financials' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Detailed Financial Breakdown</h2>
            
            {/* Project Budget */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Project Budget</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Cost Category</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Total</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Per Unit</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Per SF (Gross)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Land Cost</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">$1,750,000</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">$250,000</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">$193.20</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Hard Costs</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">$3,600,000</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">$514,286</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">$397.44</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Soft Costs</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">$450,000</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">$64,971</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">$50.21</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Interest Reserve + Loan Fees</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">$260,000</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">$33,210</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">$25.66</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Marketing</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">$140,000</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">$22,857</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">$17.66</td>
                    </tr>
                    <tr className="bg-yellow-50 font-semibold">
                      <td className="px-4 py-3 text-sm text-gray-900">Total Project Cost</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">$6,200,000</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">$885,325</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">$684.18</td>
                    </tr>
                    <tr className="bg-green-50 font-semibold">
                      <td className="px-4 py-3 text-sm text-gray-900">Projected Finished Value</td>
                      <td className="px-4 py-3 text-sm text-right text-green-700">$8,200,000</td>
                      <td className="px-4 py-3 text-sm text-right text-green-700">$1,366,667</td>
                      <td className="px-4 py-3 text-sm text-right text-green-700">$905.99</td>
                    </tr>
                    <tr className="bg-blue-50 font-bold">
                      <td className="px-4 py-3 text-sm text-gray-900">Projected Profit</td>
                      <td className="px-4 py-3 text-sm text-right text-blue-700">$2,000,000</td>
                      <td className="px-4 py-3 text-sm text-right text-blue-700">$481,342</td>
                      <td className="px-4 py-3 text-sm text-right text-blue-700">$221.81</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Market Comparable Analysis */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Market Comparable Analysis</h3>
              <p className="text-gray-600 mb-4">
                Three new luxury apartment buildings on Old South Pearl Street provide strong market validation:
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="font-semibold text-gray-900 mb-2">1411 S. Pearl St.</div>
                  <div className="text-sm text-gray-600">
                    Rental rates: $3.90 - $5.00 PSF/month • Low vacancy • Wait list for tenancy
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Market value at 5% cap rate exceeds Liv1403 targeted price PSF
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="font-semibold text-gray-900 mb-2">1745 S. Pearl St.</div>
                  <div className="text-sm text-gray-600">
                    Developed by Lance Nading (2021) • Rental rates: $3.90 - $5.00 PSF/month
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Low vacancy • Proven developer experience in this exact submarket
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="font-semibold text-gray-900 mb-2">1775 S. Pearl St.</div>
                  <div className="text-sm text-gray-600">
                    Rental rates: $3.90 - $5.00 PSF/month • Extremely low vacancy
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Consistent demand validates market strength
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-900 mb-2">Key Market Insight</div>
                <div className="text-sm text-blue-800">
                  Liv1403 will be the <strong>first for-sale luxury condominiums</strong> in the Old South Pearl submarket, 
                  offering a unique investment opportunity with no direct competition for ownership units.
                </div>
              </div>
            </div>

            {/* Sensitivity Analysis */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Value Assumptions</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Target Sale Price Range</span>
                    <span className="font-semibold text-gray-900">$850 - $950+ per SF</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Based on prime corner location, cutting-edge design, superior construction quality, 
                    luxury finishes, and state-of-the-art technology in every unit.
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Unit Mix</span>
                    <span className="font-semibold text-gray-900">6 Residential Units</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    8,576 SF residential + 4,638 SF private rooftop decks + 482 SF retail
                  </p>
                </div>
              </div>
            </div>

            {/* Risk Factors */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-900 mb-4">Investment Risk Factors</h3>
              <ul className="space-y-2 text-sm text-red-800">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Construction Risk:</strong> Delays, cost overruns, or unforeseen site conditions could impact timeline and budget.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Market Risk:</strong> Changes in Denver real estate market conditions could affect sale prices and absorption rates.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Financing Risk:</strong> Interest rate changes or availability of construction financing could impact project economics.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Illiquidity:</strong> This is an illiquid investment with no guarantee of distributions or timeline for exit.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Loss of Capital:</strong> You could lose your entire investment. No returns are guaranteed.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Investment Documents</h2>
            <p className="text-gray-600">
              Access all legal documents and investor materials related to this investment opportunity.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Investment Presentation
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Complete investor presentation with financial projections, market analysis, and project details.
                    </p>
                    <div className="space-y-2">
                      <a 
                        href="/api/documents/investor-presentation" 
                        target="_blank"
                        className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        View PDF
                      </a>
                      <a 
                        href="/api/documents/investor-presentation?download=true"
                        className="ml-2 inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                      >
                        Download
                      </a>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      Last updated: October 2025 • 15 pages
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Operating Agreement
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      LLC operating agreement outlining member rights, responsibilities, and distributions.
                    </p>
                    <div className="space-y-2">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        View Document
                      </button>
                      <button className="ml-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        Download PDF
                      </button>
                    </div>
                    <div className="mt-3 flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Available after NDA signature
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Subscription Agreement
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Investment subscription documents to formalize your commitment to the project.
                    </p>
                    <div className="space-y-2">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                        View Agreement
                      </button>
                      <button className="ml-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        Download PDF
                      </button>
                    </div>
                    <div className="mt-3 flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Available after NDA signature
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Building Permit
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Approved City of Denver commercial construction permit - project is shovel ready.
                    </p>
                    <div className="space-y-2">
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                        View Permit
                      </button>
                      <button className="ml-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        Download PDF
                      </button>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      Permit #: 2023-COMMCON-0001361 • Issued: May 22, 2025
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-8">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">Document Assistance</h3>
              <p className="text-yellow-800 text-sm mb-4">
                Need help with any documents or have questions about the investment process?
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <a 
                  href="mailto:lance.nading@liv1403.com"
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
              </div>
            </div>
          </div>
        )}

        {activeTab === 'updates' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Project Updates</h2>
            <p className="text-gray-600">
              Stay informed with the latest construction progress, sales status, and important announcements.
            </p>

            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Current Status - Pre-Construction Phase</h3>
                    <p className="text-sm text-gray-500 mt-1">Updated: October 29, 2025</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    ✓ <strong>Building permits approved</strong> - Commercial construction permit issued by City of Denver
                  </p>
                  <p>
                    ✓ <strong>Financing secured</strong> - Construction loan commitment in place
                  </p>
                  <p>
                    ⏳ <strong>Equity raising</strong> - Currently accepting qualified investor commitments
                  </p>
                  <p>
                    📅 <strong>Groundbreaking targeted</strong> - Q1 2026 upon full equity commitment
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Upcoming Milestones</h3>
                    <p className="text-sm text-gray-500 mt-1">Expected timeline based on current projections</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 text-sm text-gray-600">Q4 2025</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Complete Equity Raise</div>
                      <div className="text-sm text-gray-600 mt-1">Finalize investor commitments and close funding round</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 text-sm text-gray-600">Q1 2026</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Construction Commencement</div>
                      <div className="text-sm text-gray-600 mt-1">Site preparation and foundation work begins</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 text-sm text-gray-600">Q2 2026</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Pre-Sales Launch</div>
                      <div className="text-sm text-gray-600 mt-1">Begin marketing and pre-selling condominium units</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 text-sm text-gray-600">Q2 2027</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Construction Completion</div>
                      <div className="text-sm text-gray-600 mt-1">Target completion date: May 15, 2027</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 text-sm text-gray-600">Q3 2027</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Final Closings & Distributions</div>
                      <div className="text-sm text-gray-600 mt-1">Complete unit sales and distribute investor returns</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">Market Update: Trader Joe's Confirmed</h4>
                    <p className="text-green-800 text-sm">
                      Exciting news: Trader Joe's has confirmed their new location will open in 2026, just one block from Liv 1403. 
                      This significant retail addition is expected to increase foot traffic and property values in the immediate area.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscribe to Project Updates</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Receive monthly email updates with construction progress photos, financial performance, and important announcements.
                </p>
                <div className="flex space-x-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  />
                  <button className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-medium">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  You'll receive monthly updates and can unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}