import axios from "axios";

export const register = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/register`, user);

export const login = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/login`, user);

export const allUser = async () =>
  await axios.get(`${process.env.REACT_APP_API}/allusers`);

export const deleteUser = async (token, userId) =>
  await axios.delete(`${process.env.REACT_APP_API}/delete-user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const read = async (userId) =>
  await axios.get(`${process.env.REACT_APP_API}/user/edit/${userId}`);

export const updateUser = async (token, data, userId) =>
  await axios.put(`${process.env.REACT_APP_API}/update-user/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateUserPassword = async (token, data, userId) =>
  await axios.put(
    `${process.env.REACT_APP_API}/update-user-password/${userId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
