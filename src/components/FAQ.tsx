
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { LanguageContent } from '@/lib/types';

interface FAQProps {
  language: 'pt' | 'en';
  content: LanguageContent;
}

const FAQ: React.FC<FAQProps> = ({ language, content }) => {
  return (
    <div className="w-full max-w-3xl mx-auto my-12">
      <h2 className="text-2xl font-bold text-center mb-6 gradient-text">
        {content.faq.title}
      </h2>
      
      <Accordion type="single" collapsible className="w-full">
        {content.faq.questions.map((question, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {question.question}
            </AccordionTrigger>
            <AccordionContent>
              {question.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
