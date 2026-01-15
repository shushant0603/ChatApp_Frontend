import api from '../api';


export const startChat = (receiverId: string) => {
  return api.post('/chat/start', { receiverId });
}
export const getChatMessages = (chatId: string) => {
  return api.get(`/chat/${chatId}/messages`);
};
