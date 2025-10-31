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

  // Application management (admin)
  const [applications, setApplications] = useState([]);
  const [showApplicationsPanel, setShowApplicationsPanel] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showApplicationDetails, setShowApplicationDetails] = useState(false);

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

  // Fetch applications when applications panel is shown
  useEffect(() => {
    if (showApplicationsPanel && currentUser?.role === 'admin') {
      fetchApplications();
    }
  }, [showApplicationsPanel, currentUser]);

  const handleLogin = async (e: React.FormEvent) => {
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
    setShowApplicationsPanel(false);
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

  const handleApproveApplication = async (applicationId: string) => {
    if (!confirm('Approve this application and create user account?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/applications/admin', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          application_id: applicationId,
          status: 'approved',
          create_user: true
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(`Application approved! Temporary password: ${data.temp_password}\n\nPlease save this password and send it to the user.`);
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

  const handleRejectApplication = async (applicationId: string) => {
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
          application_id: applicationId,
          status: 'rejected'
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Application rejected');
        fetchApplications();
      } else {
        alert(data.error || 'Failed to reject application');
      }
    } catch (error) {
      console.error('Error rejecting application:', error);
      alert('Network error. Please try again.');
    }
  };

  const handleDeleteApplication = async (applicationId: string) => {
    if (!confirm('Delete this application permanently?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/applications/admin?id=${applicationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Application deleted');
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

  const handleAddUser = async (e: React.FormEvent) => {
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

  const handleDeleteUser = async (userId: string) => {
    if (userId === currentUser?.id) {
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

  const handleToggleUserStatus = async (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
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

  const handleCall = () => {
    window.location.href = 'tel:720-359-8337';
  };

  // Application Details Modal (Admin)
  const ApplicationDetailsModal = ({ application }: { application: any }) => (
    <div 
      className="fixed inset-0 z-[10000]"
      style={{ isolation: 'isolate' }}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => {
          setShowApplicationDetails(false);
          setSelectedApplication(null);
        }}
      />
      
      <div className="absolute inset-0 overflow-y-auto flex items-center justify-center p-4">
        <div 
          className="relative bg-white rounded-2xl p-8 max-w-3xl w-full my-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
            <button
              onClick={() => {
                setShowApplicationDetails(false);
                setSelectedApplication(null);
              }}
              className="text-gray-400 hover:text-gray-600"
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-gray-900 font-medium">{application.full_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900 font-medium">{application.email}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <p className="text-gray-900 font-medium">{application.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Company</label>
                <p className="text-gray-900 font-medium">{application.company_name || 'N/A'}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Investment Amount</label>
                <p className="text-gray-900 font-medium">{application.investment_amount}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Entity Type</label>
                <p className="text-gray-900 font-medium capitalize">{application.entity_type}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Accredited Investor</label>
                <p className="text-gray-900 font-medium">
                  {application.accredited_investor ? '✓ Yes' : '✗ No'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Referral Source</label>
                <p className="text-gray-900 font-medium">{application.referral_source || 'N/A'}</p>
              </div>
            </div>

            {application.message && (
              <div>
                <label className="text-sm font-medium text-gray-500">Message</label>
                <p className="text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">{application.message}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <span className={`inline-block px-3 py-1 rounded-full text-sm mt-1 ${
                  application.status === 'approved' ? 'bg-green-100 text-green-800' :
                  application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  application.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {application.status}
                </span>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Submitted</label>
                <p className="text-gray-900 font-medium">
                  {new Date(application.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            {application.admin_notes && (
              <div className="pt-4 border-t">
                <label className="text-sm font-medium text-gray-500">Admin Notes</label>
                <p className="text-gray-900 mt-1 p-3 bg-yellow-50 rounded-lg">{application.admin_notes}</p>
              </div>
            )}

            <div className="flex space-x-4 pt-4">
              {application.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleApproveApplication(application.id);
                      setShowApplicationDetails(false);
                    }}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve & Create User
                  </button>
                  <button
                    onClick={() => {
                      handleRejectApplication(application.id);
                      setShowApplicationDetails(false);
                    }}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => setShowApplicationDetails(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
                  autoComplete="email"
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
                  autoComplete="current-password"
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
                  onClick={() => window.location.href = '/apply'}
                  type="button"
                  className="w-full bg-white/10 text-white py-3 rounded-lg font-medium hover:bg-white/20 transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Apply for Access</span>
                </button>
                
                <button
                  onClick={handleCall}
                  type="button"
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

  // Authenticated portal view
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
                <>
                  <button
                    onClick={() => {
                      setShowApplicationsPanel(!showApplicationsPanel);
                      setShowAdminPanel(false);
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {showApplicationsPanel ? 'Hide Applications' : 'View Applications'}
                  </button>
                  <button
                    onClick={() => {
                      setShowAdminPanel(!showAdminPanel);
                      setShowApplicationsPanel(false);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {showAdminPanel ? 'Hide Admin' : 'Admin Panel'}
                  </button>
                </>
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Your Investment Portal</h2>
          <p className="text-gray-600">Portal content goes here...</p>
        </div>
      </div>

      {showApplicationDetails && selectedApplication && (
        <ApplicationDetailsModal application={selectedApplication} />
      )}
    </main>
  );
}