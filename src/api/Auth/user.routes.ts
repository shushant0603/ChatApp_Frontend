import api from '../api';

export const me=() => {
  return api.get('/user/me');
}
export const getAllUsers=() => {
  return api.get('/user/users');
}