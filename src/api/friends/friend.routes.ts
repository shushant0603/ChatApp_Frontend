import api from '../api';


export const sendFriendRequest=(id: string) => {
  return api.post(`/user/${id}/sendRequest`);
}
export const acceptFriendRequest=(id:string) => {
  return api.post(`/user/${id}/acceptRequest`);
}
export const rejectFriendRequest=() => {
  return api.post('/user/:id/rejectRequest');
}

export const getReceivedRequests=() => {
  return api.get('/user/requests/received');
}

export const getAllFriends=() => {
  return api.get('/user/allFriends');
}