
import React, { useState, useRef } from 'react';
import { Upload, FileArchive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { LanguageContent } from '@/lib/types';

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
  const { toast } = useToast();

  const processZipFile = async (file: File) => {
    setIsProcessing(true);
    setFileName(file.name);

    try {
      // Validate file type
      if (!file.name.endsWith('.zip')) {
        toast({
          title: content.fileUploader.errors.invalidType.title,
          description: content.fileUploader.errors.invalidType.description,
          variant: 'destructive',
        });
        setIsProcessing(false);
        setFileName('');
        return;
      }

      // Load JSZip library dynamically
      const JSZip = (await import('jszip')).default;
      
      // Read the zip file
      const zip = await JSZip.loadAsync(file);
      
      console.log('Files in ZIP:', Object.keys(zip.files));
      
      // Look for followers and following JSON files with more flexible patterns
      let followersFile = null;
      let followingFile = null;
      
      // Search for files with more flexible patterns
      zip.forEach((relativePath, zipEntry) => {
        // Convert to lowercase for case-insensitive matching
        const lowerPath = relativePath.toLowerCase();
        
        // Log the file being checked for debugging
        console.log('Checking file in ZIP:', relativePath);
        
        // Look for followers files with multiple possible patterns
        if ((lowerPath.includes('follower') || lowerPath.includes('seguidor')) && 
            (lowerPath.endsWith('.json') || lowerPath.includes('/connections/followers/') || 
             lowerPath.includes('/subscriptions/'))) {
          followersFile = zipEntry;
          console.log('Found followers file:', relativePath);
        } 
        // Look for following files with multiple possible patterns
        else if ((lowerPath.includes('following') || lowerPath.includes('seguindo')) && 
                 (lowerPath.endsWith('.json') || lowerPath.includes('/connections/following/') || 
                  lowerPath.includes('/subscriptions/'))) {
          followingFile = zipEntry;
          console.log('Found following file:', relativePath);
        }
      });
      
      // Validate that we found both files
      if (!followersFile || !followingFile) {
        console.error('Missing required files', { followersFile: !!followersFile, followingFile: !!followingFile });
        toast({
          title: content.fileUploader.errors.missingFiles.title,
          description: content.fileUploader.errors.missingFiles.description,
          variant: 'destructive',
        });
        setIsProcessing(false);
        setFileName('');
        return;
      }
      
      // Parse the JSON content
      const followersContent = await followersFile.async('text');
      const followingContent = await followingFile.async('text');
      
      let followersData;
      let followingData;
      
      try {
        // Try to parse the JSON directly
        followersData = JSON.parse(followersContent);
        followingData = JSON.parse(followingContent);
        
        // If we parsed an object but need an array, look for array properties
        if (!Array.isArray(followersData)) {
          console.log('Followers data is not an array, trying to find array property');
          // Try to find an array property in the parsed object
          const possibleArrayProps = Object.values(followersData).filter(Array.isArray);
          if (possibleArrayProps.length > 0) {
            // Use the first array property found
            followersData = possibleArrayProps[0];
            console.log('Found followers array with length:', followersData.length);
          }
        }
        
        if (!Array.isArray(followingData)) {
          console.log('Following data is not an array, trying to find array property');
          // Try to find an array property in the parsed object
          const possibleArrayProps = Object.values(followingData).filter(Array.isArray);
          if (possibleArrayProps.length > 0) {
            // Use the first array property found
            followingData = possibleArrayProps[0];
            console.log('Found following array with length:', followingData.length);
          }
        }
        
        // Additional check for relationship folders structure
        if (!Array.isArray(followersData) || followersData.length === 0) {
          // Check if we have nested relationships array
          if (followersData && followersData.relationships_followers) {
            followersData = followersData.relationships_followers;
          }
        }
        
        if (!Array.isArray(followingData) || followingData.length === 0) {
          // Check if we have nested relationships array
          if (followingData && followingData.relationships_following) {
            followingData = followingData.relationships_following;
          }
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        toast({
          title: content.fileUploader.errors.invalidFormat.title,
          description: content.fileUploader.errors.invalidFormat.description,
          variant: 'destructive',
        });
        setIsProcessing(false);
        setFileName('');
        return;
      }
      
      // Final check if data is in expected format
      if (!Array.isArray(followersData) || !Array.isArray(followingData)) {
        console.error('Invalid data structure', {
          followersIsArray: Array.isArray(followersData),
          followingIsArray: Array.isArray(followingData),
        });
        toast({
          title: content.fileUploader.errors.invalidStructure.title,
          description: content.fileUploader.errors.invalidStructure.description,
          variant: 'destructive',
        });
        setIsProcessing(false);
        setFileName('');
        return;
      }
      
      // Process was successful, pass the data up
      toast({
        title: content.fileUploader.success.title,
        description: content.fileUploader.success.description,
      });
      
      onFileProcessed(followersData, followingData);
    } catch (error) {
      console.error('Error processing ZIP file:', error);
      toast({
        title: content.fileUploader.errors.processingError.title,
        description: content.fileUploader.errors.processingError.description,
        variant: 'destructive',
      });
    }
    
    setIsProcessing(false);
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
          onChange={handleFileInputChange}
          accept=".zip"
          className="hidden"
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
                onClick={handleButtonClick} 
                className="mt-4 bg-gradient-to-r from-brand-purple to-brand-light hover:opacity-90 transition-opacity"
              >
                {content.fileUploader.buttonText}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
