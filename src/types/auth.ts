export type TAuthProps  = {
    username: string;
    password: string;
}
export type UserType  = {
    username: string;
    password: string;
}

export interface IUser {
    username: string;
}
export interface IAuthContextType {
    user: IUser | null;
    authLogin: (username: string) => void;
    authLogout: () => void;
  }

  export interface IAUthProviderProps {
    children: React.ReactNode;
  }