import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const key = import.meta.env.VITE_API_KEY;

export const BaseAxios = axios.create({
  baseURL,
  params: {
    key,
  },
});
