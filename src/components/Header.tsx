
import React from 'react';
import { LanguageContent } from '@/lib/types';

interface HeaderProps {
  language: 'pt' | 'en';
  content: LanguageContent;
}

const Header: React.FC<HeaderProps> = ({ language, content }) => {
  return (
    <header className="text-center py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 relative inline-block">
        <span className="gradient-text">Insta</span>
        <span>Unfollowers</span>
      </h1>
      <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto">
        {content.header.tagline}
      </p>
    </header>
  );
};

export default Header;
