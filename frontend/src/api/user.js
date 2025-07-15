import axios from "./axios";

export const getUserProfile = (token) => {
  return axios.get("/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
