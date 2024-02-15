import { IUser } from "../providers/AuthProvider";
import { AxiosInstance } from "./axiosInstance";

export const loginDB = async (login: string, password: string) => {
  const user = await AxiosInstance.post<IUser>("/user/login");
  return user.data;
};
