import { toast } from "react-toastify";
import { SERVER_LOGIN_PATH } from "../constants/ServerPath";
import { TAuthProps, UserType } from "../types/auth";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export async function login({ username, password }: TAuthProps) {
    try {
      const response = await fetch(SERVER_LOGIN_PATH);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const users = await response.json();
      const user : UserType = users.find((u: UserType) => u.username === username && u.password === password);
      if (user) {
        return user.username;
      } else {
        return null;
      }
    } catch (error) {
      toast.error('Failed to login');
    }
  }

  export async function register({ username, password }: TAuthProps) {
    try {
      const response = await fetch(SERVER_LOGIN_PATH)
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      const users = await response.json();
      const user : UserType = users.find((u: UserType) => u.username === username);
      if (user) {
        toast.error('Username already exists');
      } else {
        const id = uuidv4();
        const createUser = await axios.post(SERVER_LOGIN_PATH, {id, username, password });
        return createUser
      }
    } catch (error) {
      toast.error('Failed to register');
      console.error('Register error:', error);
    }
  }