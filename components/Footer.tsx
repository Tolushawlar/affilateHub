
// Footer component with social links and copyright information
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white py-8 mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center md:flex-row flex-col md:text-left text-center md:gap-0 gap-4">
        <p className="m-0 text-sm">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white no-underline transition-colors hover:text-[#4a90e2]"
          >
            Twitter
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white no-underline transition-colors hover:text-[#4a90e2]"
          >
            LinkedIn
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white no-underline transition-colors hover:text-[#4a90e2]"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
