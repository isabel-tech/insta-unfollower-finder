
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
      
      // Log all files in the ZIP for debugging
      const allFiles = Object.keys(zip.files);
      console.log('Files in ZIP:', allFiles);
      console.log('Structured files:', allFiles.map(name => ({
        name,
        dir: zip.files[name].dir,
        size: zip.files[name]._data ? zip.files[name]._data.uncompressedSize : 0
      })));
      
      // Look for followers and following JSON files with more flexible patterns
      let followersFile = null;
      let followingFile = null;
      
      // First, look for specific patterns in any directory
      const followerPatterns = [
        /followers.*\.json$/i,
        /connections[\\\/]followers/i,
        /follower.*list.*\.json$/i,
        /seguidor.*\.json$/i,
        /relationships_followers/i
      ];
      
      const followingPatterns = [
        /following.*\.json$/i,
        /connections[\\\/]following/i,
        /following.*list.*\.json$/i,
        /seguindo.*\.json$/i,
        /relationships_following/i
      ];
      
      // Find files matching patterns
      for (const path of allFiles) {
        if (!zip.files[path].dir) {  // Skip directories
          // Check for followers patterns
          if (!followersFile && followerPatterns.some(pattern => pattern.test(path))) {
            followersFile = zip.files[path];
            console.log('Found followers file by pattern:', path);
          }
          
          // Check for following patterns
          if (!followingFile && followingPatterns.some(pattern => pattern.test(path))) {
            followingFile = zip.files[path];
            console.log('Found following file by pattern:', path);
          }
          
          // If found both, stop searching
          if (followersFile && followingFile) break;
        }
      }
      
      // If not found by pattern, try looking in known directories
      if (!followersFile || !followingFile) {
        console.log('Searching in known directories...');
        const possibleDirectories = [
          'followers_and_following',
          'connections',
          'relationships',
          'data',
          'instagram',
          'instagram_data',
          ''  // Root directory
        ];
        
        for (const dir of possibleDirectories) {
          if (followersFile && followingFile) break;
          
          const dirPath = dir ? `${dir}/` : '';
          
          // Look for any JSON files that might contain followers or following data
          const filesInDir = allFiles.filter(path => 
            path.startsWith(dirPath) && path.endsWith('.json') && !zip.files[path].dir
          );
          
          console.log(`Files in directory "${dir}":`, filesInDir);
          
          // Check content of JSON files to determine if they're followers or following
          for (const jsonPath of filesInDir) {
            try {
              const jsonContent = await zip.files[jsonPath].async('text');
              console.log(`Checking file content: ${jsonPath} (${jsonContent.length} chars)`);
              
              // Try to parse the first few chars to see if it looks like JSON
              const snippet = jsonContent.substring(0, Math.min(500, jsonContent.length));
              console.log(`Content snippet: ${snippet}`);
              
              // Check if content looks like follower data
              if (!followersFile && (
                jsonPath.toLowerCase().includes('follower') || 
                snippet.toLowerCase().includes('follower') ||
                snippet.toLowerCase().includes('seguidor')
              )) {
                followersFile = zip.files[jsonPath];
                console.log('Found followers file by content:', jsonPath);
              }
              
              // Check if content looks like following data
              if (!followingFile && (
                jsonPath.toLowerCase().includes('following') || 
                snippet.toLowerCase().includes('following') ||
                snippet.toLowerCase().includes('seguindo')
              )) {
                followingFile = zip.files[jsonPath];
                console.log('Found following file by content:', jsonPath);
              }
              
              // If found both, stop searching
              if (followersFile && followingFile) break;
            } catch (error) {
              console.error(`Error reading ${jsonPath}:`, error);
            }
          }
        }
      }
      
      // Final attempt: if we found one but not the other, look for files with similar names
      if (followersFile && !followingFile) {
        const followerPath = Object.keys(zip.files).find(key => zip.files[key] === followersFile);
        if (followerPath) {
          const basePath = followerPath.replace(/follower|seguidor/i, '');
          for (const path of allFiles) {
            if (path.startsWith(basePath) && 
                (path.includes('following') || path.includes('seguindo')) &&
                !zip.files[path].dir) {
              followingFile = zip.files[path];
              console.log('Found matching following file:', path);
              break;
            }
          }
        }
      } else if (!followersFile && followingFile) {
        const followingPath = Object.keys(zip.files).find(key => zip.files[key] === followingFile);
        if (followingPath) {
          const basePath = followingPath.replace(/following|seguindo/i, '');
          for (const path of allFiles) {
            if (path.startsWith(basePath) && 
                (path.includes('follower') || path.includes('seguidor')) &&
                !zip.files[path].dir) {
              followersFile = zip.files[path];
              console.log('Found matching followers file:', path);
              break;
            }
          }
        }
      }
      
      // Validate that we found both files
      if (!followersFile || !followingFile) {
        console.error('Missing required files', { 
          followersFile: followersFile ? Object.keys(zip.files).find(key => zip.files[key] === followersFile) : null, 
          followingFile: followingFile ? Object.keys(zip.files).find(key => zip.files[key] === followingFile) : null
        });
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
      
      console.log('Followers content sample:', followersContent.substring(0, 200));
      console.log('Following content sample:', followingContent.substring(0, 200));
      
      let followersData;
      let followingData;
      
      try {
        // Try to parse the JSON directly
        followersData = JSON.parse(followersContent);
        followingData = JSON.parse(followingContent);
        
        console.log('Parsed followers data:', typeof followersData, Array.isArray(followersData) ? 'array' : 'not array');
        console.log('Parsed following data:', typeof followingData, Array.isArray(followingData) ? 'array' : 'not array');
        
        // Check for common data structures
        if (!Array.isArray(followersData)) {
          console.log('Followers data is not an array, looking for array property...');
          
          // Check if it's the standard Instagram format with a relationships_followers property
          if (followersData.relationships_followers) {
            console.log('Found relationships_followers property');
            followersData = followersData.relationships_followers;
          } 
          // Check if it's in the connections/followers format
          else if (followersData.followers) {
            console.log('Found followers property');
            followersData = followersData.followers;
          }
          // Check for 'data' property which might contain the array
          else if (followersData.data) {
            console.log('Found data property');
            followersData = followersData.data;
          }
          // Look for any array property that might contain the followers
          else {
            const arrayProps = Object.keys(followersData).filter(key => 
              Array.isArray(followersData[key]) && followersData[key].length > 0
            );
            
            console.log('Found array properties:', arrayProps);
            
            if (arrayProps.length > 0) {
              // Use the first array property found
              const arrayProp = arrayProps[0];
              console.log(`Using array property: ${arrayProp}`);
              followersData = followersData[arrayProp];
            }
          }
        }
        
        if (!Array.isArray(followingData)) {
          console.log('Following data is not an array, looking for array property...');
          
          // Check if it's the standard Instagram format with a relationships_following property
          if (followingData.relationships_following) {
            console.log('Found relationships_following property');
            followingData = followingData.relationships_following;
          } 
          // Check if it's in the connections/following format
          else if (followingData.following) {
            console.log('Found following property');
            followingData = followingData.following;
          }
          // Check for 'data' property which might contain the array
          else if (followingData.data) {
            console.log('Found data property');
            followingData = followingData.data;
          }
          // Look for any array property that might contain the following
          else {
            const arrayProps = Object.keys(followingData).filter(key => 
              Array.isArray(followingData[key]) && followingData[key].length > 0
            );
            
            console.log('Found array properties:', arrayProps);
            
            if (arrayProps.length > 0) {
              // Use the first array property found
              const arrayProp = arrayProps[0];
              console.log(`Using array property: ${arrayProp}`);
              followingData = followingData[arrayProp];
            }
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
          followersType: typeof followersData,
          followingType: typeof followingData
        });
        
        // Last resort: try to convert to array if possible
        if (!Array.isArray(followersData) && typeof followersData === 'object') {
          followersData = Object.values(followersData);
          console.log('Converted followers object to array:', followersData.length);
        }
        
        if (!Array.isArray(followingData) && typeof followingData === 'object') {
          followingData = Object.values(followingData);
          console.log('Converted following object to array:', followingData.length);
        }
        
        // If still not arrays, show error
        if (!Array.isArray(followersData) || !Array.isArray(followingData)) {
          toast({
            title: content.fileUploader.errors.invalidStructure.title,
            description: content.fileUploader.errors.invalidStructure.description,
            variant: 'destructive',
          });
          setIsProcessing(false);
          setFileName('');
          return;
        }
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

