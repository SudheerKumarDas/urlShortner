export const totalUrlsClicks = (urls) =>{
    const totalClicks = urls.reduce((total, url) => {
    return total + url.clicks;
  }, 0);
  return totalClicks;
}