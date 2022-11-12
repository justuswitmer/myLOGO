import axios from "axios";
import {
  AUTHORIZE,
  REGISTER_USER,
  LOGOS
} from "../constants/services";

export const authorize = (params) => {
  return axios.post(AUTHORIZE, params);
};

export const registerUser = (params) => {
  return axios.post(REGISTER_USER, params);
};

export const getLogos = (payload) => {
  return axios.post(LOGOS, payload);
};
