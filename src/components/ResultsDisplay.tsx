
import React, { useState, useMemo } from 'react';
import { Search, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InstagramUser, LanguageContent } from '@/lib/types';
import { Card } from '@/components/ui/card';

interface ResultsDisplayProps {
  notFollowingBack: InstagramUser[];
  onReset: () => void;
  language: 'pt' | 'en';
  content: LanguageContent;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  notFollowingBack, 
  onReset,
  language,
  content
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredResults = useMemo(() => {
    let results = [...notFollowingBack];
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        user => user.username.toLowerCase().includes(query) || 
                (user.full_name && user.full_name.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    results.sort((a, b) => {
      const nameA = a.username.toLowerCase();
      const nameB = b.username.toLowerCase();
      
      if (sortDirection === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    
    return results;
  }, [notFollowingBack, searchQuery, sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold gradient-text mb-2">
          {content.resultsDisplay.title}
        </h2>
        <p className="text-muted-foreground">
          {content.resultsDisplay.description.replace('{count}', notFollowingBack.length.toString())}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder={content.resultsDisplay.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={toggleSortDirection}
        >
          {content.resultsDisplay.sortBy}
          {sortDirection === 'asc' ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="outline"
          onClick={onReset}
        >
          {content.resultsDisplay.resetButton}
        </Button>
      </div>

      {filteredResults.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            {content.resultsDisplay.noResults}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredResults.map((user) => (
            <a 
              href={`https://www.instagram.com/${user.username}`} 
              target="_blank" 
              rel="noopener noreferrer"
              key={user.username}
              className="block"
            >
              <Card className="p-4 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  {user.profile_pic_url ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img 
                        src={user.profile_pic_url} 
                        alt={user.username} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 overflow-hidden">
                    <p className="font-medium text-foreground truncate">@{user.username}</p>
                    {user.full_name && (
                      <p className="text-sm text-muted-foreground truncate">{user.full_name}</p>
                    )}
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
