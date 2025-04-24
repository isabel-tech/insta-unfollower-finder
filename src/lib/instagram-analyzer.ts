import { InstagramUser } from './types';

export function analyzeInstagramData(
  followers: any[],
  following: any[]
): InstagramUser[] {
  console.log('Analyzing data:', { 
    followersCount: followers.length,
    followingCount: following.length,
    followersSample: followers.slice(0, 3),
    followingSample: following.slice(0, 3)
  });
  
  // Extract usernames of followers with improved handling of different formats
  const followerUsernames = new Set(
    followers.map(follower => {
      // Handle different data structures that might be returned by Instagram
      if (typeof follower === 'string') {
        return follower;
      } else if (follower.string_list_data && follower.string_list_data.length > 0) {
        return follower.string_list_data[0].value;
      } else if (follower.username) {
        return follower.username;
      } else if (follower.value) {
        // For the newest Instagram data format
        return follower.value;
      } else if (follower.string_value) {
        // Another possible format
        return follower.string_value;
      } else if (follower.name) {
        // Yet another format sometimes seen
        return follower.name;
      } else if (typeof follower === 'object' && follower !== null) {
        // Attempt to find a property that might contain the username
        const possibleUsernames = ['user', 'username', 'name', 'user_name', 'id'];
        for (const key of possibleUsernames) {
          if (follower[key] && typeof follower[key] === 'string') {
            return follower[key];
          }
        }
      }
      console.log('Could not extract username from follower:', follower);
      return null;
    }).filter(Boolean)
  );
  
  console.log('Found follower usernames:', followerUsernames.size);
  
  // Extract following users and filter those who don't follow back with improved handling
  const notFollowingBack: InstagramUser[] = following
    .map(follow => {
      if (typeof follow === 'string') {
        return { username: follow };
      } else if (follow.string_list_data && follow.string_list_data.length > 0) {
        const userData = follow.string_list_data[0];
        return {
          username: userData.value,
          full_name: userData.href?.split('/')[1] || '',
          profile_pic_url: userData.timestamp ? null : undefined
        };
      } else if (follow.username) {
        return {
          username: follow.username,
          full_name: follow.full_name || '',
          profile_pic_url: follow.profile_pic_url
        };
      } else if (follow.value) {
        // For the newest Instagram data format
        return {
          username: follow.value,
          full_name: follow.name || follow.title || '',
          profile_pic_url: follow.image || null
        };
      } else if (follow.string_value) {
        // Another possible format
        return {
          username: follow.string_value,
          full_name: '',
          profile_pic_url: null
        };
      } else if (follow.name) {
        // Yet another format sometimes seen
        return {
          username: follow.name,
          full_name: follow.title || '',
          profile_pic_url: null
        };
      } else if (typeof follow === 'object' && follow !== null) {
        // Try to find username in different properties
        const possibleUsernames = ['user', 'username', 'name', 'user_name', 'id'];
        for (const key of possibleUsernames) {
          if (follow[key] && typeof follow[key] === 'string') {
            return {
              username: follow[key],
              full_name: follow.full_name || follow.name || follow.title || '',
              profile_pic_url: follow.profile_pic_url || follow.image || null
            };
          }
        }
      }
      console.log('Could not extract username from following:', follow);
      return null;
    })
    .filter(user => user && !followerUsernames.has(user.username));
  
  console.log('Found users not following back:', notFollowingBack.length);
  
  return notFollowingBack;
}
