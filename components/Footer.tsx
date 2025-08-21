export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Project Info */}
          <div>
            <div className="text-2xl font-bold mb-4">Liv 1403</div>
            <p className="text-gray-400 leading-relaxed">
              Luxury residential mixed-use development in Denver's prestigious Platt Park neighborhood.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              C3H Development Project
            </div>
          </div>
          
          {/* Project Details */}
          <div>
            <h4 className="font-semibold mb-4">Project Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#overview" className="hover:text-white transition-colors">
                  Development Summary
                </a>
              </li>
              <li>
                <a href="#financials" className="hover:text-white transition-colors">
                  Financial Overview
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">
                  Market Analysis
                </a>
              </li>
              <li>
                <a href="#investment" className="hover:text-white transition-colors">
                  Investment Package
                </a>
              </li>
            </ul>
          </div>
          
          {/* Location */}
          <div>
            <h4 className="font-semibold mb-4">Location</h4>
            <ul className="space-y-2 text-gray-400">
              <li>1403 S. Pearl Street</li>
              <li>Denver, CO 80210</li>
              <li>Platt Park Neighborhood</li>
              <li>Old South Pearl District</li>
            </ul>
            <div className="mt-4">
              <a 
                href="https://maps.google.com/?q=1403+S+Pearl+St,+Denver,+CO+80210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-600 hover:text-yellow-500 transition-colors text-sm"
              >
                View on Google Maps →
              </a>
            </div>
          </div>
          
          {/* Developer Contact */}
          <div>
            <h4 className="font-semibold mb-4">Developer</h4>
            <ul className="space-y-2 text-gray-400">
              <li>C3H Development</li>
              <li>Lance Nading</li>
              <li>
                <a 
                  href="tel:720-359-8337" 
                  className="hover:text-white transition-colors"
                >
                  720-359-8337
                </a>
              </li>
              <li>
                <a 
                  href="mailto:lance.nading@c3hdenver.com" 
                  className="hover:text-white transition-colors"
                >
                  lance.nading@c3hdenver.com
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <a 
                href="https://c3hdenver.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-600 hover:text-yellow-500 transition-colors text-sm"
              >
                Visit C3H Website →
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              &copy; 2025 Liv 1403 Development. All rights reserved.
            </div>
            <div className="text-gray-400 text-sm mt-4 md:mt-0">
              Developed by{' '}
              <a 
                href="https://c3hdenver.com" 
                className="text-yellow-600 hover:text-yellow-500 transition-colors"
              >
                C3H Construction Services LLC
              </a>
            </div>
          </div>
          
          {/* Investment Disclaimer */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-xs text-gray-500 leading-relaxed">
              <strong>Investment Disclaimer:</strong> This material is for informational purposes only and does not constitute an offer to sell or a solicitation to buy securities. 
              All financial projections are estimates based on current market conditions and are subject to change. 
              Past performance does not guarantee future results. Please consult with your financial advisor before making any investment decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}