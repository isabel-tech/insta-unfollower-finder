
import { InstagramUser } from './types';

export function analyzeInstagramData(
  followers: any[],
  following: any[]
): InstagramUser[] {
  // Extract usernames of followers
  const followerUsernames = new Set(
    followers.map(follower => {
      // Handle different data structures that might be returned by Instagram
      if (typeof follower === 'string') {
        return follower;
      } else if (follower.string_list_data && follower.string_list_data.length > 0) {
        return follower.string_list_data[0].value;
      } else if (follower.username) {
        return follower.username;
      }
      return null;
    }).filter(Boolean)
  );
  
  // Extract following users and filter those who don't follow back
  const notFollowingBack: InstagramUser[] = following
    .map(follow => {
      if (typeof follow === 'string') {
        return { username: follow };
      } else if (follow.string_list_data && follow.string_list_data.length > 0) {
        const userData = follow.string_list_data[0];
        return {
          username: userData.value,
          full_name: userData.href?.split('/')[1] || '',
          profile_pic_url: userData.timestamp ? null : undefined // Instagram sometimes provides a timestamp instead of a pic URL
        };
      } else if (follow.username) {
        return {
          username: follow.username,
          full_name: follow.full_name || '',
          profile_pic_url: follow.profile_pic_url
        };
      }
      return null;
    })
    .filter(user => user && !followerUsernames.has(user.username));
  
  return notFollowingBack;
}
