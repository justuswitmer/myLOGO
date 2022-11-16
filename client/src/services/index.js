import axios from "axios";
import {
  AUTHORIZE,
  REGISTER_USER,
  LOGOS,
  REMOVE_LOGO,
  ADD_LOGO,
  UPDATE_USER,
  DELETE_USER
} from "../constants/services";

export const authorize = (params) => {
  return axios.post(AUTHORIZE, params);
};

export const registerUser = (params) => {
  return axios.post(REGISTER_USER, params);
};
export const updateUser = (params) => {
  return axios.post(UPDATE_USER, params);
};

export const deleteUser = (params) => {
  return axios.post(DELETE_USER, params);
};

export const getLogos = (payload) => {
  return axios.post(LOGOS, payload);
};

export const removeLogo = (payload) => {
  return axios.post(REMOVE_LOGO, payload);
};
export const addLogo = (payload) => {
  return axios.post(ADD_LOGO, payload);
};
