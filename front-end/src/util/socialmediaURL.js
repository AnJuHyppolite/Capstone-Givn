export const socialmediaURL = () => {
  const url = window.location.href;
  if (url === "production") {
      //return heroku URL
    return "";
  } else {
    return "http://localhost";
  }
};
