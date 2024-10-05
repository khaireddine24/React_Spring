import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-500 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">
              Released by Khaireddine
            </p>
          </div>
          <div className="text-sm">
            <p>&copy; {currentYear} All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}