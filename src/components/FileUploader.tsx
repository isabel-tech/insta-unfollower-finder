import React, { useState, useRef } from 'react';
import { Upload, FileArchive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { LanguageContent } from '@/lib/types';
import JSZip from 'jszip';
import UnfollowersList from "./UnfollowersList";

interface FileUploaderProps {
  onFileProcessed: (followers: any[], following: any[]) => void;
  language: 'pt' | 'en';
  content: LanguageContent;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileProcessed, language, content }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState([]);
  const { toast } = useToast();

  const validateFile = (file: File) => {
    if (file.type !== 'application/zip' && !file.name.endsWith('.zip')) {
      throw new Error (content.fileUploader.errors.invalidType.description);
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error(content.fileUploader.errors.processingError.description);
    }

    return true;
  };

  const processZipFile = async (file: File) => {
    setIsProcessing(true);
    setFileName(file.name);

    try {
      validateFile(file);

      const zip = new JSZip();
      const zipContents = await zip.loadAsync(file);

      const followersPath = "connections/followers_and_following/followers_1.json";
      const followingPath = "connections/followers_and_following/following.json";

      const followersFile = zipContents.file(followersPath);
      const followingFile = zipContents.file(followingPath);

      if (!followersFile || !followingFile) {
        throw new Error(content.fileUploader.errors.missingFiles.description);
      }

      const followersData = await followersFile.async("text");
      let followers;
      try {
        followers = new Set(
          JSON.parse(followersData).map(entry => entry.string_list_data[0].value)
        );
      } catch (e) {
        throw new Error(content.fileUploader.errors.invalidFormat.description);
      }

      const followingData = await followingFile.async("text");
      let following;
      try {
        following = new Set(
          JSON.parse(followingData).relationships_following.map(entry => entry.string_list_data[0].value)
        );
      } catch (e) {
        throw new Error(content.fileUploader.errors.invalidStructure.description);
      }

      const notFollowingBack = [...following].filter(user => !followers.has(user));

      setResult(notFollowingBack);
      
      toast({
        title: content.fileUploader.success.title,
        description: content.fileUploader.success.description,
        variant: "default",
      });

    } catch (error) {
      console.error("Error processing file:", error);
      setResult([]);
      toast({
        title: content.fileUploader.errors.processingError.title,
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processZipFile(file);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processZipFile(file);
    }
  }; 

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          isDragging 
            ? 'border-brand-purple bg-brand-light/10' 
            : 'border-border hover:border-brand-purple/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept=".zip"
          className="hidden"
          onChange={handleFileInputChange}
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          {isProcessing ? (
            <>
              <div className="w-16 h-16 rounded-full bg-brand-purple/20 flex items-center justify-center">
                <FileArchive className="w-8 h-8 text-brand-purple animate-pulse-light" />
              </div>
              <div>
                <p className="text-lg font-medium">{content.fileUploader.processing}</p>
                <p className="text-sm text-muted-foreground">{fileName}</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-brand-purple/20 flex items-center justify-center">
                <Upload className="w-8 h-8 text-brand-purple" />
              </div>
              <div>
                <p className="text-lg font-medium gradient-text">
                  {content.fileUploader.title}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {content.fileUploader.description}
                </p>
              </div>
              <Button 
                type="button"
                onClick={handleButtonClick} 
                className="mt-4 bg-gradient-to-r from-brand-purple to-brand-light hover:opacity-90 transition-opacity"
              >
                {content.fileUploader.buttonText}
              </Button>
            </>
          )}
        </div>
      </div>
      {result.length > 0 && (
        <UnfollowersList
          usernames={result}
          language={language}
          content={content} 
        />
)}
    </div>
  );
};

export default FileUploader;
