import axios from "axios";

const BASE_URL = "http://localhost:3001/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmIwMmQxNGU4MDM0NWM1MjRhN2UxMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjQyMzI1MSwiZXhwIjoxNjU2NjgyNDUxfQ._EN9XE6Qt87JUeAga7QHvqVjBAz8PwPq4B5UJjn-uf0"
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

//const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
//const currentUser = user && JSON.parse(user).currentUser;
//const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});