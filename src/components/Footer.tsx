import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white shadow-lg mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-600 text-sm sm:text-base text-center md:text-left">
            © 2024 ReceiptManager. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-gray-600 hover:text-[#F8BF1E] transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-[#F8BF1E] transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-[#F8BF1E] transition-colors duration-200"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};