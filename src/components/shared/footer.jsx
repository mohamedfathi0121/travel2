import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
 
        <div className="md:w-1/3 text-center md:text-left">
          <h2 className="text-2xl font-bold text-white mb-3">AdventureCo</h2>
          <p className="text-gray-400 text-sm max-w-xs mx-auto md:mx-0">
            Explore the world with us. Find the best trips, book your dream getaway, and create unforgettable memories.
          </p>
        </div>
 <div className="md:w-1/3 flex justify-center space-x-12">
          <nav>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <a href="/" className="hover:text-blue-500 transition">Home</a>
              </li>
              <li>
                <a href="/trips" className="hover:text-blue-500 transition">Trips</a>
              </li>
              <li>
                <a href="/about" className="hover:text-blue-500 transition">About</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-500 transition">Contact</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="md:w-1/3 flex justify-center md:justify-end space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-600 transition">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 10-11.5 9.87v-7h-2v-3h2v-2c0-2 1.22-3 3.08-3 .9 0 1.84.16 1.84.16v2h-1c-1 0-1.3.62-1.3 1.25v1.4h2.21l-.35 3h-1.86v7A10 10 0 0022 12z" />
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-400 transition">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14.85 4.48 4.48 0 001.96-2.48 9.1 9.1 0 01-2.88 1.1 4.52 4.52 0 00-7.7 4.12A12.85 12.85 0 013 4.16a4.52 4.52 0 001.4 6.04 4.44 4.44 0 01-2.05-.57v.06a4.52 4.52 0 003.63 4.43 4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.21 3.15A9.05 9.05 0 013 19.54a12.75 12.75 0 006.92 2.03c8.3 0 12.85-6.87 12.85-12.83 0-.2 0-.42-.02-.63A9.22 9.22 0 0023 3z" />
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-500 transition">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 3a1 1 0 110 2 1 1 0 010-2zm-5 3.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 1.5a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} AdventureCo. All rights reserved.
      </div>
    </footer>
  );
}
