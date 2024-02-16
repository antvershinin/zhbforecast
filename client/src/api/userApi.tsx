import { IUser } from "../providers/AuthProvider";
import { AxiosInstance } from "./axiosInstance";

export const loginDB = async (login: string, password: string) => {
  const user = await AxiosInstance.post("/user/login", {
    login,
    password,
  });
  return user.data;
};

export const getMeDB = async () => {
  const user = await AxiosInstance.post<IUser>("/user/auth");
  return user.data;
};
