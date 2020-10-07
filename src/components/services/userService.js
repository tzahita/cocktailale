import http from './http';
import jwtDecode from 'jwt-decode';
import {apiUrl} from '../../config.json';

const jwtToken = 'token';

export function getJwt(){
  return localStorage.getItem(jwtToken);
}

export function setFavorite(id) {
  return http.put(`${apiUrl}/users/cards/${id}`);
}

export function getFavorite() {
  return http.get(`${apiUrl}/users/cards`);
}

export function logout(){
  localStorage.removeItem(jwtToken)
}

export async function login(email, password) {
  const {data} = await http.post(`${apiUrl}/auth`, {email, password});
  localStorage.setItem('token', data.token);
}

export function getMyInfo(id) {
  return http.get(`${apiUrl}/users/me`, id);
 }

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(jwtToken);
    return jwtDecode(jwt);
  } catch (e) {
    return null;
  }
}
export default {
  login,
  getCurrentUser,
  logout,
  getJwt,
  getFavorite,
  setFavorite
};
