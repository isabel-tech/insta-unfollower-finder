
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LanguageContent } from '@/lib/types';

interface InstructionsProps {
  language: 'pt' | 'en';
  content: LanguageContent;
}

const Instructions: React.FC<InstructionsProps> = ({ language, content }) => {
  return (
    <Card className="w-full mb-8">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4 gradient-text">
          {content.instructions.title}
        </h2>
        
        <ol className="list-decimal pl-5 space-y-3">
          {content.instructions.steps.map((step, index) => (
            <li key={index} className="text-foreground">
              <p>{step}</p>
            </li>
          ))}
        </ol>
        
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-sm text-amber-800">
            <span className="font-semibold">{content.instructions.noteTitle}</span> {content.instructions.noteContent}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Instructions;
