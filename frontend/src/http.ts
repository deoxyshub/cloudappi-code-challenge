import axios from "axios";

export const http = axios.create({
  timeout: 10000,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});
