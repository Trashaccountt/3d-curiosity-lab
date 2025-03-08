
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 px-4 text-center text-foreground/60">
      <div className="max-w-6xl mx-auto">
        <p>© {new Date().getFullYear()} Backend Developer Portfolio. All rights reserved.</p>
        <p className="mt-2 text-sm">
          Specialized in secure backend solutions, API architecture, and blockchain development.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
