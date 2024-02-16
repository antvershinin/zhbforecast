import { AxiosInstance } from "./axiosInstance";

interface ITeam {
  id: string;
  name: string;
}

export const getTeams = async () => {
  const response = await AxiosInstance.get<ITeam>("/admin/getteams");
  return response;
};
