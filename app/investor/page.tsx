'use client';

import { useState, useEffect } from 'react';

export default function InvestorPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasAgreedToDisclaimer, setHasAgreedToDisclaimer] = useState(false);
  
  // Admin state
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', name: '', role: 'investor', password: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.clear();
      }
    }
  }, []);

  useEffect(() => {
    if (showAdminPanel && currentUser?.role === 'admin') {
      fetchApplications();
      fetchUsers();
    }
  }, [showAdminPanel, currentUser]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasAgreedToDisclaimer) {
      setError('You must agree to the disclaimers before proceeding.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setCurrentUser(data.user);
        setIsAuthenticated(true);
      } else {
        setError(data.error || 'Login failed');
        setPassword('');
      }
    } catch (error) {
      setError('Network error');
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setShowAdminPanel(false);
  };

  const fetchApplications = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/applications/admin', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setApplications(data.applications || []);
    }
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/users', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setUsers(data.users || []);
    }
  };

  const handleApproveApplication = async (id: string) => {
    if (!confirm('Approve and create user account?')) return;
    const token = localStorage.getItem('token');
    const response = await fetch('/api/applications/admin', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ application_id: id, status: 'approved', create_user: true }),
    });
    const data = await response.json();
    if (response.ok) {
      alert(`Approved! Temp password: ${data.temp_password}`);
      fetchApplications();
      fetchUsers();
    } else {
      alert(data.error);
    }
  };

  const handleRejectApplication = async (id: string) => {
    if (!confirm('Reject this application?')) return;
    const token = localStorage.getItem('token');
    const response = await fetch('/api/applications/admin', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ application_id: id, status: 'rejected' }),
    });
    if (response.ok) {
      alert('Application rejected');
      fetchApplications();
    }
  };

  const handleDeleteApplication = async (id: string) => {
    if (!confirm('Delete permanently?')) return;
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/applications/admin?id=${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (response.ok) {
      alert('Deleted');
      fetchApplications();
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
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
    if (response.ok) {
      alert('User created!');
      setNewUser({ email: '', name: '', role: 'investor', password: '' });
      setShowAddUser(false);
      fetchUsers();
    } else {
      alert(data.error);
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
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
              <p className="text-gray-300 text-sm">Confidential investment materials</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                placeholder="Email"
                required
                disabled={loading}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                placeholder="Password"
                required
                disabled={loading}
              />

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-xs text-gray-300 mb-3">
                  By accessing this portal, you agree that all information is confidential and you are an accredited investor. 
                  Investments are speculative and you could lose your entire investment.
                </p>
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={hasAgreedToDisclaimer}
                    onChange={(e) => setHasAgreedToDisclaimer(e.target.checked)}
                    className="mt-1 w-4 h-4 text-yellow-600 bg-white/10 border-white/20 rounded"
                    disabled={loading}
                  />
                  <span className="text-xs text-gray-300">I agree to all disclaimers</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 disabled:opacity-50"
              >
                {loading ? 'Signing In...' : 'Access Portal'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/20 space-y-3">
              <p className="text-gray-300 text-sm text-center mb-3">Need access?</p>
              <button
                onClick={() => window.location.href = '/apply'}
                className="w-full bg-white/10 text-white py-3 rounded-lg font-medium hover:bg-white/20"
              >
                Apply for Access
              </button>
              <button
                onClick={() => window.location.href = 'tel:720-359-8337'}
                className="w-full bg-white/10 text-white py-3 rounded-lg font-medium hover:bg-white/20"
              >
                Call 720-359-8337
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 pt-[92px] min-h-screen">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Investor Portal</h1>
              <p className="text-gray-600 mt-1">Welcome, {currentUser.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              {currentUser.role === 'admin' && (
                <button
                  onClick={() => setShowAdminPanel(!showAdminPanel)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  {showAdminPanel ? 'Hide Admin' : 'Admin Panel'}
                </button>
              )}
              <button
                onClick={handleLogout}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {showAdminPanel && currentUser.role === 'admin' ? (
          <div className="space-y-6">
            {/* Applications */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Applications</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Investment</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {applications.map((app) => (
                      <tr key={app.id}>
                        <td className="px-4 py-3 text-sm">{app.full_name}</td>
                        <td className="px-4 py-3 text-sm">{app.email}</td>
                        <td className="px-4 py-3 text-sm">{app.investment_amount}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            app.status === 'approved' ? 'bg-green-100 text-green-800' :
                            app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm space-x-2">
                          {app.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApproveApplication(app.id)}
                                className="text-green-600 hover:underline"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleRejectApplication(app.id)}
                                className="text-red-600 hover:underline"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDeleteApplication(app.id)}
                            className="text-gray-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Users */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Users</h2>
                <button
                  onClick={() => setShowAddUser(!showAddUser)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  {showAddUser ? 'Cancel' : 'Add User'}
                </button>
              </div>

              {showAddUser && (
                <form onSubmit={handleAddUser} className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3">
                  <div className="grid md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className="px-4 py-2 border rounded-lg"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      className="px-4 py-2 border rounded-lg"
                    >
                      <option value="investor">Investor</option>
                      <option value="admin">Admin</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      className="px-4 py-2 border rounded-lg"
                      required
                    />
                    <button
                      type="button"
                      onClick={generatePassword}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                      Generate
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Create User
                  </button>
                </form>
              )}

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-4 py-3 text-sm">{user.name}</td>
                        <td className="px-4 py-3 text-sm">{user.email}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Investment Presentation</h2>
              <p className="text-gray-600 mt-1">Liv1403 - 1403 South Pearl Street, Denver</p>
            </div>
            
            <div className="p-6">
              <iframe
                src="/1403_Investor_Presentation__pdf.pdf"
                className="w-full border-0"
                style={{ height: 'calc(100vh - 350px)', minHeight: '600px' }}
                title="Investment Presentation"
              />
            </div>

            <div className="p-6 border-t bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Questions?</h3>
                  <p className="text-sm text-gray-600">Contact Lance Nading</p>
                </div>
                <div className="flex space-x-3">
                  <a
                    href="tel:+13033598337"
                    className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700"
                  >
                    Call Now
                  </a>
                  <a
                    href="mailto:lance.nading@c3hdenver.com"
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}