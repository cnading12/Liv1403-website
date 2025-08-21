'use client';

import { useState } from 'react';
import Head from 'next/head';

export default function InvestmentPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('documents');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1403Investor') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleRequestPassword = () => {
    window.location.href = 'mailto:manager@merritthouse.net?subject=Investment Portal Access Request - Liv 1403&body=Hello,%0D%0A%0D%0AI am requesting access to the Liv 1403 Investment Portal. Please provide me with the login credentials.%0D%0A%0D%0AThank you,%0D%0A[Your Name]';
  };

  const handleCall = () => {
    window.location.href = 'tel:303-359-8337';
  };

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Investment Portal | Liv 1403</title>
          <meta name="description" content="Secure investment portal for Liv 1403 investors. Access confidential documents and project updates." />
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6 pt-[16px]">
          <div className="max-w-md w-full">
            {/* Logo/Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Liv 1403</h1>
              <p className="text-gray-300">Investment Portal</p>
            </div>

            {/* Login Form */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Secure Access</h2>
                <p className="text-gray-300 text-sm">Enter your password to access confidential investment materials</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
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
                    placeholder="Enter portal password"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}

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
                    <span>Request Password</span>
                  </button>
                  
                  <button
                    onClick={handleCall}
                    className="w-full bg-white/10 text-white py-3 rounded-lg font-medium hover:bg-white/20 transition-colors flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Call 303-359-8337</span>
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
      </>
    );
  }

  // Authenticated Portal Content
  return (
    <>
      <Head>
        <title>Investment Portal - Dashboard | Liv 1403</title>
        <meta name="description" content="Liv 1403 investor dashboard with access to documents and project updates." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="bg-gray-50 pt-[92px] min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Investment Portal</h1>
                <p className="text-gray-600 mt-1">Liv 1403 - Confidential Investor Materials</p>
              </div>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
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

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Investment Documents</h2>
              <p className="text-gray-600">
                Complete the required paperwork to formalize your investment in Liv 1403.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* NDA Document */}
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

                {/* Offering Memorandum */}
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

              {/* Next Steps */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Next Steps</h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    Complete and sign the Non-Disclosure Agreement
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    Review the Offering Memorandum
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    Schedule investment consultation call
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
                {/* Q4 2024 Report */}
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

                {/* Q1 2025 Report */}
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

                {/* Upcoming Report */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-500">Q2 2025 Construction Report</h3>
                      <p className="text-gray-500 text-sm mt-1">
                        Construction commencement and progress updates
                      </p>
                      <div className="mt-2 text-xs text-gray-400">
                        Expected: June 30, 2025
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      Coming Soon
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact for Questions */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-8">
                <h3 className="text-lg font-semibold text-yellow-900 mb-3">Questions About Reports?</h3>
                <p className="text-yellow-800 text-sm mb-4">
                  Contact our team for clarification on any project updates or financial information.
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="mailto:manager@merritthouse.net"
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
                  >
                    Email Manager
                  </a>
                  <a 
                    href="tel:303-359-8337"
                    className="bg-white text-yellow-600 border border-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-50 transition-colors text-sm font-medium"
                  >
                    Call 303-359-8337
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}