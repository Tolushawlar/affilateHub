
"use client"
import React from 'react';
import { FaTwitter, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { MdPrivacyTip } from 'react-icons/md';
import { BsFileText, BsQuestionCircle } from 'react-icons/bs';
import { usePathname } from 'next/navigation';

const Footer: React.FC = () => {
  const pathname = usePathname();

  // Don't render footer on dashboard page
  if (pathname === '/dashboard') {
    return null;
  }

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h4 className="text-xl font-bold mb-6 text-teal-400">About Us</h4>
            <p className="text-gray-300 leading-relaxed">
              We're passionate about empowering developers through comprehensive tutorials, 
              in-depth guides, and cutting-edge resources for modern web development.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-6 text-teal-400">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <a href="/about" className="text-gray-300 hover:text-teal-400 flex items-center gap-2">
                  <BsFileText className="h-5 w-5" />
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-teal-400 flex items-center gap-2">
                  <HiMail className="h-5 w-5" />
                  <span>Contact</span>
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-teal-400 flex items-center gap-2">
                  <MdPrivacyTip className="h-5 w-5" />
                  <span>Privacy Policy</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-6 text-teal-400">Connect With Us</h4>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-300 hover:text-teal-400 transition-colors">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-300 hover:text-teal-400 transition-colors">
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-300 hover:text-teal-400 transition-colors">
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-300 hover:text-teal-400 transition-colors">
                <FaYoutube className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-6 text-teal-400">Support</h4>
            <ul className="space-y-4">
              <li>
                <a href="/terms" className="text-gray-300 hover:text-teal-400 flex items-center gap-2">
                  <BsFileText className="h-5 w-5" />
                  <span>Terms of Service</span>
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-300 hover:text-teal-400 flex items-center gap-2">
                  <BsQuestionCircle className="h-5 w-5" />
                  <span>FAQ</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
