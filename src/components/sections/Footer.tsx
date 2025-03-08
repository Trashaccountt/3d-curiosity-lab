
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 px-4 text-center text-foreground/60">
      <div className="max-w-6xl mx-auto">
        <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
