import { Link } from 'react-router-dom';

import { Logo } from '@components';

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Logo />
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end space-x-4 mb-4 md:mb-0">
            <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">
              Contact
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-purple-600 transition-colors">
              Privacy Policy
            </Link>
          </nav>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Expense Tracker. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
