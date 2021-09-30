export const apiURL = () => {
  return window.location.hostname === "localhost"
    ? "http://localhost:3333"
    : "https://dry-meadow-09210.herokuapp.com";
};
