import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Receipt, Home, LogOut, Menu, X, User } from 'lucide-react';
import { signOut } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Receipt className="h-8 w-8 text-[#F8BF1E]" />
              <span className="text-xl font-bold hidden sm:block">ReceiptManager</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-[#F8BF1E] hover:bg-gray-50"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-[#F8BF1E] hover:bg-gray-50"
            >
              <Receipt className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-[#F8BF1E] hover:bg-gray-50"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/auth"
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-[#F8BF1E] hover:bg-gray-50"
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#F8BF1E] p-2 rounded-md focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-[#F8BF1E] hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-[#F8BF1E] hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <Receipt className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-[#F8BF1E] hover:bg-gray-50 w-full text-left"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/auth"
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-[#F8BF1E] hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};