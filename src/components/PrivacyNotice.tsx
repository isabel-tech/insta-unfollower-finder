
import React from 'react';
import { LanguageContent } from '@/lib/types';

interface PrivacyNoticeProps {
  language: 'pt' | 'en';
  content: LanguageContent;
}

const PrivacyNotice: React.FC<PrivacyNoticeProps> = ({ language, content }) => {
  return (
    <div className="bg-brand-purple/5 border border-brand-purple/20 rounded-lg p-4 mb-8 max-w-3xl mx-auto">
      <h3 className="text-lg font-semibold mb-2 text-brand-purple">
        {content.privacyNotice.title}
      </h3>
      <p className="text-sm">
        {content.privacyNotice.content}
      </p>
    </div>
  );
};

export default PrivacyNotice;
