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
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
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

  // Fetch data when admin panel is shown
  useEffect(() => {
    if (showAdminPanel && currentUser?.role === 'admin') {
      fetchApplications();
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

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/applications/admin', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications || []);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
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

  const handleApproveApplication = async (id) => {
    if (!confirm('Approve and create user account?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/applications/admin', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          application_id: id, 
          status: 'approved', 
          create_user: true 
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(`Approved! Temp password: ${data.temp_password}`);
        fetchApplications();
        fetchUsers();
      } else {
        alert(data.error || 'Failed to approve application');
      }
    } catch (error) {
      console.error('Error approving application:', error);
      alert('Network error. Please try again.');
    }
  };

  const handleRejectApplication = async (id) => {
    if (!confirm('Reject this application?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/applications/admin', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          application_id: id, 
          status: 'rejected' 
        }),
      });

      if (response.ok) {
        alert('Application rejected');
        fetchApplications();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to reject application');
      }
    } catch (error) {
      console.error('Error rejecting application:', error);
      alert('Network error. Please try again.');
    }
  };

  const handleDeleteApplication = async (id) => {
    if (!confirm('Delete permanently?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/applications/admin?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Deleted');
        fetchApplications();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete application');
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('Network error. Please try again.');
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
        fetchUsers();
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
    window.location.href = `/apply`;
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
                    <strong>Confidentiality:</strong> By accepting delivery of this investment presentation, you agree the information contained in the investment presentation is confidential, and you agree not to reproduce, disclose, or distribute to any other person, in whole or in part, the contents of this investment presentation, unless the Company provides its prior written consent.
                  </p>
                  <p>
                    <strong>Investment Risk:</strong> All investments in the Company are speculative, illiquid, and subject to restrictions on transfer. There is no assurance that the Company will achieve any targeted investment returns, or any returns at all. Investors in the Company could lose their entire investment.
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Apply for Access</span>
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

      {showAdminPanel && currentUser.role === 'admin' ? (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="space-y-6">
            {/* Applications Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Investor Applications</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Investment</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {applications.map((app, index) => (
                      <tr key={app.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 text-sm text-gray-900">{app.full_name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{app.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{app.phone}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{app.investment_amount}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            app.status === 'approved' ? 'bg-green-100 text-green-800' :
                            app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex space-x-2">
                            {app.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleApproveApplication(app.id)}
                                  className="px-3 py-1 rounded text-xs bg-green-100 text-green-800 hover:bg-green-200"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleRejectApplication(app.id)}
                                  className="px-3 py-1 rounded text-xs bg-red-100 text-red-800 hover:bg-red-200"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleDeleteApplication(app.id)}
                              className="px-3 py-1 rounded text-xs bg-gray-100 text-gray-800 hover:bg-gray-200"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* User Management Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                <button
                  onClick={() => setShowAddUser(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add New User
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Last Login</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user, index) => (
                      <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
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
        </div>
      ) : (
        <>
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
                      <div className="text-sm text-gray-600 mb-2">Projected Total Cost</div>
                      <div className="text-3xl font-bold text-gray-900">$6.2M</div>
                      <div className="text-xs text-gray-500 mt-2">75% Debt | 25% Equity</div>
                    </div>
                    
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="text-sm text-gray-600 mb-2">Projected Finished Value</div>
                      <div className="text-3xl font-bold text-green-600">$8.2M</div>
                      <div className="text-xs text-gray-500 mt-2">At completion</div>
                    </div>
                    
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="text-sm text-gray-600 mb-2">Estimated Project IRR</div>
                      <div className="text-3xl font-bold text-yellow-600">39.48%</div>
                      <div className="text-xs text-gray-500 mt-2">Annual return</div>
                    </div>
                    
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="text-sm text-gray-600 mb-2">Estimated Project MOIC</div>
                      <div className="text-3xl font-bold text-blue-600">1.32x</div>
                      <div className="text-xs text-gray-500 mt-2">Equity multiple</div>
                    </div>
                  </div>

                  {/* Capital Structure */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Capital Structure</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-700">Equity Capital Contributions</span>
                          <span className="font-semibold text-gray-900">$1,600,000</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-blue-600 h-3 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">25% of total cost</div>
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Members' Capital Contribution (90%):</span>
                            <span className="font-medium">$1,440,000</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Manager's Capital Contribution (10%):</span>
                            <span className="font-medium">$160,000</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-700">Debt Financing (75% LTC)</span>
                          <span className="font-semibold text-gray-900">$4,600,000</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-green-600 h-3 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">75% loan-to-cost</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Minimum Member Investment</span>
                        <span className="text-2xl font-bold text-gray-900">$150,000</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-700 font-medium">Target Investment Period</span>
                        <span className="text-xl font-bold text-gray-900">18 Months</span>
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
                              90% of distributions are made to the Members and 10% to the Manager, until each receives back their initial contributed capital
                            </div>
                          </div>
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">90/10</span>
                        </div>
                      </div>
                      
                      <div className="border-l-4 border-green-600 pl-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold text-gray-900">Tier 2: Initial Preferred Return 10%</div>
                            <div className="text-sm text-gray-600 mt-1">
                              90% of distributions are made to the Members and 10% to the Manager, until each receives a 10% aggregate annual return on their contributed funds
                            </div>
                          </div>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">90/10</span>
                        </div>
                      </div>
                      
                      <div className="border-l-4 border-yellow-600 pl-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold text-gray-900">Tier 3: Cumulative Preferred Return 15%</div>
                            <div className="text-sm text-gray-600 mt-1">
                              70% of subsequent distributions are made to the Members and 30% to the Manager, until the Members receive a 15% annual return on their contributed funds
                            </div>
                          </div>
                          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">70/30</span>
                        </div>
                      </div>
                      
                      <div className="border-l-4 border-purple-600 pl-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold text-gray-900">Tier 4: Cumulative Preferred Return &gt;15%</div>
                            <div className="text-sm text-gray-600 mt-1">
                              Thereafter, any additional distributions are made 60% to the Members and 40% to the Manager
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
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Estimated Timeline</h3>
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
                        Presales start
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-32 text-sm text-gray-600">Months 14-16</div>
                      <div className="flex-1 ml-48 bg-yellow-600 rounded-full h-8 flex items-center px-4 text-white text-sm font-medium">
                        Presales closing
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-32 text-sm text-gray-600">Months 16-18</div>
                      <div className="flex-1 ml-56 bg-purple-600 rounded-full h-8 flex items-center px-4 text-white text-sm font-medium">
                        Remaining Sales closing
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Targeted Completion</span>
                      <span className="text-xl font-bold text-gray-900">5/15/2027</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 bg-yellow-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Important:</strong> All future dates and anticipated milestones are estimates only. Actual timing may materially differ. Please see the "Disclosures" provided on p. 14 of the Investment Presentation. The Company does not guarantee any future performance, results, or timeframes.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'financials' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Detailed Financial Breakdown</h2>
                
                {/* Project Budget */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Projected Budget</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Cost Summary</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Total</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Per Unit</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">$/Gross Sq. Ft.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-900">Land Cost</td>
                          <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">$1.75M</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-600">$250,000</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-600">$193.20</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-900">Soft Costs</td>
                          <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">$450,000</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-600">$64,971</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-600">$50.21</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-900">Hard Costs</td>
                          <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">$3.6M</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-600">$514,286</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-600">$397.44</td>
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
                          <td className="px-4 py-3 text-sm text-gray-900">Projected Total Cost</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-900">$6.2M</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-900">$885,325</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-900">$684.18</td>
                        </tr>
                        <tr className="bg-green-50 font-semibold">
                          <td className="px-4 py-3 text-sm text-gray-900">Projected Finished Value</td>
                          <td className="px-4 py-3 text-sm text-right text-green-700">$8.2M</td>
                          <td className="px-4 py-3 text-sm text-right text-green-700">$1,366,667</td>
                          <td className="px-4 py-3 text-sm text-right text-green-700">$905.99</td>
                        </tr>
                        <tr className="bg-blue-50 font-bold">
                          <td className="px-4 py-3 text-sm text-gray-900">Targeted Profit</td>
                          <td className="px-4 py-3 text-sm text-right text-blue-700">$2M</td>
                          <td className="px-4 py-3 text-sm text-right text-blue-700">$333,333</td>
                          <td className="px-4 py-3 text-sm text-right text-blue-700">$192.77</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 bg-yellow-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Important:</strong> All budgeted amounts are estimates only and may materially differ in practice. Many construction costs are outside of the Company's control. Please see the "Disclosures" provided on p. 14. Changes in budgeted costs may materially and negatively impact investor returns.
                    </p>
                  </div>
                </div>

                {/* Existing Multi-Family Apartments */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Existing Multi-Family Apartments</h3>
                  <p className="text-gray-600 mb-4">
                    Currently, there are three new luxury apartment buildings on Old South Pearl St, located at:
                  </p>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <a 
                        href="https://www.1411southpearl.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-semibold text-blue-600 hover:text-blue-700 mb-2 inline-flex items-center"
                      >
                        1411 S. Pearl St.
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                      <div className="text-sm text-gray-600 mt-2">
                        Market rental rates between $3.90 - $5.00 PSF per month • Extremely low vacancy and often times have wait lists to be approved for tenancy
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <a 
                        href="https://1745southpearl.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-semibold text-blue-600 hover:text-blue-700 mb-2 inline-flex items-center"
                      >
                        1745 S. Pearl St.
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                      <div className="text-sm text-gray-600 mt-2">
                        Constructed by Lance Nading (Principal of Liv1403) in 2021 • Market rental rates between $3.90 - $5.00 PSF per month • Extremely low vacancy and often times have wait lists to be approved for tenancy
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <a 
                        href="https://cornerstoneapartments.com/our-buildings/1775-s-pearl/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-semibold text-blue-600 hover:text-blue-700 mb-2 inline-flex items-center"
                      >
                        1775 S. Pearl St.
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                      <div className="text-sm text-gray-600 mt-2">
                        Market rental rates between $3.90 - $5.00 PSF per month • Extremely low vacancy and often times have wait lists to be approved for tenancy
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-900 mb-2">Market Value Analysis</div>
                    <div className="text-sm text-blue-800">
                      Each of the above apartment buildings' market value at a 5% cap rate calculated on their net rental income exceeds the targeted market per square foot sale price value for Liv1403.
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <div className="font-semibold text-green-900 mb-2">First to Market For-Sale Condos</div>
                    <div className="text-sm text-green-800">
                      Liv1403 will be first to market in the Old South Pearl St. submarket, offering the only for-sale exclusive high end luxury condominium purchase opportunity.
                    </div>
                  </div>
                </div>

                {/* Recent Experience */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Experience</h3>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      The Principal, Lance Nading, previously completed 1745 S. Pearl St. an apartment building on Old South Pearl Street, and is deeply familiar with the neighborhood, community, and real estate values.
                    </p>
                  </div>
                </div>

                {/* Condominium Value */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Liv1403 Condominium Value</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700">Anticipated Finished Market Value</span>
                        <span className="font-semibold text-gray-900">$850 - $950+ per square foot</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Liv1403 condominiums are uniquely located, with cutting edge design, superior construction quality. Finished market value is anticipated to be between $850-$950+ per square foot. Additionally, Liv1403 will provide the best in high end luxury finishes and state of the art technology in every unit.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Risk Factors */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-red-900 mb-4">Investment Risk Disclosure</h3>
                  <div className="space-y-3 text-sm text-red-800">
                    <p><strong>Important:</strong> Target returns are estimates. Any actual returns may materially differ. Please see the "Disclosures" provided on p. 14. Investing in the Company is high risk, and you could lose all your investment. The Company does not guarantee any returns.</p>
                    
                    <p className="mt-4"><strong>Key Risk Factors:</strong></p>
                    <ul className="space-y-2 ml-4 list-disc">
                      <li>All investments in the Company are speculative, illiquid, and subject to restrictions on transfer</li>
                      <li>There is no assurance that the Company will achieve any targeted investment returns, or any returns at all</li>
                      <li>Investors in the Company could lose their entire investment</li>
                      <li>No secondary market exists for interests in the Company, and none is expected to develop</li>
                      <li>Construction delays, cost overruns, or unforeseen conditions could impact timeline and budget</li>
                      <li>Changes in market conditions could affect sale prices and absorption rates</li>
                      <li>Interest rate changes or availability of financing could impact project economics</li>
                    </ul>
                  </div>
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
                          Approved City of Denver commercial construction permit - Liv1403 construction permits have been approved and the project is shovel ready.
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
                      href="mailto:lance.nading@c3hdenver.com"
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium text-center"
                    >
                      Email Lance Nading
                    </a>
                    <a 
                      href="tel:+1-303-359-8337"
                      className="bg-white text-yellow-600 border border-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-50 transition-colors text-sm font-medium text-center"
                    >
                      Call +1 (303) 359-8337
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
                        <h3 className="text-lg font-semibold text-gray-900">Current Status - Shovel Ready</h3>
                        <p className="text-sm text-gray-500 mt-1">Updated: October 29, 2025</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        Active
                      </span>
                    </div>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        ✓ <strong>Permit Status:</strong> Liv1403 construction permits have been approved and the project is shovel ready
                      </p>
                      <p>
                        ✓ <strong>Financing secured:</strong> Construction loan commitment in place (75% LTC)
                      </p>
                      <p>
                        ⏳ <strong>Equity raising:</strong> Currently accepting qualified investor commitments ($150,000 minimum)
                      </p>
                      <p>
                        📅 <strong>Groundbreaking targeted:</strong> Upon full equity commitment
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="font-semibold text-green-900 mb-2">Coming Soon: Trader Joe's</h4>
                        <p className="text-green-800 text-sm">
                          Exciting news for future residents of Liv1403: in 2026, a brand-new Trader Joe's is scheduled to open just one block away. With its affordable organic options, specialty items, and neighborhood-friendly vibe, having Trader Joe's within walking distance adds everyday convenience and enhances the vibrant lifestyle of this sought-after Pearl Street location.
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
        </>
      )}
    </main>
  );
}