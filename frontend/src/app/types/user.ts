export interface UserRegister {
  name: string;
  email: string;
  password: string;
}
export interface UserLogin {
  email: string;
  password: string;
}

export interface ApiAuthResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    token: string;
  };
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
}
