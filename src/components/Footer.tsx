
import React from 'react';
import { LanguageContent } from '@/lib/types';

interface FooterProps {
  language: 'pt' | 'en';
  content: LanguageContent;
}

const Footer: React.FC<FooterProps> = ({ language, content }) => {
  return (
    <footer className="py-6 mt-12 border-t">
      <div className="container text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} InstaUnfollowers | {content.footer.rights}
        </p>
        <p className="mt-1">
          {content.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
