import api from '../api';

export const login = (email: string, password: string) => {
  return api.post('/login', { email, password });
};

export const register = (name: string, email: string, password: string) => {
  return api.post('/register', { name, email, password });
};

export const logout = () => {
  return api.post('/auth/logout');
};

export const  sendOtp=(email:string)=>{
  return api.post('/send-otp',{email});
}

export const  verifyOtp=(email:string,otp:string)=>{
  return api.post('/verify-otp',{email, otp});
}



