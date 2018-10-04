export const API_URL = "https://uobsummit-demo.herokuapp.com";

export const generateUrl = uri => {
  return `${API_URL}/api/v5/${uri}`;
};

export const headerBgColor = "#00246a";
export const headerFontColor = "#ffffff";

export let userType = "employee";

export const setUserType = type => (userType = type);
