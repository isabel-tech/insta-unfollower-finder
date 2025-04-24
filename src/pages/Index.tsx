
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import FileUploader from '@/components/FileUploader';
import ResultsDisplay from '@/components/ResultsDisplay';
import Instructions from '@/components/Instructions';
import FAQ from '@/components/FAQ';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PrivacyNotice from '@/components/PrivacyNotice';
import LanguageToggle from '@/components/LanguageToggle';
import { analyzeInstagramData } from '@/lib/instagram-analyzer';
import { InstagramUser, languageContent } from '@/lib/types';

const Index = () => {
  const [notFollowingBack, setNotFollowingBack] = useState<InstagramUser[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [language, setLanguage] = useState<'pt' | 'en'>('pt'); // Default to Portuguese
  
  const content = languageContent[language];

  const handleFileProcessed = (followers: any[], following: any[]) => {
    const results = analyzeInstagramData(followers, following);
    setNotFollowingBack(results);
    setShowResults(true);
    
    // Scroll to results
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleReset = () => {
    setShowResults(false);
    setNotFollowingBack([]);
    
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pt' ? 'en' : 'pt');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-brand-bg">
      <div className="container px-4 mx-auto relative pb-10">
        <LanguageToggle language={language} onToggle={toggleLanguage} />
        
        <Header language={language} content={content} />
        
        {showResults ? (
          <ResultsDisplay 
            notFollowingBack={notFollowingBack} 
            onReset={handleReset}
            language={language}
            content={content}
          />
        ) : (
          <div className="max-w-4xl mx-auto">
            <PrivacyNotice language={language} content={content} />
            
            <FileUploader 
              onFileProcessed={handleFileProcessed} 
              language={language}
              content={content}
            />
            
            <div className="mt-12">
              <Instructions language={language} content={content} />
            </div>
          </div>
        )}
        
        {!showResults && (
          <FAQ language={language} content={content} />
        )}
      </div>
      
      <Footer language={language} content={content} />
    </div>
  );
};

export default Index;
