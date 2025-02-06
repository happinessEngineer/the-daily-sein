import seinConfig from './sein/site.js';
import friendsConfig from './friends/site.js';

const siteConfigs = {
    sein: seinConfig,
    friends: friendsConfig,
  };
  
  const config = siteConfigs[import.meta.env?.VITE_SITE || process.env.VITE_SITE];
  export default config;
  