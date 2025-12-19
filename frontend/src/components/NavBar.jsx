import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    // Added 'relative' here so the absolute menu positions correctly relative to this nav
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors">
              Aafno Blog
            </Link>
          </div>
          
          {/* Desktop Navigation Links
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm text-gray-900 font-medium hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/articles" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Articles
            </Link>
            <Link to="/categories" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Categories
            </Link>
            <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
          </div> */}
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Write Button (Desktop) */}
            <Link to="/create" className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-colors">
              Write
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-500 hover:text-gray-900 p-2 focus:outline-none" 
              aria-label="Menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
        
      {/* IMPROVED MOBILE MENU 
        Changes:
        1. absolute: Takes it out of flow (stops pushing content down)
        2. top-16: Positions it exactly below the header
        3. left-0 w-full: Spans full width
        4. shadow-lg: Adds depth so it looks like it's floating
        5. h-screen: Optional, but often better to cover the whole screen on mobile
      */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-xl z-50">
          <div className="flex flex-col space-y-2 px-4 py-6">
            <Link 
              to="/" 
              className="text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50 rounded-md px-3 py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/articles" 
              className="text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md px-3 py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Articles
            </Link>
            <Link 
              to="/categories" 
              className="text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md px-3 py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md px-3 py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-4 mt-2 border-t border-gray-100">
              <Link 
                to="/create" 
                className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Write an Article
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}