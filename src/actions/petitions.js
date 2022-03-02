import axios from "axios";

export const createPetition = async (token, data) =>
  await axios.post(`${process.env.REACT_APP_API}/create-petition`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const allPetitions = async () =>
  await axios.get(`${process.env.REACT_APP_API}/petitions`);

export const studentPetitions = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/student-petitions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deletePetition = async (token, petitionId) =>
  await axios.delete(
    `${process.env.REACT_APP_API}/delete-petition/${petitionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const read = async (petitionId) =>
  await axios.get(`${process.env.REACT_APP_API}/petition/edit/${petitionId}`);

export const updatePetition = async (token, data, petitionId) =>
  await axios.put(
    `${process.env.REACT_APP_API}/update-petition/${petitionId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
