export const API_URL = "https://uobsummit-demo.herokuapp.com";

export const generateUrl = uri => {
  return `${API_URL}/api/v5/${uri}`;
};
