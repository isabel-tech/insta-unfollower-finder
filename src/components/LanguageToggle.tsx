
import React from 'react';
import { Button } from '@/components/ui/button';

interface LanguageToggleProps {
  language: 'pt' | 'en';
  onToggle: () => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, onToggle }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className="absolute top-4 right-4"
    >
      {language === 'pt' ? '🇺🇸 EN' : '🇧🇷 PT'}
    </Button>
  );
};

export default LanguageToggle;
