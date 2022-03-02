import axios from "axios";

export const createClassRoom = async (token, room) =>
  await axios.post(`${process.env.REACT_APP_API}/create-classroom`, room, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const allClassRoom = async () =>
  await axios.get(`${process.env.REACT_APP_API}/classrooms`);

export const readClassroom = async (classRoomId) =>
  await axios.get(`${process.env.REACT_APP_API}/classroom/edit/${classRoomId}`);

export const deleteClassRoom = async (token, classRoomId) =>
  await axios.delete(
    `${process.env.REACT_APP_API}/delete-classroom/${classRoomId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const updateClassRoom = async (token, data, classRoomId) =>
  await axios.put(
    `${process.env.REACT_APP_API}/update-classroom/${classRoomId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
