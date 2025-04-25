import { User } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { LanguageContent } from '@/lib/types';

interface UnfollowersListProps {
	usernames: string[];
	language: 'pt' | 'en';
	content: LanguageContent;
}

const UnfollowersList: React.FC<UnfollowersListProps> = ({ language, content, usernames }: UnfollowersListProps) => {
  const unfollowersCount = usernames.length;
  return (
    <div className="mt-8 animate-fade-in">
      <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-brand-purple to-brand-light bg-clip-text text-transparent">
      {content.unfollowersList.title}: {unfollowersCount}

      </h3>
      <ScrollArea className="h-[400px] rounded-md border border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {usernames.map((username, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-brand-purple/50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-brand-purple" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{username}</p>
                </div>
              </div>
              <div className="mt-3">
                <a
                  href={`https://instagram.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className="w-full bg-gradient-to-r from-brand-purple to-brand-light hover:opacity-90 transition-opacity text-white"
                    size="sm"
                  >
                    {content.unfollowersList.viewProfile}
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default UnfollowersList;