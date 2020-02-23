export interface SignIn {
  username: string;
  password: string;
}

export interface SignUp extends SignIn {
  name: string;
  birthDate: Date;
}


export interface JwtPayload {
  username: string;
  name: string;
  birthDate: string;
}

export interface UserLogged extends JwtPayload {
  accessToken: string;
  expiresAt?: number;
}
